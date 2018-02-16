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
import { DragulaService } from 'ng2-dragula/ng2-dragula';


// action
import { ProfileActions } from '../../actions/profile.action';
import { AuthActions } from '../../actions/auth.action'

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  providers: [ModalService, ProfileUpdateValidator, DatabaseValidator, DragulaService],
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  storeState$: Observable<ProfileModal>;
  userProfile = initialTag;
  tagState$: Observable<BasicRegTag>;
  // private tagStateSubscription: Subscription;
  petTag = initialBasicRegTag;
  pwdForm: FormGroup;
  usernameForm: FormGroup;
  nameForm: FormGroup;
  dateForm: FormGroup;
  genderForm: FormGroup;
  emailForm: FormGroup;
  phoneForm: FormGroup;
  profileForm: FormGroup;
  otpForm: FormGroup;
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
  imageBaseLink: string = environment.API_IMAGE;
  userHandle: any;
  blockedUsers = [];
  preferences = [];
  default: any;
  resendingOtp = false;
  number: any;
  notificationOption = []
  // commentsOption: any; // = {name: 'Comments', value: 'Comments', checked: true};
  // spotsOption: any; // = {name: 'Spots', value: 'Spots', checked: true};
  // mentionOption: any; // = {name: 'Mention', value: 'Mention', checked: true};
  // followersOption: any; // = {name: 'Followers', value: 'Followers', checked: true};
  // channelsOption: any; // = {name: 'Channels', value: 'Channels', checked: true};
  // donateOption: any; // = {name: 'Donate', value: 'Donate', checked: true};
  // networkOption: any; // = {name: 'Network', value: 'Network', checked: true};
  adult: any;
  privateAccount: any;

  constructor(
    private _modalService: ModalService,
    private http: Http,
    private _fb: FormBuilder,
    private tokenService: TokenService,
    private _store: Store<ProfileModal>,
    private store: Store<BasicRegTag>,
    private databaseValidator: DatabaseValidator,
    private dragula: DragulaService,
  ) {
    // this.dragula.drop.subscribe((value) => {
    //   this.onDrop(value.slice(1));
    // });
    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        this.petTag = state;
        if (state['user_number_cng_success'] === true ) {
          this._modalService.open('otpWindow');
        }

        if (state && state['user_otp_success'] && state['user_otp_success'] === true) {
          this.otpForm.controls['otpNumber'].setValue('')
          this._modalService.close('otpWindow');
          // this._modalService.open('otpSuccess');
            this.phoneFormUpdate();
        }

        if ( state && state['user_otp_failed'] && state['user_otp_failed'] === true ) {
        }
      }
    });
    this.storeState$ = this._store.select('profileTags');

    this.storeState$.subscribe((state) => {
      console.log('state', state)
      if (typeof state !== 'undefined') {
        this.userProfile = state['profile_details'];
        this.userHandle = state['profile_details'].handle;
        this.blockedUsers = state.blockedUsers;
        if (state.default_notification) {
          this.default = state.default_notification;
          console.log('default', this.default)
          this.notificationOption = [{name: 'Comments', description: 'Receive an e-mail when other people comment on your posts.' , value: 'Comments', checked: this.default.comments},
                                    {name: 'Spots', description: 'Receive an e-mail when other people Spot on your posts.' , value: 'Spots', checked: this.default.spots},
                                    {name: 'Mention', description: 'Receive an e-mail when other people mention you.' , value: 'Mention', checked: this.default.mentions},
                                    {name: 'Followers', description: 'Receive an e-mail when other people follow you.' , value: 'Followers', checked: this.default.newFollower},
                                    {name: 'Channels', description: 'Receive an e-mail when other people add you in a channel.' , value: 'Channels', checked: this.default.channels},
                                    {name: 'Donate', description: 'Receive an e-mail when other people donate you.' , value: 'Donate', checked: this.default.donate},
                                    {name: 'Network', description: 'Receive an e-mail when other people send you network request.' , value: 'Network', checked: this.default.network}
          ]
          }
        this.adult = {name: 'adult', value: 'adult', checked: state.adult_Content};
        this.privateAccount = {name: 'private', value: 'private', checked: state['privateAccount']}
        if (state.preferences !== 'undefined') {
          this.preferences = state.preferences;
        }
      }
    });

    // Username update form init
    this.usernameForm = this._fb.group({
       'username' : ['' , [
             Validators.required,
             Validators.minLength(4),
             FormValidation.noWhitespaceValidator],
             this.databaseValidator.userNameValidation.bind(this.databaseValidator)
            ],
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
    'mobile' : ['', [Validators.required,
       Validators.minLength(4)
      ],
    this.databaseValidator.checkMobile.bind(this.databaseValidator)
  ],
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
    // this.selectedView = 'General';
    this.displayView('General')
    this._store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });
    this._store.dispatch({ type: ProfileActions.DEFAULT_NOTIFICATION_SETTINGS });
  }
  /**
   * drag and drop method
   * @param args
   */
  // private onDrop(args) {
  //   const [e, el] = args;
  //   const form = {
  //     'homePagePreferences': {
  //     'preferences': this.preferences
  //     }
  //   }
  //   const headers = this.tokenService.getAuthHeader();
  //     this.http.put(this.apiLink + '/portal/auth/user/update/user/settings' , form, { headers: headers })
  //   .map((data: Response) => data.json())
  //   .subscribe(response => {
  //   });

  // }
  /**
   * User Form Update
   */
  userFormUpdate(value) {
    if ( this.usernameForm.valid === true ) {
      const form =  {
        'username': value.username
      }
      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
      this.userActive = false;
    }
  }

  /**
   * name Update
   */
  nameUpdate(value) {
    if ( this.nameForm.valid === true ) {
      const form =  {
        'name': {
          'firstName': value.name,
        'displayName': value.name
        }
      }
      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
      this.nameActive = false;
    }
  }

   /**
   * dob form Update
   */
  dateFormUpdate(value) {
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
  phoneFormUpdate() {
    if ( this.number !== 'undefined' ) {
      const form =   {
        'extras': {
            'contact': {
              'mobile':
              {
                'mobile': this.number
              }
            }
      }
    }
      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
     // this._modalService.close('otpSuccess')
      this.phoneActive = false;
    //   this._store.select('profileTags').subscribe((state) => {
    //     if (state['profileUpdateSuccess'] === true) {
    //     }
    // })
  }
}

  // OTP Validation
  otpSubmit(value) {
    if (this.otpForm.valid === true) {
       let number = null;
      if (this.phoneForm.value.mobile !== undefined && this.phoneForm.value.mobile.length > 5) {
        this.number = this.phoneForm.value.mobile;
      } else {
        number = this.number;
      }
      const send = {
        'number': this.number,
        'otp': value.otpNumber
      }
      this.store.dispatch({ type: AuthActions.OTP_SUBMIT, payload: send });
    }
  }

  resendOtpOnNewNumber(value) {
    if ( this.phoneForm.valid === true ) {
      this.number = value.mobile;
      const reqBody = {
        contact: {
          'contactNumber': value.mobile
        }
      }
      this.store.dispatch({ type: AuthActions.OTP_NUMBER_CHANGE, payload: reqBody });
    }
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
    if (control.value === '') {
      return;
    }
    const pass = this.pwdForm.controls['newpassword'].value;
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
    const val = option.name;
    if (option.name === 'Comments') {
      const form =  {
        'notificationSettings': {
          'comments' : option.checked
        }
      }
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/auth/user/update/user/settings' , form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
      });
    }
    if (option.name === 'Spots') {
      const form =  {
        'notificationSettings': {
          'spots' : option.checked
        }
      }
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/auth/user/update/user/settings' , form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
      });
    }
    if (option.name === 'Mention') {
      const form =  {
        'notificationSettings': {
          'mentions' : option.checked
        }
      }
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/auth/user/update/user/settings' , form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
      });
    }
    if (option.name === 'Followers') {
      const form =  {
        'notificationSettings': {
          'newFollower' : option.checked
        }
      }
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/auth/user/update/user/settings' , form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
      });
    }
    if (option.name === 'Channels') {
      const form =  {
        'notificationSettings': {
          'channels' : option.checked
        }
      }
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/auth/user/update/user/settings' , form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
      });
    }
    if (option.name === 'Donate') {
      const form =  {
        'notificationSettings': {
          'donate' : option.checked
        }
      }
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/auth/user/update/user/settings' , form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
      });
    }
    if (option.name === 'Network') {
      const form =  {
        'notificationSettings': {
          'network' : option.checked
        }
      }
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/auth/user/update/user/settings' , form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
      });
    }
    if (option.name === 'adult') {
      const form =  {
          'allowARC' : option.checked
      }
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/auth/user/update/user/settings' , form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
      });
    }
    if (option.name === 'private') {
      const form =  {
          'privateAccount' : option.checked
      }
      const headers = this.tokenService.getAuthHeader();
       this.http.put(this.apiLink + '/portal/auth/user/update/user/settings' , form, { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
      });
    }
  }
  unBlock(handle: any) {
    const form = {
      'blockedHandle': handle
    }
    const headers = this.tokenService.getAuthHeader();
    this.http.put(this.apiLink + '/portal/network/block/unblock' , form, { headers: headers })
   .map((data: Response) => data.json())
   .subscribe(response => {
     this._store.dispatch({type: ProfileActions.LOAD_BLOCK_USERS, payload: this.userHandle});
   });
    // this._store.dispatch({type: ProfileActions.UNBLOCK_USER, payload: form});
    // this._store.dispatch({type: ProfileActions.LOAD_BLOCK_USERS, payload: this.userHandle});
  }
}
