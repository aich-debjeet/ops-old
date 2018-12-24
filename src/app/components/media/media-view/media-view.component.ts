import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { MediaActions } from '../../../actions/media.action';
import { ProfileActions } from '../../../actions/profile.action';
import { initialMedia, Media } from '../../../models/media.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { UtcDatePipe } from './../../../pipes/utcdate.pipe';
import { BookmarkActions } from 'app/actions/bookmark.action';
import { GeneralUtilities } from 'app/helpers/general.utils';

@Component({
  selector: 'app-media-view',
  templateUrl: './media-view.component.html',
  providers: [ModalService, UtcDatePipe],
  styleUrls: ['./media-view.component.scss']
})

export class MediaViewComponent implements OnDestroy {
  imageLink: string = environment.API_IMAGE;
  chosenChannel: any = 0;
  @Input() userChannels;
  @Input() profileImage;
  @Output() onComment: EventEmitter<any> = new EventEmitter<any>();
  @Output() onMediaNext: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('firstModal') modal: any;
  domainLink: string = environment.API_DOMAIN;
  private mediaSub: Subscription;
  private profSub: Subscription;
  mediaState$: Observable<Media>;
  userState$: Observable<any>;
  mediaStore = initialMedia;
  mediaId: string;
  mediaType: string;
  data: any;
  comments: any;
  message: boolean;
  channelId: string;
  deleteMsg: boolean;
  isEdit: boolean;
  editMsg: boolean;
  mediaCarousal: any = { prev: '', next: '' };
  userData: any;
  viewCounted = false;
  commentsLoading: boolean;
  commentsLoaded: boolean;
  isMediaOwner: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private store: Store<Media>,
    private gUtils: GeneralUtilities
  ) {
    this.mediaState$ = store.select('mediaStore');
    this.mediaSub = this.mediaState$.subscribe((state) => {
      this.mediaStore = state;
      this.channelId = this.mediaStore.channel_detail['channelId']
      this.data = this.mediaStore.media_detail;
      if (this.gUtils.checkNestedKey(state, ['media_detail', 'ownerHandle']) && typeof this.isMediaOwner === 'undefined') {
        const handle = localStorage.getItem('loggedInProfileHandle');
        if (handle === this.mediaStore.media_detail.ownerHandle) {
          this.isMediaOwner = true;
        } else {
          this.isMediaOwner = false;
        }
      }
      this.mediaType = this.mediaStore.media_detail.mtype;
      this.mediaId = this.mediaStore.media_detail.id;
      if (state.media_comments_loading === true && state.media_comments_loaded === false) {
        this.commentsLoading = true;
        this.commentsLoaded = false;
      }
      if (state.media_comments_loading === false && state.media_comments_loaded === true) {
        this.commentsLoading = false;
        this.commentsLoaded = true;
      }
      if (!this.viewCounted && this.mediaId && typeof this.isMediaOwner !== 'undefined' && this.isMediaOwner === false) {
        const data = {
          contentType: 'media',
          contentId: this.mediaId
        }
        this.store.dispatch({ type: MediaActions.MEDIA_ADD_VIEW_COUNT, payload: data });
        this.viewCounted = true;
      }
      this.comments = this.mediaStore.media_comment;
      if (state['media_carousel']) {
        this.mediaCarousal = state['media_carousel'];
      }

      if (state['media_edit_msg'] && this.editMsg) {
        this.store.dispatch({ type: MediaActions.GET_CHANNEL_DETAILS, payload: this.channelId });
        this.toastr.success('Post Edited', '', {
          timeOut: 2000
        });
        // this.doClose();
        this.editMsg = false;
      }
    });

    this.userState$ = this.store.select('profileTags');
    this.profSub = this.userState$.subscribe((state) => {
      this.userData = state['profile_navigation_details']
    });

    store.select('mediaStore').take(6).subscribe((state) => {
      if (state['media_delete_msg'] && this.deleteMsg) {
        this.store.dispatch({ type: MediaActions.GET_CHANNEL_DETAILS, payload: this.channelId });
        this.toastr.warning('Post Deleted', '', {
          timeOut: 2000
        });
        this.doClose();
        this.deleteMsg = false;
      }
    });
    this.loadMedia();
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
    this.profSub.unsubscribe();
  }

  closeFunction() {
    this.doClose();
  }

  mediaNext(value) {
    this.onMediaNext.emit(value);
  }

  checkEmpty(obj: Object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  /**
   * Load Particular Media
   */
  loadMedia() {
    this.route.params.subscribe(params => {
      if (!this.checkEmpty(params)) {
        this.store.dispatch({ type: MediaActions.MEDIA_DETAILS, payload: params['id'] });
        // comment fetch
        const send = {
          'media_id': params['id'],
          'commentType': this.mediaType
        }
        this.store.dispatch({ type: MediaActions.MEDIA_COMMENT_FETCH, payload: send });

        const body = {
          'mediaId': params['id']
        }
        this.store.dispatch({ type: MediaActions.MEDIA_NEXT, payload: body });
      }
    });
  }

  navToprofile() {
    this.router.navigate(['/profile'], { skipLocationChange: false });
  }
  /**
   * Spot a Media
   * @param mediaId
   */
  spotMedia(value: string) {
    const data = {
      mediaType: value['mtype'],
      id: value['id']
    }
    if (this.gUtils.checkNestedKey(this.mediaStore, ['media_detail', 'isSpotted']) && this.mediaStore['media_detail']['isSpotted'] === false) {
      this.store.dispatch({ type: MediaActions.MEDIA_SPOT, payload: data });
      this.store.dispatch({ type: ProfileActions.PROFILE_MEDIA_SPOT, payload: data });
    } else {
      this.store.dispatch({ type: MediaActions.MEDIA_UNSPOT, payload: data });
      this.store.dispatch({ type: ProfileActions.PROFILE_MEDIA_UNSPOT, payload: data });
    }
  }

  /**
   * Close
   */
  doClose() {
    this.router.navigate(['.', { outlets: { media: null } }], {
      relativeTo: this.route.parent
    });
  }

  deletePost(data) {
    this.deleteMsg = true;
    if (data.id !== 'undefined') {
      const id = data.id;
      this.store.dispatch({ type: MediaActions.MEDIA_POST_DELETE, payload: id });
    }
  }

  onContentEdit() {
    this.isEdit = true;
  }

  saveContentUpdate(message) {
    this.isEdit = false;
    this.editMsg = true;
    const data = {
      'id': this.data.id,
      'description': message
    }
    this.store.dispatch({ type: MediaActions.MEDIA_EDIT, payload: data });
  }


  onCancelEdit() {
    this.isEdit = false;
  }

  bookmarkAction(action: string, mediaDetails: any) {
    if (action === 'add') {
      const reqBody = {
        bookmarkType: mediaDetails['mtype'],
        contentId: mediaDetails['id']
      };
      this.store.dispatch({ type: BookmarkActions.BOOKMARK, payload: reqBody });
      const bookmarkSub = this.store.select('bookmarkStore')
        .take(2)
        .subscribe(data => {
          if (data['bookmarking'] === false && data['bookmarked'] === true) {
            this.toastr.success('Bookmarked successfully', 'Success!');
            this.store.dispatch({ type: MediaActions.MEDIA_BOOKAMRK_FLAG_UPDATE, payload: { isBookmarked: true } });
            bookmarkSub.unsubscribe();
          }
        });
    } else {
      const reqBody = {
        type: mediaDetails['mtype'],
        id: mediaDetails['id']
      };
      this.store.dispatch({ type: BookmarkActions.DELETE_BOOKMARK, payload: reqBody });
      const bookmarkSub = this.store.select('bookmarkStore')
        .take(2)
        .subscribe(data => {
          if (data['deletingBookmark'] === false && data['deletedBookmark'] === true) {
            this.toastr.success('Bookmark deleted successfully', 'Success!');
            this.store.dispatch({ type: MediaActions.MEDIA_BOOKAMRK_FLAG_UPDATE, payload: { isBookmarked: false } });
            bookmarkSub.unsubscribe();
          }
        });
    }
  }
}
