import { Component, OnInit, ElementRef , Inject, OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { ModalService } from '../../../shared/modal/modal.component.service';
import { Store } from '@ngrx/store';
import { Register, UserTag, initialBasicRegTag, BasicRegTag } from '../../../models/auth.model';
import { AuthRightBlockComponent } from '../../../shared/auth-right-block/auth-right-block.component';
import { CountrySelectorComponent } from '../../../shared/country-selector/country-selector.component';

// helper
import { passwordConfirmation } from '../../../helpers/password.validator';
import { FormValidation, DatabaseValidator } from '../../../helpers/form.validator';
import { TokenService } from '../../../helpers/token.service';
import { environment } from '../../../../environments/environment';

// Action
import { AuthActions } from '../../../actions/auth.action'

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

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

export class RegistrationBasicComponent implements OnInit, OnDestroy {
  countDown;
  counter = 60;
  isPhotoAdded: boolean;
  passwordShow = false;
  country: any;
  saveUsername = true;
  routeQuery: any;
  userSearchEnabled = true;
  hideProfiles = false;
  inputNameListener: any;
  showTerms = false;

  tagState$: Observable<BasicRegTag>;
  private tagStateSubscription: Subscription;
  petTag = initialBasicRegTag;
  Suggested: String[];
  modals: any;
  resendingOtp = false;
  phone: string;
  imageBaseLink: string = environment.API_IMAGE;

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
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder,
    private store: Store<BasicRegTag>,
    private element: ElementRef,
    private databaseValidator: DatabaseValidator,
    private http: Http,
    private router: Router,
    private route: ActivatedRoute,
    public modalService: ModalService,
    public tokenService: TokenService
    ) {

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {

      if (typeof state !== 'undefined') {
        // console.log(state);
        this.petTag = state;
        // console.log(this.petTag['user_exist']);
      }
    });
    this.isPhotoAdded = false;

    // if redriect url there
    if (this.route.snapshot.queryParams) {
      this.routeQuery = Object.assign({}, this.route.snapshot.queryParams);
    }

    this.buildForm();
  }

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
    // document.body.style.overflow = 'hidden';

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
  }

  // Init Reg Form
  buildForm(): void {
    this.regFormBasic = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [
          Validators.required,
          FormValidation.noWhitespaceValidator,
          FormValidation.usernameLengthValidator,
          FormValidation.noSpecialCharsValidator,
          FormValidation.noCapitalLettersValidator
        ],
        this.databaseValidator.userNameValidation.bind(this.databaseValidator)
      ],
      dob: ['', [Validators.required],
        this.databaseValidator.validAge.bind(this.databaseValidator)
      ],
      email: ['', [
          Validators.required,
          Validators.min(1),
          // Validators.email
          FormValidation.validEmail
        ],
        this.databaseValidator.checkEmail.bind(this.databaseValidator)
      ],
      gender: ['M', Validators.required],
      phone: ['', [
          Validators.required,
          Validators.minLength(4)
        ],
        this.databaseValidator.checkMobile.bind(this.databaseValidator)
      ],
      password: ['', [
        Validators.required,
        FormValidation.passwordStrength.bind(this)
      ]],
      confirmpassword: ['', [
        Validators.required,
        this.passwordMatchCheck.bind(this)
      ]],
    });

    // OTP Form Builder
    this.otpForm = this.fb.group({
      otpNumber: ['', [
          FormValidation.validOtp.bind(this)
        ],
      ]
    })

    // OTP new number
    this.newNumberForm = this.fb.group({
      newNumber: ['', [
          Validators.required,
          Validators.minLength(4),
          FormValidation.validPhone.bind(this)
        ],
        this.databaseValidator.checkMobile.bind(this.databaseValidator)
      ]
    })
  }

  // User user exists
  userExistCheck(value) {
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
        number: number,
        otp: value.otpNumber
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
    if (this.newNumberForm.valid === true ) {
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
      return false;
    }

    // form object
    const form =  {
      name: {
        firstName: value.name
      },
      username: value.username,
      profileImage: '',
      gender: value.gender,
      email:  value.email,
      password: value.password,
      isAgent: false,
      location: '',
      contact: {
        contactNumber: value.phone.toString(),
        countryCode: this.country.callingCodes[0]
      },
      other: {
        completionStatus: 1,
        accountType: [{
          name: 'Artist',
          typeName: 'individual'
          }],
        dateOfBirth: this.reverseDate(value.dob) + 'T05:00:00',
      }
    };
    // console.log('form body', form);

    // register new user
    this.store.dispatch({ type: AuthActions.USER_REGISTRATION_BASIC, payload: form });

    this.store.select('loginTags').take(2).subscribe(data => {
        if (data['user_basic_reg_success'] === true ) {
          if (data && data['user_token']) {
             const token = {access_token: data['user_token']};
              localStorage.setItem('currentUser', JSON.stringify(token));
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
   * Save country
   */
  saveCountry(country: any) {
    this.country = country;
  }

  triggerHideProfiles() {
    setTimeout(() => {
      this.hideProfiles = true;
    }, 500);
  }
  ngOnDestroy() {
    document.body.style.overflow = null;
  }
}
