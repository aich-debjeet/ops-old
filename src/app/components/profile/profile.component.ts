import { Component, OnInit, OnChanges } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag, ProfileCard } from '../../models/profile.model';
import { UserMedia } from '../../models/user-media.model';

// action
import { ProfileActions } from '../../actions/profile.action';
import { SharedActions } from '../../actions/shared.action';
import { ProfileHelper } from '../../helpers/profile.helper';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ClaimProfileActions } from 'app/actions/claim-profile.action';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [ ProfileHelper ],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  private sub: any;      // -> Subscriber
  private mode: string;

  test: string;
  userProfile = initialTag ;
  router: any;
  isCurrentUser: boolean;
  userName: string;
  tester: string;
  current_user_value: ProfileCard;

  constructor(
    private http: Http,
    public route: ActivatedRoute,
    private utils: ProfileHelper,
    private profileStore: Store<ProfileModal>
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    this.router = this.route;
    this.isCurrentUser = false;
    this.tagState$.subscribe((state) => {
      this.userProfile = state;
      // console.log('state', state);
      // this.current_user_value = this.checkUserType(this.userProfile);
    });

  }

  /**
   * Init
   */

  ngOnInit() {

    this.sub = this.route.params
      .subscribe(params => {
        this.userName = params['id'];
        // console.log('this.userName', this.userName);
        if (this.userName && this.userName.length > 0) {
          const userdata = {
            isCurrentUser: false,
            username: this.userName,
          }
          this.profileStore.dispatch({ type: ProfileActions.GET_IMPORTED_PROFILE, payload: this.userName });
          this.profileStore.dispatch({ type: ProfileActions.CURRENT_PROFILE_USER, payload: userdata });
        }
    });


    this.profileStore.select('profileTags')
      .first(profile => profile['profile_navigation_details'].name )
      .subscribe( data => {
        if (data['profile_navigation_details'].username === this.userName) {
          // console.log('current user');
          this.loadProfile('');
        } else {
          // console.log('other User');
          this.loadProfile(this.userName);
        }
      });

  }
  /**
   * Load a profile
   */
  loadProfile(userName: string) {
    if (userName) {
      const userdata = {
        isCurrentUser: false,
        username: userName,
      }
      this.profileStore.dispatch({ type: ProfileActions.PROFILE_LOAD, payload: userName });
      this.profileStore.dispatch({ type: ProfileActions.CURRENT_PROFILE_USER, payload: userdata });
    } else {
      const userdata = {
        isCurrentUser: true,
        username: userName,
      }
      this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });
      this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS });
      this.profileStore.dispatch({ type: ProfileActions.CURRENT_PROFILE_USER, payload: userdata });
    }
  }
}
