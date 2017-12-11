import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';

// action
import { ProfileActions } from '../../../../actions/profile.action';
import { OrganizationActions } from '../../../../actions/organization.action';
import { SearchActions } from '../../../../actions/search.action';
import { AuthActions } from '../../../../actions/auth.action';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

import { SearchModel } from 'app/models/search.model';
import { environment } from './../../../../../environments/environment.prod';

import { Organization, initialOrganization } from '../../../../models/organization.model';
import { UtcDatePipe } from './../../../../pipes/utcdate.pipe';
import { DatePipe } from '@angular/common';

import { LocalStorageService } from './../../../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';

import { initialTag, Follow } from '../../../../models/auth.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-org-about',
  templateUrl: './org-about.component.html',
  styleUrls: ['./org-about.component.scss'],
  providers: [ UtcDatePipe, DatePipe ]
})
export class OrgAboutComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') searchInput;

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
  aboutServices: any[];
  aboutServicesStr: string;
  aboutFoundedDate: any;
  // services: any[];
  profileUsername = '';
  profileHandle = '';

  searchState$: Observable<SearchModel>;
  searchState: any;
  isSearching = false;
  showPreloader = false;
  searchString: string;
  people = [];
  inviteSent: boolean;

  baseUrl = environment.API_IMAGE;

  constructor(
    private store: Store<Organization>,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private searchStore: Store<SearchModel>,
  ) {

    /* member search */
    this.searchState$ = this.searchStore.select('searchTags');
    // observe the store value
    this.searchState$.subscribe((state) => {
      this.searchState = state;
      if (state && state.searching_people === false) {
        this.isSearching = false;
        this.showPreloader = false;
      }
      if (state && state.search_people_data) {
        this.people = state.search_people_data;
      }
    });
    /* member search */

    // check if creator is user or organization
    if (localStorage.getItem('active_profile') !== null) {
      const localStore = JSON.parse(this.localStorageService.theAccountStatus);
      // console.log('localStore', localStore);
      if (localStore.handle && localStore.handle.length > 0) {
        this.profileHandle = localStore.handle;
      }
      if (localStore.username && localStore.username.length > 0) {
        this.profileUsername = localStore.username;
      }
    }

    // this.services = ['UI design', 'Web Application Development', 'Social Media'];

    /* org state */
    this.orgState$ = this.store.select('profileTags');
    this.orgState$.subscribe((state) => {
      this.orgProfile = state;
      console.log('this.orgProfile ABOUT ORG', this.orgProfile);
      if (this.orgProfile && this.orgProfile['org_profile_update_success'] === true) {
        this.orgProfile.org_profile_update_success = false;
        if (this.orgProfile && this.orgProfile['profile_navigation_details']['isOrganization'] === true) {
          this.store.dispatch({ type: OrganizationActions.ORG_PROFILE_DETAILS, payload: this.orgProfile['profile_organization']['extra']['username'] });
        }
      }
      // for mobile
      if (this.orgProfile && this.orgProfile['profile_details']['contact']['mobile']['mobile']) {
        this.aboutMobile = this.orgProfile['profile_details']['contact']['mobile']['mobile'];
      }
      // for website
      if (this.orgProfile && this.orgProfile['profile_details']['contact']['website']) {
        this.aboutWebsite = this.orgProfile['profile_details']['contact']['website'];
      }
      // for email
      if (this.orgProfile && this.orgProfile['profile_details']['email']) {
        this.aboutEmail = this.orgProfile['profile_details']['email'];
      }
      // for description
      if (this.orgProfile && this.orgProfile['profile_details']['description']) {
        this.aboutDescription = this.orgProfile['profile_details']['description'];
      }
      // for services
      if (this.orgProfile && this.orgProfile['profile_details']['languages']) {
        this.aboutServices = this.orgProfile['profile_details']['languages'];
        this.aboutServicesStr = this.orgProfile['profile_details']['languages'].join(', ');
        // console.log('aboutServices', this.aboutServices);
      }
      // loading industries
      if (this.orgProfile && this.orgProfile['profile_details']['extra']['industryList'].length > 0) {
        setTimeout(() => {
          const industryArrLen = this.orgProfile['profile_details']['extra']['industryList'].length;
          this.aboutIndustry = this.orgProfile['profile_details']['extra']['industryList'][industryArrLen - 1];
          if (this.aboutIndustry && this.aboutIndustry['code']) {
            this.aboutIndustryCode = this.aboutIndustry['code'];
          }
          // console.log('this.aboutIndustry', this.aboutIndustry);
        }, 1000);
      }
      // for founded date
      if (this.orgProfile && this.orgProfile['profile_details']['activeFrom']) {
        console.log('this.orgProfile.profile_details.activeFrom', this.orgProfile['profile_details']['activeFrom']);
        this.aboutFoundedDate = this.datePipe.transform(this.orgProfile['profile_details']['activeFrom'], 'dd-MM-yyyy');
      }

      // check for invite status
      if (this.orgProfile && this.orgProfile['invite_sent'] === true && this.inviteSent === true) {
        this.toastr.success('Invite sent successfully');
        this.inviteSent = false;
        // console.log(this.orgProfile['org_invite_req_data']);
        const invitedUserHandle = this.orgProfile['org_invite_req_data'].userHandle;
        // remove user from the list
        this.people = _.filter(this.people, function(person) { return person.handle !== invitedUserHandle; });
        // console.log('this.people', this.people);
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
      const aboutServicesArr = this.aboutServices;
      aboutServicesArr.forEach((service, index) => {
        if (typeof service === 'string') {
          reqBody.services.push(service);
        } else {
          reqBody.services.push(service.value);
        }
        if (index >= (aboutServicesArr.length - 1)) {
          // console.log('update services', reqBody.services);
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

    if (fieldName === 'activeFrom' && this.aboutFoundedDate.length > 0) {
      reqBody = {
        extras: {
          foundedYear: this.reverseDate(this.aboutFoundedDate) + 'T05:00:00'
        }
      };
    }

    this.dispatchAboutUpdate(reqBody);
  }

  dispatchAboutUpdate(reqData: any) {
    const data = {
      handle: this.orgProfile.profile_details.handle,
      body: reqData
    }
    // console.log('req body', data); return;
    this.store.dispatch({ type: OrganizationActions.ORG_PROFILE_UPDATE, payload: data });
    this.closeEditor();
  }

  /**
   * @param string prepare date to send
   */
  reverseDate(string) {
    return string.split('-').reverse().join('-');
  }

  ngAfterViewInit() {

    /**
     * Observing the search input change
     */
    this.searchInput.valueChanges
    .debounceTime(500)
    .subscribe(() => {

      this.searchString = this.searchInput.value;
      // console.log('searching: ', this.searchString);

      // search if string is available
      if (this.searchString && this.searchString.length > 0) {
        // console.log('new search', this.searchString);
        this.isSearching = true;

        const searchParams = {
          query: this.searchString,
          offset: 0,
          limit: 20
        }

        // search people
        this.searchStore.dispatch({ type: SearchActions.SEARCH_PEOPLE, payload: searchParams });
      }

    });

  }

  /**
   * Sending an invitation to the person
   */
  sendInvitation(person: any) {
    console.log('send an invite ', person);

    // get org handle
    const orgHandle = localStorage.getItem('profileHandle');

    this.inviteSent = true;

    this.store.dispatch({
      type: OrganizationActions.INVITE_MEMBER,
      payload: {
        userHandle: person.handle,
        orgHandle: orgHandle
      }
    });
  }

}
