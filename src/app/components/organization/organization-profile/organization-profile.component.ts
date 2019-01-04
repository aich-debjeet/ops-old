import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Login } from '../../../models/auth.model';
import { OrganizationActions } from '../../../actions/organization.action';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';
import { UserCard } from 'app/models/profile.model';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss']
})
export class OrganizationProfileComponent implements OnInit, OnDestroy {

  profileCard: UserCard;
  orgProfile: Observable<any>;
  activeProfile: UserCard;
  hasNoOrg: boolean;
  isOtherProfile: boolean;
  orgState$: Observable<any>;
  imageBaseLink: string = environment.API_IMAGE;

  // Org states
  orgSub: ISubscription;
  isCurrentUser: boolean;

  constructor(
    private store: Store<Login>,
    public route: ActivatedRoute,
    private orgStore: Store<any>,
    private router: Router,
  ) {
      //
      this.hasNoOrg = false;
      this.isOtherProfile = false;

      //
      this.orgState$ = this.orgStore.select('profileTags');
      // observe the store value
      this.orgState$.subscribe((state) => {
        this.profileCard = state['profile_cards'].active;
      });
   }
  /**
   * Checks if the active profile is an organization
   */
  checkIfProfileActive() {
    // Check if current active profile is organization
    if (this.activeProfile && this.activeProfile.isOrg === false) {
      this.hasNoOrg = true;
      // Route to create Organization page
    }
  }

  ngOnInit() {

    // check organziation page already created
    this.store.select('profileTags')
    .first(profile => profile['current_user_profile_loading'] === true)
    .subscribe( data => {
      /**
       * @TODO
       * What happens if the current user,
       * without switching to org comes here?
       */
      this.activeProfile = data['profile_cards'].active;
      this.profileCard = this.activeProfile;

      // this.orgStore.dispatch({
      //   type: OrganizationActions.LOAD_ORG_CHANNELS,
      //   payload: this.activeProfile.handle
      // });
    });

    // check for userhandles
    this.orgSub = this.route.params
      .subscribe(params => {
        const orgUsername = params['id'];
        // load org profile details if owned profile
        if (orgUsername) {
          console.log('load org: ' + orgUsername);
          this.isOtherProfile = true;
          this.store.dispatch({ type: OrganizationActions.ORG_PROFILE_DETAILS, payload: orgUsername });
        } else {
          this.isOtherProfile = false;
          console.log('already triggered');
        }
        console.log('this.isOtherProfile', this.isOtherProfile);
        if (this.orgSub) {
          this.orgSub.unsubscribe();
        }
      });
  }

  ngOnDestroy() {
  }

}
