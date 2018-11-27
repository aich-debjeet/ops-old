import { Component, EventEmitter, Input, Output, OnInit, ViewChild } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
// import { ISubscription } from 'rxjs/Subscription';
import { Modal } from '../../shared/modal-new/Modal';

// import FilesHelper from '../../helpers/fileUtils';
import { initialMedia, Media } from '../../models/media.model';
import { MediaActions } from '../../actions/media.action';
import { ProfileActions } from '../../actions/profile.action';
import { CommunitiesActions } from '../../actions/communities.action';

import { SharedActions } from '../../actions/shared.action';
// rx
import { Store } from '@ngrx/store';

import { ModalService } from '../../shared/modal/modal.component.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  providers: [ ModalService, DatePipe ],
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

  imageLink: string = environment.API_IMAGE;
  domainLink: string = environment.API_DOMAIN;
  messageEdit: string;

  constructor(
    private router: Router,
    private store: Store<Media>,
    public modalService: ModalService,
  ) {
    this.dotMenuState = false;
  }

  ngOnInit() {
    if (!this.mediaData.ownerImage) {
      this.userImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
    } else {
      this.userImage = this.imageLink + this.mediaData.ownerImage;
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

  handleClick(id) {
    this.router.navigateByUrl('/media/' + id);
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

  onReachingInViewport(mediaId: any) {
    this.elemViewportStatus.emit({
      mediaId: mediaId,
      status: 'reached'
    });
  }

  onDepartedFromViewport(mediaId: any) {
    this.elemViewportStatus.emit({
      mediaId: mediaId,
      status: 'departed'
    });
  }

}
