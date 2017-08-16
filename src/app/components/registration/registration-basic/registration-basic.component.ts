import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

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
  Suggested: String[];
  modals: any;

  public dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
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
      'name' : ['sabeel', [Validators.required]],
      'username' : ['sabeel' + this.rand(), [Validators.required, formValidation.NoWhitespaceValidator]],
      'dob' : ['12-09-1992', Validators.required],
      'email' : ['shhd' + this.rand() + '@gmail.com', [
        Validators.required,
        Validators.min(1),
        Validators.email
        ],
        this.databaseValidator.checkEmail.bind(this.databaseValidator)
      ],
      'gender': ['M', Validators.required],
      'phone' : ['88631' + this.rand(), [
        Validators.required,
        Validators.minLength(4)
        ],
        this.databaseValidator.checkMobile.bind(this.databaseValidator)
      ],
      'password' : ['123456', Validators.required],
      'confirmpassword' : ['123456', Validators.required],
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
        return this.http.get('http://devservices.greenroom6.com:9000/api/1.0/portal/auth/'+username+'/username')
            .map((data: Response) => data.json())
            .subscribe(data => {
              if(data.code == 0){
                this.petTag.user_unique = true;
                this.Suggested = data.Suggested;
              }
              else{
                this.petTag.user_unique = false;
              }
              console.log(data)
            });
    }

  // OTP Validation
  otpSubmit(value){
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

  rand(){
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
      this.modalService.open('hoplaModal');
      // this.tagState$.subscribe(
      //   data => { 
      //     // if (data.Code === 1) {

      //     // }
      //     // console.log('local storage');
      //     console.log(data);
      //     if(data.success == true){ 
      //     }
      //   }
      // )
      console.log(value);
    }
  }
}
