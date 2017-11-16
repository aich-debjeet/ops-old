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
import { Subscription } from 'rxjs/Subscription';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  providers: [ModalService, DatePipe],
  styleUrls: ['./profile-post.component.scss']
})
export class ProfilePostComponent implements OnInit {
  componentDestroyed$: Subject<boolean> = new Subject();

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
  otherPost: boolean;
  isEmpty: boolean;
  sum = 10;
  page_start = 0;
  page_end = 20;
  total_pages = 10;
  scrolling = 0;
  scrollingLoad = 8000;
  isOwner: boolean;

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
       this.posts = this.userMedia.user_posts;
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

  userType() {

    this._store.select('profileTags')
      .first(profile => profile['profile_user_info'] && profile['profileUser'].handle)
      .subscribe( data => {
        if (data['profile_user_info'].isCurrentUser === true) {
          const handle = this.userMedia.profileUser.handle;
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
}
