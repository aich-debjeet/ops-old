import { Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { ModalService } from '../../../shared/modal/modal.component.service';

// Action
import { MediaActions } from '../../../actions/media.action';
import { ProfileActions } from '../../../actions/profile.action';
import { initialMedia, Media } from '../../../models/media.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import { UtcDatePipe } from './../../../pipes/utcdate.pipe';
import { BookmarkActions } from 'app/actions/bookmark.action';

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
  messageText: string;
  private mediaSub: Subscription;
  private profSub: Subscription;
  mediaState$: Observable<Media>;
  userState$: Observable<any>;
  mediaStore = initialMedia;
  mediaId: string;
  mediaType: string;
  sub: any;
  data: any;
  comments: any;
  commentCount: number;
  spot: boolean;
  spotCount: number;
  message: boolean;
  channelId: string;
  deleteMsg: boolean;
  isEdit: boolean;
  editMsg: boolean;
  mediaCarousal: any = { prev: '', next: '' };
  userData: any;
  viewCounted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private store: Store<Media>
  ) {
    this.spot = false;
    this.mediaState$ = store.select('mediaStore');

    this.mediaSub = this.mediaState$.subscribe((state) => {
      this.mediaStore = state;
      this.channelId = this.mediaStore.channel_detail['channelId']
      this.data = this.mediaStore.media_detail;
      this.spotCount = this.mediaStore.media_detail.spotsCount;
      this.mediaType = this.mediaStore.media_detail.mtype;
      this.mediaId = this.mediaStore.media_detail.id;
      if (!this.viewCounted && this.mediaId) {
        const data = {
          contentType: 'media',
          contentId: this.mediaId
        }
        this.store.dispatch({ type: MediaActions.MEDIA_ADD_VIEW_COUNT, payload: data });
        this.viewCounted = true;
      }
      this.spot = this.mediaStore.media_detail.isSpotted;
      this.comments = this.mediaStore.media_comment;
      if (state['media_carousel']) {
        this.mediaCarousal = state['media_carousel'];
      }

      if (state['media_edit_msg'] && this.editMsg) {
        this.store.dispatch({ type: MediaActions.GET_CHANNEL_DETAILS, payload: this.channelId });
        this.toastr.success('Post Edited', '', {
          timeOut: 2000
        });
        this.doClose();
        this.editMsg = false;
      }
    });

    this.userState$ = this.store.select('profileTags');
    this.profSub = this.userState$.subscribe((state) => {
      this.userData = state['profile_navigation_details']
    });

    store.select('mediaStore').take(6).subscribe((state) => {
      this.commentCount = this.mediaStore.media_detail.commentsCount;
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
    this.sub = this.route.params.subscribe(params => {
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
      'mediaType': value['mtype'],
      'id': value['id']
    }
    this.spot = !this.spot;
    if (this.spot === true) {
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
    // console.log('event', event)
    this.router.navigate(['.', { outlets: { media: null } }], {
      relativeTo: this.route.parent
    });
  }

  deletePost(data) {
    this.deleteMsg = true;
    // console.log('data', data)
    if (data.id !== 'undefined') {
      const id = data.id;
      // console.log('channelid', this.channelId)
      this.store.dispatch({ type: MediaActions.MEDIA_POST_DELETE, payload: id });
    }
  }

  onContentEdit() {
    this.isEdit = true;
  }

  onCommentEdit(message) {
    this.isEdit = false;
    this.editMsg = true;
    // console.log('comment', '+ message', message)
    const data = {
      'id': this.data.id,
      'description': message
    }
    // console.log(data)
    this.store.dispatch({ type: MediaActions.MEDIA_EDIT, payload: data });
  }

  bookmarkMedia(mediaDetails) {
    const reqBody = {
      bookmarkType: mediaDetails['mtype'],
      contentId: mediaDetails['id']
    };
    this.store.dispatch({ type: BookmarkActions.BOOKMARK, payload: reqBody });
    this.store.select('bookmarkStore')
     .take(2)
     .subscribe(data => {
       if (data['bookmarking'] === false && data['bookmarked'] === true) {
        this.toastr.success('Bookmarked successfully', 'Success!');
       }
     });
  }
}
