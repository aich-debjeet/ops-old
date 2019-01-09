import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../models/profile.model';
import {initialBasicRegTag, BasicRegTag} from '../../models/auth.model';
import { ModalService } from '../../shared/modal/modal.component.service';
import { Modal } from '../../shared/modal-new/Modal';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { FormValidation, ProfileUpdateValidator, DatabaseValidator } from '../../helpers/form.validator';
import { DatePipe } from '@angular/common';
import { Http, Headers, Response } from '@angular/http';
import { TokenService } from './../../helpers/token.service';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { GeneralUtilities } from '../../helpers/general.utils';

import { CountrySelectorComponent } from '../../shared/country-selector/country-selector.component';

import { AuthService } from '../../services/auth.service';
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
  country = {
    callingCodes: ['91']
  };
  storeState$: Observable<ProfileModal>;
  userProfile = initialTag;
  tagState$: Observable<BasicRegTag>;
  petTag = initialBasicRegTag;
  pwdForm: FormGroup;
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
  birth: any;
  notificationOption = []
  editingField: string;
  public dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  adult: any;
  privateAccount: any;
 //ngModel binding options
  name: any;
  dob: any;
  userName: any;
  email: any;
  phone: string;
  gender: any;
  error: boolean = false;
  isRequired: boolean= false;
  whitespace: boolean = false;
  capitalLetters : boolean =false;
  invalidLength: boolean = false;
  specialChars: boolean = false;
  isCharacter: boolean = false;
  invalidPhoneField: boolean = false;
  shortCode: string;
  public otpForm: FormGroup;
  phNumbrReq: boolean =false;
  phMinLent: boolean = false;
  isMobileUnique: boolean = false;
  validSuccess: boolean = true;
  privacy: number;
  msgDisplay: string;
  regExp = /^[0-9]+$/;

  @ViewChild('countrySelSet') countrySelectorSet: CountrySelectorComponent;
  @ViewChild('otpPopup') otpPopup: Modal;

  constructor(
    private _modalService: ModalService,
    private authService: AuthService,
    private http: Http,
    private _fb: FormBuilder,
    private tokenService: TokenService,
    private _store: Store<ProfileModal>,
    private store: Store<BasicRegTag>,
    private databaseValidator: DatabaseValidator,
    private toastr: ToastrService,
    private generalUtils: GeneralUtilities,
  ) {
    // this.dragula.drop.subscribe((value) => {
    //   this.onDrop(value.slice(1));
    // });
    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        console.log('initial tag', this.petTag);
        this.petTag = state;
        console.log('state',state)
        // if (state['user_number_cng_success'] === true ) {
        //   this._modalService.open('otpWindow');
        // }

        // if (state && state['user_otp_success'] && state['user_otp_success'] === true) {
        //   this.otpForm.controls['otpNumber'].setValue('')
        //   this._modalService.close('otpWindow');
        //   // this._modalService.open('otpSuccess');
        //     this.phoneFormUpdate();
        // }
        if (state['setting_number_update_sent'] === false && state['setting_number_update_success'] === true && state['request_type'] === 'OTP Request') {
          console.log('open otp model');
          this.otpPopup.open();
        }

        if (state['request_type'] === 'OTP Submission') {
          console.log('closing otp nodel');
          this._store.dispatch({ type: ProfileActions.LOAD_USER_DATA_DETAILS });
          this.otpPopup.close();
          this.cancelEdit();
        }
      }
    });
    this.storeState$ = this._store.select('profileTags');

    this.storeState$.subscribe((state) => {
      //  console.log('state', state)
      if (typeof state !== 'undefined') {
        this.userProfile = state['user_details'];
        this.userHandle = state['user_details'].profileId;
        this.blockedUsers = state.blockedUsers;
        if (state.default_notification) {
          this.default = state.default_notification;
          // console.log('default', this.default)
          this.notificationOption = [{name: 'Comments', description: 'Receive an e-mail when other people comment on your posts.' , value: 'Comments', checked: this.default.comments},
                                    {name: 'Spots', description: 'Receive an e-mail when other people Spot on your posts.' , value: 'Spots', checked: this.default.spots},
                                    {name: 'Mention', description: 'Receive an e-mail when other people mention you.' , value: 'Mention', checked: this.default.mentions},
                                    {name: 'Followers', description: 'Receive an e-mail when other people follow you.' , value: 'Followers', checked: this.default.newFollower},
                                    {name: 'Channels', description: 'Receive an e-mail when other people add you in a channel.' , value: 'Channels', checked: this.default.channels},
                                    {name: 'Donate', description: 'Receive an e-mail when other people donate to you.' , value: 'Donate', checked: this.default.donate},
                                    {name: 'Network', description: 'Receive an e-mail when other people send you network request.' , value: 'Network', checked: this.default.network}
          ]
          }
        this.adult = {name: 'adult', value: 'adult', checked: state.adult_Content};
        this.privateAccount = {name: 'private', value: 'private', checked: state['privateAccount']}
        if (state.preferences !== 'undefined') {
          this.preferences = state.preferences;
        }
        if (state && state['pass_fail']) {
          this.rebuild();
          this.toastr.warning('Incorrect Password');
        }
        if (state && state['pass_success']) {
          this.cancelEdit();;
          this.toastr.success('Password updated sucessfully');
        }
      }
      if (state.user_details) {
        if (state.details_loaded === true) {
          if (state['user_details']['name']['firstName'].length > 0) {
            this.name = state['user_details']['name']['firstName'];
            // console.log(this.name)
          }
          if (state['user_details']['gender'].length > 0) {
            this.gender = state['user_details']['gender'];
            // console.log(this.gender)
          }
          if (state['user_details']['other']['dob']['date_of_birth'].length > 0) {
            this.birth = state['user_details']['other']['dob']['date_of_birth'];
            this.privacy = state['user_details']['other']['dob']['access'];
            // console.log(this.birth)
          }
          if (state['user_details']['email'].length > 0) {
            this.email = state['user_details']['email'];
            // console.log(this.email)
          }
          if (state['user_details']['contact']['contactNumber'].length > 0) {
            this.phone = state['user_details']['contact']['contactNumber'];
            // console.log(this.phone)
          }
          if (state['user_details']['username'].length > 0) {
            this.userName = state['user_details']['username'];
            // console.log(this.userName)
          }
          if (state['user_details']['contact']['shortCode'].length > 0) {
            this.shortCode = state['user_details']['contact']['shortCode'];
            // console.log(this.shortCode)
          }
        }
      }
    });

    this.otpForm = this._fb.group({
      otpNum: ['', [Validators.required, FormValidation.validateOtp]]
    })
    // this.passwordformInit();
   }

  ngOnInit() {
    this.displayView('General')
    this._store.dispatch({ type: ProfileActions.LOAD_USER_DATA_DETAILS });
    this.store.dispatch({ type: AuthActions.STORE_COUNTRY_CODE, payload: this.country.callingCodes[0] });
  }

    /**
   * update country
   */
  saveCountry(country: any, frmType: string) {
    // console.log(country,frmType )
    this.country = country;
    this.store.dispatch({ type: AuthActions.STORE_COUNTRY_CODE, payload: this.country.callingCodes[0] });
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

  // // OTP Validation
  // otpSubmit(value) {
  //   if (this.otpForm.valid === true) {
  //      let number = null;
  //     if (this.phoneForm.value.mobile !== undefined && this.phoneForm.value.mobile.length > 5) {
  //       this.number = this.phoneForm.value.mobile;
  //     } else {
  //       number = this.number;
  //     }
  //     const send = {
  //       'number': this.number,
  //       'otp': value.otpNumber
  //     }
  //     this.store.dispatch({ type: AuthActions.OTP_SUBMIT, payload: send });
  //   }
  // }
  allowNumbersOnly(e: any) {
    const k = e.keyCode;
    return ((k >= 48 && k <= 57) || (k >= 96 && k <= 105) || k === 8);
  }
  onNumberChange(event){
    console.log(event);
    console.log(event.length);
    if(!event.match(this.regExp)){
      console.log('hey');
      this.isCharacter = true;
      this.invalidPhoneField = true;
    } else {
      this.isCharacter = false;
    }
    if (event.length < 4) {
      this.phMinLent = true;
      this.invalidPhoneField = true;
      if (event.length <= 0) {
        this.phNumbrReq = true;
        this.invalidPhoneField = true;
      } else {
        this.phNumbrReq = false;
      }
    } else {
      this.phMinLent = false;
    }
    if(!this.isCharacter && !this.phMinLent && !this.phNumbrReq){
      this.invalidPhoneField = false;
      this.phone = event;
    }
  }

  updateContactNumber() {
      if(!this.invalidPhoneField){
      const contactDetails = {
          contactNumber: this.phone.replace(/\s/g, ""),
          countryCode: this.country.callingCodes[0],
          otp:''
      };
        console.log(contactDetails)
      this.authService.mobileNumberCheck(contactDetails).subscribe( data => {
        if (data.SUCCESS.code === 1) {
            this.isMobileUnique = true;
        } else {
          this.store.dispatch({ type: AuthActions.SETTINGS_OTP_NUMBER_CHANGE, payload: contactDetails });
          // this.otpPopup.open();
        }
        });      
    }
  }
    // OTP Validation
    otpSubmit(value) {
      if (this.otpForm.valid === true) {
        let phoneNumber = null;
        phoneNumber = this.phone;
        // if (this.phone !== undefined && this.phone.value.length > 5) {
        //   phoneNumber = this.phone;
        // }
        const otpValue = value.otpNum.toString();
        const otpData = {
          contactNumber: phoneNumber,
          countryCode: this.country.callingCodes[0],
          otp: otpValue
        }
        console.log('otp value is', otpData)
        this.store.dispatch({ type: AuthActions.SETTINGS_OTP_NUMBER_CHANGE, payload: otpData });
      }
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
    console.log('rensedotpbody', resendOtpData);
    this.store.dispatch({ type: AuthActions.SETTING_OTP_RESEND_SUBMIT, payload: resendOtpData });
    setTimeout(() => {
      this.resendingOtp = false;
    }, 1500);
  }

  getContactDetails(cType: string) {
    if (this.petTag['setting_contact_information']
      && this.petTag['setting_contact_information']['contactNumber']
    ) {
      if (cType === 'number' && this.petTag['setting_contact_information']['contactNumber']) {
        return this.petTag['setting_contact_information']['contactNumber'];
      }
      if (cType === 'country' && this.petTag['setting_contact_information']['countryCode']) {
        return this.petTag['setting_contact_information']['countryCode'];
      }
    }
  }

  /**
   * profile type form update
   */
  // profileTypeFormUpdate(value) {
  //   if ( this.emailForm.valid === true ) {
  //     const form =  {
  //       'email': value.email
  //     }
  //     this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
  //   }
  // }
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
      this.passwordActive = false;
      // this.cancelEdit();
    }
    //  this.rebuild();
    //  this.cancelEdit();
  }

  rebuild() {
    this.pwdForm.patchValue({
      'currentpassword': '',
      'newpassword' : '' ,
      'confirmpassword' : ''
    });
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

  editField(fieldName: string) {
    if (fieldName === 'dob') {
      this.dob = this.removeUtc(this.birth)
    }
    if (fieldName === 'phone') {
      this.editingField = fieldName;
      setTimeout(() => {
        this.countrySelectorSet.initCountrySelector('country-options-set');
      }, 50);
    }
    if(fieldName === 'username'){
      if(this.specialChars || this.isRequired || this.capitalLetters || this.whitespace || this.invalidLength){
        this.specialChars = this.isRequired = this.capitalLetters = this.whitespace = this.invalidLength = false;
      }
    }
    if(fieldName === 'passChange'){
      this.passwordformInit();
    }
    this.editingField = fieldName;
  }

  cancelEdit() {
    this.editingField = '';
    this.userName = this.userProfile['username'];
  }

  onSelectionChange(val) {
    let reqBody;
      // for about update
      if (val.length > 0) {
        reqBody = {
            gender: ''
        };
        reqBody.gender = val;
        // console.log(reqBody)
        this._store.dispatch({ type: ProfileActions.LOAD_USER_UPDATE, payload: reqBody});
        this.cancelEdit();
        this._store.select('profileTags').
        first(data => data['userUpdateSuccess']).
        subscribe((state) => {
              if (state['userUpdateSuccess'] === true) {
                this._store.dispatch({ type: ProfileActions.LOAD_USER_DATA_DETAILS });
              }
          })
      }
    }

    /**
   * Update about individual field
   */
  updateAbout(fieldName: string) {
    let reqBody;
    if (fieldName === 'name' && this.name.length > 0) {
      reqBody = {
        name: {
          firstName:'',
          displayName: ''
        }
      };
      reqBody.name.firstName = this.name.trim();
      reqBody.name.displayName = this.name.trim();
      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: reqBody});
      this._store.select('profileTags').
      first(data => data['profileUpdateSuccess']).
      subscribe((state) => {
                if (state['profileUpdateSuccess'] === true) {
                  this._store.dispatch({ type: ProfileActions.LOAD_USER_DATA_DETAILS });
                }
            })
      this.cancelEdit();
      return;
    }
    if (fieldName === 'dob' && this.dob.length > 0) {
      let data = this.generalUtils.isValidDob(this.dob);
      reqBody = {
        other: {
          dob:{
            access: 0,
            date_of_birth:''
          }
        }
      };
      if(data !== undefined){
        if(data.invalid){
          this.error =true;
          this.msgDisplay = data.msg;
          return
        }
      }
      reqBody.other.dob.date_of_birth = this.reverseDate(this.dob) + 'T05:00:00';
      reqBody.other.dob.access = Number(this.privacy);
      this.error = false;
    }
    if (fieldName === 'username') {
      if (this.specialChars || this.isRequired || this.capitalLetters || this.whitespace || this.invalidLength) {
        return;
      } else {
        reqBody = {
          username: ''
        };
        reqBody.username = this.userName.trim();
      }
    }
    // if (fieldName === 'email' && this.email.length > 0) {
    //   reqBody = {
    //     email: ''
    //   };
    //   reqBody.email = this.email.trim();
    // }
    // console.log(reqBody)
    this._store.dispatch({ type: ProfileActions.LOAD_USER_UPDATE, payload: reqBody});
    this._store.select('profileTags').
    first(data => data['userUpdateSuccess']).
    subscribe((state) => {
              if (state['userUpdateSuccess'] === true) {
                this._store.dispatch({ type: ProfileActions.LOAD_USER_DATA_DETAILS });
              }
          })
    this.cancelEdit();
  }

    // user user exists
    userExistCheck(value) {
      // console.log('username validation',value.length, value)
      if (value.length <= 0) {
        // console.log('username validation',value.length)
        this.isRequired = true;
        this.validSuccess = false;
      } else {this.isRequired = false;
        this.validSuccess = true;}

      if (value.indexOf(' ') >= 0) {
        this.whitespace = true;
        this.validSuccess = false;
      } else {this.whitespace = false;
        this.validSuccess = true}

      if (/[A-Z]/.test(value)) {
        this.capitalLetters= true;
        this.validSuccess = false;
      } else {this.capitalLetters = false;
        this.validSuccess = true}

      if (value.length < 3 || value.length > 15) {
        this.invalidLength= true;
        this.validSuccess = false;
      } else {this.invalidLength = false;
        this.validSuccess = true}

      if (/[ !@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
        this.specialChars = true;
        this.validSuccess = false;
      } else {this.specialChars = false;
        this.validSuccess = true}

      if (value.length >= 4) {
        this.store.dispatch({ type: AuthActions.USER_EXISTS_CHECK, payload: value });
      } else {
        if (this.petTag && this.petTag.user_unique) {
          this.petTag.user_unique = false;
        }
      }
      if ((value.length >= 4 && value.length <= 15) && this.validSuccess === true) {
        this.userName = value;
      }
    }
  /**
   * select username from suggestions
   * @param selectUsername
   */
  useThisUsername(selectUsername: string) {
    this.userName = selectUsername;
  }

  calculateAge(birthday) {
    const ageDifMs = Date.now() - birthday.getTime();
    // console.log(ageDifMs);
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    // console.log(ageDate);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  /**
   * profileType toggle field
   */
  profileTypeToggle() {
    if (this.profileTypeActive === true) {
      this.profileTypeActive = false;
    } else {
      this.profileTypeActive = true;
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
   if (tab === 'Security') {
    this._store.dispatch({type: ProfileActions.LOAD_BLOCK_USERS, payload: this.userHandle});
   }
   if (tab === 'Notification') {
    this._store.dispatch({ type: ProfileActions.DEFAULT_NOTIFICATION_SETTINGS });
   }
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

  choosePrivacy(val: number){
    this.privacy = val;
  }

  // // focus on next otp number
  // nextOtpNum(e: any, pos: number) {
  //   // console.log(e,pos)
  //   if (e.keyCode === 8) {
  //     if (pos > 0 && pos < 7) {
  //       const prevNum = pos - 1;
  //       if (prevNum > 0) {
  //         const prevOtpInput = 'otpNum' + prevNum.toString();
  //         setTimeout(() => { this[prevOtpInput].nativeElement.focus(); }, 10);
  //       }
  //       return true;
  //     }
  //   } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
  //     if (pos > 0 && pos < 6) {
  //       const nextNum = pos + 1;
  //       const nextOtpInput = 'otpNum' + nextNum.toString();
  //       setTimeout(() => { this[nextOtpInput].nativeElement.focus(); }, 10);
  //     }
  //     return true;
  //   }
  //   return false;
  // }
}
