import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Follow, Login } from '../../../models/auth.model';
import { AuthActions } from '../../../actions/auth.action';
import { ProfileActions } from '../../../actions/profile.action';
import { OrganizationActions } from '../../../actions/organization.action';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

import { LocalStorageService } from '../../../services/local-storage.service';

import { Store } from '@ngrx/store';
import {} from '@types/googlemaps';
import { UserCard } from 'app/models/profile.model';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss']
})
export class OrganizationProfileComponent implements OnInit {

  profileCard: UserCard;
  orgProfile: Observable<any>;
  activeProfile: UserCard;
  hasNoOrg: boolean;
  isOtherProfile: boolean;
  orgState$: Observable<any>;
  imageBaseLink: string = environment.API_IMAGE;

  // Org states
  private sub: any;
  private mode: string;
  isCurrentUser: boolean;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private toastr: ToastrService,
    private ngZone: NgZone,
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

      //
      this.orgStore.dispatch({
        type: OrganizationActions.LOAD_ORG_CHANNELS,
        payload: this.activeProfile.handle
      });
    });

    // check for userhandles
    this.sub = this.route.params
    .subscribe(params => {
      const orgParam = params['id'];
      // console.log('checking for org params', orgParam);

      // load org profile details if owned profile
      if (this.router.url.includes('/org/')) {
        // console.log('owned org profile');
        // check if username available in local storage
        const orgUsername = localStorage.getItem('profileUsername');
        if (localStorage.getItem('profileType') !== undefined && localStorage.getItem('profileType') === 'organization' && orgUsername !== undefined && orgUsername.length > 0) {
          // console.log('get org', orgUsername);
          this.store.dispatch({ type: OrganizationActions.ORG_PROFILE_DETAILS, payload: orgUsername });
        }
      }

      // if (orgParam !== undefined || orgParam !== 'undefined') {
      //   this.isOtherProfile = false;
      //   /**
      //    * Load Organization Profile Details if handle present
      //    */
      //   if (this.profileCard && this.profileCard.username) {
      //     this.store.dispatch({ type: OrganizationActions.ORG_PROFILE_DETAILS, payload: this.profileCard.username });
      //   }
      // }

      // if (orgParam && orgParam.length > 0) {
      //   this.store.dispatch({ type: OrganizationActions.ORG_PROFILE_DETAILS, payload: orgParam });
      // }
    });
  }

}
