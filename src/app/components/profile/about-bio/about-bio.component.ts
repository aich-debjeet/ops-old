import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ProfileHelper } from '../../../helpers/profile.helper';
import { FormValidation, ProfileUpdateValidator } from '../../../helpers/form.validator';
import { environment } from '../../../../environments/environment';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';

import { ToastrService } from 'ngx-toastr';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-about-bio',
  templateUrl: './about-bio.component.html',
  providers: [ModalService , DatePipe],
  styleUrls: ['./about-bio.component.scss']
})
export class AboutBioComponent implements OnInit, OnDestroy {
  private dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public bioForm: FormGroup;
  tagState$: Observable<ProfileModal>;
  subscription: Subscription;
  stateProfile = initialTag;
  userProfile: any;
  ownProfile: boolean;
  changingImage: boolean;
  aboutMe: any;
  gender: any;
  addressOne: any;
  addressTwo: any;
  city: any;
  country: any;
  pinCode: any;
  height: any;
  weight: any;
  lang: any;
  ethnicity: any;
  complexion: any;
  dob: any;
  email: any;
  emailPrivacy: any;
  number: any;
  website: any;
  websitePrivacy: any;
  mobilePrivacy: any;
  skillsArray:any;
  editingField: string;
  imageBaseUrl = environment.API_IMAGE;
  invalidDOB: boolean = false;
  isUnderAge: boolean = false;
  isOverAge: boolean = false;

  constructor(
    private _http: Http,
    private _modalService: ModalService,
    private _fb: FormBuilder,
    private _utils: ProfileHelper,
    private profileUpdateValidator: ProfileUpdateValidator,
    private _store: Store<ProfileModal>,
    public datepipe: DatePipe,
    private toastr: ToastrService
  ) {
    this.tagState$ = this._store.select('profileTags');

    this.subscription = this.tagState$.subscribe((state) => {
      // this.stateProfile = state;
      console.log(state)
    if(state) {
      this.stateProfile = state;
      if (state.profile_user_info) {
        if (this.stateProfile.profile_user_info.isCurrentUser === false && this.stateProfile.profile_other_loaded === true) {
          this.ownProfile = false;
          this.userProfile = this.stateProfile.profile_other;
        }else {
          this.ownProfile = true;
          this.userProfile = this.stateProfile.profile_details;
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['aboutMe']){
            this.aboutMe = this.stateProfile['profile_details']['aboutMe']
            console.log(this.aboutMe)
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['profileType']){
            this.skillsArray = this.stateProfile['profile_details']['profileType']
            console.log(this.skillsArray)
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['physical']['gender']){
            this.gender = this.stateProfile['profile_details']['physical']['gender']
            console.log(this.gender)
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['extra']['address']['line1']){
            this.addressOne = this.stateProfile['profile_details']['extra']['address']['line1']
            console.log(this.addressOne)
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['extra']['address']['line2']){
            this.addressTwo = this.stateProfile['profile_details']['extra']['address']['line2']
            console.log(this.addressTwo)
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['extra']['address']['city']){
            this.city = this.stateProfile['profile_details']['extra']['address']['city']
            console.log(this.city)
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['extra']['address']['country']){
            this.country = this.stateProfile['profile_details']['extra']['address']['country']
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['extra']['address']['postalCode']){
            this.pinCode = this.stateProfile['profile_details']['extra']['address']['postalCode']
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['physical']['height']){
            this.height = this.stateProfile['profile_details']['physical']['height']
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['physical']['weight']){
            this.weight = this.stateProfile['profile_details']['physical']['weight']
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['languages']){
            this.lang = this.stateProfile['profile_details'].languages.toString()
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['physical']['ethnicity']){
            this.ethnicity = this.stateProfile['profile_details']['physical']['ethnicity']
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['physical']['complexion']){
            this.complexion = this.stateProfile['profile_details']['physical']['complexion']
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['email']){
            this.email = this.stateProfile['profile_details']['email']
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['contact']['mobile']['mobile']){
            this.number = this.stateProfile['profile_details']['contact']['mobile']['mobile']
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['contact']['website']['website']){
            this.website = this.stateProfile['profile_details']['contact']['website']['website']
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['contact']['website']['access']){
            this.websitePrivacy = this.stateProfile['profile_details']['contact']['website']['access']
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['contact']['mobile']['access']){
            this.mobilePrivacy = this.stateProfile['profile_details']['contact']['mobile']['access']
          }
          if(this.stateProfile.profile_details && this.stateProfile['profile_details']['physical']['dateOfBirth']){
            this.dob = this.datepipe.transform(this.stateProfile['profile_details']['physical']['dateOfBirth'], 'dd-MM-yyyy');
          }
        }
      }
    }      
    });
  }

  ngOnInit() {
    // this.bioFormIinit()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isClosed(event) {
    this.changingImage = event;
  }

  editField(fieldName: string) {
    console.log(fieldName)
    this.editingField = fieldName;
  }

  cancelEdit() {
    this.editingField = '';
  }

  openPopup() {
    this._modalService.open('bioEdit');
    // this.bioFormUpdate();
  }

    /**
   * Update about individual field
   */
  updateAbout(fieldName: string) {
    console.log(fieldName)
    let reqBody;
    //for about update
    if (fieldName === 'aboutMe' && this.aboutMe.length > 0) {
      reqBody = {
        extras: {
          aboutMe: ''
        }
      };
      reqBody.extras.aboutMe = this.aboutMe.trim();
      console.log(reqBody)
    }
    if(fieldName === 'dob' && this.dob.length > 0){
      reqBody = {
        physical: {
          dateOfBirth: ''
        }
      };
      console.log(this.dob)
      const dateArr =  this.dob.split('-');
      const day = dateArr[0];
      const month = dateArr[1];
      const year = dateArr[2];
      console.log(dateArr)
      // check for valid day number
      if (parseInt(day, 10) > 31) {
        this.invalidDOB =true;
         return
        //  { invalidDOB: true };
      }

    // check for valid month number
    if (parseInt(month, 10) > 12) {
      this.invalidDOB =true;
      return
    }

    // check if year is not greater that current
    if (new Date().getUTCFullYear() < year) {
      this.invalidDOB = true;
      return
    }

    const birthDate = new Date(year, month, day);
    const age = this.calculateAge(birthDate);

    if (age <= 13) {
      this.isUnderAge = true;
      return
    } else if (age >= 100) {
      this.isOverAge = true;
      return
    }

    reqBody.physical.dateOfBirth = this.reverseDate(this.dob) + 'T05:00:00';
    console.log(reqBody)
    return null;
    }
    if (fieldName === 'height' && this.height.length > 0) {
      reqBody = {
        physical: {
          height: ''
        }
      };
      reqBody.physical.height = parseFloat(this.height);
      console.log(reqBody)
    }
    if (fieldName === 'weight' && this.weight.length > 0) {
      reqBody = {
        physical: {
          weight: ''
        }
      };
      reqBody.physical.weight = parseFloat(this.weight);
      console.log(reqBody)
    }
    if (fieldName === 'language' && this.lang.length > 0) {
      reqBody = {
        extras: {
          association:{
            languages: ''
          }
        }
      };
      const lang = this.lang.trim() === '' ? [] : this.lang.split(',').map(function(item) {
              return item.trim();
            });
      reqBody.extras.association.languages = lang;
      console.log(reqBody)
    }
    if (fieldName === 'address' && (this.addressOne.length > 0 || this.city.length > 0 || this.country.length > 0 || this.pinCode.length > 0)) {
      reqBody = {
        address: {
          city: '',
          country: '',
          line1: '',
          line2: '',
          postalCode: '',
        }
      };
      reqBody.address.city = this.city.charAt(0).toUpperCase().trim() + this.city.slice(1).trim() || '';
      reqBody.address.country = this.country.trim() || '';
      reqBody.address.line1 = this.addressOne.trim() || '';
      // reqBody.address.line2 = this.addressTwo.trim() || '';
      reqBody.address.postalCode = this.pinCode.trim() || '';

      console.log(reqBody)
    }

    if (fieldName === 'ethnicity' && this.ethnicity.length > 0) {
      reqBody = {
        physical: {
          ethnicity: ''
        }
      };
      reqBody.physical.ethnicity = this.ethnicity.trim() || '';
      console.log(reqBody)
    }
    this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: reqBody});
    this.toastr.success('Your profile has been updated successfully!');
  }
  
  calculateAge(birthday) {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  reverseDate(string) {
    if (string != null) {
      return string.split('-').reverse().join('-');
    }
  }

  // bio form submit
  // bioFormSubmit(value) {
  //   if ( this.bioForm.valid === true ) {
  //     const height = value.height === null ? 0 : value.height;
  //     const weight = value.weight === null ? 0 : value.weight;
  //     const pincode = value.pin_code === null ? '' : value.pin_code.toString();
  //     const lang = value.lang.trim() === '' ? [] : value.lang.split(',').map(function(item) {
  //       return item.trim();
  //     });
  //       const form =  {
  //         'email': value.email.trim(),
  //         'extras': {
  //           'aboutMe': value.about_me.trim(),
  //           'association': {
  //             'languages': lang
  //           },
  //           'contact': {
  //             'mobile': {
  //               'mobile': value.number.trim(),
  //               'access': Number(value.mobilePrivacy)
  //             },
  //             'website': {
  //               'website': value.website.trim(),
  //               'access': Number(value.websitePrivacy)
  //             }
  //           }
  //         },
  //         'address': {
  //           'city': value.city.charAt(0).toUpperCase().trim() + value.city.slice(1).trim(),
  //           'country': value.country.trim(),
  //           'line1': value.address_one.trim(),
  //           'line2': value.address_two.trim(),
  //           'postalCode': pincode,
  //         },
  //         'physical': {
  //           'height': parseFloat(height),
  //           'weight': parseFloat(weight),
  //           'ethnicity' : value.ethnicity.trim(),
  //           'complexion' : value.complexion.trim(),
  //           'gender': value.gender.trim()
  //         }
  //       }

  //       this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
  //       this.toastr.success('Your profile has been updated successfully!');
  //       this._modalService.close('bioEdit');
  //   }else {
  //     this.toastr.error('Please fill out all required fields');
  //   }
  // }

  // editFormClose() {
  //   this._modalService.close('bioEdit');
  // }

  // Form init
  // bioFormIinit() {
  //   this.bioForm = this._fb.group({
  //     'about_me': '',
  //     'gender': ['M' , [Validators.required]],
  //     'address_one': '',
  //     'address_two': '',
  //     'city': '',
  //     'country': '',
  //     'pin_code': '',
  //     'height': '',
  //     'weight': '',
  //     'lang': '',
  //     'ethnicity': '',
  //     'complexion': '',
  //     'number': ['' , [Validators.required], this.profileUpdateValidator.mobileValidation.bind(this.profileUpdateValidator)],
  //     'mobilePrivacy': ['0' , [Validators.required]],
  //     'email': ['' , [Validators.required], this.profileUpdateValidator.emailValidation.bind(this.profileUpdateValidator)],
  //     'emailPrivacy': ['0' , [Validators.required]],
  //     'website': '',
  //     'websitePrivacy': '0',
  //   });
  // }

  // bioFormUpdate() {
  //   const height = this.userProfile['physical'].height === 0 ? '' : this.userProfile['physical'].height.toFixed(2);
  //   const weight = this.userProfile['physical'].weight === 0 ? '' : this.userProfile['physical'].weight;
  //   this.bioForm.setValue({
  //     about_me: this.userProfile.aboutMe,
  //     gender: this.userProfile['physical'].gender ,
  //     address_one: this.userProfile['extra']['address'].line1,
  //     address_two: this.userProfile['extra']['address'].line2,
  //     city: this.userProfile['extra']['address'].city,
  //     country: this.userProfile['extra']['address'].country,
  //     pin_code: this.userProfile['extra']['address'].postalCode,
  //     height: height,
  //     weight: weight,
  //     lang: this.userProfile.languages.toString(),
  //     ethnicity: this.userProfile['physical'].ethnicity,
  //     complexion: this.userProfile['physical'].complexion,
  //     number: this.userProfile['contact'].mobile.mobile,
  //     mobilePrivacy: this.userProfile['contact'].mobile.access,
  //     email: this.userProfile['email'],
  //     emailPrivacy: 0,
  //     website: this.userProfile['contact'].website.website,
  //     websitePrivacy: this.userProfile['contact'].website.access,
  //   });
  // }

onSelectionChange(val){
  console.log(val)
  let reqBody;
    //for about update
    if (val.length > 0) {
      reqBody = {
        physical: {
          gender: ''
        }
      };
      reqBody.physical.gender = val;
      console.log(reqBody)
      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: reqBody});
      this.toastr.success('Your profile has been updated successfully!');
    }
  }
}
