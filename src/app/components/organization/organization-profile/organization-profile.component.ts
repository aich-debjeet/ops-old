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

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private toastr: ToastrService,
    private ngZone: NgZone,
    private store: Store<Login>,
    private orgStore: Store<any>,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    // check organziation page already created
    this.store.select('profileTags')
      .first(profile => profile['current_user_profile_loading'] === true)
      .subscribe( data => {
        if (data['profile_navigation_details'].isOrganization === false) {
          // this.router.navigateByUrl('/org/registration');
        }
      });

    // check if creator is user or organization
    if (localStorage.getItem('active_profile') !== null) {
      const localStore = JSON.parse(this.localStorageService.theAccountStatus);
      if (localStore.profileType === 'org') {
        this.profileHandle = localStore.handle;
        this.prfileUsername = localStore.username;
      }
    }

    // this.orgState = this.orgStore.select('profileTags');
    // this.orgState.subscribe((state) => {
    //   this.orgProfile = state;
    //   console.log('this.orgProfile', this.orgProfile);
    // });

    // this.orgStore.dispatch({
    //   type: OrganizationActions.LOAD_ORG_CHANNELS,
    //   payload: this.profileHandle
    // });

   }

  ngOnInit() {
    // load org channels

  }

}
