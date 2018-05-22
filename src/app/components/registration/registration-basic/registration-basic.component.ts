// ng imports
import { Component, OnInit, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

// third party dependancies
import { IDatePickerConfig } from 'ng2-date-picker';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

// internal dependencies and helpers
import { ModalService } from '../../../shared/modal/modal.component.service';
import { FormValidation, DatabaseValidator } from '../../../helpers/form.validator';
import { environment } from '../../../../environments/environment';
import { CountrySelectorComponent } from '../../../shared/country-selector/country-selector.component';

import { initialBasicRegTag, BasicRegTag } from '../../../models/auth.model';

import { AuthActions } from '../../../actions/auth.action';
import { AuthService } from '../../../services/auth.service';

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
  showTerms = false;
  uploadingFormData = false;
  regState$: Observable<BasicRegTag>;
  regState = initialBasicRegTag;
  resendingOtp = false;
  imageBaseLink: string = environment.API_IMAGE;

  datePickerConfig: IDatePickerConfig = {
    showMultipleYearsNavigation: true,
    disableKeypress: true,
    format: 'DD-MM-YYYY',
    locale: 'en'
  };

  public otpForm: FormGroup;
  public regFormBasic: FormGroup;
  public newNumberForm: FormGroup;

  // otp numbers
  @ViewChild('otpNum1') otpNum1: ElementRef;
  @ViewChild('otpNum2') otpNum2: ElementRef;
  @ViewChild('otpNum3') otpNum3: ElementRef;
  @ViewChild('otpNum4') otpNum4: ElementRef;
  @ViewChild('otpNum5') otpNum5: ElementRef;
  @ViewChild('otpNum6') otpNum6: ElementRef;

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
    public modalService: ModalService,
    private authService: AuthService
  ) {

    // store select
    this.regState$ = store.select('loginTags');
    // observe store
    this.regState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        this.regState = state;
        if (typeof state['reg_basic_uploading_form_data'] !== 'undefined'
          && state['reg_basic_uploading_form_data'] === false
          && typeof state['reg_basic_uploaded_form_data'] !== 'undefined'
          && state['reg_basic_uploaded_form_data'] === true
        ) {
          this.uploadingFormData = false;
        }
        if (state['user_basic_reg_success'] === true ) {
          if (state['user_token']) {
            const token = {access_token: state['user_token']};
            localStorage.setItem('currentUser', JSON.stringify(token));
          }
          this.modalService.open('otpWindow');
        }
        if (state['user_number_cng_success'] === true ) {
          this.regFormBasic.controls['phone'].setValue(this.newNumberForm.value.newNumber);
          this.modalService.close('otpChangeNumber');
          this.modalService.open('otpWindow');
        }
        if (state['user_otp_success'] === true) {
          this.otpLogin();
          this.modalService.close('otpWindow');
          this.router.navigate(['/reg/addskill']);
        }
      }
    });

    // build reactive forms
    this.buildForm();
  }

  // closeing terms
  closeTerms() {
    this.modalService.close('termsAndConditions');
  }

  // terms show/hide
  termsAction(action: string) {
    if (action === 'hide') {
      this.modalService.close('termsPopup');
    } else {
      this.modalService.open('termsPopup');
    }
  }

  startTimer() {
    this.countDown = Observable.timer(0, 1000)
      .take(this.counter)
      .map(() => --this.counter);
  }

  /**
   * select username from suggestions
   * @param selectUsername
   */
  useThisUsername(selectUsername: string) {
    this.regFormBasic.controls['username'].setValue(selectUsername);
  }

  ngOnInit() { }

  // build all forms
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
        // this.databaseValidator.checkMobile.bind(this.databaseValidator)
        this.checkMobile.bind(this)
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

  /**
   * check if number is exist on the DB
   * @param control
   */
  checkMobile(control: AbstractControl) {
    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
          const contactDetails = {
            contactNumber: control.value,
            countryCode: this.country.callingCodes[0]
          };
          this.authService.mobileNumberCheck(contactDetails).subscribe( data => {
            if (data.SUCCESS.code === 1) {
              resolve({ 'isMobileUnique': true });
            }
            resolve(null);
          });
      }, 1000);
    });
    return q;
  }

  // focus on next otp number
  nextOtpNum(num: number) {
    if (num > 0 && num < 6) {
      const nextNum = num + 1;
      const nextOtpInput = 'otpNum' + nextNum.toString();
      this[nextOtpInput].nativeElement.focus();
    }
  }

  // user user exists
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

  /**
   * Resend OTP on existing number
   */
  resendOtp() {
    this.resendingOtp = true;
    const number = this.regFormBasic.value.phone;
    this.store.dispatch({ type: AuthActions.OTP_RESEND_SUBMIT, payload: number });
    setTimeout(() => {
      this.resendingOtp = false;
    }, 1500);
  }

  /**
   * Resend OTP on new number
   */
  resendOtpOnNewNumber() {
    if (this.newNumberForm.valid === true ) {
      const reqBody = {
        contact: {
          contactNumber: this.newNumberForm.value.newNumber
        }
      }
      this.store.dispatch({ type: AuthActions.OTP_NUMBER_CHANGE, payload: reqBody });
    }
  }

  /**
   * submit reg form
   * @param value: form data
   */
  submitForm(value) {
    // checking if all required fields with valid info available before submitting the form
    if (!this.regFormBasic.valid) {
      // console.log('invalid', this.regFormBasic);
      return false;
    }

    // prepare form object for the API
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
    this.uploadingFormData = true;
    // console.log('form body', form); return;

    // register new user
    this.store.dispatch({ type: AuthActions.USER_REGISTRATION_BASIC, payload: form });
  }

  /**
   * Switch to change number modal
   */
  otpNotRecieved() {
    this.modalService.close('otpWindow');
    this.modalService.open('otpChangeNumber');
  }

  /**
   * Switch back to OTP modal
   */
  backToOtp() {
    this.modalService.close('otpChangeNumber');
    this.modalService.open('otpWindow');
  }

  /**
   * update country
   */
  saveCountry(country: any) {
    this.country = country;
    // trigger phone number check
    this.regFormBasic.controls['phone'].updateValueAndValidity();
  }

  /**
   * disable observales and listeners here
   */
  ngOnDestroy() { }
}
