import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormValidation, DatabaseValidator } from '../../../helpers/form.validator';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Follow, Login } from '../../../models/auth.model';
import { AuthActions } from '../../../actions/auth.action';
import { OrganizationActions } from '../../../actions/organization.action';

import { Store } from '@ngrx/store';
import {} from '@types/googlemaps';

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
  search: String;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private databaseValidator: DatabaseValidator,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private store: Store<Login>
  ) {
    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      this.skillSelectionPage = state;
      console.log(state);
    });
   }

  ngOnInit() {
    this.buildForm();

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
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  // Init Reg Form
  buildForm() {
    this.orgReg = this.fb.group({
      'org_name' : ['', [Validators.required]],
      'org_username' : ['', [
        Validators.required,
        FormValidation.noWhitespaceValidator
        ],
        this.databaseValidator.userNameValidation.bind(this.databaseValidator)
      ],
      'org_type': ['', Validators.required],
      'org_location': ['', Validators.required],
      'org_service': ['', Validators.required],
    //   'dob' : ['', [Validators.required],
    //     this.databaseValidator.validAge.bind(this.databaseValidator)
    //   ],
    //   'email' : ['', [
    //     Validators.required,
    //     Validators.min(1),
    //     // Validators.email
    //     FormValidation.validEmail
    //     ],
    //     this.databaseValidator.checkEmail.bind(this.databaseValidator)
    //   ],
    //   'gender': ['M', Validators.required],
    //   'phone' : ['', [
    //     Validators.required,
    //     Validators.minLength(4)
    //     ],
    //     this.databaseValidator.checkMobile.bind(this.databaseValidator)
    //   ],
    //   'password' : ['', [
    //     Validators.required,
    //     FormValidation.passwordStrength.bind(this)
    //   ]],
    //   'confirmpassword' : ['', [
    //     Validators.required,
    //     this.passwordMatchCheck.bind(this)
    //   ]],
    // });

    // // OTP Form Builder
    // this.otpForm = this.fb.group({
    //   'otpNumber': ['', [
    //       FormValidation.validOtp.bind(this)
    //     ],
    //   ]
    // })

    // // OTP new number
    // this.newNumberForm = this.fb.group({
    //   'newNumber': ['', [
    //       Validators.required,
    //       Validators.minLength(4)
    //     ],
    //     this.databaseValidator.checkMobile.bind(this.databaseValidator)
    //   ]
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
    console.log(value);
    console.log(this.searchElementRef.nativeElement.value);
    console.log(value.org_service.split(/\s*,\s*/));

    const data = {
        industryList : [
            {
                name : 'Film',
                code : 'FILM',
                active : true
            }
        ],
        organizationName : value.org_name,
        services: value.org_service,
        address : {
            line1 : '3033 Third Floor',
            line2 : 'HAL 3Rd Stage Indiranagar',
            city : 'Bangalore',
            state : 'Karnataka',
            country : 'India',
            postalCode : '560078'
        },
        extras: {
          username: value.org_username,
          memberList: [{
              memberHandle: 'S_D124382B_DD5F_4ABA_BC0B_306044413E2C',
              isAdmin: true,
              status: 'accept'
            }],
          location: ''
        },
        accountType : [{
          'name': value.org_type,
          'typeName': 'organization'
        }],
        managedBy : 'S_D124382B_DD5F_4ABA_BC0B_306044413E2C',
        active : true
    }


    this.store.dispatch({ type: OrganizationActions.ORGANIZATION_REGISTRATION, payload: data });
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

}
