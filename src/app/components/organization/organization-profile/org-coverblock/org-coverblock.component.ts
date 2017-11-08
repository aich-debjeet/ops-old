import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ProfileModal, initialTag } from '../../../../models/profile.model';
import { Follow, Login } from '../../../../models/auth.model';
import { AuthActions } from '../../../../actions/auth.action';
import { ProfileActions } from '../../../../actions/profile.action';
import { OrganizationActions } from '../../../../actions/organization.action';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-org-coverblock',
  templateUrl: './org-coverblock.component.html',
  styleUrls: ['./org-coverblock.component.scss']
})
export class OrgCoverblockComponent implements OnInit {
  tagState$: Observable<ProfileModal>;
  organization: any;
  orgHandle: any;
  baseUrl = environment.API_IMAGE;
  orgState: any;
  constructor(
    private toastr: ToastrService,
    private ngZone: NgZone,
    private store: Store<Login>
  ) {
    this.store.select('organizationTags')
      .subscribe( data => {
        if (data['org_profile_details']) {
          this.orgState = data['org_profile_details'];
        }
        console.log(this.orgState);
      });

      // Own Profile
    this.tagState$ = this.store.select('profileTags');
    this.tagState$.subscribe((state) => {
      if (state['profileUser'].organization) {
        this.organization = state['profileUser'].organization;
      }
      console.log(this.organization);
    });

    this.store.select('profileTags')
      .first(profile => profile['profileUser'].organization)
      .subscribe( data => {
        if (data['profileUser'].organization.organizationHandle) {
          this.orgHandle = data['profileUser'].organization.organizationHandle;
          const username = data['profileUser'].organization.organizationUserName;
          this.store.dispatch({ type: OrganizationActions.ORG_PROFILE_DETAILS, payload: username });
        }
      });
   }

  ngOnInit() {
  }

}
