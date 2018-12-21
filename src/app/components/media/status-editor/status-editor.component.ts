import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';
import { Store } from '@ngrx/store';
import { ProfileModal, UserCard } from '../../../models/profile.model';
import FilesHelper from '../../.../../../helpers/fileUtils';
import { TokenService } from '../../../helpers/token.service';
import { ToastrService } from 'ngx-toastr';
import { remove as _remove, merge as _merge, uniqBy as _uniqBy, flatten, findIndex as _findIndex } from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import { GeneralUtilities } from 'app/helpers/general.utils';
import { ProfileActions } from 'app/actions/profile.action';
import { Router } from '@angular/router';

export class UploadItem {
  fileName: string;
  repoPath: string;
  type?: string;
}

const mediaUploadApiEndpoint = environment.API_ENDPOINT + '/portal/cdn/media/upload/multiple';

@Component({
  selector: 'app-status-editor',
  templateUrl: './status-editor.component.html',
  styleUrls: ['./../media-selector/media-selector.component.scss']
})

export class StatusEditorComponent implements OnInit {
  uploadedFiles: UploadItem[] = [];
  editingFile: UploadItem;
  status: number;
  files: any;
  // temp
  handle: string;
  token: string;
  uploadStatus: number;
  tags: any;
  baseUrl = environment.API_IMAGE;
  desc: string;
  industries: any[];

  profileState$: Observable<ProfileModal>;
  myProfile$: Observable<any>;
  loginTagState$: Observable<any>;
  myProfileData: any;
  fileFormData: any;
  activeUser: UserCard;
  cards = [];

  // Form Values
  mediaPrivacy: number;
  license: string;
  isNSFW: boolean;
  eventName: string;
  previewUrl: any[];
  external_post_active = false;
  postSubmiting = false;

  constructor(
    private Upload: NgxfUploaderService,
    private router: Router,
    private api: TokenService,
    private toastr: ToastrService,
    private gUtils: GeneralUtilities,
    private _store: Store<any>
  ) {
    this.cards = [];

    this.editingFile = new UploadItem;
    this.uploadedFiles = [];

    // Default Form Values
    this.license = 'none';
    this.mediaPrivacy = 0;
    this.isNSFW = false;

    this.uploadStatus = 0;
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
    this.myProfile$.subscribe(event => {
      if (typeof event !== 'undefined') {
        this.myProfileData = event;

        const activeUser = event.profile_cards.active;
        this.activeUser = activeUser;

        let isUserReady;
        if (event.profile_navigation_details && event.profile_navigation_details.handle) {
          this.handle = event.profile_cards.active.handle;
          isUserReady = true;
        }
      }
    });
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
      (err) => { }, () => { });
  }

  updateProgress(files, percentage) {
    const index = _findIndex(this.cards, files);
    this.cards[index]['pre'] = percentage;
  }

  fileUploadDone(files, percentage) {
    const index = _findIndex(this.cards, files);
    this.cards[index]['repoPath'] = percentage;
  }

  publishPost() {
    const multipleMedias = [];
    // const chosenFile = this.editingFile;
    const userHandle = localStorage.getItem('loggedInProfileHandle') || '';

    for (const nowFile of this.uploadedFiles) {
      if (nowFile) {
        // Build Media Object
        const mediaItem = this.formatMedia(nowFile, this.desc, userHandle, '1');
        const media = [mediaItem];
        multipleMedias.push(mediaItem);
      }
    }

    let reqBody;
    if (multipleMedias.length > 0) {
      reqBody = {
        media: multipleMedias
      };
    } else {
      reqBody = {
        feed: [{
          access: 0,
          active: true,
          description: this.desc,
          feed_type: 'status',
          owner: userHandle,
          title: ''
        }]
      };
    }

    this._store.dispatch({ type: ProfileActions.POST_STATUS, payload: reqBody });
    this._store.select('profileTags')
      .first(media => media['postedStatus'] === true)
      .subscribe(data => {
        this.toastr.success('Your media has been successfully posted to your activity feed', 'Upload', {
          timeOut: 3000
        });
        this.router.navigate(['/profile/user/post']);
      });
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
   * File Details
   */

  fileDetails(file) {
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
  formatMedia(file: any, desc: any, handle: string, privacy: string) {
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
      description: desc,
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
        channel: ''
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
}
