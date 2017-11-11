import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// action
import { ProfileActions } from '../../../../actions/profile.action';
import { OrganizationActions } from '../../../../actions/organization.action';
import { AuthActions } from '../../../../actions/auth.action';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Organization, initialOrganization } from '../../../../models/organization.model';
import { UtcDatePipe } from './../../../../pipes/utcdate.pipe';

import { initialTag, Follow } from '../../../../models/auth.model';

@Component({
  selector: 'app-org-about',
  templateUrl: './org-about.component.html',
  styleUrls: ['./org-about.component.scss']
})
export class OrgAboutComponent implements OnInit {

  orgState$: Observable<Organization>;
  orgProfile;
  editingField: string;
  orgIndustry: string;
  forIndustries: any;
  loginTagState$: Observable<Follow>;

  constructor(
    private store: Store<Organization>
  ) {

    /* org state */
    this.orgState$ = this.store.select('organizationTags');
    this.orgState$.subscribe((state) => {
      this.orgProfile = state;
      // console.log('this.orgProfile ABOUT ORG', this.orgProfile);
      if (this.orgProfile && this.orgProfile.orgProfileDetails && this.orgProfile.orgProfileDetails['industryList'].length > 0) {
        setTimeout(() => {
          const industryArrLen = this.orgProfile.orgProfileDetails['industryList'].length;
          this.orgIndustry = this.orgProfile.orgProfileDetails['industryList'][industryArrLen - 1].code;
          // console.log('this.orgIndustry', this.orgIndustry);
        }, 1000);
      }
    });
    /* org state */

    this.loginTagState$ = store.select('loginTags');
    this.loginTagState$.subscribe((state) => {
      this.forIndustries = state;
    });

    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES});

  }

  ngOnInit() {
  }

  /**
   * Edit individual field
   */
  editField(fieldName: string) {
    this.editingField = fieldName;
  }

  /**
   * Cancel edition
   */
  cancelEdit() {
    this.editingField = '';
  }

  /**
   * Update about individual field
   */
  updateAbout(fieldName: string) {
    console.log('update org field');
    const data = {
      handle: this.orgProfile.orgProfileDetails.handle,
      body: {}
    }
    this.store.dispatch({ type: OrganizationActions.ORG_PROFILE_UPDATE, payload: data });
  }

}
