import { Component, OnInit } from '@angular/core';
import { ProfileModal, initialTag } from '../../../models/profile.model';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { ProfileActions } from '../../../actions/profile.action';
import { MediaActions } from '../../../actions/media.action';

@Component({
  selector: 'app-home-post',
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.scss']
})
export class HomePostComponent implements OnInit {

  tagState$: Observable<ProfileModal>;
  userProfile = initialTag ;
  isOwner: boolean;
  posts: any;
  page_start = 0;
  page_end = 20;
  handle: any;
  postsLoaded = false;
  sum = 10;
  total_pages = 10;
  scrolling = 0;
  scrollingLoad = 8000;

  constructor(
    private http: Http,
    public route: ActivatedRoute,
    private profileStore: Store<ProfileModal>
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    this.posts = [];
    this.tagState$.subscribe((state) => {
      this.userProfile = state;
       this.posts = this.userProfile.user_following_posts;
       console.log(this.posts)
    });
  }

  ngOnInit() {
    this.tagState$ = this.profileStore.select('profileTags')
    this.tagState$.subscribe((state) => {
      this.userProfile = state;
      console.log('state', state)
      if (state['profile_navigation_details'].handle) {
        this.handle = this.userProfile.profile_navigation_details.handle;
        console.log(this.handle)
         this.isOwner = true;
        // this.posts = [];
        if (this.handle && !this.postsLoaded) {
          this.postsLoaded = true;
          this.postLoad(this.handle);
        }
      }
      // if (state['user_following_posts']) {
      //   this.posts = this.userProfile.user_following_posts;
      //   console.log(this.posts)
      // }
    });
  }

  postLoad(handle) {
    const data = {
      handle: handle,
      page_start: this.page_start,
      page_end: this.page_end
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

        this.scrolling = e.currentScrollPosition;
        if (this.scrollingLoad <= this.scrolling) {
          this.scrollingLoad += 8000
          this.page_start = this.page_end + 1;
          this.page_end += 10;
          this.postLoad(this.handle);
        }
      }
/**
   * Check if object is empty
   * @param obj
   */
      checkEmpty(obj: Object) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
      }

}
