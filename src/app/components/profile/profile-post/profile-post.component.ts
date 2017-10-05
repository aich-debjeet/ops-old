import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { Media, initialMedia  } from '../../../models/media.model';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
// action
import { ProfileActions } from '../../../actions/profile.action';
import { MediaActions } from '../../../actions/media.action';
import { SharedActions } from '../../../actions/shared.action';
import { environment } from '../../../../environments/environment';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  providers: [ModalService, DatePipe],
  styleUrls: ['./profile-post.component.scss']
})
export class ProfilePostComponent implements OnInit {

  tagState$: Observable<ProfileModal>;
  mediaState$: Observable<Media>;
  private tagStateSubscription: Subscription;
  userMedia = initialTag;
  mediaDetails = initialMedia;
  sub: any;
  userName: any;
  handle: string;
  counter: number;
  posts: any;
  isEmpty: boolean;
  constructor(
    private http: Http,
    private _router: Router,
    public route: ActivatedRoute,
    private modalService: ModalService,
    private _store: Store<Media>
  ) {
    this.tagState$ = this._store.select('profileTags');
    // this.mediaState$ = this._store.select('mediaStore');
    this.counter = 0;
    this.posts = [];
    this.tagState$.subscribe((state) => {
      this.userMedia = state;
      this.userFlag(state);
    });
  }

  ngOnInit() {
  }

  /**
   * Check Profile state
   */
  checkProfile() {
    this.sub = this.route.parent.parent.params.subscribe(params => {
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

  /**
   * Check if current user or other profile
   * @param userName
   */
  userFlag(state) {
    this.sub = this.route.parent.parent.params.subscribe(params => {
      if (this.checkEmpty(params)) {
        this.loadOtherProfile(true);
      } else {
        this.userName = params['id'];
        this.loadOtherProfile(false);
      }
    });
  }

  /**
   * Load Other Profile Related Data
   */
  loadOtherProfile(isOwn: boolean = false) {
    let isProfileReady;
    let isChannelReady;
    let shouldLoad = false;
    // Check
    if (isOwn) {
      isProfileReady = this.userMedia.profile_loaded;
      isChannelReady = this.userMedia.user_posts_loaded;
      // handleID = this.userMedia.profileDetails.handle;
    } else {
      isProfileReady = this.userMedia.profile_other_loaded;
      isChannelReady = (this.userName === this.userMedia.profile_other['extra']['username']);
    }

    // If loaded posts and the profile are different
    if ( isProfileReady && isChannelReady ) {
      // get current handle
      const mHandleID = this.userMedia.profileDetails.handle;
      if (this.userMedia.user_posts.length > 0 ) {
        let handleA = this.userMedia.user_posts[0].ownerHandle || '';
        let handleB = mHandleID;
        if (handleA !== handleB) {
          shouldLoad = true;
        }
      }
    }

    // Check if the other profile is loaded; also make sure the activated route is not current user
    if ( isChannelReady === false && isProfileReady === true) {
      let handleID;
      if (isOwn) {
        handleID = this.userMedia.profileDetails.handle;
      } else {
        handleID = this.userMedia.profile_other.handle;
      }

      this.counter++;

      if (this.counter < 10 && handleID) {
        this._store.dispatch({ type: ProfileActions.LOAD_USER_MEDIA, payload: handleID });
      }
    }

    // Assign channel data to general list
    if ( isChannelReady === true ) {
      this.posts = this.userMedia.user_posts;
      if (this.posts.length > 0 ) {
        this.isEmpty = false;
      } else {
        this.isEmpty = true;
      }
    }
  }

}
