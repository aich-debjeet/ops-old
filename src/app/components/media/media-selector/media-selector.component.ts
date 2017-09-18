import { Component, OnInit, Input } from '@angular/core';
import MediaPlayer from 'app/models/mediaplayer.model';

import { NgModel } from '@angular/forms';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';
import { Store } from '@ngrx/store';

import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';
import FilesHelper from '../../.../../../helpers/fileUtils';

import { TokenService } from '../../../helpers/token.service';

import { remove as _remove, merge as _merge, uniqBy as _uniqBy } from 'lodash';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';

export class UploadItem {
  fileName: string;
  repoPath: string;
  type?: string;
}

const base = 'http://devservices.greenroom6.com:9000/api/1.0/portal/cdn/media/upload/multiple';

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
  apiLink: 'http://devservices.greenroom6.com:9000/api/1.0';
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

  //
  postSuccess: boolean;
  postSuccessActive: boolean;
  submitEnabled: number;
  formMessages: string[];

  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  profileChannel = initialTag ;
  channeList: any;

  constructor(
    private Upload: NgxfUploaderService,
    private fb: FormBuilder,
    private api: TokenService,
    private profileStore: Store<ProfileModal>,
    private http: Http) {

    this.hasFiles = false;
    this.editingFile = new UploadItem;
    // this.uploadedFiles = [];
    this.uploaded = [];
    this.uploadedFiles = [];
    this.formMessages = [];

    this.chosenChannel = 0;

    // If there's input assign, other wise, reload channel list
    if (this.userChannels) {
      this.channeList = this.userChannels;
    }

    // X
    this.postSuccess = false;
    this.postSuccessActive = false;

    this.createChannelForm(); // Create Channel Form
    this.createMediaForm(); // Media Info

    this.uploadStatus = 0;
    this.submitEnabled = 0;
    this.token = this.api.getToken();
    this.handle = '';

    // console.log(' MEDIA_SELECTOR { CONSTRUCTOR } : TOKEN ', this.token );

    this.tagState$ = this.profileStore.select('profileTags');
    // this.test = 'salabeel';
    this.tagState$.subscribe((state) => {
      this.profileChannel = state;
      this.checkPostFlag(this.profileChannel);

      // Post states
      this.postSuccess = this.profileChannel.media_channel_posted;
      this.postSuccessActive = this.profileChannel.media_channel_posting;

      if (this.profileChannel.profile_loaded === true ) {
        this.handle = this.profileChannel.profileUser.handle;
        this.submitEnabled = 1;
      }

      if (!this.userChannels && this.profileChannel.user_channel.length > 0) {
        // console.log('user channels there', this.profileChannel.user_channel );
        this.channeList = this.profileChannel.user_channel;
      }

      if (this.userChannels) {
        this.channeList = this.userChannels;
        // console.log( 'user channels passsed', this.userChannels );
      }
    });
  }

  checkPostFlag(storeValues: any) {
    //
  }

  ngOnInit() {
    // If there's input assign, other wise, reload channel list
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
  postAllMedia(formValue: any) {
    // Stop submittion if not ready with needed data;
    if (this.submitEnabled < 1 ) {
      // console.log('FORM', 'Form disabled, All required datas not loaded yet');
      return false;
    }

    if (this.profileChannel.profile_loaded === true ) {
      this.handle = this.profileChannel.profileUser.handle;
    }
    // 1. Get choosen file
    const chosenFile = this.editingFile;
    const chosenChannel = this.chosenChannel;

    const mediaType = this.getFileType(this.editingFile.fileName);
    const postTime = this.currentTime();

    const multipleMedias = [];
    for (let file of this.uploadedFiles) {
      if (file) {
        const files = {
          fileName: file.fileName,
          repoPath: file.repoPath,
          mtype: mediaType,
          contentType: mediaType,
          title: formValue.title,
          description: formValue.desc,
          active: true,
          createdBy: this.handle,
          createdDate: postTime,
          lastUpdatedDate: postTime,
          count : {
            likes: [], shares: [], spots: [],
            channel: this.chosenChannel.spotfeedId
          }
        };
        multipleMedias.push(files);
      }
    }

    // const mediaObj = {
    //   media: multipleMedias
    // };

    this.postMediaToChannel(chosenChannel.spotfeedId, multipleMedias);
  }

  /**
   * Media Info Update
   */
  mediaInfoUpdate(value: any) {
    this.formMessages = [];

    let userHandle;
    // Stop submittion if not ready with needed data;
    if (this.submitEnabled < 1 ) {
      // console.log('FORM', 'Form disabled, All required datas not loaded yet');
      return false;
    }

    if (this.profileChannel.profile_loaded === true ) {
      userHandle = this.profileChannel.profileUser.handle;
    }
    // 1. Get choosen file
    const chosenFile = this.editingFile;
    const chosenChannel = this.chosenChannel;

    // 2. Make choose a channel
    // 3. Link and upload
    const fileName = '';
    const repoPath = '';

    // Check if a file & a channel is selected
    console.log('FILE', chosenFile);
    console.log('CHANNEL', chosenChannel);
    console.log('HANDLE', userHandle);

    let isChannelReady, isFileReady ;
    if (this.chosenChannel === 0 ) {
      isChannelReady = false;
      this.formMessages.push('Please select a channel');
    } else {
      isChannelReady = true;
    }

    if (chosenFile.fileName === undefined) {
      isFileReady = false;
      this.formMessages.push('Please select a file');
    } else {
      console.log('no file choosen', chosenChannel.keys);
      isFileReady = true;
    }

    const mediaType = this.getFileType(this.editingFile.fileName);
    const postTime = this.currentTime();

    const media = [{
        fileName: this.editingFile.fileName,
        repoPath: this.editingFile.repoPath,
        mtype: mediaType,
        contentType: mediaType,
        title: value.title,
        description: value.desc,
        active: true,
        createdBy: userHandle,
        createdDate: postTime,
        lastUpdatedDate: postTime,
        count : {
          likes: [], shares: [], spots: [],
          channel: this.chosenChannel.spotfeedId
        }
    }];

    if ( isFileReady && isChannelReady) {
      this.postMediaToChannel(chosenChannel.spotfeedId, media);
    } else {
      console.log('FORM SUBMITTION ERROR');
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

    this.profileStore.dispatch({ type: ProfileActions.POST_CHANNEL_MEDIA, payload: payload })
  }

  /**
   * Form Builder
   */
  createChannel(value: any) {

    const accessVal = parseInt(value.privacy, 0);

    if ( this.channelForm.valid === true ) {
      const channelObj = {
        name: value.title,
        access: value.privacy,
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

    this.getChannels(searchObj);
  }

  /**
   * Load Channels
   * @param req
   */
  getChannels(req: any) {
    // const headers = new Headers();
    // const reqOptions = new RequestOptions({ headers: headers });

    // headers.append('Authorization', 'Bearer ' + this.token);
    // headers.append('Content-Type', 'application/json');

    // return this.http.post(`http://devservices.greenroom6.com:9000/api/1.0/portal/network/spotfeed/search`, req, reqOptions)
    //   .map((data: Response) => data.json())
    //   .subscribe(data => {
    //     this.channels = data;
    //   });
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
  }

  /**
   * File Details
   */

  fileDetails(file) {
    console.log('SELECTED FILE', file);
    this.editingFile = this.formatFile(file);
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
   * Identify Group
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

    const filesList = [];

    if (files.length > 0) {
      this.hasFiles = true
      this.files = files;
    }

    let userHandle = '0';
    this.tagState$.subscribe((state) => {
      userHandle = this.profileChannel.profileUser.handle;
      if ( this.profileChannel.profile_loaded === true ) {
        this.uploadStatus = 2;
        this.uploadFile(files, this.token, userHandle)
      } else {
        console.log('UPLOAD ERROR', this.uploadStatus);
      }
    });
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
        console.log(err);
      },
      () => {
        console.log(' UPLOAD : COMPLETE ', userHandle);
      });
  }

  /**
   * Push to Upload List
   */
  addToUploads(uploads: any) {
    // let uploads = [];
    for (let file of uploads) {
      const thisFile = this.formatFile(file);
      this.uploadedFiles.push(thisFile);
    }

    const x = _uniqBy(this.uploadedFiles, function (e) {
      console.log(e);
      return e.repoPath;
    });
    // this.uploadedFiles = _uniqBy(this.uploadedFiles, 'repoPath');
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
}

