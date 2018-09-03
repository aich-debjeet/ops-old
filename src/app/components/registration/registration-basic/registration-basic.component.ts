// ng imports
import { Component, OnInit, ElementRef, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import {INgxMyDpOptions} from 'ngx-mydatepicker';
import { Router } from '@angular/router';
import { Modal } from '../../../shared/modal-new/Modal';

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

// models
import { initialBasicRegTag, BasicRegTag } from '../../../models/auth.model';

import { AuthActions } from '../../../actions/auth.action';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration-basic',
  templateUrl: './registration-basic.component.html',
  styleUrls: ['./registration-basic.component.scss'],
  providers: [ DatabaseValidator ],
})

export class RegistrationBasicComponent implements OnInit, OnDestroy, AfterViewInit {
  passwordShow = false;
  country = {
    callingCodes: ['91']
  };
  showTerms = false;
  uploadingFormData = false;
  updatingNewNumber = false;
  regState$: Observable<BasicRegTag>;
  regState = initialBasicRegTag;
  resendingOtp = false;
  imageBaseLink = environment.API_IMAGE;
  claimValue: any;
  claimData: any;
  claimActive = false;

  myOptions: INgxMyDpOptions = {
    showTodayBtn: false,
    dateFormat: 'dd-mm-yyyy',
  };

  @ViewChild('claimPopup') claimPopup: Modal;
  @ViewChild('otpPopup') otpPopup: Modal;
  @ViewChild('termsPopup') termsPopup: Modal;

  datePickerConfig: IDatePickerConfig = {
    showMultipleYearsNavigation: true,
    disableKeypress: true,
    format: 'DD-MM-YYYY',
    locale: 'en'
  };

  contactNumber = '';
  countryCode = '';

  public otpForm: FormGroup;
  public regFormBasic: FormGroup;
  public newNumberForm: FormGroup;
  otpOpenOnce = true;

  // otp numbers
  @ViewChild('otpNum1') otpNum1: ElementRef;
  @ViewChild('otpNum2') otpNum2: ElementRef;
  @ViewChild('otpNum3') otpNum3: ElementRef;
  @ViewChild('otpNum4') otpNum4: ElementRef;
  @ViewChild('otpNum5') otpNum5: ElementRef;
  @ViewChild('otpNum6') otpNum6: ElementRef;

  @ViewChild('countrySelReg') countrySelectorReg: CountrySelectorComponent;
  @ViewChild('countrySelOtp') countrySelectorOtp: CountrySelectorComponent;

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
    private asyncValidator: DatabaseValidator,
    private router: Router,
    public modalService: ModalService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {

    // store select
    this.regState$ = store.select('loginTags');
    // observe store
    this.regState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        this.regState = state;
        if (state['reg_basic_uploading_form_data'] === false && state['reg_basic_uploaded_form_data'] === true) {
          this.uploadingFormData = false;
        }
        if (state['user_basic_reg_success'] === true) {
          if (state['user_token']) {
            const token = {access_token: state['user_token']};
            localStorage.setItem('tempAccessToken', JSON.stringify(token));
          }
          if (this.otpOpenOnce) {
            // this.modalService.open('otpWindow');
            // this.otpOpenOnce = false;
          }
        }
        if (state['number_update_sent'] === false && state['number_update_success'] === true) {
          this.updatingNewNumber = false;
          this.backToOtp();
        }
        if (state['user_otp_success'] === true) {
          this.otpPopup.close();
          this.router.navigate(['/reg/addskill']);
        }
      }
    });

    // build reactive forms
    this.buildForm();
  }

  getContactDetails(cType: string) {
    if (this.regState['reg_basic_form_data']
      && this.regState['reg_basic_form_data']['contact']
    ) {
      if (cType === 'number' && this.regState['reg_basic_form_data']['contact']['contactNumber']) {
        return this.regState['reg_basic_form_data']['contact']['contactNumber'];
      }
      if (cType === 'country' && this.regState['reg_basic_form_data']['contact']['countryCode']) {
        return this.regState['reg_basic_form_data']['contact']['countryCode'];
      }
    }
  }

  // closeing terms
  closeTerms() {
    this.modalService.close('termsAndConditions');
  }

  // terms show/hide
  termsAction(action: string) {
    if (action === 'hide') {
      this.termsPopup.close();
    } else {
      this.termsPopup.open();
    }
  }

  /**
   * select username from suggestions
   * @param selectUsername
   */
  useThisUsername(selectUsername: string) {
    this.regFormBasic.controls['username'].setValue(selectUsername);
  }

  ngOnInit() {
    this.store.dispatch({ type: AuthActions.STORE_COUNTRY_CODE, payload: this.country.callingCodes[0] });
  }

  ngAfterViewInit() {
    this.countrySelectorReg.initCountrySelector('country-options-reg');
  }

  // build all forms
  buildForm(): void {
    this.regFormBasic = this.fb.group({
      name: ['', [Validators.required],
        this.asyncValidator.checkForValidName.bind(this)
      ],
      username: ['', [
          Validators.required,
          FormValidation.noWhitespaceValidator,
          FormValidation.usernameLengthValidator,
          FormValidation.noSpecialCharsValidator,
          FormValidation.noCapitalLettersValidator
        ],
        // this.asyncValidator.userNameValidation.bind(this)
      ],
      dob: ['', [
          Validators.required,
          FormValidation.validateAge
        ]
      ],
      email: ['', [
          Validators.required,
          Validators.min(3),
          FormValidation.validEmail
        ],
        this.asyncValidator.checkEmail.bind(this)
      ],
      gender: ['M', Validators.required],
      phone: ['', [
          Validators.required,
          Validators.minLength(4),
          FormValidation.validPhone.bind(this)
        ],
        // this.asyncValidator.checkMobile.bind(this)
        this.checkMobile.bind(this)
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
        this.checkMobile.bind(this)
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
            contactNumber: control.value.trim(),
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
  nextOtpNum(e: any, pos: number) {
    if (e.keyCode === 8) {
      if (pos > 0 && pos < 7) {
        const prevNum = pos - 1;
        if (prevNum > 0) {
          const prevOtpInput = 'otpNum' + prevNum.toString();
          setTimeout(() => { this[prevOtpInput].nativeElement.focus(); }, 10);
        }
        return true;
      }
    } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
      if (pos > 0 && pos < 6) {
        const nextNum = pos + 1;
        const nextOtpInput = 'otpNum' + nextNum.toString();
        setTimeout(() => { this[nextOtpInput].nativeElement.focus(); }, 10);
      }
      return true;
    }
    return false;
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
      let phoneNumber = null;
      if (this.newNumberForm.controls['newNumber'] !== undefined && this.newNumberForm.controls['newNumber'].value.length > 5) {
        phoneNumber = this.newNumberForm.controls['newNumber'].value;
      } else {
        phoneNumber = this.regFormBasic.value.phone;
      }
      // console.log('otp form data', value); return;
      const otpValue = value.otpNum1.toString() +
                       value.otpNum2.toString() +
                       value.otpNum3.toString() +
                       value.otpNum4.toString() +
                       value.otpNum5.toString() +
                       value.otpNum6.toString();
      const otpData = {
        contactNumber: phoneNumber,
        countryCode: this.country.callingCodes[0],
        otp: otpValue
      }
      if (this.claimActive) {
        const data = {
          handle: this.claimData['SUCCESS'].handle,
          user: this.claimData['user'],
          otp: otpValue
        }
        this.store.dispatch({ type: AuthActions.CLAIM_OTP_ACTIVE, payload: data });
        return
      }
      this.store.dispatch({ type: AuthActions.OTP_SUBMIT, payload: otpData });
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
    const resendOtpData = {
      contactNumber: this.getContactDetails('number'),
      countryCode: this.getContactDetails('country')
    }
    this.store.dispatch({ type: AuthActions.OTP_RESEND_SUBMIT, payload: resendOtpData });
    setTimeout(() => {
      this.resendingOtp = false;
    }, 1500);
  }

  /**
   * Updating number
   */
  updateContactNumber() {
    if (this.newNumberForm.valid === true) {
      this.updatingNewNumber = true;
      const contactDetails = {
        contact: {
          contactNumber: this.newNumberForm.controls['newNumber'].value,
          countryCode: this.country.callingCodes[0]
        }
      }
      this.store.dispatch({ type: AuthActions.OTP_NUMBER_CHANGE, payload: contactDetails });
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
      email:  value.email.trim().toLowerCase(),
      password: value.password,
      isAgent: false,
      location: '',
      contact: {
        contactNumber: value.phone.toString().trim(),
        countryCode: this.country.callingCodes[0]
      },
      other: {
        completionStatus: 1,
        accountType: [{
          name: 'Artist',
          typeName: 'individual'
        }],
        dateOfBirth: this.reverseDate(value.dob.formatted) + 'T05:00:00',
      }
    };
    this.uploadingFormData = true;
    // console.log('form body', form); return;

    // register new user
    this.store.dispatch({ type: AuthActions.USER_REGISTRATION_BASIC, payload: form });

    this.store.select('loginTags')
    .first(channel => channel['completed']['SUCCESS'])
    .subscribe(resp => {
      this.claimValue = resp['completed']['SUCCESS'];
      this.claimData = resp['completed'];
      if (resp['completed'].emailMatches === true || resp['completed'].mobileMatches === true) {
        this.claimPopup.open();
        this.claimActive = true;
      } else {
        this.otpPopup.open();
        this.claimActive = false;
        this.otpOpenOnce = false;
      }
      if (resp['ERROR']) {
        this.toastr.warning(resp['ERROR']);
        this.uploadingFormData = false;
      }
      return;
    });
  }

  claimUser() {
    const data = {
      user: this.claimData['user'],
      handle: this.claimData['SUCCESS'].handle
    }
    this.store.dispatch({ type: AuthActions.PROFILE_CLAIM, payload: data });

    this.store.select('loginTags')
    .first(channel => channel['completed']['SUCCESS'])
    .subscribe(resp => {
      this.claimValue = resp['completed']['SUCCESS'];
      this.claimData = resp['completed'];
      if (resp['completed'].emailMatches === true || resp['completed'].mobileMatches === true) {
        this.otpPopup.open();
      }
      if (resp['ERROR']) {
        this.toastr.warning(resp['ERROR']);
        this.uploadingFormData = false;
      }
      return;
    });
  }

  /**
   * Switch to change number modal
   */
  otpNotRecieved() {
    this.otpPopup.close();
    this.modalService.open('otpChangeNumber');
    this.countrySelectorOtp.initCountrySelector('country-options-otp');
  }

  /**
   * Switch back to OTP modal
   */
  backToOtp() {
    this.modalService.close('otpChangeNumber');
    this.otpPopup.open();
  }

  /**
   * update country
   */
  saveCountry(country: any, frmType: string) {
    this.country = country;
    this.store.dispatch({ type: AuthActions.STORE_COUNTRY_CODE, payload: this.country.callingCodes[0] });
    // trigger phone number check
    if (frmType === 'reg') {
      this.regFormBasic.controls['phone'].updateValueAndValidity();
    } else if (frmType === 'otp') {
      this.newNumberForm.controls['newNumber'].updateValueAndValidity();
    }
  }

  /**
   * disable observales and listeners here
   */
  ngOnDestroy() { }
}
