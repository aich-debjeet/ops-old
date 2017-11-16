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

import { Store } from '@ngrx/store';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss']
})
export class OrganizationProfileComponent implements OnInit {

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private toastr: ToastrService,
    private ngZone: NgZone,
    private store: Store<Login>,
    private router: Router,
  ) {

    // Get own user handle
    this.store.select('profileTags')
      .subscribe( data => {
      });

    // check organziation page already created
    this.store.select('profileTags')
      .first(profile => profile['current_user_profile_loading'] === true)
      .subscribe( data => {
        if (data['profileUser'].isOrganization === false) {
          this.router.navigateByUrl('/org/registration');
        }
      });
   }

  ngOnInit() {
  }

}
