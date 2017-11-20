import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../models/profile.model';
import {initialBasicRegTag, BasicRegTag} from '../../models/auth.model';
import { ModalService } from '../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { FormValidation, ProfileUpdateValidator, DatabaseValidator } from '../../helpers/form.validator';
import { DatePipe } from '@angular/common';
import { Http, Headers, Response } from '@angular/http';
import { TokenService } from './../../helpers/token.service';
import { environment } from '../../../environments/environment';


// action
import { ProfileActions } from '../../actions/profile.action';
import { AuthActions } from '../../actions/auth.action'

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  providers: [ModalService, ProfileUpdateValidator, DatabaseValidator],
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  storeState$: Observable<ProfileModal>;
  userProfile = initialTag;
  tagState$: Observable<BasicRegTag>;
  // private tagStateSubscription: Subscription;
  petTag = initialBasicRegTag;
  pwdForm: FormGroup;
  private usernameForm: FormGroup;
  private nameForm: FormGroup;
  private dateForm: FormGroup;
  private genderForm: FormGroup;
  private emailForm: FormGroup;
  private phoneForm: FormGroup;
  private profileForm: FormGroup;
  private otpForm: FormGroup;
  emailActive: boolean;
  phoneActive: boolean;
  userActive: boolean;
  nameActive: boolean;
  genderActive: boolean;
  dobActive: boolean;
  profileTypeActive: boolean;
  passwordActive: boolean;
  selectedView: string;
  private apiLink: string = environment.API_ENDPOINT;
  userHandle: any;
  blockedUsers = [];
  default: any;
  resendingOtp = false;

  commentsOption: any // = {name: 'Comments', value: 'Comments', checked: true};
  spotsOption: any // = {name: 'Spots', value: 'Spots', checked: true};
  mentionOption: any // = {name: 'Mention', value: 'Mention', checked: true};
  followersOption: any // = {name: 'Followers', value: 'Followers', checked: true};
  channelsOption: any // = {name: 'Channels', value: 'Channels', checked: true};
  donateOption: any // = {name: 'Donate', value: 'Donate', checked: true};
  networkOption: any // = {name: 'Network', value: 'Network', checked: true};

  constructor(
    private _modalService: ModalService,
    private http: Http,
    private _fb: FormBuilder,
    private profileUpdateValidator: ProfileUpdateValidator,
    private tokenService: TokenService,
    private _store: Store<ProfileModal>,
    private store: Store<BasicRegTag>,
    private databaseValidator: DatabaseValidator,
  ) {
    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      console.log(state);
        this.petTag = state;
    });
    this.storeState$ = this._store.select('profileTags');

     this.storeState$.subscribe((state) => {
      this.userProfile = state['profileDetails'];
      console.log(this.userProfile)
      this.userHandle = state['profileDetails'].handle;
      console.log(this.userHandle)
      this.blockedUsers = state.blockedUsers;
      console.log(this.blockedUsers)
      if (state.default_notification) {
         this.default = state.default_notification;
        this. commentsOption = {name: 'Comments', value: 'Comments', checked: this.default.comments};
        this.spotsOption = {name: 'Spots', value: 'Spots', checked: this.default.spots};
        this.mentionOption = {name: 'Mention', value: 'Mention', checked: this.default.mention};
        this.followersOption = {name: 'Followers', value: 'Followers', checked: this.default.newFollower};
        this.channelsOption = {name: 'Channels', value: 'Channels', checked: this.default.channels};
        this.donateOption = {name: 'Donate', value: 'Donate', checked: this.default.donate};
        this.networkOption = {name: 'Network', value: 'Network', checked: this.default.network};
      //   console.log(this.default)
      //   this.commentsOption.checked = this.default.comments;
      //   this.spotsOption = this.default.spots;
      //   // this.mentionOption = this.default;
      //   this.followersOption = this.default.newFollower;
      //   this.channelsOption = this.default.channels;
      //   this.donateOption = this.default.donate;
      //   this.networkOption = this.default.network;
       }

    });

    // Username update form init
    this.usernameForm = this._fb.group({
      'username' : ['', [ Validators.required]]
      // 'username' : ['' , [Validators.required, Validators.minLength(4), FormValidation.noWhitespaceValidator], this.profileUpdateValidator.userNameValidation.bind(this.profileUpdateValidator)],
    });
    // name update
    this.nameForm = this._fb.group({
      'name' : ['', [Validators.required]]
    });
    // date update
    this.dateForm = this._fb.group({
      'dob' : ['', [Validators.required], this.databaseValidator.validAge.bind(this.databaseValidator)]
    });
    // gender update
    this.genderForm = this._fb.group({
      'gender' : ['', [Validators.required]]
    });
    // email update
    this.emailForm = this._fb.group({
    'email' : ['',  [
      Validators.required,
      Validators.min(1),
      // Validators.email
      FormValidation.validEmail
      ],
      this.databaseValidator.checkEmail.bind(this.databaseValidator)]
    });
    // phone update
    this.phoneForm = this._fb.group({
    'mobile' : ['', [Validators.required]]
    });
    // profile Type update
    // this.genderForm = this._fb.group({
    // 'profile' : ['', [Validators.required]]
    // });
    // OTP Form Builder
    this.otpForm = this._fb.group({
      'otpNumber': ['', [
          FormValidation.validOtp.bind(this)
        ],
      ]
    })
    this.passwordformInit();

    this.emailActive = false;
    this.phoneActive = false;
    this.nameActive = false;
    this.genderActive = false;
    this.dobActive = false;
    this.profileTypeActive = false;
    this.passwordActive = false;
   }

  ngOnInit() {
    this.selectedView = 'General';
    this._store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });
    this._store.dispatch({ type: ProfileActions.DEFAULT_NOTIFICATION_SETTINGS });
  }

  /**
   * User Form Update
   */
  userFormUpdate(value) {
    console.log(this.usernameForm.valid);
    console.log(value);
    if ( this.usernameForm.valid === true ) {
      const form =  {
        'username': value.username
      }
      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
      this.userActive = false;
    }
  }
  // User user exists
  // userExisitCheck(value) {
  //   console.log(value)
  //   if (value.length >= 4) {
  //     this.store.dispatch({ type: AuthActions.USER_EXISTS_CHECK, payload: value });
  //   } else {
  //     if (this.petTag && this.petTag.user_unique) {
  //       console.log('now i am here')
  //       this.petTag.user_unique = false;
  //     }
  //   }
  // }

  // useThisUsername(selectUsername: string) {
  //   this.usernameForm.controls['username'].setValue(selectUsername);
  // }

  /**
   * name Update
   */
  nameUpdate(value) {
    console.log(this.nameForm.valid);
    console.log(value);
    if ( this.nameForm.valid === true ) {
      const form =  {
        'name': value.name
      }
      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
      this.nameActive = false;
    }
  }

   /**
   * dob form Update
   */
  dateFormUpdate(value) {
    console.log(this.dateForm.valid);
    console.log(value);
    if ( this.dateForm.valid === true ) {
      const form =  {'physical': {
        'dateOfBirth': this.reverseDate(value.dob) + 'T05:00:00',
      }
    }
      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
      this.dobActive = false;
    }
  }

  /**
   * gender update
   */
  genderFormUpdate(value) {
    console.log(this.genderForm.valid);
    console.log(value);
    if ( this.genderForm.valid === true ) {
      const form =  {'physical': {
        'gender': value.gender
      }
    }
      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
      this.genderActive = false;
    }
  }

  /**
   * email form update
   */
  emailFormUpdate(value) {
    console.log(this.emailForm.valid);
    console.log(value);
    if ( this.emailForm.valid === true ) {
      const form =  {
        'email': value.email
      }
      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
      this.emailActive = false;
    }
  }
  /**
   * phone form update
   */
  phoneFormUpdate(value) {
    console.log(this.phoneForm.valid);
    console.log(value);
    if ( this.phoneForm.valid === true ) {
      const form =  {
         contact: {
          mobile:
          {
            'mobile': value.mobile
          }
        }
      }
      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
      this._modalService.close('thankyouModal')
    //   this._store.select('profileTags').subscribe((state) => {
    //     if (state['profileUpdateSuccess'] === true) {
    //       console.log('success')
    //     }
    // })
  }
}

  // OTP Validation
  otpSubmit(value) {
    if (this.otpForm.valid === true) {
      let number = null;
      if (this.phoneForm.value.mobile !== undefined && this.phoneForm.value.mobile.length > 5) {
        number = this.phoneForm.value.mobile;
      } else {
        number = this.phoneForm.value.mobile;
      }
      const send = {
        'number': number,
        'otp': value.otpNumber
      }
      this.store.dispatch({ type: AuthActions.OTP_SUBMIT, payload: send });
      this.store.select('loginTags').take(2).subscribe(data => {
        if (data['user_otp_success'] === true ) {
          // this.otpLogin()
          this.otpForm.controls['otpNumber'].setValue('')
          this._modalService.close('otpWindow');
          this.phoneFormUpdate(value);
          this._modalService.open('thankyouModal');
        }
      })
      // this.otpValidate(number, value.otpNumber);
    }
    this.phoneActive = false;
  }
resendOtpOnNewNumber(value) {
  const reqBody = {
    contact: {
      contactNumber: value.mobile
    }
  }
console.log(value)
  this.store.dispatch({ type: AuthActions.OTP_NUMBER_CHANGE, payload: reqBody });
  this.store.select('loginTags').take(2).subscribe(data => {
    if (data['user_number_cng_success'] === true ) {
      // this.regFormBasic.controls['phone'].setValue(this.newNumberForm.value.newNumber)
      // this.modalService.close('otpChangeNumber');
      console.log('trying to open window')
      this._modalService.open('otpWindow');
    }
  })
}

  resendOtp() {
    this.resendingOtp = true;
    const number = this.phoneForm.value.mobile;
    this.store.dispatch({ type: AuthActions.OTP_RESEND_SUBMIT, payload: number });
    this.store.select('loginTags').subscribe(data => {
      setTimeout(() => {
        this.resendingOtp = false;
      }, 1500);
    })
  }

  /**
   * profile type form update
   */
  profileTypeFormUpdate(value) {
    console.log(this.emailForm.valid);
    console.log(value);
    if ( this.emailForm.valid === true ) {
      const form =  {
        'email': value.email
      }
      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
    }
  }
  /**
   * Password form submit
   */
  submitForm(value) {
    console.log(value);
    if (this.pwdForm.valid === true) {
      const body = {
        'currentPassword': value.currentpassword,
        'newPassword': value.newpassword
      }
      this._store.dispatch({ type: ProfileActions.USER_PASSWORD_UPDATE, payload: body });
      this.passwordformInit();
      this.passwordActive = false;
    }
  }


  /**
   * Password Form init
   */
  passwordformInit() {
    this.pwdForm = this._fb.group({
      'currentpassword' : ['' , [Validators.required]],
      'newpassword' : ['' , [Validators.required, FormValidation.passwordStrength.bind(this)]],
      'confirmpassword' : ['' , [
        Validators.required,
        this.passwordMatchCheck.bind(this)
        ]
      ]
    });
  }

  /**
   * send OTP Form
   */
  // sendOtp() {
  //   this._modalService.open('otpValidatePopup');
  // }

  /**
   * toggle of email
   */
  emailToggle() {
    if (this.emailActive === true) {
      this.emailActive = false;
    }else {
      this.emailActive = true;
    }
    this.emailForm.setValue({
      email: this.userProfile['email'],
    });
  }

  /**
   * toggle of phone
   */
  phoneToggle() {
    if (this.phoneActive === true) {
      this.phoneActive = false;
    }else {
      this.phoneActive = true;
    }
    this.phoneForm.setValue({
      mobile: this.userProfile['contact']['mobile'].mobile,
    });
  }

  /**
   * toggle of name field
   */
  nameToggle() {
    if (this.nameActive === true) {
      this.nameActive = false;
    }else {
      this.nameActive = true;
    }
    this.nameForm.setValue({
      name: this.userProfile['name'],
    });
  }

  /**
   * tooggle of gender field
   */
  genderToggle() {
    if (this.genderActive === true) {
      this.genderActive = false;
    }else {
      this.genderActive = true;
    }
    this.genderForm.setValue({
      gender: this.userProfile['physical'].gender,
    });
  }

  /**
   * dob toggle field
   */
  dobToggle() {
    if (this.dobActive === true) {
      this.dobActive = false;
    }else {
      this.dobActive = true;
    }
    this.dateForm.setValue({
      dob: this.removeUtc(this.userProfile['physical'].dateOfBirth),
    });
  }
  /**
   * profileType toggle field
   */
  profileTypeToggle() {
    if (this.profileTypeActive === true) {
      this.profileTypeActive = false;
    }else {
      this.profileTypeActive = true;
    }
  }
  /**
   * toggle of user
   */
  userToggle() {
    if (this.userActive === true) {
      this.userActive = false;
    }else {
      this.userActive = true;
    }

    this.usernameForm.setValue({
      username: this.userProfile['extra'].username,
    });
  }
  /**
   * password toggle field
   */
  passwordToggle() {
    if (this.passwordActive === true) {
      this.passwordActive = false;
    }else {
      this.passwordActive = true;
    }
  }

  removeUtc(string) {
    const s1 = string.slice(0, 10);
    console.log(s1);
    return this.reverseDate(s1);
  }
  reverseDate(string) {
    return string.split('-').reverse().join('-');
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
    const pass = this.pwdForm.controls['newpassword'].value;
    // console.log('pass: ' + pass);
    if (control.value !== pass) {
      return { passwordDoesNotMatch: true };
    }
    return null;
  }

  displayView(tab: string) {
    this.selectedView = tab;
    this._store.dispatch({type: ProfileActions.LOAD_BLOCK_USERS, payload: this.userHandle});
  }

  updateCheckedOptions(option, event) {
    console.log(option);
    const val = option.name;
    console.log(val)
    console.log(event);
    if (option.name === 'Comments') {
      const form =  {
        'notificationSettings': {
          'comments' : option.checked
        }
      }
      console.log(form)
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/auth/user/update/user/settings' , form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
        console.log('finally its a success' + response)
      });
    }
    if (option.name === 'Spots') {
      const form =  {
        'notificationSettings': {
          'spots' : option.checked
        }
      }
      console.log(form)
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/auth/user/update/user/settings' , form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
        console.log('finally its a success' + response)
      });
    }
    if (option.name === 'Mention') {
      const form =  {
        'notificationSettings': {
          'mention' : option.checked
        }
      }
      console.log(form)
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/auth/user/update/user/settings' , form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
        console.log('finally its a success' + response)
      });
    }
    if (option.name === 'Followers') {
      const form =  {
        'notificationSettings': {
          'newFollower' : option.checked
        }
      }
      console.log(form)
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/auth/user/update/user/settings' , form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
        console.log('finally its a success' + response)
      });
    }
    if (option.name === 'Channels') {
      const form =  {
        'notificationSettings': {
          'channels' : option.checked
        }
      }
      console.log(form)
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/auth/user/update/user/settings' , form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
        console.log('finally its a success' + response)
      });
    }
    if (option.name === 'Donate') {
      const form =  {
        'notificationSettings': {
          'donate' : option.checked
        }
      }
      console.log(form)
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/auth/user/update/user/settings' , form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
        console.log('finally its a success' + response)
      });
    }
    if (option.name === 'Network') {
      const form =  {
        'notificationSettings': {
          'network' : option.checked
        }
      }
      console.log(form)
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/auth/user/update/user/settings' , form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
        console.log('finally its a success' + response)
      });
    }
  }
  unBlock(handle: any) {
    console.log(handle);
    const form = {
      'blockedHandle': handle
    }
    console.log(form)
    const headers = this.tokenService.getAuthHeader();
    this.http.put(this.apiLink + '/portal/network/block/unblock' , form, { headers: headers })
   .map((data: Response) => data.json())
   .subscribe(response => {
     console.log('finally its a success' + response)
     this._store.dispatch({type: ProfileActions.LOAD_BLOCK_USERS, payload: this.userHandle});
   });
    // this._store.dispatch({type: ProfileActions.UNBLOCK_USER, payload: form});
    // this._store.dispatch({type: ProfileActions.LOAD_BLOCK_USERS, payload: this.userHandle});
  }
}
