import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Follow, Login } from '../../../models/auth.model';
import { AuthActions } from '../../../actions/auth.action';
import { ProfileActions } from '../../../actions/profile.action';
import { OrganizationActions } from '../../../actions/organization.action';
import { Router, ActivatedRoute } from '@angular/router';
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

  profileHandle: string;
  prfileUsername: string;
  orgProfile: Observable<any>;
  orgState: any;
  activeProfile: UserCard;

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

   }

  ngOnInit() {
    // check for userhandles
    this.sub = this.route.params
    .subscribe(params => {
      const orgParam = params['id'];
      if (orgParam !== undefined) {
        this.prfileUsername = orgParam
      }
    });

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
      this.prfileUsername = this.activeProfile.username;

      //
      this.orgStore.dispatch({
        type: OrganizationActions.LOAD_ORG_CHANNELS,
        payload: this.activeProfile.handle
      });
    });

    this.store.dispatch({ type: OrganizationActions.ORG_PROFILE, payload: this.prfileUsername });
    this.store.dispatch({ type: OrganizationActions.ORG_PROFILE_DETAILS, payload: this.prfileUsername });
  }

}
