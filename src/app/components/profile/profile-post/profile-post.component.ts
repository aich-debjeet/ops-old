import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { Media, initialMedia } from '../../../models/media.model';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { MediaActions } from '../../../actions/media.action';

// rx
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { findIndex as _findIndex } from 'lodash';

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  providers: [ModalService, DatePipe],
  styleUrls: ['./profile-post.component.scss']
})
export class ProfilePostComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  baseUrl = environment.API_IMAGE;
  tagState$: Observable<ProfileModal>;
  private profSub: ISubscription;
  userMedia = initialTag;
  mediaDetails = initialMedia;
  userData: any;
  userName: any;
  handle: string;
  counter: number;
  posts: any;
  otherPost: boolean;
  isEmpty: boolean;
  sum = 10;
  page_start = 0;
  page_end = 20;
  total_pages = 10;
  scrolling = 0;
  scrollingLoad = 8000;
  post_scroll_id: any = '';
  isOwner: boolean;
  profiles = [];
  people_follow_id: any = '';
  scrollingPeople = 100;
  playingVideoId = '';

  constructor(
    public route: ActivatedRoute,
    private _store: Store<Media>
  ) {
    this.tagState$ = this._store.select('profileTags');
    this.counter = 0;
    this.posts = [];
    this.profSub = this.tagState$.subscribe((state) => {
      this.userData = state['profile_navigation_details']
      this.userMedia = state;
      this.posts = this.userMedia.user_posts;
      this.setMediaViewportKey();
      this.post_scroll_id = this.userMedia.user_post_scrollId
    });
  }

  ngOnInit() {
    this.page_start = 0;
    this.post_scroll_id = '';
    this.userType();
  }

  ngOnDestroy() {
    this.profSub.unsubscribe();
  }

  userType() {
    this._store.select('profileTags')
      .first(profile => profile['profile_user_info'] && profile['profile_navigation_details'].handle)
      .subscribe(data => {
        if (data['profile_user_info'].isCurrentUser === true) {
          const handle = this.userMedia.profile_navigation_details.handle;
          this.isOwner = true;
          this.postLoad(handle);
        }
      });

    this._store.select('profileTags')
      .first(profile => profile['profile_user_info'] && profile['profile_other'].handle)
      .subscribe(data => {
        if (data['profile_user_info'].isCurrentUser === false) {
          const handle = this.userMedia.profile_other.handle;
          this.isOwner = false;
          this.postLoad(handle);
        }
      });
  }

  onScroll(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 8000
      this.page_start = this.page_end + 1;
      this.page_end += 10;
      this.userType();
    }
  }

  postDelete(post) {
    const index: number = this.posts.indexOf(post);
    if (index !== -1) {
      this.posts.splice(index, 1);
      const id = post.id;
      this._store.dispatch({ type: MediaActions.MEDIA_POST_DELETE, payload: id });
    }
  }

  /**
   * Current User post load
   * @param handle User Handle
   */
  postLoad(handle) {
    const data = {
      limit: 20,
      scrollId: this.post_scroll_id,
      handle: handle,
    }
    this._store.dispatch({ type: ProfileActions.LOAD_USER_MEDIA, payload: data });
  }

  /**
   * Check Profile state
   */
  checkProfile() {
    this.route.parent.parent.params.subscribe(params => {
      if (params['id'] && params['id'] !== null && this.handle !== null) {
        this.userName = params['id'];
      }
    });
  }

  /**
   * Check if object is empty
   * @param obj
   */
  checkEmpty(obj: Object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  setMediaViewportKey() {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i]) {
        this.posts[i]['inViewport'] = false;
        this.posts[i]['hasPlayed'] = false;
      }
    }
  }

  elemInViewportStatus(data: any) {
    if (data && data.status && data.mediaId) {
      const medIndx = _findIndex(this.posts, { id: data.mediaId });
      if (medIndx) {
        if (data.status === 'reached') {
          if (this.posts[medIndx].inViewport === true && this.posts[medIndx].id === this.playingVideoId) { } else {
            if (this.posts[medIndx].hasPlayed === false) {
              for (let i = 0; i < this.posts.length; i++) {
                this.posts[i]['inViewport'] = false;
              }
              this.posts[medIndx].inViewport = true;
              this.posts[medIndx].hasPlayed = true;
              this.playingVideoId = this.posts[medIndx].id;
            }
          }
        } else if (data.status === 'departed') {
          this.posts[medIndx].inViewport = false;
        }
      }
    }
  }

}
