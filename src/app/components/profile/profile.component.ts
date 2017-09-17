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
      this.current_user_value = this.checkUserType(this.userProfile);
    });
  }

  /**
   * Assign current profile values
   * @param userProfile
   */

  checkUserType(userProfile: any) {
    // Other Profile
    if (this.userFlag(userProfile) === 1) {
      return this.utils.profileValueMapping(userProfile, 'own');
    }
    // Other Profile
    if (this.userFlag(this.userProfile) === 2) {
      return this.utils.profileValueMapping(userProfile, 'other');
    }
  }

  /**
   * Validate user type based on path & state
   * @param userProfile
   */

  userFlag(userProfile: any): number {
    let flag = 0;
    if (!this.userName && userProfile.profile_loaded  === true) {
      flag = 1;
    }

    if (this.userName && userProfile.profile_other_loaded === true) {
      flag = 2;
    }

    return flag;
  }

  /**
   * Init
   */

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        this.userName = params['id'];
        this.loadProfile(params['id']); // Load corresponding user
    });
  }
  /**
   * Load a profile
   */
  loadProfile(userName: string) {
    if (userName) {
      this.current_user_value = new ProfileCard();
      this.isCurrentUser = false;
      this.profileStore.dispatch({ type: ProfileActions.PROFILE_LOAD, payload: userName });
    } else {
      this.current_user_value = null;
      this.isCurrentUser = true;
      this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
      this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS });
    }
  }
}
