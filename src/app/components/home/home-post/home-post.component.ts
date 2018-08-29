import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';

import { ProfileActions } from '../../../actions/profile.action';
import { MediaActions } from '../../../actions/media.action';

@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.scss']
})
export class HomePostComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;
  tagState$: Observable<ProfileModal>;
  userProfile = initialTag ;
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

  constructor(
    public route: ActivatedRoute,
    private store: Store<ProfileModal>
  ) {
    this.tagState$ = this.store.select('profileTags');
    this.posts = [];
    this.subscription = this.tagState$.subscribe((state) => {
      this.userProfile = state;
      this.userData = state['profile_navigation_details']

      // User folling posts
      if (state.user_following_posts_loaded) {
        this.posts = this.userProfile.user_following_posts;
        this.post_scroll_id = state.user_following_post_scroll_id
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
    });
  }

  ngOnInit() {
    this.store.dispatch({ type: ProfileActions.TRENDING_POST });
  }

  postLoad() {
    const data = {
      limit: 10,
      scrollId: null
    }
    this.store.dispatch({ type: ProfileActions.LOAD_USER_FOLLOWING_POSTS, payload: data });
  }
  postDelete(post) {
    const index: number = this.posts.indexOf(post);
    if (index !== -1) {
      this.posts.splice(index, 1);
      const id = post.id;
      this.store.dispatch({ type: MediaActions.MEDIA_POST_DELETE, payload: id});
    }
  }
  onScroll(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 5000
      const data = {
        scrollId: this.post_scroll_id,
      }
      this.store.dispatch({ type: ProfileActions.LOAD_USER_FOLLOWING_POSTS, payload: data });
    }
  }

  // is spoted ture or false
  isSpoted(value) {
    const data = {
      'mediaType': value.mtype,
      'id': value.id
    }

    if (value.isSpotted === false) {
      this.store.dispatch({ type: MediaActions.MEDIA_SPOT, payload: data });
      this.store.dispatch({ type: ProfileActions.POST_SPOT, payload: value.id });
    } else {
      this.store.dispatch({ type: MediaActions.MEDIA_UNSPOT, payload: data });
      this.store.dispatch({ type: ProfileActions.POST_UNSPOT, payload: value.id });
    }
  }

  /**
   * Check if object is empty
   * @param obj
   */
    checkEmpty(obj: Object) {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
