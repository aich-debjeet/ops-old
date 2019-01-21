import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileModal, initialTag, UserCard } from '../../../models/profile.model';
import { ProfileActions } from '../../../actions/profile.action';
import { MediaActions } from '../../../actions/media.action';
import { initialMedia, Media } from '../../../models/media.model';
import { AuthActions } from '../../../actions/auth.action';
import FilesHelper from '../../.../../../helpers/fileUtils';
import { TokenService } from '../../../helpers/token.service';
import { ToastrService } from 'ngx-toastr';
import { remove as _remove, merge as _merge, uniqBy as _uniqBy, flatten, findIndex as _findIndex } from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import { GeneralUtilities } from 'app/helpers/general.utils';

export class UploadItem {
  fileName: string;
  repoPath: string;
  type?: string;
}

const mediaUploadApiEndpoint = environment.API_ENDPOINT + '/portal/cdn/media/upload/multiple';

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
  uploadedFiles: UploadItem[] = [];
  editingFile: UploadItem;
  channels: any[];
  selectedChannel: any = 0;
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
  profileChannel = initialTag;
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
  channelPrivacy: number;
  license: string;
  isNSFW: boolean;
  channelName: String;
  channelCreatebtn = false;
  channelDesc: string;
  channelSaved: boolean;
  eventName: string;
  previewUrl: any[];
  external_post_active = false;
  ct_id: any;
  post_to: any;
  user_channel_scroll_id: any;
  nameActive: boolean;
  ct_name: any;
  postSubmiting = false;

  constructor(
    private Upload: NgxfUploaderService,
    private fb: FormBuilder,
    private api: TokenService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private gUtils: GeneralUtilities,
    private _store: Store<any>) {
    this.cards = [];

    this.hasFiles = false;
    this.editingFile = new UploadItem;
    // this.uploadedFiles = [];
    this.uploaded = [];
    this.uploadedFiles = [];
    this.formMessages = [];
    this.eventName = '';

    // if redriect url there
    if (this.route.snapshot.queryParams['post_to'] === 'community' || this.route.snapshot.queryParams['post_to'] === 'channel') {

      if (this.route.snapshot.queryParams['post_to'] && this.route.snapshot.queryParams['ct_id']) {
        this.external_post_active = true;
        this.ct_id = this.route.snapshot.queryParams['ct_id'];
        this.post_to = this.route.snapshot.queryParams['post_to'];
        // this.redrectUrl = this.route.snapshot.queryParams['next'];
      }
    }

    this.route.queryParams.subscribe(params => {
      if (this.route.snapshot.queryParams['post_to'] === 'my_story') {
        this.ct_name = 'My Story';
        this.external_post_active = true;
        this.post_to = this.route.snapshot.queryParams['post_to'];
      } else {
        this.ct_name = params['ct_name'];
      }
      if (Object.keys(params).length) {
        this.nameActive = true;
      }
    });

    this.selectedChannel = 0;
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
    this.channelPrivacy = 0;
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
    // Subscribe to current user object
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
          this.loadChannel(this.handle, null);
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
      this.postSubmiting = this.profileChannel.media_channel_posting;


      if (state['profile_cards'].active && (this.activeUser.handle !== state['profile_cards'].active.handle)) {
        // nothing
      }

      if (state && state['user_channel_scroll_id']) {
        this.user_channel_scroll_id = state['user_channel_scroll_id']
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
      } else {
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
      url: mediaUploadApiEndpoint,
      headers: { Authorization: 'Bearer ' + this.token },
      params: { handle: userHandle },
      files: files,
      process: true
    }).subscribe(
      (event: UploadEvent) => {
        if (event.status === UploadStatus.Uploading) {
          this.updateProgress(files, event.percent)
        } else {
          if (event.data) {
            // @TODO__URGENT Make list appendable for files
            const latestUploaded = event.data['SUCCESS'];
            if (latestUploaded) {
              this.fileUploadDone(files, latestUploaded[0]['repoPath']);
            }
            // this.cards['repoPath'] = latestUploaded.repoPath;            ;
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
  }

  fileUploadDone(files, percentage) {
    const index = _findIndex(this.cards, files);
    this.cards[index]['repoPath'] = percentage;
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
      title: ['', Validators.required],
      desc: ['', Validators.required],
      privacy: [0, Validators.required],
      type: [0, Validators.required]
    })
  }

  /**
   * Status Form
   */
  createMediaForm() {
    this.mediaForm = this.fb.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      privacy: [0, Validators.required],
      copyright: [0, Validators.required],
      isAdult: [0],
      type: [0, Validators.required]
    })
  }

  /**
   * Load Channel
   */
  loadChannel(handle: string, scrolled: any) {
    const body = {
      'limit': 30,
      'superType': 'channel',
      'owner': handle,
      'searchText': '',
      'scrollId': scrolled
    }
    this._store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL, payload: body });
  }


  /**
   * Post all medias at once
   * @param formValue
   */
  postAllMedia(value) {
    let isReady = false;
    let userHandle = '';

    if (this.selectedChannel !== 0) {
      isReady = true;
    } else {
      this.formMessages.push('Please select a Channel');
      isReady = false;
    }

    if (this.profileChannel.profile_loaded === true) {
      userHandle = this.profileChannel.profile_navigation_details.handle;
    }

    // 1. Get choosen file
    const multipleMedias = [];
    const formData = {
      desc: this.desc,
    }
    const selectedChannel = this.selectedChannel;
    // const chosenFile = this.editingFile;

    for (const nowFile of this.uploadedFiles) {

      if (!this.desc) {
        isReady = false;
        this.changeState(1);
      }

      if (nowFile) {
        // Build Media Object
        const mediaItem = this.formatMedia(nowFile, formData, selectedChannel, userHandle, value.privacy);
        const media = [mediaItem];
        multipleMedias.push(mediaItem);
      }
    }

    if (isReady && userHandle !== '') {
      this.postMediaToChannel(selectedChannel.spotfeedId, multipleMedias);
    }
  }

  publishPost() {
    let userHandle = '';
    this.selectedChannel = 1;

    if (!this.desc) {
      this.toastr.warning('Please add relevant descriptions or tags', 'Missing Description', {
        timeOut: 3000
      });
      this.changeState(1);
      return;
    }
    if (this.uploadedFiles.length === 0) {
      this.toastr.warning('Please select media to upload', 'Missing Media', {
        timeOut: 3000
      });
      this.changeState(1);
      return;
    }

    if (this.profileChannel.profile_loaded === true) {
      userHandle = this.profileChannel.profile_navigation_details.handle;
    }

    // 1. Get choosen file
    const multipleMedias = [];
    const formData = {
      desc: this.desc,
    }
    const channel = {
      spotfeedId: this.ct_id
    }
    // const chosenFile = this.editingFile;

    for (const nowFile of this.uploadedFiles) {

      if (nowFile) {
        // Build Media Object
        const mediaItem = this.formatMedia(nowFile, formData, channel, userHandle, this.mediaPrivacy.toString());
        const media = [mediaItem];
        multipleMedias.push(mediaItem);
      }
    }

    if (this.post_to === 'community') {
      if (userHandle !== '') {
        const resp = {
          id: this.ct_id,
          data: {
            mediaList: multipleMedias,
          }
        }
        this._store.dispatch({ type: ProfileActions.COMMUNITY_MEDIA_POST, payload: resp });

        this._store.select('profileTags')
          .first(media => media['community_media_success'] === true)
          .subscribe(data => {
            this.toastr.success('Your media has been successfully posted', 'Upload', {
              timeOut: 3000
            });
            this.router.navigateByUrl('/communities/' + this.ct_id);
          });
      }
    }
    if (this.post_to === 'my_story') {
      const data = {
        media: multipleMedias
      }
      this._store.dispatch({ type: MediaActions.MY_STORY_ADD, payload: data });
      this._store.select('mediaStore')
        .first(media => media['story_media_success'] === true)
        .subscribe(data => {
          this.toastr.success('Your media has been successfully posted to your story', 'Upload', {
            timeOut: 3000
          });
          this.router.navigate(['/profile/user/']);
        });
    }
    if (this.post_to === 'channel') {
      this.postMediaToChannel(this.ct_id, multipleMedias)
    }
  }

  /**
   * Validte Upload
   */
  // uploadMeta() {
  //   this.formMessages = [];

  //   const chosenFile = this.editingFile;
  //   const selectedChannel = this.selectedChannel;

  //   let isChannelReady, isFileReady;

  //   if (this.selectedChannel === 0) {
  //     isChannelReady = false;
  //     this.toastr.warning('You need to select a channel', 'Not ready yet', {
  //       timeOut: 3000
  //     });
  //   } else {
  //     isChannelReady = true;
  //   }

  //   if (chosenFile.fileName === undefined) {
  //     isFileReady = false;
  //     // this.toastr.warning('You need to select a file to post', 'Not ready yet', {
  //     //   timeOut: 3000
  //     // });
  //   } else {
  //     isFileReady = true;
  //   }

  //   if (isChannelReady === true && isFileReady === true) {
  //     return true;
  //   }
  // }

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
      .subscribe(data => {
        this.toastr.success('Your media has been successfully posted to your channel', 'Upload', {
          timeOut: 3000
        });
        this.router.navigate(['/channel/' + channelId]);
      });
  }

  /**
   * Form Builder
   */
  createChannel(value: any) {
    const mediaTypeList = ['image', 'video', 'audio', 'text'];
    if (this.channelForm.valid === true) {
      const channelObj = {
        name: value.title,
        description: value.desc,
        mediaTypes: mediaTypeList,
        superType: 'channel',
        access: Number(value.privacy),
        accessSettings: { access: Number(value.privacy) },
        owner: this.handle,
        industryList: [value.type]
      }

      this.saveChannel(channelObj);

    } else {
      this.toastr.warning('Please fill all required fields', '', {
        timeOut: 3000
      });
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
        this.saveChannel(newObj);
        // Recollect channel details
        this.loadChannel(this.handle, null);
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
      .first(profile => profile['channel_saved'] === true)
      .subscribe(data => {
        this.channelForm.reset();
        this.changeState(2);
        this.toastr.success('successfully created channel', 'Success!', {
          timeOut: 3000
        });
        this.createChannelForm();
        setTimeout(() => {
          this.loadChannel(this.handle, null);
        }, 1500);
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
    this.selectedChannel = channel;
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
      } else {
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
    this.selectedChannel = channel;
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
   * Extract Tag from string
   */
  extractTags(content: string) {
    const tags = [];
    if (!content) {
      return tags;
    }
    const REGEX_HASHTAG = /\B(#[Ã¡-ÃºÃ-ÃÃ¤-Ã¼Ã-Ãa-zA-Z0-9_]+)/g;
    const results = content.match(REGEX_HASHTAG);
    if (results) {
      results.forEach(function (element) {
        const newVal = element.replace('#', '');
        tags.push(newVal);
      });
    }
    return tags;
  }

  /**
   * Format Media
   */
  formatMedia(file: any, formValue: any, channel: any, handle: string, privacy: string) {
    const mediaType = this.getFileType(file.fileName);
    const postTime = this.gUtils.getCurrentTime();
    // const isUploadReady = this.uploadMeta();

    const tags = this.extractTags(this.desc);
    // console.log('tags', tags);
    // return;

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
      tags: tags,
      extras: {
        access: Number(privacy),
        isNsfw: this.isNSFW
      },
      count: {
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
    this.cards = _remove(this.cards, function (n) {
      return n.createDate !== file.createDate;
    });


    this.uploadedFiles = _remove(this.uploadedFiles, function (n) {
      return n.repoPath !== file.repoPath;
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
    this.mediaPrivacy = value;
  }

  channelPrivacyToggle(value) {
    this.channelPrivacy = value;
  }

  /**
   * Channel Selection Page Navigation
   */
  formNext() {
    // const formValues = {
    //   privacy: this.mediaPrivacy,
    //   isNSFW: this.mediaPrivacy,
    //   license: this.license,
    // }
    if (!this.desc) {
      this.toastr.warning('Please add relevant descriptions or tags', 'Missing Description', {
        timeOut: 3000
      });
    } else {
      if (this.uploadedFiles.length === 0) {
        this.toastr.warning('Please select media to upload', 'Missing Media', {
          timeOut: 3000
        });
      } else {
        this.changeState(2);
      }
    }
  }

  scrolled($event) {
    this.loadChannel(this.handle, this.user_channel_scroll_id);
  }

  searchChannel(text) {
    const body = {
      'limit': 30,
      'superType': 'channel',
      'owner': this.handle,
      'searchText': text,
      'scrollId': null
    }
    this._store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL, payload: body });
  }

}

