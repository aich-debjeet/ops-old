import { Component, EventEmitter, Input, Output, OnInit, Inject, OnDestroy, ViewChild } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { DatePipe, PlatformLocation } from '@angular/common';
import { ISubscription } from 'rxjs/Subscription';
import { Modal } from '../../shared/modal-new/Modal';

import FilesHelper from '../../helpers/fileUtils';
import { initialMedia, Media } from '../../models/media.model';
import { MediaActions } from '../../actions/media.action';
import { ProfileActions } from '../../actions/profile.action';
import { CommunitiesActions } from '../../actions/communities.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { ModalService } from '../../shared/modal/modal.component.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  providers: [ ModalService, DatePipe ],
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnDestroy {
  @Input() mediaData;
  @Input() userData;
  @Input() className: string;
  @Input() postType: string;
  @Input() type: string;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() postDelete = new EventEmitter();
  @ViewChild('reportModal') reportModal: Modal;
  dotMenuState: boolean;
  private subscription: ISubscription;
  comments: any;
  following: boolean;
  followingCount: any;
  commentCount: any;
  mediaId: any;
  mediaType: any;
  mediaStore = initialMedia;
  mediaState$: Observable<Media>;
  reportId: string;
  userState$: Observable<any>;
  messageText: string;
  desText: string;
  isEdit: boolean;
  userImage: string;
  popupActive: boolean = false;

  imageLink: string = environment.API_IMAGE;
  questions: any;
  domainLink: string = environment.API_DOMAIN;
  messageEdit: string;

  constructor(
    private router: Router,
    private store: Store<Media>,
    platformLocation: PlatformLocation,
    public modalService: ModalService,
  ) {
    this.dotMenuState = false;
    this.mediaState$ = store.select('mediaStore');
  }

  ngOnInit() {
    if (!this.mediaData.ownerImage) {
      this.userImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
    } else {
      this.userImage = this.imageLink + this.mediaData.ownerImage;
    }

    this.following = this.mediaData.isSpotted;
    this.followingCount = this.mediaData.spotsCount;
    this.mediaId = this.mediaData.id;
    this.mediaType = this.mediaData.mtype;
    this.commentCount = this.mediaData.commentsCount;
    this.comments = this.mediaData.commentsList;
    this.desText = this.mediaData.description;
  }

  onContentEdit() {
    this.isEdit = true;
  }

  /**
   * Delete Media from Channel
   * @param event
   */
  deleteMedia(channel: any) {
  }

  handleClick(id) {
    this.router.navigateByUrl('/media/' + id);
  }

  checkFileType(fileName: string, fileType: string) {
    return FilesHelper.fileType(fileName, fileType);
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
      // this.following = true;
      // this.followingCount++;
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
      // this.following = false
      // this.followingCount--;
    }
  }

  /**
   * open report modal
  */
  reportModalOpen(id: string) {
    this.popupActive = true;
    this.reportModal.open();
    this.reportId = id;
    this.modalService.open('reportPopUp');
    this.store.dispatch({ type: MediaActions.MEDIA_POST_REPORT, payload: 'post' });
  }

  closeReport() {
    this.reportModal.close();
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
      // this.addNewComment();
      this.messageText = null;
    }
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  onContentSaved() {
    this.isEdit = false;
    // console.log(this.desText);
  }

}
