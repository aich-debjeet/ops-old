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

import { LocalStorageService } from './../../../../services/local-storage.service';

import { initialTag, Follow } from '../../../../models/auth.model';
import * as _ from 'lodash';

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
  aboutIndustry: any;
  aboutIndustryCode: any;
  forIndustries: any;
  aboutMobile: any;
  aboutWebsite: any;
  aboutEmail: any;
  aboutDescription: string;
  aboutServices: string;
  // services: any[];
  profileUsername = '';
  profileHandle = '';

  constructor(
    private store: Store<Organization>,
    private localStorageService: LocalStorageService
  ) {

    // check if creator is user or organization
    if (localStorage.getItem('accountStatus') !== null) {
      const localStore = JSON.parse(this.localStorageService.theAccountStatus);
      console.log('localStore', localStore);
      if (localStore.handle && localStore.handle.length > 0) {
        this.profileHandle = localStore.handle;
      }
      if (localStore.username && localStore.username.length > 0) {
        this.profileUsername = localStore.username;
      }
    }

    // this.services = ['UI design', 'Web Application Development', 'Social Media'];

    /* org state */
    this.orgState$ = this.store.select('organizationTags');
    this.orgState$.subscribe((state) => {
      this.orgProfile = state;
      // console.log('this.orgProfile ABOUT ORG', this.orgProfile);
      if (this.orgProfile && this.orgProfile.org_profile_update_success === true) {
        this.orgProfile.org_profile_update_success = false;
        this.store.dispatch({ type: OrganizationActions.ORG_PROFILE_DETAILS, payload: this.profileUsername });
      }
      // for mobile
      if (this.orgProfile && this.orgProfile.org_profile_details && this.orgProfile.org_profile_details.contact.mobile) {
        this.aboutMobile = this.orgProfile.org_profile_details.contact.mobile.mobile;
      }
      // for website
      if (this.orgProfile && this.orgProfile.org_profile_details && this.orgProfile.org_profile_details.contact.website) {
        this.aboutWebsite = this.orgProfile.org_profile_details.contact.website.website;
      }
      // for email
      if (this.orgProfile && this.orgProfile.org_profile_details && this.orgProfile.org_profile_details.email) {
        this.aboutEmail = this.orgProfile.org_profile_details.email;
      }
      // for description
      if (this.orgProfile && this.orgProfile.org_profile_details && this.orgProfile.org_profile_details.description) {
        this.aboutDescription = this.orgProfile.org_profile_details.description;
      }
      // for services
      if (this.orgProfile && this.orgProfile.org_profile_details && this.orgProfile.org_profile_details.languages) {
        this.aboutServices = this.orgProfile.org_profile_details.languages.join(', ');
        // console.log('aboutServices', this.aboutServices);
      }
      // loading industries
      if (this.orgProfile && this.orgProfile.org_profile_details && this.orgProfile.org_profile_details.extra['industryList'].length > 0) {
        setTimeout(() => {
          const industryArrLen = this.orgProfile.org_profile_details.extra['industryList'].length;
          this.aboutIndustry = this.orgProfile.org_profile_details.extra['industryList'][industryArrLen - 1];
          this.aboutIndustryCode = this.aboutIndustry['code'];
          // console.log('this.aboutIndustry', this.aboutIndustry);
        }, 1000);
      }
    });
    /* org state */

    this.loginTagState$ = store.select('loginTags');
    this.loginTagState$.subscribe((state) => {
      this.forIndustries = state;
      // console.log('this.forIndustries', this.forIndustries);
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
   * Closing editors
   */
  closeEditor() {
    this.cancelEdit();
  }

  /**
   * Update about individual field
   */
  updateAbout(fieldName: string) {
    // console.log('update org field', fieldName);
    let reqBody;

    // for mobile update
    if (fieldName === 'mobile' && this.aboutMobile.length > 0) {
      reqBody = { mobile: '' };
      reqBody.mobile = this.aboutMobile;
    }

    // for webiste update
    if (fieldName === 'website' && this.aboutWebsite.length > 0) {
      reqBody = { website: '' };
      reqBody.website = this.aboutWebsite;
    }

    // for email update
    if (fieldName === 'email' && this.aboutEmail.length > 0) {
      reqBody = { email: '' };
      reqBody.email = this.aboutEmail;
    }

    // for description update
    if (fieldName === 'description' && this.aboutDescription.length > 0) {
      reqBody = {
        extras: {
          Description: ''
        }
      };
      reqBody.extras.Description = this.aboutDescription;
    }

    // for services update
    if (fieldName === 'services' && this.aboutServices.length > 0) {
      reqBody = {
        services: [],
      };
      const aboutServicesArr = this.aboutServices.split(',');
      aboutServicesArr.forEach((service, index) => {
        reqBody.services.push(service);
        // console.log('index', index);
        if (index >= (aboutServicesArr.length - 1)) {
          this.dispatchAboutUpdate(reqBody);
          return;
        }
      });
    }

    // for indusrty update
    if (fieldName === 'industries' && this.aboutIndustryCode.length > 0) {
      console.log('selected', this.aboutIndustryCode);
      const newIndustry = _.find(this.forIndustries.industries, { 'code': this.aboutIndustryCode });
      // console.log('newIndustry', newIndustry);
      // console.log('this.forIndustries.industries', this.forIndustries.industries);
      reqBody = {
        industryList: []
      };
      reqBody.industryList.push(newIndustry);
    }

    this.dispatchAboutUpdate(reqBody);
  }

  dispatchAboutUpdate(reqData: any) {
    const data = {
      handle: this.orgProfile.org_profile_details.handle,
      body: reqData
    }
    // console.log('req body', data);
    this.store.dispatch({ type: OrganizationActions.ORG_PROFILE_UPDATE, payload: data });

    this.closeEditor();
  }

}
