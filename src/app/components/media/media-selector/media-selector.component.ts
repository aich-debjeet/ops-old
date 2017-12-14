import { Component, OnInit, Input } from '@angular/core';
import MediaPlayer from 'app/models/mediaplayer.model';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

import { NgModel } from '@angular/forms';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';
import { Store } from '@ngrx/store';

import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { ProfileModal, initialTag, UserCard } from '../../../models/profile.model';
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';
import FilesHelper from '../../.../../../helpers/fileUtils';

import { TokenService } from '../../../helpers/token.service';
import { ToastrService } from 'ngx-toastr';

import * as fromRoot from '../../../../app/app.reducer';

import { remove as _remove, merge as _merge, uniqBy as _uniqBy, flatten } from 'lodash';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';

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
  myProfileData: any;
  fileFormData: any;
  chooseChannelToggleState: boolean;
  activeUser: UserCard;

  explandshowChannelsList: boolean;
  uploadState: number;
  // Upload States 1 = normal, 2 = select channel, 3 = create channel


  // Form Values
  mediaPrivacy: number;
  license: string;
  isNSFW: boolean;

  constructor(
    private Upload: NgxfUploaderService,
    private fb: FormBuilder,
    private api: TokenService,
    private toastr: ToastrService,
    private router: Router,
    private profileStore: Store<ProfileModal>,
    private _store: Store<fromRoot.State>,
    private http: Http) {

      this.hasFiles = false;
      this.editingFile = new UploadItem;
      // this.uploadedFiles = [];
      this.uploaded = [];
      this.uploadedFiles = [];
      this.formMessages = [];

      this.chosenChannel = 0;
      this.uploadState = 1;
      this.chooseChannelToggleState = false;
      this.explandshowChannelsList = false;

      // If there's input assign, other wise, reload channel list
      if (this.userChannels) {
        this.channeList = this.userChannels;
      }

      // Default Form Values
      this.license = 'none';
      this.mediaPrivacy = 0;
      this.isNSFW = false;

      // X
      this.postSuccess = false;
      this.postSuccessActive = false;

      this.createChannelForm(); // Create Channel Form
      // this.createMediaForm(); // Media Info

      this.uploadStatus = 0;
      this.submitEnabled = 0;
      this.token = this.api.getToken();
      this.handle = '';

      this.myProfile$ = _store.select('profileTags').take(3);
      this.profileState$ = this.profileStore.select('profileTags');
  }

  ngOnInit() {
    // If there's input assign, other wise, reload channel list
    // this.myChannels$.subscribe(event => this.channeListx = event);
    this.myProfile$.subscribe(event => {
      this.myProfileData = event;

      const activeUser = event.profile_cards.active;
      this.activeUser = activeUser;

      let isUserReady;
      if (event.profile_navigation_details && event.profile_navigation_details.handle) {
        this.handle = event.profile_cards.active.handle;
        isUserReady = true;
        this.loadChannel(this.handle);
      } else {
        // console.log('[x]');
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

      if (state['profile_cards'].active && (this.activeUser.handle !== state['profile_cards'].active.handle)) {
        console.log('x');
        // this.loadChannel(state['profile_cards'].active.handle);
      }

      if (this.postSuccessActive === true) {
        this.toastr.success('Your media has been successfully posted to your channel', 'Upload');
        this.postSuccessActive = false; // job done
      }

      if (this.profileChannel.user_channels_loaded) {
        this.channeList = this.profileChannel.user_channel;
      }
    });

  }

  /**
   * Get thumb image
   */
  getThumb(src: string, showThumb: boolean = false) {
    const basePath = 'http://d206s58i653k1q.cloudfront.net/';
    const patt1 = /\.([0-9a-z]+)(?:[\?#]|$)/i;
    const m3 = (src).match(patt1);
    if (showThumb === true) {
      return basePath + src.replace(m3[0], '_thumb_250.jpeg');
    } else {
      return basePath + src;
    }
  }

  /**
   * Switch View
   */
  changeState(state: number) {
    console.log('Clicked', state);
    this.uploadState = state;
  }

  /**
   * Status Form
   */
  createChannelForm() {
    this.channelForm = this.fb.group({
      title: ['', Validators.required ],
      desc: ['', Validators.required ],
      privacy: [0, Validators.required ]
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
      isAdult: [0]
    })
  }

  /**
   * Load Channel
   */
  loadChannel(handle: string) {
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL, payload: handle });
  }

  /**
   * Media Upload Multiple
   */
  mediaInfoUpdateAll(value: any) {
    console.log(value);
    console.log(this.uploaded);
  }

  /**
   * Post all medias at once
   * @param formValue
   */
  postAllMedia(value) {
    console.log('post all media');
    console.log(value);

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
      console.log(nowFile);
      if (nowFile) {
        // Build Media Object
        const mediaItem = this.formatMedia( nowFile, formData, chosenChannel, userHandle, value.privacy);
        console.log(mediaItem);
        const media = [ mediaItem ];
        multipleMedias.push(mediaItem);
        console.log(multipleMedias);
      }
    }

    if ( isReady && userHandle !== '') {
      console.log('MULTIPLE', multipleMedias);
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
   * Media Info Update
   */
  mediaInfoUpdate(formValue: any) {
    console.log('media upload');
    // console.log('formVlaue', formValue);
    // const mediaType = this.getFileType(this.editingFile.fileName);
    // const postTime = this.currentTime();
    // const isUploadReady = this.uploadMeta();

    // let userHandle;
    // if (this.profileChannel.profile_loaded === true ) {
    //   userHandle = this.profileChannel.profile_navigation_details.handle;
    // }

    // if ( isUploadReady ) {
    //   const formData = formValue;
    //   const chosenChannel = this.chosenChannel;
    //   const chosenFile = this.editingFile;

    //   // Build Media Object
    //   const mediaItem = this.formatMedia( chosenFile, formData, chosenChannel, userHandle, formValue.privacy);
    //   const media = [ mediaItem ];

    //   // Action!!
    //   this.postMediaToChannel(this.chosenChannel.spotfeedId, media);
    // } else {
    //   console.log('FORM SUBMITTION ERROR');
    // }
  }

  /**
   * Notification Wacther
   */
  notificationWatcher() {
    //
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
    console.log('req body', req);
    console.log('Sucess Post');
    this.profileStore.dispatch({ type: ProfileActions.POST_CHANNEL_MEDIA, payload: payload })

    this._store.select('profileTags')
      .first(media => media['media_channel_posted'] === true)
      .subscribe( data => {
        console.log('save success');
         this.router.navigate(['/channel/' + channelId]);
      });
  }

  /**
   * Form Builder
   */
  createChannel(value: any) {

    const accessVal = parseInt(value.privacy, 0);

    if ( this.channelForm.valid === true ) {
      const channelObj = {
        name: value.title,
        access: Number(value.privacy),
        description: value.desc,
        superType: 'channel',
        accessSettings : { access : accessVal },
        owner: this.handle,
        industryList: [ 'DANCE'] /** @TODO - To be removed! */
      }

      this.saveChannel( channelObj );
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
        console.log('OWNER', newObj.owner);
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
    this.profileStore.dispatch({ type: ProfileActions.CHANNEL_SAVE, payload: req });

    this.profileStore.select('profileTags')
      .first(profile => profile['channel_saved'] === true )
      .subscribe( data => {
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
   * Helper classes
   * @param file
   */
  isChosenChannel(channel: any) {
    if (this.chosenChannel === 0) {
      return false;
    }else {
      if (this.chosenChannel.spotfeedId === channel.spotfeedId) {
        return true;
      } else {
        return false;
      }
    }
  }

  /**
   * File Extension checker
   */
  checkFileType(fileName: string, fileType: string) {
    return FilesHelper.fileType(fileName, fileType);
  }

  checkEmpty(obj: Object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
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
    console.log(this.editingFile);
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
   * Array of tags splitted by comma
   * @param tags
   */
  seperateTags(tags: any) {
    const tagList = [];
    if (tags) {
      for (const tag of tags) {
        tagList.push(tag.value);
      }
    }
    return tagList;
  }

  extractTags() {
    const REGEX_HASHTAG = /\B(#[Ã¡-ÃºÃ-ÃÃ¤-Ã¼Ã-Ãa-zA-Z0-9_]+)/g;
    const string = this.desc
    const results = string.match(REGEX_HASHTAG)

    const tag = [];
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
    console.log(tags);

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

  /**
   * Multiple File Upload
   * @param files
   */
  uploadFileList(files: File[]): void {
    if (!(files instanceof Array)) {
      this.alertError(files);
      return;
    }

    // Subscribe to current user object
    this.myProfile$.subscribe(event => {
      this.myProfileData = event;
      if (event.profile_navigation_details && event.profile_navigation_details.handle) {
        this.handle = event.profile_navigation_details.handle;
      }
    });

    const filesList = [];
    const userHandle = this.handle;

    if (files.length > 0) {
      this.hasFiles = true
      this.files = files;
    }

    // this.tagState$.subscribe((state) => {
    if (this.handle && this.handle !== '') {
      this.uploadStatus = 2;
      this.uploadFile(files, this.token, userHandle)
    } else {
      this.uploadStatus = 0;
    }
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
          this.status = event.percent;
        }else {
          console.log('Finished ', userHandle);
          if (event.data) {

            // @TODO__URGENT Make list appendable for files
            const latestUploaded = event.data['SUCCESS'];
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
    this.uploadedFiles = _remove(this.uploadedFiles, function(n){
      return n.fileName !== file.fileName;
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
   * Hide/Show Choose Channel
   */
  chooseChannelToggle() {
    this.chooseChannelToggleState = !this.chooseChannelToggleState;
  }

  /**
   * Expand the Channels Selector View
   */
  showChannelsList(isExpanded: any) {
    // this.explandshowChannelsList = true;
    this.uploadState = 2;
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

    this.changeState(2);
  }
}

