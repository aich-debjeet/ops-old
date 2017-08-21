import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalService } from '../../../shared/modal/modal.component.service';
import { Store } from '@ngrx/store';
import { Register, UserTag, initialTag, RightBlockTag, initialBasicRegTag, BasicRegTag } from '../../../models/auth.model';
import { AuthRightBlockComponent } from '../../../shared/auth-right-block/auth-right-block.component';

// helper
import { passwordConfirmation } from '../../../helpers/password.validator';
import { FormValidation, DatabaseValidator } from '../../../helpers/form.validator';

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
  modalId = 'hoplaModal';
  countDown;
  counter = 60;
  showOTP = false;
  isPhotoAdded: boolean;

  rightCom: RightBlockTag;
  tagState$: Observable<BasicRegTag>;
  private tagStateSubscription: Subscription;
  petTag = initialBasicRegTag;
  Suggested: String[];
  modals: any;

  public dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public regFormBasic: FormGroup;
  public otpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<BasicRegTag>,
    private element: ElementRef,
    private databaseValidator: DatabaseValidator,
    private http: Http,
    private router: Router,
    public modalService: ModalService
    ) {
    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      console.log(state);
        this.petTag = state;
    });
    this.isPhotoAdded = false;
  }

  startTimer() {
    this.countDown = Observable.timer(0, 1000)
      .take(this.counter)
      .map(() => --this.counter);
  }

  useThisUsername(selectUsername: string) {
    console.log(selectUsername);
    // this.username = selectUsername;
    this.regFormBasic.controls['username'].setValue(selectUsername);
  }

  ngOnInit() {

    console.log('photo: ' + this.isPhotoAdded);

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

        console.log(file);

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
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  
  /**
   * Chekcing for the valid age input on register form
   * @param control: Form birth date input
   */
  validAge(control: AbstractControl) {
    if (control.value.indexOf('_') !== -1 || control.value === '') {
      console.log('incomplete date');
      return;
    }

    const dateArr =  control.value.split('-');

    const day = dateArr[0];
    const month = dateArr[1];
    const year = dateArr[2];

    console.log('day: ' + day + 'month: ' + month + 'year: ' + year);
    // const bd = new Date(month+' '+day+' '+year);
    const bdStr = month + ' ' + day + ' ' + year;
    const age = this.calculateAge(new Date(bdStr));
    console.log('age: ' + age);
    if (isNaN(age)) {
      return { invalidDOB: true }
    }

    if (age <= 13) {
      return { isUnderAge: true };
    } else if (age >= 100) {
      return { isOverAge: true };
    }
    return null;
  }

  buildForm(): void {
    this.regFormBasic = this.fb.group({
      'name' : ['', [Validators.required]],
      'username' : ['', [Validators.required, FormValidation.noWhitespaceValidator]],
      // 'dob' : ['', Validators.required, BirthDateValidator.individualsAgeValidator],
      'dob' : ['', [
        Validators.required,
        this.validAge.bind(this)
      ]],
      'email' : ['', [
        Validators.required,
        Validators.min(1),
        Validators.email
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
      'password' : ['', Validators.required],
      'confirmpassword' : ['', Validators.required],
      // 'photo' : [null, Validators.required],
      // 'gender' : [null, Validators.required],
    }, {
      validator: FormValidation.matchPassword
    })

    // OTP Form Builder
    this.otpForm = this.fb.group({
      'otpNumber' : ['', Validators.required],
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
                // const suggestedStr = data.Suggested.join(', ').replace(/\s+$/, ', ');
                // console.log(suggestedStr);
                this.Suggested = data.Suggested;
              }else {
                this.petTag.user_unique = false;
              }
              console.log(data)
            },
            // err => console.log(err)
            );
    }

  // OTP Validation
  otpSubmit(value) {
    const number = this.regFormBasic.value.phone;
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
    const form =  {
      'client_id' : 'AKIAI7P3SOTCRBKNR3IA',
      'client_secret': 'iHFgoiIYInQYtz9R5xFHV3sN1dnqoothhil1EgsE',
      'username' : this.regFormBasic.value.phone.toString(),
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

  rand() {
    return Math.random();
  }

  submitForm(value) {
    // Form
    const form =  {
      'name': {
      'firstName': value.name
      },
      'username': value.username,
      'profileImage': 'http://cloudfront.dgaydgauygda.net/Images/file.jpg',
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
    //

    if (this.regFormBasic.valid === true) {
      console.log('Entered Value');
      this.store.dispatch({ type: AuthActions.USER_REGISTRATION_BASIC, payload: form });
      this.tagState$.subscribe(
        data => {
          const resp = data.completed;
          if (resp['Code'] === 1) {
            this.modalService.open('hoplaModal');
          }

        }
      )
      console.log(value);
    }
  }
}
