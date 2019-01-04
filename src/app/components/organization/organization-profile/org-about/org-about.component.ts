import { Component, OnInit, NgZone, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';

// maps
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

// action
import { OrganizationActions } from '../../../../actions/organization.action';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import { environment } from './../../../../../environments/environment.prod';
import { Organization } from '../../../../models/organization.model';
import { UtcDatePipe } from './../../../../pipes/utcdate.pipe';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from './../../../../services/local-storage.service';

import * as _ from 'lodash';
import { GeneralUtilities } from '../../../../helpers/general.utils';

@Component({
  selector: 'app-org-about',
  templateUrl: './org-about.component.html',
  styleUrls: ['./org-about.component.scss'],
  providers: [ UtcDatePipe, DatePipe ]
})
export class OrgAboutComponent implements OnInit, OnDestroy {

  @ViewChild('searchInput') searchInput;

  orgState$: Observable<Organization>;
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
  orgSub: Subscription;

  @ViewChild('searchLocation') searchLocation;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private store: Store<Organization>,
    private localStorageService: LocalStorageService,
    private datePipe: DatePipe,
    private gUtils: GeneralUtilities
  ) {

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
    this.orgSub = this.orgState$.subscribe((state) => {
      this.orgProfile = state;
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
    });
    /* org state */
  }

  ngOnInit() {
    this.getLocationGoogle();
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

  ngOnDestroy() {
    this.orgSub.unsubscribe();
  }

}
