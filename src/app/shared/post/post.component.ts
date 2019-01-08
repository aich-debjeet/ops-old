import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Modal } from '../../shared/modal-new/Modal';
import { initialMedia, Media } from '../../models/media.model';
import { MediaActions } from '../../actions/media.action';
import { ProfileActions } from '../../actions/profile.action';
import { CommunitiesActions } from '../../actions/communities.action';
import { SharedActions } from '../../actions/shared.action';
import { Store } from '@ngrx/store';
// import { GeneralUtilities } from 'app/helpers/general.utils';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() mediaData;
  @Input() userData;
  @Input() className: string;
  @Input() postType: string;
  @Input() type: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() postDelete = new EventEmitter();
  @Output() elemViewportStatus = new EventEmitter();
  @ViewChild('reportModal') reportModal: Modal;
  dotMenuState: boolean;
  comments: any;
  following: boolean;
  mediaId: any;
  mediaType: any;
  mediaStore = initialMedia;
  reportId: string;
  messageText: string;
  desText: string;
  isEdit: boolean;
  userImage: string;
  isMediaOwner: boolean;

  imageLink: string = environment.API_IMAGE;
  domainLink: string = environment.API_DOMAIN;
  messageEdit: string;
  spottedPeople = [];

  constructor(
    private store: Store<Media>,
    // public gUtils: GeneralUtilities
  ) {
    this.dotMenuState = false;
    this.spottedPeople = ['Name1', 'Name2', 'Name3', 'Name4']; // dummy for HTML to show
  }

  ngOnInit() {
    if (!this.mediaData.ownerImage) {
      this.userImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
    } else {
      this.userImage = this.imageLink + this.mediaData.ownerImage;
    }
    if (this.mediaData.ownerHandle && typeof this.isMediaOwner === 'undefined') {
      const handle = localStorage.getItem('loggedInProfileHandle');
      if (handle === this.mediaData.ownerHandle) {
        this.isMediaOwner = true;
      } else {
        this.isMediaOwner = false;
      }
    }
    this.following = this.mediaData.isSpotted;
    this.mediaId = this.mediaData.id;
    this.mediaType = this.mediaData.mtype;
    this.comments = this.mediaData.commentsList;
    this.desText = this.mediaData.description;
  }

  onContentEdit() {
    this.isEdit = true;
  }

  dotMenuOpen() {
    this.dotMenuState = !this.dotMenuState;
  }

  onContentDelete(content) {
    this.postDelete.next(content);
    if (this.postType === 'community') {
      this.store.dispatch({ type: CommunitiesActions.COMMUNTIY_DELETE_COUNT });
    }
  }

  /**
   * Spot a Media
   * @param mediaId
   */
  spotMedia(media: any) {
    const data = {
      'mediaType': media['mtype'],
      'id': media['id'],
      'isOwner': media['isOwner']
    }
    if (this.following === false) {
      if (this.postType === 'community') {
        this.store.dispatch({ type: MediaActions.MEDIA_SPOT, payload: data });
        this.store.dispatch({ type: CommunitiesActions.MEDIA_SPOT, payload: data });
        return
      }
      this.store.dispatch({ type: MediaActions.MEDIA_SPOT, payload: data });
      this.store.dispatch({ type: ProfileActions.PROFILE_MEDIA_SPOT, payload: data });
    } else {
      if (this.postType === 'community') {
        this.store.dispatch({ type: MediaActions.MEDIA_UNSPOT, payload: data });
        this.store.dispatch({ type: CommunitiesActions.MEDIA_UNSPOT, payload: data });
        return
      }
      this.store.dispatch({ type: MediaActions.MEDIA_UNSPOT, payload: data });
      this.store.dispatch({ type: ProfileActions.PROFILE_MEDIA_UNSPOT, payload: data });
    }
  }

  /**
   * method to open report pop-up with options for post
   * @param id to open specific report model
   */
  reportModalOpen(id: string) {
    this.reportModal.open();
    this.reportId = id;
    this.store.dispatch({ type: SharedActions.GET_OPTIONS_REPORT, payload: 'post' });
  }

  /**
   * Submit Comment
   */
  keyDownFunction(mediaId: string) {
    if (this.messageText !== null || this.messageText !== '') {
      const send = {
        'content': this.messageText,
        'commentType': this.mediaType,
        'parent': mediaId
      }
      this.store.dispatch({ type: MediaActions.POST_COMMENT, payload: send});
      this.messageText = null;
    }
  }

  onContentSaved() {
    this.isEdit = false;
  }

  onCancelEdit() {
    this.isEdit = false;
  }

  saveContentUpdate(text: string) {
    this.isEdit = false;
    const data = {
      id: this.mediaId,
      description: text,
      mType: this.mediaType
    }
    console.log(data)
    this.store.dispatch({ type: MediaActions.MEDIA_EDIT, payload: data });
  }

  onReachingInViewport(mediaId: any) {
    this.elemViewportStatus.emit({ mediaId: mediaId, status: 'reached' });
    // this.gUtils.filter({ component: 'VideplayerComponent', action: 'playVideo' });
  }

  onDepartedFromViewport(mediaId: any) {
    this.elemViewportStatus.emit({ mediaId: mediaId, status: 'departed' });
    // this.gUtils.filter({ component: 'VideplayerComponent', action: 'stopVideo' });
  }

  markMediaAsViewed(mediaId: string) {
    // if (mediaId && !this.isMediaOwner) {
    //   const data = {
    //     contentType: 'media',
    //     contentId: mediaId
    //   }
    //   this.store.dispatch({ type: MediaActions.MEDIA_ADD_VIEW_COUNT, payload: data });
    // }
  }

}



