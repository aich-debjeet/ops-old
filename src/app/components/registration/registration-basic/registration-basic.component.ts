import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';

import * as $ from 'jquery';

import { ModalService } from '../../../shared/modal/modal.component.service';

// require('aws-sdk/dist/aws-sdk');
import { Store } from '@ngrx/store';
import { Register, UserTag, initialTag, RightBlockTag } from '../../../models/auth.model';
import { AuthRightBlockComponent } from '../../../shared/auth-right-block/auth-right-block.component';

// helper
import { passwordConfirmation } from '../../../helpers/password.validator';
import { formValidation, DatabaseValidator } from '../../../helpers/formValidator';

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
  tagState$: Observable<Register>;
  private tagStateSubscription: Subscription;
  petTag = initialTag;

  modals: any;

  public dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public regFormBasic: FormGroup;
  public otpForm: FormGroup;
  // public otpForm: FormGroup;
  // public user;
  constructor(
    private fb: FormBuilder,
    private store: Store<Register>,
    private element: ElementRef,
    private databaseValidator: DatabaseValidator,
    private http: Http,
    public modalService: ModalService
    ) {
    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
        this.petTag = state;
    });
    this.isPhotoAdded = false;
  }

  startTimer() {
    this.countDown = Observable.timer(0, 1000)
      .take(this.counter)
      .map(() => --this.counter);
  }

  ngOnInit() {

    console.log('photo: ' + this.isPhotoAdded);

    this.buildForm();
    this.rightCom = {
      mainTitle: 'Create Your Account',
      secondHead: '',
      description: 'Welcome to the one page spot light family where we are committed to grow together in the world of art' +
                   'An otp number will be sent to your email or phone after registration for account confirmation.',
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


  buildForm(): void {
    this.regFormBasic = this.fb.group({
      'name' : ['', [Validators.required]],
      'username' : ['', [Validators.required, formValidation.NoWhitespaceValidator]],
      'dob' : ['', Validators.required],
      'email' : ['', [
        Validators.required,
        Validators.min(1),
        Validators.email
        ],
        this.databaseValidator.checkEmail.bind(this.databaseValidator)
      ],
      'gender': ['M', Validators.required],
      'phone' : [8050473500, [
        Validators.required,
        Validators.minLength(4)
        ],
        this.databaseValidator.checkMobile.bind(this.databaseValidator)
      ],
      'password' : ['thanalvc', Validators.required],
      'confirmpassword' : ['thanalvc', Validators.required],
      // 'photo' : [null, Validators.required],
      // 'gender' : [null, Validators.required],
    }, {
      validator: formValidation.MatchPassword
    })

    // OTP Form Builder
    this.otpForm = this.fb.group({
      'otpNumber' : ['', Validators.required],
    })
  }

  // User user exists
  userExisitCheck(value) {
    if (value.length >= 4) {
      this.store.dispatch({ type: AuthActions.USER_EXISTS_CHECK, payload: value });
    }else {
      this.petTag.user_unique = false;
    }
  }

  // OTP Validation
  otpSubmit(value){
    console.log(this.otpForm.valid);
    console.log(this.regFormBasic.value.phone);
    const number =this.regFormBasic.value.phone;
    this.optValidate(number, value.otpNumber)
  }

  optValidate(number, otp) {
    this.http.get('http://devservices.greenroom6.com:9000/api/1.0/portal/activate/profile/'+ number +'/'+ otp)
        .map(res => res.json())
        .subscribe(data => {
          console.log(data)
          if (data.SUCCESS === 'Activated your account') {
            this.otpLogin()
          }
        });
  }

  otpLogin() {
    console.log('otp login');
    const form =  {
        'client_id' : 'AKIAI7P3SOTCRBKNR3IA',
        'client_secret': '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',
        'username' : this.regFormBasic.value.phone.toString(),
        'password' : this.otpForm.value.otpNumber,
        'grant_type' : 'password'
      }
      console.log(form);
      return this.http.post('http://devservices.greenroom6.com:9000/api/1.0/portal/auth/oauth2/token', form)
        .map((response: Response) => {
            const user = response.json();
            if (user && user.access_token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        });
  }

  resendOtp() {
    const number = this.regFormBasic.value.phone;
    return this.http.get('http://devservices.greenroom6.com:9000/api/1.0/portal/auth/resendotp/' + number )
      .map(res => res.json())
      .subscribe(data => {
        console.log(data)
      });
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
      'email': value.email,
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
      'dateOfBirth': '2016-09-29T05:00:00',
      }
    }

    // console.log(form);
    // console.log(this.regFormBasic);
    if (this.regFormBasic.valid === true) {
      //
      this.store.dispatch({ type: AuthActions.USER_REGISTRATION_BASIC, payload: form });
      this.startTimer();
      this.modalService.open('hoplaModal');
    }
  }
}
