// ng imports
import { Component, OnInit, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

// third party dependancies
import { IDatePickerConfig } from 'ng2-date-picker';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import * as _ from 'lodash';

// internal dependencies and helpers
import { ModalService } from '../../../shared/modal/modal.component.service';
import { FormValidation, DatabaseValidator } from '../../../helpers/form.validator';
import { environment } from '../../../../environments/environment';
import { CountrySelectorComponent } from '../../../shared/country-selector/country-selector.component';

import { Register, initialBasicRegTag, BasicRegTag } from '../../../models/auth.model';

import { AuthActions } from '../../../actions/auth.action';
import { ProfileActions } from 'app/actions/profile.action';

@Component({
  selector: 'app-registration-basic',
  templateUrl: './registration-basic.component.html',
  styleUrls: ['./registration-basic.component.scss'],
  providers: [ DatabaseValidator ]
})

export class RegistrationBasicComponent implements OnInit, OnDestroy {
  countDown;
  counter = 60;
  passwordShow = false;
  country: any;
  routeQuery: any;
  showTerms = false;

  // otp numbers
  @ViewChild('otpNum1') otpNum1: ElementRef;
  @ViewChild('otpNum2') otpNum2: ElementRef;
  @ViewChild('otpNum3') otpNum3: ElementRef;
  @ViewChild('otpNum4') otpNum4: ElementRef;
  @ViewChild('otpNum5') otpNum5: ElementRef;
  @ViewChild('otpNum6') otpNum6: ElementRef;

  datePickerConfig: IDatePickerConfig = {
    showMultipleYearsNavigation: true,
    disableKeypress: true,
    format: 'DD-MM-YYYY',
    locale: 'en'
  };

  tagState$: Observable<BasicRegTag>;
  regState = initialBasicRegTag;
  resendingOtp = false;
  imageBaseLink: string = environment.API_IMAGE;

  // public dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public regFormBasic: FormGroup;
  public otpForm: FormGroup;
  public newNumberForm: FormGroup;

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
    private databaseValidator: DatabaseValidator,
    private router: Router,
    private route: ActivatedRoute,
    public modalService: ModalService
    ) {

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        this.regState = state;
      }
    });

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
    if (action === 'hide') {
      this.showTerms = false;
    } else {
      this.showTerms = true;
    }
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
    // setTimeout(() => {
    //   this.modalService.open('otpWindow');
    // }, 1000);
  }

  // Init Reg Form
  buildForm(): void {
    this.regFormBasic = this.fb.group({
      name: ['Abhijeet Salunkhe', [Validators.required],
        this.databaseValidator.checkForValidName.bind(this)
      ],
      username: ['abhijeet', [
          Validators.required,
          FormValidation.noWhitespaceValidator,
          FormValidation.usernameLengthValidator,
          FormValidation.noSpecialCharsValidator,
          FormValidation.noCapitalLettersValidator
        ],
        this.databaseValidator.userNameValidation.bind(this.databaseValidator)
      ],
      dob: ['18-12-1991', [
          Validators.required,
          FormValidation.validateAge
        ]
      ],
      email: ['abhijeet.salunkhe@aeione.com', [
          Validators.required,
          Validators.min(3),
          FormValidation.validEmail
        ],
        this.databaseValidator.checkEmail.bind(this.databaseValidator)
      ],
      gender: ['M', Validators.required],
      phone: ['9867884320', [
          Validators.required,
          Validators.minLength(4)
        ],
        this.databaseValidator.checkMobile.bind(this.databaseValidator)
      ],
      password: ['admin@123', [
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
      otpNum1: ['', [Validators.required]],
      otpNum2: ['', [Validators.required]],
      otpNum3: ['', [Validators.required]],
      otpNum4: ['', [Validators.required]],
      otpNum5: ['', [Validators.required]],
      otpNum6: ['', [Validators.required]]
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

  // focus on next otp number
  nextOtpNum(num: number) {
    if (num > 0 && num < 6) {
      const nextNum = num + 1;
      const nextOtpInput = 'otpNum' + nextNum.toString();
      this[nextOtpInput].nativeElement.focus();
    }
  }

  // User user exists
  userExistCheck(value) {
    if (value.length >= 4) {
      this.store.dispatch({ type: AuthActions.USER_EXISTS_CHECK, payload: value });
    } else {
      if (this.regState && this.regState.user_unique) {
        this.regState.user_unique = false;
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
      // console.log('otp form data', value); return;
      const otpValue = value.otpNum1.toString() +
                       value.otpNum2.toString() +
                       value.otpNum3.toString() +
                       value.otpNum4.toString() +
                       value.otpNum5.toString() +
                       value.otpNum6.toString();
      const otpData = {
        number: number,
        otp: otpValue
      }
      this.store.dispatch({ type: AuthActions.OTP_SUBMIT, payload: otpData });
      this.store.select('loginTags').take(2).subscribe(data => {
        if (data['user_otp_success'] === true ) {
          this.otpLogin();
          this.modalService.close('otpWindow');
          this.router.navigate(['/reg/addskill']);
        }
      });
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
      // console.log('invalid', this.regFormBasic);
      return false;
    }

    // form object
    const form =  {
      name: {
        firstName: value.name.trim()
      },
      username: value.username,
      profileImage: '',
      gender: value.gender,
      email:  value.email.trim(),
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
    // console.log('form body', form); return;

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

  backToOtp() {
    this.modalService.close('otpChangeNumber');
    this.modalService.open('otpWindow');
  }

  /**
   * Save country
   */
  saveCountry(country: any) {
    this.country = country;
  }

  ngOnDestroy() { }
}
