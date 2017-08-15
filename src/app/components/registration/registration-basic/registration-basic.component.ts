import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import * as $ from 'jquery';
// import { Credentials, S3 } from 'aws-sdk';


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
  providers: [DatabaseValidator],
  styleUrls: ['./registration-basic.component.scss']
})
export class RegistrationBasicComponent implements OnInit {

  isPhotoAdded: boolean = false;

  rightCom: RightBlockTag;
  tagState$: Observable<Register>;
  private tagStateSubscription: Subscription;
  petTag = initialTag;

  public dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public regFormBasic: FormGroup;
  // public otpForm: FormGroup;
  // public user;
  constructor(
    private fb: FormBuilder,
    private store: Store<Register>,
    private element: ElementRef,
    private databaseValidator: DatabaseValidator,
    private http: Http
    ) {


    // this.otpForm = fb.group({
    //   'otp' : ['otp', Validators.required]
    // })

    this.tagState$ = store.select('loginTags');

    this.tagState$.subscribe((state) => {
        console.log(state);
        this.petTag = state;
    });
  }


  ngOnInit() {

  console.log('photo: '+this.isPhotoAdded);

    this.buildForm();
    this.rightCom = {
      mainTitle: 'Create Your Account',
      secondHead: '',
      description: 'Welcome to the one page spot light family where we are committed to grow'+' together in the world of art. An otp number will be sent to your email or'+' phone after registration for account confirmation.',
      loginLink: true,
      button_text: 'Login',
      button_link: '/login',
      page: false,
      img: 'http://d33wubrfki0l68.cloudfront.net/2e71b712243279d510245bad8c3e48eeab00690d/7f58a/img/registration_signup_illustration.png'
    };
  }

  // fileEvent(event){
  //   var files = event.srcElement.files[0].name;
  //   console.log(files);
  //   this.http.post('http://devservices.greenroom6.com:9000/api/1.0/portal/cdn/media/upload?handle=profileImage', files)
  //       .map(res => res.json())
  //       .subscribe(data => {console.log(data)});

  // }

  fileEvent(event) {
      let fileList: FileList = event.target.files;
      if(fileList.length > 0) {

        var parent = this;

          /* profile image preview */
          var reader = new FileReader();
          var image = this.element.nativeElement.querySelector('#preview');
          reader.onload = function (e : any) {
            var src = e.target.result;
            image.src = src;
            parent.isPhotoAdded = true;
          }
          reader.readAsDataURL(event.target.files[0]);
          /* profile image preview */

          let file: File = fileList[0];

          let formData:FormData = new FormData();
          formData.append('file', file.name);
          let headers = new Headers();
          /** No need to include Content-Type in Angular 4 */

          console.log(file);

          headers.append('Accept', 'application/json');
          headers.append('handle','profileImage');
          this.http.post('http://devservices.greenroom6.com:9000/api/1.0/portal/cdn/media/upload', file, { headers: headers })
            .map(res => res.json())
            .subscribe(data => {console.log(data)});
      }
    }


  buildForm(): void {
    this.regFormBasic = this.fb.group({
      'name' : ['', [Validators.required]],
      'username' : ['',[Validators.required,formValidation.NoWhitespaceValidator]],
      'dob' : ['', Validators.required],
      'email' : ['', [
        Validators.required,
        Validators.min(1),
        Validators.email
        ],
        this.databaseValidator.checkEmail.bind(this.databaseValidator)
      ],
      'gender': ['M', Validators.required],
      'phone' : [9898989898, [
        Validators.required,
        Validators.minLength(4)
        ],
        this.databaseValidator.checkMobile.bind(this.databaseValidator)
      ],
       'password' : ['', Validators.required],
      'confirmpassword' : ['', Validators.required],
      // 'photo' : [null, Validators.required],
      // 'gender' : [null, Validators.required],
    },{
      validator: formValidation.MatchPassword
    })

  }

  // Exisit User check
  userExisitCheck(value){
    if(value.length >= 4){
      this.store.dispatch({ type: AuthActions.USER_EXISTS_CHECK, payload: value });
    }
    else{
      this.petTag.user_unique = false;
    }
  }

  submitForm(value){
    document.getElementById("myModa").click();

    // document.getElementById("#otpModal2").modal('show');
    console.log(value);
    const form =  {
      "name": {
      "firstName": value.name
      },
      "username": value.username,
      "profileImage": "http://cloudfront.dgaydgauygda.net/Images/file.jpg",
      "gender": value.gender,
      "email": value.email,
      "password": value.password,
      "isAgent": false,
      "location": "",
      "contact": {
        "contactNumber": value.phone.toString(),
        "countryCode": "+91"
      },
      "other": {
        "completionStatus": 1,
        "accountType": [{
        "name": "Artist",
        "typeName": "individual"
        }],
      "dateOfBirth":"2016-09-29T05:00:00",
      }
    }
    this.store.dispatch({ type: AuthActions.USER_REGISTRATION_BASIC, payload: form });
    console.log(form);
      console.log(this.regFormBasic);
    if(this.regFormBasic.valid == true){

      console.log(value);


    }
  }


}
