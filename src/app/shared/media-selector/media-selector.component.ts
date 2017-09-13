import { Component, OnInit } from '@angular/core';
import MediaPlayer from 'app/models/mediaplayer.model';

import { NgModel } from '@angular/forms';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';
import { Store } from '@ngrx/store';

import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { ProfileModal, initialTag } from '../../models/profile.model';

// action
import { ProfileActions } from '../../actions/profile.action';
import { SharedActions } from '../../actions/shared.action';

import FilesHelper from '../../helpers/fileUtils';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/from';

export class Selection {
  fileName: string;
  repoPath: string;
  type: string;
}

const base = 'http://devservices.greenroom6.com:9000/api/1.0/portal/cdn/media/upload/multiple';

@Component({
  selector: 'app-media-selector',
  templateUrl: './media-selector.component.html',
  styleUrls: ['./media-selector.component.scss']
})

export class MediaSelectorComponent {
  process: number[] = [];
  fileData: File;
  uploaded: any[];
  editingFile: Selection;
  apiLink: 'http://devservices.greenroom6.com:9000/api/1.0';
  channels: any[];
  chosenChannel: any = 0;
  channelForm: FormGroup;
  mediaForm: FormGroup;
  addChannel: boolean;
  status: number;
  queue: any;
  hasFiles: boolean;

  // temp
  handle: string;
  token: string;

  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  profileChannel = initialTag ;

  constructor(
    private Upload: NgxfUploaderService,
    private fb: FormBuilder,
    private profileStore: Store<ProfileModal>,
    private http: Http) {

    this.hasFiles = false;
    this.editingFile = new Selection;

    this.chosenChannel = 0;

    // Create Channel Form
    this.createChannelForm();
    // Media Info
    this.createMediaForm();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.handle = localStorage.getItem('currentUserID');
    this.token = currentUser.access_token; // your token

    this.tagState$ = this.profileStore.select('profileTags');
    // this.test = 'salabeel';
    this.tagState$.subscribe((state) => {
      this.profileChannel = state;
    });

    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL, payload: this.handle });
  }

  /**
   * Status Form
   */
  createChannelForm() {
    this.channelForm = this.fb.group({
      title: ['New Channel', Validators.required ],
      desc: ['Soem rand desc', Validators.required ],
      privacy: [0, Validators.required ]
    })
  }

  /**
   * Status Form
   */
  createMediaForm() {
    this.mediaForm = this.fb.group({
      title: ['Sample Title', Validators.required ],
      desc: ['Sample Description', Validators.required ],
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
   * Media Info Update
   */
  mediaInfoUpdate(value: any) {
    // 1. Get choosen file
    const chosenFile = this.editingFile;
    const chosenChannel = this.chosenChannel;
    // 2. Make choose a channel
    // 3. Link and upload
    const fileName = '';
    const repoPath = '';

    const media = [{
        fileName: this.editingFile.fileName,
        repoPath: this.editingFile.repoPath,
        mtype: 'image',
        contentType: 'image',
        title: value.title,
        description: value.desc,
        active: true,
        createdBy: this.handle,
        createdDate: '2017-08-23T09:50:12.48',
        lastUpdatedDate: '2017-08-23T09:50:12.48',
        count : {
          likes: [], shares: [], spots: [],
          channel: this.chosenChannel.spotfeedId
        }
    }];

    this.postMediaToChannel(chosenChannel.spotfeedId, media);
  }
  /**
   * Post Uploaded Medias to Channel
   */
  postMediaToChannel(channelId: string, req: any) {
    // http://devservices.greenroom6.com:9000/api/1.0/portal/network/spotfeed/x_c7a69091-750c-47ca-a87f-e751668301d6
    const headers = new Headers();
    const reqOptions = new RequestOptions({ headers: headers });

    headers.append('Authorization', 'Bearer ' + this.token);
    headers.append('Content-Type', 'application/json');

    const upload = {
      media: req
    };

    return this.http.put(`http://devservices.greenroom6.com:9000/api/1.0/portal/network/spotfeed/` + channelId, upload, reqOptions)
      .map((data: Response) => data.json())
      .subscribe(data => {
        console.log('saved?');
        console.log(data)
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
    const headers = new Headers();
    const reqOptions = new RequestOptions({ headers: headers });

    headers.append('Authorization', 'Bearer ' + this.token);
    headers.append('Content-Type', 'application/json');

    return this.http.post(`http://devservices.greenroom6.com:9000/api/1.0/portal/network/spotfeed/search`, req, reqOptions)
      .map((data: Response) => data.json())
      .subscribe(data => {
        this.channels = data;
      });
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
    this.chooseChannel = channel;
    this.chosenChannel = channel;
  }

  /**
   * File Details
   */

  fileDetails(file) {
    console.log('Clicked this file');
    console.log(file);

    this.editingFile = file;
    const fileType = this.getFileType(file.fileName)
    const leFile: Selection = {
      fileName: file.fileName,
      repoPath: file.repoPath,
      type: fileType
    };

    console.log(fileType);
    this.editingFile = leFile;
  }

  /**
   * Identify Group
   * @param files
   */
  getFileType(fileName: string) {
    const isImage = this.checkFileType(fileName, 'Image');
    const isVideo = this.checkFileType(fileName, 'Video');

    if (isImage) {
      return 'Image';
    }

    if (isVideo) {
      return 'Video';
    }
  }

  // multiple, return  File[]
  uploadFileList(files: File[]): void {
    if (!(files instanceof Array)) {
      this.alertError(files);
      return;
    }

    const filesList = [];

    if (files.length > 0) {
      this.hasFiles = true
    }
    // this.queue = files;

    this.Upload.upload({
      url: base,
      headers: { Authorization: 'Bearer ' + this.token },
      params: { handle: this.handle },
      files: files,
      process: true
    }).subscribe(
      (event: UploadEvent) => {
        if (event.status === UploadStatus.Uploading) {
          this.status = event.percent;
        }else {
          if (event.data) {
            this.uploaded = event.data['SUCCESS'];
          }
        }
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('complete');
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

