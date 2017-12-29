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
import { ProfileActions } from 'app/actions/profile.action';

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
  userSearchEnabled = true;
  hideProfiles = false;
  claimingUserSet = false;
  inputNameListener: any;
  showTerms = false;

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
  claimUserProfileDetails: any;

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

    /**
     * Claim profile state check
     */
    this.claimProfileState$ = claimProfileStore.select('claimProfileTags');
    this.claimProfileState$.subscribe((state) => {
      this.claimProfileState = state;
      this.hideProfiles = false;
    });

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      // console.log(state);
      this.petTag = state;

      if (!this.claimingUserSet && state && state['claim_user_info'] && state['claim_user_info']['SUCCESS']['user']) {
        this.claimUserProfileDetails = state['claim_user_info']['SUCCESS']['user'];
        // console.log('this.claimUserProfileDetails', this.claimUserProfileDetails);
        // check if imported user
        if (this.claimUserProfileDetails && this.claimUserProfileDetails['other']['isImported'] === true) {
          // console.log('imported profile');
          // console.log('fill user info and disable name input listener');
          this.claimingUserSet = true;
          this.inputNameListener.unsubscribe();
          this.buildForm();
          this.regFormBasic.controls['name'].setValue(this.claimUserProfileDetails['name']['firstName'] + ' ' + this.claimUserProfileDetails['name']['lastName']);
          this.regFormBasic.controls['username'].setValue(this.claimUserProfileDetails['username']);
          this.regFormBasic.controls['email'].setValue(this.claimUserProfileDetails['email']);
          this.regFormBasic.controls['phone'].setValue(this.claimUserProfileDetails['contact']['contactNumber']);
        }
      }
    });
    this.isPhotoAdded = false;

    // if redriect url there
    if (this.route.snapshot.queryParams) {
      this.routeQuery = Object.assign({}, this.route.snapshot.queryParams);

      if (this.routeQuery && this.routeQuery['action'] === 'claim_profile') {
        const importedUsername = this.routeQuery['username'];
        // search for user details
        this.store.dispatch({ type: AuthActions.SEARCH_USER_BY_USERNAME, payload: importedUsername });
      }
    }

    this.buildForm();
  }

  // showing terms
  // showTerms() {
  //   this.modalService.open('termsAndConditions');
  // }

  // closeing terms
  closeTerms() {
    this.modalService.close('termsAndConditions');
  }

  // terms show/hide
  termsAction(action: string) {
    // console.log('terms value', this.showTerms);
    if (action === 'hide') {
      this.showTerms = false;
    } else {
      this.showTerms = true;
    }
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

    if (this.route.snapshot.queryParams['ev']) {
      if (this.route.snapshot.queryParams['ev'] === 'dwc2017') {
        this.dwc = true;
        if (this.routeQuery) {
          this.routeQuery['dwc2017'] = 'true';
        }
        // console.log(this.routeQuery);
      }
    }

    const currentUrl = this.router.url;
    // console.log(currentUrl);

    /**
     * Listening for the name value
     */
    this.inputNameListener = this.regFormBasic.get('name').valueChanges.debounceTime(200).subscribe((searchProfileName) => {
      if (this.userSearchEnabled) {
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
      img: 'https://d33wubrfki0l68.cloudfront.net/2e71b712243279d510245bad8c3e48eeab00690d/7f58a/img/registration_signup_illustration.png'
    };
  }

  // Init Reg Form
  buildForm(): void {
    this.regFormBasic = this.fb.group({
      'name' : ['', [Validators.required]],
      'username' : ['', [
          Validators.required,
          FormValidation.noWhitespaceValidator,
          FormValidation.noCapitalLettersValidator,
          FormValidation.usernameMaxlengthValidator
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
    if (value.length >= 4) {
      this.store.dispatch({ type: AuthActions.USER_EXISTS_CHECK, payload: value });
    } else {
      if (this.petTag && this.petTag.user_unique) {
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
    if (control.value === '') {
      return;
    }
    const pass = this.regFormBasic.controls['password'].value;
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

  onSaveUsernameChanged(value: boolean) {
    this.saveUsername = value;
    this.routeQuery['dwc2017'] = value;
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
    // checking if all required fields with valid info available before submitting the form
    if (!this.regFormBasic.valid) {
      console.log('invalid form');
      return false;
    }
    // } else {
    //   console.log('valid form');
    //   return false;
    // }

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
    // console.log('form body', form);

    if (typeof this.claimUserProfileDetails !== 'undefined' && this.claimingUserSet === true) {

      form.other['isImported'] = false;
      form['handle'] = this.claimUserProfileDetails.handle || this.claimUserProfileDetails.profileId;
      // claim user profile
      this.store.dispatch({ type: AuthActions.USER_PROFILE_CLAIM, payload: form });

    } else {

      // register new user
      this.store.dispatch({ type: AuthActions.USER_REGISTRATION_BASIC, payload: form });

    }

    this.store.select('loginTags').take(2).subscribe(data => {
        if (data['user_basic_reg_success'] === true ) {
          if (data && data['user_token']) {
              localStorage.setItem('access_token', data['user_token']);
          }
          this.modalService.open('otpWindow');
        }
    });
  }



  otpNotRecieved() {
    this.modalService.close('otpWindow');
    this.modalService.open('otpChangeNumber');
  }

  /**
   * Is it a valid phone number
   */
  isPhoneValid(event: any) {
  }


  /**
   * Get Phone number state
   */
  getNumberState(e: any) {
  }

  /**
   * Save country
   */
  saveCountry(country: any) {
    this.country = country;
  }

  /**
   * Select the profile from the list
   */
  selectProfile(profileHandle: string) {
    this.userSearchEnabled = false;
    setTimeout(() => {
      this.userSearchEnabled = true;
    }, 3000);
    if (profileHandle && this.claimProfileState.claim_profiles.length > 0) {
      this.claimingUserSet = true;
      this.claimUserProfileDetails = _.find(this.claimProfileState.claim_profiles, { 'handle': profileHandle });
      // console.log('profile found', this.claimUserProfileDetails);
      this.buildForm();
      this.regFormBasic.controls['name'].setValue(this.claimUserProfileDetails['name']);
      this.regFormBasic.controls['username'].setValue(this.claimUserProfileDetails['extra']['username']);
      this.regFormBasic.controls['email'].setValue(this.claimUserProfileDetails['email']);
      this.regFormBasic.controls['phone'].setValue(this.claimUserProfileDetails['contact']['mobile']['mobile']);

      this.claimProfileState.claim_profiles = [];
    }
    this.triggerHideProfiles();
  }

  triggerHideProfiles() {
    setTimeout(() => {
      this.hideProfiles = true;
    }, 500);
  }
}
