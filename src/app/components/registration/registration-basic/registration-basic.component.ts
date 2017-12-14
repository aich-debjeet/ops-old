import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalService } from '../../../shared/modal/modal.component.service';
import { Store } from '@ngrx/store';
import { Register, UserTag, initialTag, RightBlockTag, initialBasicRegTag, BasicRegTag } from '../../../models/auth.model';
import { ClaimProfileModel } from 'app/models/claim-profile.model';
import { AuthRightBlockComponent } from '../../../shared/auth-right-block/auth-right-block.component';
import { CountrySelectorComponent } from '../../../shared/country-selector/country-selector.component';

// helper
import { passwordConfirmation } from '../../../helpers/password.validator';
import { FormValidation, DatabaseValidator } from '../../../helpers/form.validator';
import { TokenService } from '../../../helpers/token.service';

// Action
import { AuthActions } from '../../../actions/auth.action'

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import { ClaimProfileActions } from 'app/actions/claim-profile.action';

import * as _ from 'lodash';

export class RegValue {
  mainTitle: string;
  description: string;
  loginLink: Boolean;
  button_text: string;
  button_link: string;
}

@Component({
  selector: 'app-registration-basic',
  templateUrl: './registration-basic.component.html',
  providers: [DatabaseValidator, ModalService],
  styleUrls: ['./registration-basic.component.scss']
})

export class RegistrationBasicComponent implements OnInit {
  countDown;
  counter = 60;
  isPhotoAdded: boolean;
  passwordShow = false;
  country: any;
  saveUsername = true;
  routeQuery: any;
  claimProfile: any;
  userSearchEnabled = true;
  hideProfiles = false;

  rightCom: RightBlockTag;
  tagState$: Observable<BasicRegTag>;
  claimProfileState$: Observable<ClaimProfileModel>;
  claimProfileState: any;
  private tagStateSubscription: Subscription;
  petTag = initialBasicRegTag;
  Suggested: String[];
  modals: any;
  resendingOtp = false;
  phone: string;

  public dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public regFormBasic: FormGroup;
  public otpForm: FormGroup;
  public newNumberForm: FormGroup;
  redrectUrl: any;
  dwc: boolean;

  passwordShowToggle() {
    if (this.passwordShow === true) {
      this.passwordShow = false;
    } else {
      this.passwordShow = true;
    }
  }

  constructor(
    private fb: FormBuilder,
    private store: Store<BasicRegTag>,
    private claimProfileStore: Store<ClaimProfileModel>,
    private element: ElementRef,
    private databaseValidator: DatabaseValidator,
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    public modalService: ModalService,
    public tokenService: TokenService
    ) {
    // if redriect url there
    if (this.route.snapshot.queryParams) {
      this.routeQuery = Object.assign({}, this.route.snapshot.queryParams);
    }

    if (this.route.snapshot.queryParams['ev']) {
      if (this.route.snapshot.queryParams['ev'] === 'dwc2017') {
        this.dwc = true;
        this.routeQuery['dwc2017'] = 'true';
        console.log(this.routeQuery);
      }
    }

    const currentUrl = this.router.url;

    console.log(currentUrl);

    /**
     * Claim profile state check
     */
    this.claimProfileState$ = claimProfileStore.select('claimProfileTags');
    this.claimProfileState$.subscribe((state) => {
      this.claimProfileState = state;
      this.hideProfiles = false;
      console.log('this.claimProfileState', this.claimProfileState);
    });

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      console.log(state);
        this.petTag = state;
    });
    this.isPhotoAdded = false;

    this.buildForm();
  }

  // showing terms
  showTerms() {
    this.modalService.open('termsAndConditions');
  }

  // showing thank you popup
  showThankyou() {
    this.modalService.open('thankyouModal');
  }

  startTimer() {
    this.countDown = Observable.timer(0, 1000)
      .take(this.counter)
      .map(() => --this.counter);
  }

  useThisUsername(selectUsername: string) {
    this.regFormBasic.controls['username'].setValue(selectUsername);
  }

  ngOnInit() {

    /**
     * Listening for the name value
     */
    this.regFormBasic.get('name').valueChanges.debounceTime(200).subscribe((searchProfileName) => {
      if (this.userSearchEnabled) {
        // console.log('trigger search', searchProfileName);
        this.claimProfileStore.dispatch({
          type: ClaimProfileActions.SEARCH_PROFILE,
          payload: searchProfileName
        });
      }
    });


    this.rightCom = {
      mainTitle: 'Create Your Account',
      secondHead: '',
      description: 'Welcome to One Page Spotlight family where we are committed to grow together.'
        + ' An OTP number will be sent to your email or phone number after registration for account verification.',
      loginLink: true,
      button_text: 'Login',
      button_link: '/login',
      page: false,
      img: 'http://d33wubrfki0l68.cloudfront.net/2e71b712243279d510245bad8c3e48eeab00690d/7f58a/img/registration_signup_illustration.png'
    };
  }

  // Init Reg Form
  buildForm(): void {
    this.regFormBasic = this.fb.group({
      'name' : ['', [Validators.required]],
      'username' : ['', [
        Validators.required,
        FormValidation.noWhitespaceValidator
        ],
        this.databaseValidator.userNameValidation.bind(this.databaseValidator)
      ],
      'dob' : ['', [Validators.required],
        this.databaseValidator.validAge.bind(this.databaseValidator)
      ],
      'email' : ['', [
        Validators.required,
        Validators.min(1),
        // Validators.email
        FormValidation.validEmail
        ],
        this.databaseValidator.checkEmail.bind(this.databaseValidator)
      ],
      'gender': ['M', Validators.required],
      'phone' : ['', [
        Validators.required,
        Validators.minLength(4)
        ],
        this.databaseValidator.checkMobile.bind(this.databaseValidator)
      ],
      'password' : ['', [
        Validators.required,
        FormValidation.passwordStrength.bind(this)
      ]],
      'confirmpassword' : ['', [
        Validators.required,
        this.passwordMatchCheck.bind(this)
      ]],
    });

    // OTP Form Builder
    this.otpForm = this.fb.group({
      'otpNumber': ['', [
          FormValidation.validOtp.bind(this)
        ],
      ]
    })

    // OTP new number
    this.newNumberForm = this.fb.group({
      'newNumber': ['', [
          Validators.required,
          Validators.minLength(4)
        ],
        this.databaseValidator.checkMobile.bind(this.databaseValidator)
      ]
    })
  }

  // User user exists
  userExisitCheck(value) {
    console.log(value)
    if (value.length >= 4) {
      this.store.dispatch({ type: AuthActions.USER_EXISTS_CHECK, payload: value });
    } else {
      if (this.petTag && this.petTag.user_unique) {
        console.log('now i am here')
        this.petTag.user_unique = false;
      }
    }
  }

  // OTP Validation
  otpSubmit(value) {
    if (this.otpForm.valid === true) {
      let number = null;
      if (this.newNumberForm.value.newNumber !== undefined && this.newNumberForm.value.newNumber.length > 5) {
        number = this.newNumberForm.value.newNumber;
      } else {
        number = this.regFormBasic.value.phone;
      }
      const send = {
        'number': number,
        'otp': value.otpNumber
      }
      this.store.dispatch({ type: AuthActions.OTP_SUBMIT, payload: send });
      this.store.select('loginTags').take(2).subscribe(data => {
        if (data['user_otp_success'] === true ) {
          this.otpLogin()
          this.modalService.close('otpWindow');
          this.modalService.open('thankyouModal');
        }
      })
      // this.otpValidate(number, value.otpNumber);
    }
  }


  otpLogin() {
    let number = null;
    if (this.newNumberForm.value.newNumber !== undefined && this.newNumberForm.value.newNumber.length > 5) {
      number = this.newNumberForm.value.newNumber;
    } else {
      number = this.regFormBasic.value.phone;
    }

    const form =  {
      'client_id' : 'AKIAI7P3SOTCRBKNR3IA',
      'client_secret': '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',
      'username' : number.toString(),
      'password' : this.otpForm.value.otpNumber,
      'grant_type' : 'password'
    }
    this.store.dispatch({ type: AuthActions.OTP_LOGIN_SUBMIT, payload: form });

  }

  /**
   * Checking for the password if matches with the confirm password on register form
   * @param control: Form confirm password input
   */
  passwordMatchCheck(control: AbstractControl) {
    // console.log(control.value);
    if (control.value === '') {
      return;
    }
    const pass = this.regFormBasic.controls['password'].value;
    // console.log('pass: ' + pass);
    if (control.value !== pass) {
      return { passwordDoesNotMatch: true };
    }
    return null;
  }

  // reg next step
  gotoRegProfile() {
    if (this.routeQuery) {
      this.router.navigate(['/reg/profile'], { queryParams: this.routeQuery });
      return
    }else {
      this.router.navigate(['/reg/profile']);
      return
    }
  }

  reverseDate(string) {
    return string.split('-').reverse().join('-');
  }

  resendOtp() {
    this.resendingOtp = true;
    const number = this.regFormBasic.value.phone;
    this.store.dispatch({ type: AuthActions.OTP_RESEND_SUBMIT, payload: number });
    this.store.select('loginTags').subscribe(data => {
      setTimeout(() => {
        this.resendingOtp = false;
      }, 1500);
    })
  }

  resendOtpOnNewNumber() {
    const reqBody = {
      contact: {
        contactNumber: this.newNumberForm.value.newNumber
      }
    }

    this.store.dispatch({ type: AuthActions.OTP_NUMBER_CHANGE, payload: reqBody });
    this.store.select('loginTags').take(2).subscribe(data => {
      if (data['user_number_cng_success'] === true ) {
        this.regFormBasic.controls['phone'].setValue(this.newNumberForm.value.newNumber)
        this.modalService.close('otpChangeNumber');
        this.modalService.open('otpWindow');
      }
    })
  }



  closeTerms() {
    this.modalService.open('termsAndConditions');
  }

  onSaveUsernameChanged(value: boolean) {
    this.saveUsername = value;
    this.routeQuery['dwc2017'] = value;
    console.log(this.routeQuery);
  }

  /**
   * Submit new number for OTP
   */
  submitNewNumber(value) {
    const form = {

    }
  }

  /**
   * Submit Form
   * @param value
   */
  submitForm(value) {

    // console.log(this.regFormBasic.valid);
    // checking if all required fields with valid info available before submitting the form
    if (!this.regFormBasic.valid) {
      // console.log('invalid form');
      return false;
    }

    // console.log('user type normal');
    // form object
    const form =  {
      'name': {
        'firstName': value.name
      },
      'username': value.username,
      'profileImage': '',
      'gender': value.gender,
      'email':  value.email,
      'password': value.password,
      'isAgent': false,
      'location': '',
      'contact': {
        'contactNumber': value.phone.toString(),
        'countryCode': this.country.callingCodes[0]
      },
      'other': {
        'completionStatus': 1,
        'accountType': [{
          'name': 'Artist',
          'typeName': 'individual'
          }],
        'dateOfBirth': this.reverseDate(value.dob) + 'T05:00:00',
      }
    };

    if (typeof this.claimProfile !== 'undefined') {
      console.log('user type claimed', this.claimProfile);

      form.other['isImported'] = false;
      form['handle'] = this.claimProfile.handle;
      // claim user profile
      this.store.dispatch({ type: AuthActions.USER_PROFILE_CLAIM, payload: form });

    } else {

      // register new user
      this.store.dispatch({ type: AuthActions.USER_REGISTRATION_BASIC, payload: form });

    }

    this.store.select('loginTags').take(2).subscribe(data => {
        if (data['user_basic_reg_success'] === true ) {
          console.log('success otp');
          if (data && data['user_token']) {
              localStorage.setItem('access_token', data['user_token']);
          }
          this.modalService.open('otpWindow');
        }
    })
  }



  otpNotRecieved() {
    this.modalService.close('otpWindow');
    this.modalService.open('otpChangeNumber');
  }

  /**
   * Is it a valid phone number
   */
  isPhoneValid(event: any) {
    //
    console.log(event);
  }


  /**
   * Get Phone number state
   */
  getNumberState(e: any) {
    console.log('phone state', e);
  }

  /**
   * Save country
   */
  saveCountry(country: any) {
    console.log(country);
    this.country = country;
  }

  /**
   * Select the profile from the list
   */
  selectProfile(profileHandle: string) {
    this.userSearchEnabled = false;
    // console.log('disable search');
    setTimeout(() => {
      this.userSearchEnabled = true;
      // console.log('enable search');
    }, 3000);
    if (profileHandle && this.claimProfileState.claim_profiles.length > 0) {
      this.claimProfile = _.find(this.claimProfileState.claim_profiles, { 'handle': profileHandle });
      // console.log('profile found', this.claimProfile);

      this.regFormBasic.controls['name'].setValue(this.claimProfile['name']);
      this.regFormBasic.controls['username'].setValue(this.claimProfile['extra']['username']);
      this.regFormBasic.controls['email'].setValue(this.claimProfile['email']);
      this.regFormBasic.controls['phone'].setValue(this.claimProfile['contact']['mobile']['mobile']);

      this.claimProfileState.claim_profiles = [];
    }
    this.triggerHideProfiles();
  }

  triggerHideProfiles() {
    setTimeout(() => {
      this.hideProfiles = true;
    }, 500);
    // console.log('hide profiles');
  }
}
