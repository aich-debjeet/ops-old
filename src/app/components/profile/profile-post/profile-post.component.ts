import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store, Action } from '@ngrx/store';
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
import { Subscription, ISubscription } from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';

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
  mediaState$: Observable<Media>;
  private subscription: ISubscription;
  userMedia = initialTag;
  mediaDetails = initialMedia;
  sub: any;
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
  isOwner: boolean;
  profiles = [];
  people_follow_id: any = '';
  scrollingPeople = 100;

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
    this.subscription = this.tagState$.subscribe((state) => {
      this.userMedia = state;
       this.posts = this.userMedia.user_posts;
        if (state['user_profiles_all_prof'] !== 'undefined') {
          this.profiles = state.user_profiles_all_prof;
        }
        if (state.user_profiles_all_loaded_prof) {
          this.people_follow_id = state.people_follow_scroll_id_prof
        }
    });
    // const timer = Rx.Observable.timer(5000);

    // this._store.select('profileTags').take(8).last().subscribe( data => {
    //     this.userType();
    // });

    // this._store.select('profileTags')
    //   .first(profile => profile['profile_other_loaded'] === true )
    //   .subscribe( data => {
    //      this.userType();
    //   });

  }

  ngOnInit() {
    this.userType();
  }
  ngAfterViewInit() {
    this.loadProfiles();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  userType() {

    this._store.select('profileTags')
      .first(profile => profile['profile_user_info'] && profile['profile_navigation_details'].handle)
      .subscribe( data => {
        if (data['profile_user_info'].isCurrentUser === true) {
          const handle = this.userMedia.profile_navigation_details.handle;
          this.isOwner = true;
          this.posts = [];
          this.postLoad(handle);
        }
      });

    this._store.select('profileTags')
      .first(profile => profile['profile_user_info'] && profile['profile_other'].handle )
      .subscribe( data => {
        if (data['profile_user_info'].isCurrentUser === false) {
          const handle = this.userMedia.profile_other.handle;
          this.isOwner = false;
          this.posts = [];
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
      this._store.dispatch({ type: MediaActions.MEDIA_POST_DELETE, payload: id});
    }
  }

  /**
   * Current User post load
   * @param handle User Handle
   */
  postLoad(handle) {
    const data = {
      handle: handle,
      page_start: this.page_start,
      page_end: this.page_end
    }
    this._store.dispatch({ type: ProfileActions.LOAD_USER_MEDIA, payload: data });
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
   * Follow an artist
   * @param user obj
   */
  followUser(user: any) {
    this._store.dispatch({ type: ProfileActions.PROFILE_FOLLOW, payload: user.handle });
    user.extra.isFollowing = true;
    this._store.select('profileTags')
      .first(state => state['profile_other_followed'] === true)
      .subscribe( datas => {
        this.followPostLoad();
        this.loadChannels();
      });
  }
  
  /**
   * post user channel
   */
  followPostLoad() {
    const data = {
      limit: 10,
      scrollId: null
    }
    this._store.dispatch({ type: ProfileActions.LOAD_USER_FOLLOWING_POSTS, payload: data });
  }

  /**
   * following user channel
   */
  loadChannels() {
    const body = {
      limit: 9
    }

    this._store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_FOLLOWING_CHANNEL, payload: body });
  }

  loadProfiles() {
    this._store.dispatch({ type: ProfileActions.LOAD_ALL_PROFILES_PROF, payload: {
      'isHuman' : '1' ,
      'name': {
        'scrollId': this.people_follow_id
       }
      }});
  }
  onScrol(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.scrollingPeople <= this.scrolling) {
      this.scrollingPeople += 100;
      this.loadProfiles();
    }
  }
}
