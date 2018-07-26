import { Component, OnInit, NgZone, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, AbstractControl } from '@angular/forms';

// maps
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

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

import { Router, ActivatedRoute } from '@angular/router';
import { GeneralUtilities } from '../../../../helpers/general.utils';

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
  aboutAddress: any;
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

  // map vars
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  // address
  address: string;
  country: string;
  state: string;
  postalCode: string;
  city: string;
  // searchLocation: String;

  @ViewChild('searchLocation') searchLocation;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private store: Store<Organization>,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private searchStore: Store<SearchModel>,
    private router: Router,
    private gUtils: GeneralUtilities
  ) {

    /* member search */
    // this.searchState$ = this.searchStore.select('searchTags');
    // // observe the store value
    // this.searchState$.subscribe((state) => {
    //   this.searchState = state;
    //   if (state && state.searching_people === false) {
    //     this.isSearching = false;
    //     this.showPreloader = false;
    //   }
    //   if (state && state.search_people_data) {
    //     this.people = state.search_people_data;
    //   }
    // });
    /* member search */

    // check if creator is user or organization
    if (localStorage.getItem('active_profile') !== null) {
      const localStore = JSON.parse(this.localStorageService.theAccountStatus);
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
      // console.log('this.orgProfile', this.orgProfile);
      // redirect home if profile details are unavailable
      if (this.orgProfile && this.orgProfile['profile_details'] && this.orgProfile['profile_details'].hasOwnProperty('handle')) {
        // console.log('not empty');
      } else {
        this.router.navigateByUrl('/org/page/profile');
        return;
      }
      if (this.orgProfile && this.orgProfile['org_profile_update_success'] === true) {
        this.orgProfile.org_profile_update_success = false;
        if (this.orgProfile && this.orgProfile['profile_navigation_details']['isOrganization'] === true) {
          this.store.dispatch({ type: OrganizationActions.ORG_PROFILE_DETAILS, payload: this.orgProfile['profile_organization']['extra']['username'] });
        }
      }
      // for mobile
      if (this.gUtils.checkNestedKey(this.orgProfile, ['profile_details', 'contact', 'mobile', 'mobile'])) {
        this.aboutMobile = this.orgProfile['profile_details']['contact']['mobile']['mobile'];
      }
      // for website
      if (this.gUtils.checkNestedKey(this.orgProfile, ['profile_details', 'contact', 'website', 'website'])) {
        this.aboutWebsite = this.orgProfile['profile_details']['contact']['website']['website'];
      }
      // for email
      if (this.gUtils.checkNestedKey(this.orgProfile, ['profile_details', 'email'])) {
        this.aboutEmail = this.orgProfile['profile_details']['email'];
      }
      // for description
      if (this.gUtils.checkNestedKey(this.orgProfile, ['profile_details', 'description'])) {
        this.aboutDescription = this.orgProfile['profile_details']['description'];
      }
      // for services
      if (this.gUtils.checkNestedKey(this.orgProfile, ['profile_details', 'languages'])) {
        this.aboutServices = this.orgProfile['profile_details']['languages'];
        this.aboutServicesStr = this.orgProfile['profile_details']['languages'].join(', ');
      }
      // loading industries
      if (this.gUtils.checkNestedKey(this.orgProfile, ['profile_details', 'extra', 'industryList']) && this.orgProfile['profile_details']['extra']['industryList'].length > 0) {
        setTimeout(() => {
          const industryArrLen = this.orgProfile['profile_details']['extra']['industryList'].length;
          this.aboutIndustry = this.orgProfile['profile_details']['extra']['industryList'][industryArrLen - 1];
          if (this.aboutIndustry && this.aboutIndustry['code']) {
            this.aboutIndustryCode = this.aboutIndustry['code'];
          }
        }, 1000);
      }
      // for founded date
      if (this.gUtils.checkNestedKey(this.orgProfile, ['profile_details', 'activeFrom'])) {
        this.aboutFoundedDate = this.datePipe.transform(this.orgProfile['profile_details']['activeFrom'], 'dd-MM-yyyy');
      }
      // for address
      if (this.gUtils.checkNestedKey(this.orgProfile, ['profile_details', 'extra', 'address', 'line1'])) {
        this.aboutAddress = this.orgProfile['profile_details']['extra']['address']['line1'];
      }
      // check for invite status
      if (this.gUtils.checkNestedKey(this.orgProfile, ['invite_sent']) && this.orgProfile['invite_sent'] === true && this.inviteSent === true) {
        this.toastr.success('Invite sent successfully');
        this.inviteSent = false;
        const invitedUserHandle = this.orgProfile['org_invite_req_data'].userHandle;
        // remove user from the list
        this.people = _.filter(this.people, function(person) { return person.handle !== invitedUserHandle; });
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
    this.getLocationGoogle();

    // console.log('this.router.url', this.router.url);

    // // load org profile details if owned profile
    // if (this.router.url.includes('/org/')) {
    //   console.log('owned org profile');
    //   // check if username available in local storage
    //   const orgUsername = localStorage.getItem('profileUsername');
    //   if (localStorage.getItem('profileType') !== undefined && localStorage.getItem('profileType') === 'organization' && orgUsername !== undefined && orgUsername.length > 0) {
    //     // console.log('get org', orgUsername);
    //     this.store.dispatch({ type: OrganizationActions.ORG_PROFILE_DETAILS, payload: orgUsername });
    //   }
    // }
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
          this.dispatchAboutUpdate(reqBody);
          return;
        }
      });
    }

    // for indusrty update
    if (fieldName === 'industries' && this.aboutIndustryCode.length > 0) {
      const newIndustry = _.find(this.forIndustries.industries, { 'code': this.aboutIndustryCode });
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

      // search if string is available
      if (this.searchString && this.searchString.length > 0) {
        this.isSearching = true;

        const searchParams = {
          query: this.searchString,
          offset: 0,
          limit: 20
        }

        // search people
        // this.searchStore.dispatch({ type: SearchActions.SEARCH_PEOPLE, payload: searchParams });
      }

    });

  }

  /**
   * Sending an invitation to the person
   */
  sendInvitation(person: any) {
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

  /**
   * Location find from google
   */
  getLocationGoogle() {
    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchLocation.nativeElement, {

      });
      const componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'long_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          for (let i = 0; i < place.address_components.length; i++) {
            const addressType = place.address_components[i].types[0];
            if (componentForm[addressType]) {
              const val = place.address_components[i][componentForm[addressType]];
              if ( addressType === 'country') {
                this.country = val;
              }
              if ( addressType === 'postal_code') {
                this.postalCode = val;
              }
              if ( addressType === 'locality') {
                this.city = val
              }
              if ( addressType === 'administrative_area_level_1') {
                this.state = val
              }
            }
          }

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.address = place.formatted_address;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

}
