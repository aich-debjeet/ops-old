import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalService } from '../../../shared/modal/modal.component.service';
import { Store } from '@ngrx/store';
import { Register, UserTag, initialTag, RightBlockTag, initialBasicRegTag, BasicRegTag } from '../../../models/auth.model';
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

  rightCom: RightBlockTag;
  tagState$: Observable<BasicRegTag>;
  private tagStateSubscription: Subscription;
  petTag = initialBasicRegTag;
  Suggested: String[];
  modals: any;

  public dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
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
    private element: ElementRef,
    private databaseValidator: DatabaseValidator,
    private http: Http,
    private router: Router,
    public modalService: ModalService,
    public tokenService: TokenService
    ) {
    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      // console.log(state);
        this.petTag = state;
    });
    this.isPhotoAdded = false;
  }

  // showing terms
  showTerms() {
    this.modalService.open('termsAndConditions');
  }

  startTimer() {
    this.countDown = Observable.timer(0, 1000)
      .take(this.counter)
      .map(() => --this.counter);
  }

  useThisUsername(selectUsername: string) {
    // console.log(selectUsername);
    // this.username = selectUsername;
    this.regFormBasic.controls['username'].setValue(selectUsername);
  }

  ngOnInit() {

    // console.log('photo: ' + this.isPhotoAdded);

    this.buildForm();
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

  fileEvent(event) {
      const fileList: FileList = event.target.files;
      if (fileList.length > 0) {

        const parent = this;

        /* profile image preview */
        const reader = new FileReader();
        const image = this.element.nativeElement.querySelector('#preview');
        reader.onload = function (e: any) {
          const src = e.target.result;
          image.src = src;
          parent.isPhotoAdded = true;
        }
        reader.readAsDataURL(event.target.files[0]);
        /* profile image preview */

        const file: File = fileList[0];

        const formData: FormData = new FormData();
        formData.append('file', file.name);
        const headers = new Headers();
        /** No need to include Content-Type in Angular 4 */

        // console.log(file);

        headers.append('Accept', 'application/json');
        headers.append('handle', 'profileImage');
        this.http.post('http://devservices.greenroom6.com:9000/api/1.0/portal/cdn/media/upload', file, { headers: headers })
          .map(res => res.json())
          .subscribe(data => {console.log(data)});
      }
    }

  /**
   * Calculating the age using the date of birth
   * @param birthday: Birth dat object
   */
  calculateAge(birthday) { // birthday is a date
    // console.log('birthday: ' + birthday);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  /**
   * Checking for the valid age input on register form
   * @param control: Form birth date input
   */
  validAge(control: AbstractControl) {
    if (control.value.indexOf('_') !== -1 || control.value === '') {
      // console.log('incomplete date');
      return;
    }

    const dateArr =  control.value.split('-');

    const day = dateArr[0];
    const month = dateArr[1];
    const year = dateArr[2];

    // check for valid day number
    if (parseInt(day, 10) > 31) {
      return { invalidDOB: true }
    }

    // check for valid month number
    if (parseInt(month, 10) > 12) {
      return { invalidDOB: true }
    }

    // check if year is not greater that current
    if (new Date().getUTCFullYear() < year) {
      return { invalidDOB: true }
    }

    const birthDate = new Date(year, month, day);
    const age = this.calculateAge(birthDate);
    console.log('age: ' + age);

    if (age <= 13) {
      return { isUnderAge: true };
    } else if (age >= 100) {
      return { isOverAge: true };
    }
    return null;
  }

  /**
   * Checking for the valid email input on register form
   * @param control: Form email input
   */
  validEmail(control: AbstractControl) {
    if (control.value === '') {
      // console.log('empty email');
      return;
    }
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(control.value)) {
      return { isInvalidEmail: true };
    }
    return null;
  }
  /**
   * Checking for the password strength on register form
   * @param control: Form password input
   */
  passwordStrength(control: AbstractControl) {
    if (control.value === '') {
      return;
    }
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/;
    // const passwordRegex = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,20}$/;
    if (!passwordRegex.test(control.value)) {
      // console.log('weak pass: ' + control.value);
      return { isWeakPassword: true };
    }
    return null;
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

  buildForm(): void {
    this.regFormBasic = this.fb.group({
      'name' : ['Abhijeet Salunkhe', [Validators.required]],
      'username' : ['abhijeet', [Validators.required, FormValidation.noWhitespaceValidator]],
      // 'dob' : ['', Validators.required, BirthDateValidator.individualsAgeValidator],
      'dob' : ['18-12-1991', [
        Validators.required,
        this.validAge.bind(this)
      ]],
      'email' : ['abhijeet.salunkhe@aeione.com', [
        Validators.required,
        Validators.min(1),
        // Validators.email
        this.validEmail.bind(this)
        ],
        this.databaseValidator.checkEmail.bind(this.databaseValidator)
      ],
      'gender': ['M', Validators.required],
      'phone' : ['9867884320', [
        Validators.required,
        Validators.minLength(4)
        ],
        this.databaseValidator.checkMobile.bind(this.databaseValidator)
      ],
      'password' : ['Admin@123', [
        Validators.required,
        this.passwordStrength.bind(this)
      ]],
      'confirmpassword' : ['', [
        Validators.required,
        this.passwordMatchCheck.bind(this)
      ]],
      // 'photo' : [null, Validators.required],
      // 'gender' : [null, Validators.required],
    }, {
      // validator: FormValidation.matchPassword
    })

    // OTP Form Builder
    this.otpForm = this.fb.group({
      'otpNumber' : ['', Validators.required],
    })

    // OTP new number
    this.newNumberForm = this.fb.group({
      'newNumber' : ['', [
        Validators.required,
        Validators.minLength(4)
        ],
        this.databaseValidator.checkMobile.bind(this.databaseValidator)
      ]
    })
  }

  // User user exists
  userExisitCheck(value) {
    console.log('check');
    if (value.length >= 4) {
      // this.store.dispatch({ type: AuthActions.USER_EXISTS_CHECK, payload: value });
      this.userExists(value);
    }else {
      this.petTag.user_unique = false;
    }
  }

  // User Validation
  userExists(username: string) {
    return this.http.get('http://devservices.greenroom6.com:9000/api/1.0/portal/auth/' + username + '/username')
      .map((data: Response) => data.json())
      .subscribe(data => {
        if (data.code === 0) {
          this.petTag.user_unique = true;
          this.Suggested = data.Suggested;
        }else {
          this.petTag.user_unique = false;
        }
        console.log(data)
      });
  }

  // OTP Validation
  otpSubmit(value) {
    let number = null;
    if (this.newNumberForm.value.newNumber !== undefined && this.newNumberForm.value.newNumber.length > 5) {
      number = this.newNumberForm.value.newNumber;
    } else {
      number = this.regFormBasic.value.phone;
    }
    this.optValidate(number, value.otpNumber)
  }

  optValidate(number, otp) {
    this.http.get('http://devservices.greenroom6.com:9000/api/1.0/portal/activate/profile/' + number + '/' + otp)
        .map(res => res.json())
        .subscribe(data => {
          console.log(data)
          if (data.SUCCESS === 'Activated your account') {
            this.otpLogin()
          }
        });
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

    this.http.post('http://devservices.greenroom6.com:9000/api/1.0/portal/auth/login/profile', form)
      .map(res => res.json())
      .subscribe(data => {
        const user = data;
          if (user && user.access_token) {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.router.navigate(['/reg/profile']);
          }
      });
  }

  reverseDate(string) {
    return string.split('-').reverse().join('-');
  }

  resendOtp() {
    const number = this.regFormBasic.value.phone;
    return this.http.get('http://devservices.greenroom6.com:9000/api/1.0/portal/auth/resendotp/' + number )
      .map(res => res.json())
      .subscribe(data => {
        console.log(data)
      });
  }

  resendOtpOnNewNumber() {
    const reqBody = {
      contact: {
        contactNumber: this.newNumberForm.value.newNumber
      }
    }

    const token = localStorage.getItem('access_token');
    const reqHeaders = new Headers({ 'Content-Type': 'application/json'});
    reqHeaders.append('Authorization', 'Bearer ' + token);

    return this.http.put('http://devservices.greenroom6.com:9000/api/1.0/portal/auth/user/update', reqBody, { headers: reqHeaders })
      .map(res => res.json())
      .subscribe(data => {
        console.log(data)
        if (data.SUCCESS === 'Successfully updated user information.') {
          this.modalService.close('otpChangeNumber');
          this.modalService.open('otpWindow');
        }
      });
  }

  rand() {
    return Math.random();
  }

  closeTerms() {
    this.modalService.open('termsAndConditions');
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
    // Form
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
        'countryCode': '+91'
      },
      'other': {
        'completionStatus': 1,
        'accountType': [{
          'name': 'Artist',
          'typeName': 'individual'
          }],
        'dateOfBirth': this.reverseDate(value.dob) + 'T05:00:00',
      }
    }

    if (this.regFormBasic.valid === true) {
      this.store.dispatch({ type: AuthActions.USER_REGISTRATION_BASIC, payload: form });
      this.tagState$.subscribe(
        data => {
          // console.log('token: ' + data.completed['access_Token']);
          if (data && data.completed['access_Token']) {
              localStorage.setItem('access_token', data.completed['access_Token']);
          }
          const resp = data.completed;
          if (resp['Code'] === 1) {
            this.modalService.open('otpWindow');
          }
        }
      )
    }
  }

  otpNotRecieved() {
    this.modalService.close('otpWindow');
    this.modalService.open('otpChangeNumber');
  }
}
