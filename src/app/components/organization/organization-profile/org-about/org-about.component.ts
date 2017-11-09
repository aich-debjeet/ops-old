import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

// action
import { ProfileActions } from '../../../../actions/profile.action';
import { OrganizationActions } from '../../../../actions/organization.action';
import { AuthActions } from '../../../../actions/auth.action';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Organization, initialOrganization } from '../../../../models/organization.model';
import { UtcDatePipe } from './../../../../pipes/utcdate.pipe';

@Component({
  selector: 'app-org-about',
  templateUrl: './org-about.component.html',
  styleUrls: ['./org-about.component.scss']
})
export class OrgAboutComponent implements OnInit {

  orgState$: Observable<Organization>;
  loginTagState$: Observable<any>;
  orgProfile;
  editingField: string;
  industries: any[];
  orgIndustry: string;

  /**
   * about vars
   */
  @ViewChild('aboutDescription') aboutDescription;
  @ViewChild('aboutServices') aboutServices;
  @ViewChild('aboutIndustries') aboutIndustries;
  @ViewChild('aboutActiveFrom') aboutActiveFrom;
  @ViewChild('aboutMobile') aboutMobile;
  @ViewChild('aboutEmail') aboutEmail;
  @ViewChild('aboutWebsite') aboutWebsite;
  @ViewChild('aboutAddress') aboutAddress;

  constructor(
    private store: Store<Organization>
  ) {

    /* org state */
    this.orgState$ = this.store.select('organizationTags');
    this.orgState$.subscribe((state) => {
      this.orgProfile = state;
      console.log('this.orgProfile ABOUT ORG', this.orgProfile);
      if (this.orgProfile && this.orgProfile['orgProfileDetails']['industryList']) {
        this.orgIndustry = this.orgProfile.orgProfileDetails.industryList[0].name;
      }
    });
    /* org state */

    // loading industries
    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES});
    this.loginTagState$ = store.select('loginTags');
    this.loginTagState$.subscribe((state) => {
      this.industries = state.industries;
      // console.log('this.industries', this.industries);
    });

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

  closeEditor() {
    this.cancelEdit();
  }

  /**
   * Update individual field
   */
  updateField(fieldName: string) {
    const updatedValue = this.aboutDescription.nativeElement.value;
    // console.log('updatedValue', updatedValue);

    const data = {
      handle: this.orgProfile.orgHandle,
      body: {
        extras: {
          Description: updatedValue
        }
      }
    }
    this.store.dispatch({ type: OrganizationActions.ORG_PROFILE_UPDATE, payload: data });

    // profile update sucess
    this.store.select('organizationTags')
    .first(org => org['org_profile_update_success'] === true)
    .subscribe( orgUpdate => {
      this.store.dispatch({ type: OrganizationActions.LOAD_ORGANIZATION, payload: this.orgProfile.orgHandle });
      this.store.dispatch({ type: OrganizationActions.ORG_PROFILE_DETAILS, payload: this.orgProfile.org_profile_details.extra.username });
      this.closeEditor();
    });
  }

}
