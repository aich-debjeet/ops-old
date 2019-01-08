import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';

import { ProfileActions } from '../../../actions/profile.action';
import { MediaActions } from '../../../actions/media.action';
import { findIndex as _findIndex } from 'lodash';
import { Modal } from 'app/shared/modal-new/Modal';

@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.scss']
})
export class HomePostComponent implements OnInit, OnDestroy {

  private profSub: ISubscription;
  tagState$: Observable<ProfileModal>;
  userProfile = initialTag;
  trendingPost: any;
  isOwner: boolean;
  posts: any;
  page_start = 0;
  page_end = 30;
  handle: any;
  postsLoaded = false;
  sum = 10;
  total_pages = 10;
  scrolling = 0;
  scrollingLoad = 5000;
  post_scroll_id: any = '';
  imageLink: string = environment.API_IMAGE;
  userData: any;
  playingVideoId = '';
  sponsoredList = [];
  spottedUsers: any[];
  spottedUsersParams = {
    mediaId: '',
    mediaType: '',
    offset: 0,
    limit: 20
  };
  isLoadingSpottedUsers = true;

  @ViewChild('spottedUsersModal') spottedUsersModal: Modal;

  constructor(
    public route: ActivatedRoute,
    private store: Store<ProfileModal>
  ) {
    this.tagState$ = this.store.select('profileTags');
    this.posts = [];
    this.profSub = this.tagState$.subscribe((state) => {
      this.userProfile = state;
      this.userData = state['profile_navigation_details']

      if (state && state.sponsoredList) {
        this.sponsoredList = state.sponsoredList;
      }

      // User folling posts
      if (state.user_following_posts_loaded) {
        this.posts = this.userProfile.user_following_posts;
        this.post_scroll_id = state.user_following_post_scroll_id;
        this.setMediaViewportKey();
      }

      // Trending post state
      if (state['trending_post']) {
        this.trendingPost = state['trending_post']
      }

      if (state['profile_navigation_details'].handle) {
        this.handle = this.userProfile.profile_navigation_details.handle;
        this.isOwner = true;
        if (this.handle && !this.postsLoaded) {
          this.postsLoaded = true;
          this.postLoad();
        }
      }

      if (state['loadingSpottedUsers'] === false && state['loadedSpottedUsers'] === true) {
        if (this.spottedUsersParams.offset === 0) {
          this.isLoadingSpottedUsers = false;
        }
        this.spottedUsers = state['spottedUsersList'];
      }
      if (state['loadingSpottedUsers'] === true && state['loadedSpottedUsers'] === false) {
        if (this.spottedUsersParams.offset === 0) {
          this.isLoadingSpottedUsers = true;
        }
      }
    });
  }

  ngOnInit() {
    this.store.dispatch({ type: ProfileActions.TRENDING_POST });
  }

  postLoad() {
    const data = {
      limit: 12,
      scrollId: null,
      sponsoredList: this.sponsoredList
    }
    this.store.dispatch({ type: ProfileActions.LOAD_USER_FOLLOWING_POSTS, payload: data });
  }
  postDelete(post) {
    const index: number = this.posts.indexOf(post);
    if (index !== -1) {
      this.posts.splice(index, 1);
      const id = post.id;
      this.store.dispatch({ type: MediaActions.MEDIA_POST_DELETE, payload: id });
    }
  }
  onScroll(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 5000
      const data = {
        scrollId: this.post_scroll_id,
        sponsoredList: this.sponsoredList
      }
      this.store.dispatch({ type: ProfileActions.LOAD_USER_FOLLOWING_POSTS, payload: data });
    }
  }

  // is spoted ture or false
  spotAction(value) {
    const data = {
      'mediaType': value.mtype,
      'id': value.id
    }

    if (value.isSpotted === false) {
      this.store.dispatch({ type: MediaActions.MEDIA_SPOT, payload: data });
      this.store.dispatch({ type: ProfileActions.PROFILE_MEDIA_SPOT, payload: data });
    } else {
      this.store.dispatch({ type: MediaActions.MEDIA_UNSPOT, payload: data });
      this.store.dispatch({ type: ProfileActions.PROFILE_MEDIA_UNSPOT, payload: data });
    }
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

  ngOnDestroy() {
    this.profSub.unsubscribe();
  }

  loadSpottedUsers(data) {
    this.spottedUsersParams.mediaType = data['mediaType'];
    this.spottedUsersParams.mediaId = data['mediaId'];
    this.spottedUsersParams.offset = 0;
    this.spottedUsersModal.open();
    this.fetchSpottedUsers();
  }

  fetchSpottedUsers() {
    this.store.dispatch({ type: ProfileActions.GET_MEDIA_SPOTTED_USERS, payload: this.spottedUsersParams });
  }

  loadMoreSpottedUsers() {
    this.spottedUsersParams.offset += this.spottedUsersParams.limit;
    this.fetchSpottedUsers();
  }

  followActionListen(data: any) {
    if (data && data.action) {
      if (data.action === 'follow') {
        this.store.dispatch({ type: ProfileActions.PROFILE_FOLLOW, payload: data.handle });
      } else {
        this.store.dispatch({ type: ProfileActions.PROFILE_UNFOLLOW, payload: data.handle });
      }
    }
  }

  spottedUsersModalClosed() {
    this.store.dispatch({ type: ProfileActions.CLEAR_SPOTTED_USERS });
  }

}
