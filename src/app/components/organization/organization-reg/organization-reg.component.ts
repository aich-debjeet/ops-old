import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormValidation, DatabaseValidator } from '../../../helpers/form.validator';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
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
import * as _ from 'lodash';

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
  tagState$: Observable<Follow>;
  skillSelectionPage: any;

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

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private databaseValidator: DatabaseValidator,
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
      this.skillSelectionPage = state;
      if (state && state.industries) {
        this.industries = state.industries;
      }
    });

    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES});

    // Get own user handle
    this.store.select('profileTags')
      .first(profile => profile['current_user_profile_loading'] === true)
      .subscribe( data => {
        if (data['profile_navigation_details'].isOrganization === true) {
          this.router.navigateByUrl('/org/page/profile');
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
      'org_name': ['GPL Design Studio', [Validators.required]],
      'org_username': ['', [Validators.required, FormValidation.noWhitespaceValidator],
        this.databaseValidator.userNameValidation.bind(this.databaseValidator)
      ],
      'org_type': ['', Validators.required],
      'org_industry_type': ['', Validators.required],
      'org_location': ['', Validators.required],
      'org_service': ['Skill1, Skill2, Skill3', Validators.required]
    })
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
    // console.log('industrySelected', industrySelected);
    let industryObj = {};
    if (industrySelected && industrySelected.name) {
      industryObj = {
        name : industrySelected.name,
        code : industrySelected.code,
        active : true
      }
    }
    // console.log('industryObj', industryObj); return;
    if (!this.orgReg.valid) {
      return false;
    }
    const org_servive = value.org_service.split(/\s*,\s*/);

    const data = {
        industryList : [ industryObj ],
        organizationName : value.org_name,
        services: org_servive,
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
          // latitude: this.latitude,
          // longitude: this.longitude
        },
        accountType : [{
          'name': value.org_type,
          'typeName': 'organization'
        }],
        managedBy : this.userHandle,
        active : true
    }

    // console.log('form body ', data); return;

    this.store.dispatch({ type: OrganizationActions.ORGANIZATION_REGISTRATION, payload: data });

    // Org Registration successfully
    this.store.select('profileTags')
      .first(profile => profile['org_registration_success'] === true)
      .subscribe( datas => {
        this.toastr.success('Successfully registered organization');
        this.router.navigateByUrl('/org/page');
      });

    // Org Registration Failed
    this.store.select('organizationTags')
      .first(profile => profile['org_registration_failed'] === true)
      .subscribe( datas => {
        this.toastr.success('Organization registration failed');
      });

  }

  /**
   * Skill Search input handler
   * @param query
   */
  onSearchChange(query) {
    console.log(query);
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
      console.log(autocomplete);
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
          // console.log(place);

          for (let i = 0; i < place.address_components.length; i++) {
            const addressType = place.address_components[i].types[0];
            console.log(addressType);
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
