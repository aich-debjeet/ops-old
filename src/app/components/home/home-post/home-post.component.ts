import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileModal, initialTag } from '../../../models/profile.model';

import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { ProfileActions } from '../../../actions/profile.action';
import { MediaActions } from '../../../actions/media.action';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.scss']
})
export class HomePostComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;
  tagState$: Observable<ProfileModal>;
  userProfile = initialTag ;
  isOwner: boolean;
  posts: any;
  page_start = 0;
  page_end = 30;
  handle: any;
  postsLoaded = false;
  sum = 10;
  total_pages = 10;
  scrolling = 0;
  scrollingLoad = 6000;
  post_scroll_id: any = '';
  imageLink: string = environment.API_IMAGE;
  
  constructor(
    private http: Http,
    public route: ActivatedRoute,
    private profileStore: Store<ProfileModal>
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    this.posts = [];
    this.subscription = this.tagState$.subscribe((state) => {
      this.userProfile = state;
      if (state.user_following_posts_loaded) {
        this.posts = this.userProfile.user_following_posts;
        this.post_scroll_id = state.user_following_post_scroll_id
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
  }

  postLoad() {
    // console.log('handle')
    const data = {
      // handle: handle,
      // page_start: this.page_start,
      // page_end: this.page_end
      limit: 10,
      // scrollId: this.post_scroll_id,
    }
    this.profileStore.dispatch({ type: ProfileActions.LOAD_USER_FOLLOWING_POSTS, payload: data });
  }
  postDelete(post) {
    const index: number = this.posts.indexOf(post);
    if (index !== -1) {
      this.posts.splice(index, 1);
      const id = post.id;
      this.profileStore.dispatch({ type: MediaActions.MEDIA_POST_DELETE, payload: id});
    }
  }
  onScroll(e) {
    // console.log(e)
    this.scrolling = e.currentScrollPosition;
    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 6000
      // this.page_start = this.page_start + 30;
      // this.page_end = 30;
      // this.postLoad();
      const data = {
        // handle: handle,
        // page_start: this.page_start,
        // page_end: this.page_end
        // limit: 10,
        scrollId: this.post_scroll_id,
      }
      this.profileStore.dispatch({ type: ProfileActions.LOAD_USER_FOLLOWING_POSTS, payload: data });
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
