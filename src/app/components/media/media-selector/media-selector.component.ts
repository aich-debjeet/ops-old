import { Component, OnInit, Input } from '@angular/core';
import MediaPlayer from 'app/models/mediaplayer.model';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

import { NgModel } from '@angular/forms';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';
import { Store } from '@ngrx/store';

import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { ProfileModal, initialTag, UserCard } from '../../../models/profile.model';
import { initialMedia, Media } from '../../../models/media.model';

import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';
import { AuthActions } from '../../../actions/auth.action';
import FilesHelper from '../../.../../../helpers/fileUtils';

import { TokenService } from '../../../helpers/token.service';
import { ToastrService } from 'ngx-toastr';

import * as fromRoot from '../../../../app/app.reducer';
import { SafeUrl } from '@angular/platform-browser';

import { remove as _remove, merge as _merge, uniqBy as _uniqBy, flatten, findIndex as _findIndex } from 'lodash';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';

export class UploadItem {
  fileName: string;
  repoPath: string;
  type?: string;
}
const api_path = environment.API_ENDPOINT;
const base = api_path + '/portal/cdn/media/upload/multiple';

@Component({
  selector: 'app-media-selector',
  templateUrl: './media-selector.component.html',
  styleUrls: ['./media-selector.component.scss']
})

export class MediaSelectorComponent implements OnInit {
  @Input() userChannels;
  process: number[] = [];
  fileData: File;
  uploaded: any[];
  uploadedFiles: UploadItem[];
  editingFile: UploadItem;
  apiLink = api_path + ' /api/1.0';
  channels: any[];
  chosenChannel: any = 0;
  channelForm: FormGroup;
  mediaForm: FormGroup;
  addChannel: boolean;
  status: number;
  queue: any;
  hasFiles: boolean;
  files: any;
  // temp
  handle: string;
  token: string;
  uploadStatus: number;
  tags: any;
  baseUrl = environment.API_IMAGE;
  desc: string;
  addFileData: boolean;
  industries: any[];

  //
  postSuccess: boolean;
  postSuccessActive: boolean;
  submitEnabled: number;
  formMessages: string[];

  profileState$: Observable<ProfileModal>;
  private profileStateSubscription: Subscription;
  profileChannel = initialTag ;
  channeList: any;

  myChannels$: Observable<any>;
  myProfile$: Observable<any>;
  loginTagState$: Observable<any>;
  myProfileData: any;
  fileFormData: any;
  chooseChannelToggleState: boolean;
  activeUser: UserCard;

  explandshowChannelsList: boolean;
  uploadState: number;
  // Upload States 1 = normal, 2 = select channel, 3 = create channel


  cards = [];

  // Form Values
  mediaPrivacy: number;
  license: string;
  isNSFW: boolean;
  channelName: String;
  channelPrivacy: any = 0;
  channelCreatebtn: boolean = false;
  channelDesc: string;
  channelSaved: boolean;
  eventName: string;
  previewUrl: any[];

  constructor(
    private Upload: NgxfUploaderService,
    private fb: FormBuilder,
    private api: TokenService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private _store: Store<any>,
    private http: Http) {
      this.cards = [];

      this.hasFiles = false;
      this.editingFile = new UploadItem;
      // this.uploadedFiles = [];
      this.uploaded = [];
      this.uploadedFiles = [];
      this.formMessages = [];
      this.eventName = '';

      this.chosenChannel = 0;
      this.uploadState = 1;
      this.chooseChannelToggleState = false;
      this.explandshowChannelsList = false;
      this.channelSaved = false;

      // If there's input assign, other wise, reload channel list
      if (this.userChannels) {
        this.channeList = this.userChannels;
      }

      // Default Form Values
      this.license = 'none';
      this.mediaPrivacy = 0;
      this.isNSFW = false;
      this.channelCreatebtn = false;
      this.channelDesc = 'No Description';

      // X
      this.postSuccess = false;
      this.postSuccessActive = false;

      this.createChannelForm();

      this.uploadStatus = 0;
      this.submitEnabled = 0;
      this.token = this.api.getToken();
      this.handle = '';

      this.myProfile$ = _store.select('profileTags').take(3);
      //Subscribe to current user object
    this.myProfile$.subscribe(event => {
      this.myProfileData = event;
      if (event.profile_navigation_details && event.profile_navigation_details.handle) {
        this.handle = event.profile_navigation_details.handle;
      }
    });
      this.profileState$ = _store.select('profileTags');

      this.loginTagState$ = _store.select('loginTags');
      this.loginTagState$.subscribe((state) => {
        if (typeof state !== 'undefined') {
          this.industries = state.industries;
        }
      });
  }

  ngOnInit() {
    console.log('Media');
    this.uploadState = 1;

    this.myProfile$.subscribe(event => {
      if (typeof event !== 'undefined') {
        this.myProfileData = event;

        const activeUser = event.profile_cards.active;
        this.activeUser = activeUser;

        let isUserReady;
        if (event.profile_navigation_details && event.profile_navigation_details.handle) {
          this.handle = event.profile_cards.active.handle;
          isUserReady = true;
          this.loadChannel(this.handle);
        }
      }
    });

    /**
     * Watch out for changes in store
     */

    this.profileState$.subscribe((state) => {

      this.profileChannel = state;
      // Post states
      this.postSuccess = this.profileChannel.media_channel_posted;
      this.postSuccessActive = this.profileChannel.media_channel_posting;

      // if new channel saved

      if (this.profileChannel.channel_saved === true) {
        this.channelSaved = true;
        if (this.channelSaved === true) {
          this.channelSaved = false;
          this.changeState(2);
        }
      }

      if (state['profile_cards'].active && (this.activeUser.handle !== state['profile_cards'].active.handle)) {
        // nothing
      }

      if (this.postSuccessActive === true) {
        this.postSuccessActive = false; // job done
      }

      if (this.profileChannel.user_channels_loaded) {
        this.channeList = this.profileChannel.user_channel;
      }
    });

    // Forms

    // Loading industry list
    this._store.dispatch({ type: AuthActions.LOAD_INDUSTRIES });
    this.createChannelForm();

  }


  /**
   * Multiple File Upload
   * @param files
   */
  uploadFileList(files: File[]): void {
    if (!(files instanceof Array)) {
      this.alertError(files);
      return;
    }

    const filesList = [];
    const userHandle = this.handle;

    if (files.length > 0) {
      this.hasFiles = true
      this.files = files;
    }

    const uploadsList = [];
    for (let i = 0; i < files.length; i++) {
      const fileType = this.getFileType(files[i].name);
      if (fileType === 'image') {
        this.createPreViewImg(files[i], (url) => {
          this.files[i]['preview'] = url;
        });
      }
      if (fileType === 'video') {
        this.files[i]['preview'] = this.baseUrl + 'img/svg/video_thumb.png';
      }else {
        this.files[i]['preview'] = this.baseUrl + 'img/svg/audio_thumb.png';
      }
      const createdate = new Date().getTime().toString();
      this.files[i]['createDate'] = createdate;
      this.files[i]['fileType'] = fileType;
      this.cards.push(files[i]);
      this.uploadFile(files[i], this.token, userHandle);
    }

    this.previewUrl = uploadsList;
  }


  /**
   * Send file to file heaven
   * @param files
   * @param token
   * @param userHandle
   */
  uploadFile(files: any, token: string, userHandle: string) {
    this.Upload.upload({
      url: base,
      headers: { Authorization: 'Bearer ' + this.token },
      params: { handle: userHandle },
      files: files,
      process: true
    }).subscribe(
      (event: UploadEvent) => {
        if (event.status === UploadStatus.Uploading) {
          // console.log(event.percent);
          this.updateProgress(files, event.percent)

        }else {
          // console.log('Finished ', userHandle);
          if (event.data) {

            // @TODO__URGENT Make list appendable for files
            const latestUploaded = event.data['SUCCESS'];
            console.log('file upload success', latestUploaded);
            this.addToUploads(latestUploaded);

            this.uploadStatus = 0;
          }
        }
      },
      (err) => {
        //
      },
      () => {
        //
      });
  }

  updateProgress(files, percentage) {
    const index = _findIndex(this.cards, files);
    this.cards[index]['pre'] = percentage;
    // console.log(this.cards);
  }

  /**
   * Switch View
   */
  changeState(state: number) {
    this.uploadState = state;
  }

  /**
   * Status Form
   */
  createChannelForm() {
    this.channelForm = this.fb.group({
      title: ['', Validators.required ],
      desc: ['', Validators.required ],
      privacy: [0, Validators.required ],
      type: [0, Validators.required ]
    })
  }

  /**
   * Status Form
   */
  createMediaForm() {
    this.mediaForm = this.fb.group({
      title: ['', Validators.required ],
      desc: ['', Validators.required ],
      privacy: [0, Validators.required ],
      copyright: [0, Validators.required ],
      isAdult: [0],
      type: [0, Validators.required ]
    })
  }

  /**
   * Load Channel
   */
  loadChannel(handle: string) {
    this._store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL, payload: handle });
  }


  /**
   * Post all medias at once
   * @param formValue
   */
  postAllMedia(value) {
    // console.log('post all media');
    // console.log(value);

    let isReady = false;
    let userHandle = '';

    if (this.chosenChannel !== 0 ) {
      isReady = true;
    } else {
      this.formMessages.push('Please select a Channel');
      isReady = false;
    }

    if (this.profileChannel.profile_loaded === true ) {
      userHandle = this.profileChannel.profile_navigation_details.handle;
    }

    // 1. Get choosen file
    const multipleMedias = [];
    const formData = {
      desc: this.desc,
    }
    const chosenChannel = this.chosenChannel;
    // const chosenFile = this.editingFile;

    for (const nowFile of this.uploadedFiles) {

      if (!this.desc) {
        console.log('you need a desc to continue');
        isReady = false;
        this.changeState(1);
      }

      // console.log(nowFile);
      if (nowFile) {
        // Build Media Object
        const mediaItem = this.formatMedia( nowFile, formData, chosenChannel, userHandle, value.privacy);
        const media = [ mediaItem ];
        multipleMedias.push(mediaItem);
      }
    }

    if ( isReady && userHandle !== '') {
      // console.log('MULTIPLE', multipleMedias);
      this.postMediaToChannel(chosenChannel.spotfeedId, multipleMedias);
    }
  }

  /**
   * Validte Upload
   */
  uploadMeta() {
    this.formMessages = [];

    const chosenFile = this.editingFile;
    const chosenChannel = this.chosenChannel;

    let isChannelReady, isFileReady ;

    if (this.chosenChannel === 0 ) {
      isChannelReady = false;
      this.toastr.error('You need to select a channel', 'Not ready yet');
    } else {
      isChannelReady = true;
    }

    if (chosenFile.fileName === undefined) {
      isFileReady = false;
      // this.toastr.error('You need to select a file to post', 'Not ready yet');
    } else {
      isFileReady = true;
    }

    if (isChannelReady === true && isFileReady === true) {
      return true;
    }
  }


  /**
   * currentTime
   */
  currentTime() {
    const postDate = new Date(Date.now()).toISOString();
    return postDate;
  }

  /**
   * Post Uploaded Medias to Channel
   */
  postMediaToChannel(channelId: string, req: any) {
    const payload = {
      channelId: channelId,
      req: { media: req }
    };

    this._store.dispatch({ type: ProfileActions.POST_CHANNEL_MEDIA, payload: payload })

    this._store.select('profileTags')
      .first(media => media['media_channel_posted'] === true)
      .subscribe( data => {
        this.toastr.success('Your media has been successfully posted to your channel', 'Upload');
        this.router.navigate(['/channel/' + channelId]);
      });
  }

  /**
   * Form Builder
   */
  createChannel(value: any) {
    if ( this.channelForm.valid === true ) {
      const channelObj = {
        name: value.title,
        description: value.desc,
        superType: 'channel',
        access: Number(value.privacy),
        accessSettings : { access : Number(value.privacy) },
        owner: this.handle,
        industryList: [value.type]
      }

      this.saveChannel( channelObj );
    }else {
      this.toastr.warning('Please fill all required fields');
    }
  }

  /**
   * onChannelCreation
   */
  onChannelCreation(event: any) {
    if (event) {
      // If handle is empty, append current handle
      // Give away what you have, humanity dear!
      const newObj = event;
      newObj.owner = this.handle;

      if (newObj.owner) {
        // console.log('OWNER', newObj.owner);
        this.saveChannel( newObj );
        // Recollect channel details
        this.loadChannel(this.handle);
      }
    }
  }

  /**
   * Make Channel
   */
  makeChannel() {
    this.addChannel = !this.addChannel;
  }

  /**
   * Save Channel
   */
  saveChannel(req: any) {
    this._store.dispatch({ type: ProfileActions.CHANNEL_SAVE, payload: req });

    this._store.select('profileTags')
      .first(profile => profile['channel_saved'] === true )
      .subscribe( data => {
        this.channelForm.reset();
        this.toastr.success('successfully created channel', 'Success!');
        this.loadChannel(this.handle);
      });
  }

  /**
   * Search for Channels
   */
  searchChannels() {
    const userHandle = this.handle;
    const offset = 0;
    const limit = 15;
    const superType = 'channel';

    const searchObj = {
      offset: offset,
      limit: limit,
      superType: superType,
      owner: userHandle
    }

    // this.getChannels(searchObj);
  }

  /**
   * Choose a channel
   * @param channel
   */

  chooseChannel(channel: any) {
    this.chosenChannel = channel;
  }


  /**
   * File Extension checker
   */
  checkFileType(fileName: string, fileType: string) {
    return FilesHelper.fileType(fileName, fileType);
  }

  /**
   * Selected Class builder
   * @param fileName
   */
  isSelectedFile(fileName) {
    if (this.editingFile.fileName !== null) {
      const selectedFile = this.editingFile.fileName;
      if (fileName === selectedFile) {
        return true;
      }else {
        return false;
      }
    } else {
      return false;
    }
  }

  /**
   * on Channel Selection
   */
  onChannelSelection(channel: any) {
    this.chosenChannel = channel;
    // do the post as well
  }

  /**
   * File Details
   */

  fileDetails(file) {
    this.editingFile = this.formatFile(file);
    // console.log(this.editingFile);
    this.addFileData = true;
  }

  /**
   * Format File to Model
   */
  formatFile(file: any) {
    const fileType = this.getFileType(file.fileName)
    const leFile: UploadItem = {
      fileName: file.fileName,
      repoPath: file.repoPath,
      type: fileType
    };
    return leFile;
  }


  /**
   * Extract Tag from Body
   */

  extractTags() {
    let isDwcThing = 0;
    const tag = [];
    // return null if no desc
    if (!this.desc) {
      return tag;
    }

    /**
     * If its it has an event param
     * push that param as an hashtag
     */
    const eventName = this.eventName;
    if (eventName) {
      tag.push(eventName);
      isDwcThing = 2;
    }

    const REGEX_HASHTAG = /\B(#[Ã¡-ÃºÃ-ÃÃ¤-Ã¼Ã-Ãa-zA-Z0-9_]+)/g;
    const string = this.desc
    const results = string.match(REGEX_HASHTAG);


    // const tag = [];
    if (results) {
      results.forEach(function(element) {
        const newVal = element.replace('#', '');
        tag.push(newVal);
      });
    }

    return tag
  }

  /**
   * Format Media
   */
  formatMedia(file: any, formValue: any, channel: any, handle: string, privacy: string) {
    const mediaType = this.getFileType(file.fileName);
    const postTime = this.currentTime();
    const isUploadReady = this.uploadMeta();

    const tags = this.extractTags();
    // console.log(tags);

    const files = {
      fileName: file.fileName,
      repoPath: file.repoPath,
      mtype: mediaType,
      contentType: mediaType,
      title: formValue.title,
      description: formValue.desc,
      active: true,
      createdBy: handle,
      createdDate: postTime,
      lastUpdatedDate: postTime,
      tags : tags,
      // extras: {
      //   access: Number(privacy)
      // },
      count : {
        likes: [], shares: [], spots: [],
        channel: channel.spotfeedId
      }
    };

    return files;
  }

  /**
   * Identify File
   * @param files
   */
  getFileType(fileName: string) {
    const isImage = this.checkFileType(fileName, 'Image');
    const isVideo = this.checkFileType(fileName, 'Video');
    const isAudio = this.checkFileType(fileName, 'Audio');

    if (isImage) {
      return 'image';
    }

    if (isVideo) {
      return 'video';
    }

    if (isAudio) {
      return 'audio';
    }
  }


  createPreViewImg(file: File, callbake: Function) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      return callbake(e.target.result);
    };
    reader.readAsDataURL(file);
  }


  /**
   * Push to Upload List
   */
  addToUploads(uploads: any) {
    const uploadsList = [];
    for (const file of uploads) {
      const thisFile = this.formatFile(file);
      uploadsList.push(thisFile);
    }
    const cleanedList = _uniqBy(uploadsList, function (e) {
      return e.repoPath;
    });
    const nowUploads = this.uploadedFiles;
    const newArray = flatten([nowUploads, cleanedList]);

    this.uploadedFiles = newArray;
  }

  /**
   * Remove a file from list
   * @param file
   */
  removeFile(file: any) {
    this.cards = _remove(this.cards, function(n){
      return n.name !== file.name;
    });
  }

  // Do something you want when file error occur.
  alertError(msg: FileError) {
    switch (msg) {
      case FileError.NumError:
        alert('Number Error');
        break;
      case FileError.SizeError:
        alert('Size Error');
        break;
      case FileError.TypeError:
        alert('Type Error');
        break;
    }
  }

  /**
   * Toggle Privacy Value
   */
  mediaPrivacyToggle(value) {
    this.mediaPrivacy = value
  }

  /**
   * Channel Selection Page Navigation
   */
  formNext() {
    const formValues = {
      privacy: this.mediaPrivacy,
      isNSFW: this.mediaPrivacy,
      license: this.license,
    }

    if (!this.desc) {
      this.toastr.error('Please add relevant descriptions or tags', 'Missing Description');
    } else {
      this.changeState(2);
    }
  }

}

