import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormValidation, DatabaseValidator } from '../../../helpers/form.validator';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Login, BasicOrgTag } from '../../../models/auth.model';
import { AuthActions } from '../../../actions/auth.action';
import { ProfileActions } from '../../../actions/profile.action';
import { OrganizationActions } from '../../../actions/organization.action';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

import { Store } from '@ngrx/store';
import {} from '@types/googlemaps';
import * as _ from 'lodash';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-organization-reg',
  templateUrl: './organization-reg.component.html',
  providers: [DatabaseValidator],
  styleUrls: ['./organization-reg.component.scss']
})
export class OrganizationRegComponent implements OnInit {

  public orgReg: FormGroup;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  tagState$: Observable<BasicOrgTag>;
  orgState: any;
  imageBaseLink: string = environment.API_IMAGE;
  org_service: any;

  // Address --
  address: string;
  country: string;
  state: string;
  postalCode: string;
  city: string;
  // -----
  search: String;
  userHandle: string;
  industries: any;
  uploadingData = false;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private toastr: ToastrService,
    private router: Router,
    private ngZone: NgZone,
    private store: Store<Login>
  ) {

    // // Dispatch current current user Handle
    this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      this.orgState = state;
      if (state) {
        if (state.industries) {
          this.industries = state.industries;
        }
      }
    });

    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES});

    // Get own user handle
    this.store.select('profileTags')
      .first(profile => profile['current_user_profile_loading'] === true)
      .subscribe( data => {
        if (data['profile_navigation_details'].isOrganization === true) {
          this.router.navigateByUrl('/org/page');
        }
        this.userHandle = data['profile_navigation_details'].handle;
      });
   }

  ngOnInit() {
    this.buildForm();
    this.getLocationGoogle();
  }

  /**
   * Initinal Reg Page
   */
  buildForm() {
    this.orgReg = this.fb.group({
      'org_name': ['', [Validators.required]],
      'org_username': ['', [
        Validators.required,
        FormValidation.noWhitespaceValidator,
        FormValidation.usernameLengthValidator,
        FormValidation.noSpecialCharsValidator,
        FormValidation.noCapitalLettersValidator,
        // this.userNameValidation.bind(this)
        this.userExistCheck.bind(this)
      ]],
      'org_type': ['', Validators.required],
      'org_industry_type': ['', Validators.required],
      'org_location': ['', Validators.required],
      'org_service': ['', Validators.required]
    })
  }

  // user user exists
  userExistCheck(control: AbstractControl) {
    if (control.value.length >= 3) {
      this.store.dispatch({ type: AuthActions.USER_EXISTS_CHECK, payload: control.value });
    }
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

  submitForm(value) {
    const industrySelected = _.find(this.industries, { code: value.org_industry_type });
    let industryObj = {};
    if (industrySelected && industrySelected.name) {
      industryObj = {
        name : industrySelected.name,
        code : industrySelected.code,
        active : true
      }
    }

    if (!this.orgReg.valid) {
      return false;
    }
    const org_services = value.org_service.split(/\s*,\s*/);
    // const org_services = value.org_service.map(a => a.value);

    const data = {
        industryList : [ industryObj ],
        organizationName : value.org_name,
        services: org_services,
        address : {
            line1 : this.address,
            line2 : '',
            city : this.city,
            state : this.state,
            country : this.country,
            postalCode : this.postalCode
        },
        extras: {
          username: value.org_username,
          memberList: [{
              memberHandle: this.userHandle,
              isAdmin: true,
              status: 'accept'
            }],
          location: '',
          latitude: String(this.latitude),
          longitude: String(this.longitude)
        },
        accountType : [{
          'name': value.org_type,
          'typeName': 'organization'
        }],
        managedBy : this.userHandle,
        active : true
    }

    // console.log('payload', data);
    // return;

    // show preloader
    this.uploadingData = true;

    this.store.dispatch({ type: OrganizationActions.ORGANIZATION_REGISTRATION, payload: data });
    localStorage.setItem('orgUsername', value.org_username);

    // Org Registration successfully
    this.store.select('profileTags')
      .first(profile => profile && profile['org_registration_success'] === true)
      .subscribe( datas => {
        this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
        this.uploadingData = false;
        this.toastr.success('Successfully registered organization', '', {
          timeOut: 3000
        });
      });

    // Org Registration Failed
    this.store.select('organizationTags')
      .first(profile => profile && profile['org_registration_failed'] === true)
      .subscribe( datas => {
        this.uploadingData = false;
        this.toastr.success('Organization registration failed', '', {
          timeOut: 3000
        });
      });

  }

  /**
   * Skill Search input handler
   * @param query
   */
  onSearchChange(query) {
    if (query || query !== '') {
      this.store.dispatch({ type: AuthActions.SEARCH_SKILL, payload: query });
    }
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
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
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

}
