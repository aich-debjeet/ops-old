import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../models/profile.model';

// action
import { ProfileActions } from '../../actions/profile.action';
import { ProfileHelper } from '../../helpers/profile.helper';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [ ProfileHelper ],
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  tagState$: Observable<ProfileModal>;
  private routerSub: ISubscription;
  private profSub: Subscription;

  test: string;
  userProfile = initialTag;
  router: any;
  isCurrentUser: boolean;
  userName: string;
  tester: string;

  constructor(
    public route: ActivatedRoute,
    private profileStore: Store<ProfileModal>
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    this.router = this.route;
    this.isCurrentUser = false;
    this.profSub = this.tagState$.subscribe((state) => {
      this.userProfile = state;
    });
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });
  }

  /**
   * Init
   */

  ngOnInit() {
    window.scrollTo(0, 0);
    this.routerSub  = this.route.params.subscribe(params => {
        this.userName = params['id'];
        // console.log('this.userName', this.userName);
        if (this.userName && this.userName.length > 0 && localStorage.getItem('currentUser') === null) {
          const userdata = {
            isCurrentUser: false,
            isClaimForGuest: true,
            username: this.userName,
          }
          // console.log('guest user');
          this.profileStore.dispatch({ type: ProfileActions.GET_IMPORTED_PROFILE, payload: this.userName });
          this.profileStore.dispatch({ type: ProfileActions.CURRENT_PROFILE_USER, payload: userdata });
        }
    });


    this.profileStore.select('profileTags')
      .first(profile => profile['profile_navigation_details'].name )
      .subscribe( data => {
        if (data['profile_navigation_details'].username === this.userName) {
          this.loadProfile('');
        } else {
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
      this.profileStore.dispatch({ type: ProfileActions.CURRENT_PROFILE_USER, payload: userdata });
    }
  }

  ngOnDestroy() {
    this.profSub.unsubscribe();
    this.routerSub.unsubscribe();
  }
}
