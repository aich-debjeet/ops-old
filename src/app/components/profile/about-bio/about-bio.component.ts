import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProfileHelper } from '../../../helpers/profile.helper';
import { ProfileUpdateValidator } from '../../../helpers/form.validator';
import { environment } from '../../../../environments/environment';
import { Subject } from 'rxjs/Subject';
import { AuthActions } from '../../../actions/auth.action';

import { GeneralUtilities } from '../../../helpers/general.utils';
// action
import { ProfileActions } from '../../../actions/profile.action';

import { ToastrService } from 'ngx-toastr';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { find as _find, forEach as _forEach  } from 'lodash';

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
  skillsArray = [];
  editingField: string;
  imageBaseUrl = environment.API_IMAGE;
  invalidDOB = false;
  isUnderAge = false;
  isOverAge = false;
  findSkill: any;
  skillState$: Observable<any>;
  skill: any;
  txtQueryChanged: Subject<string> = new Subject<string>();
  validWeight = false;
  validHeight = false;
  isUpdating: boolean;

  constructor(
    private _modalService: ModalService,
    private _fb: FormBuilder,
    private _utils: ProfileHelper,
    private profileUpdateValidator: ProfileUpdateValidator,
    private _store: Store<ProfileModal>,
    public datepipe: DatePipe,
    private toastr: ToastrService,
    private generalUtils: GeneralUtilities
  ) {
    this.tagState$ = this._store.select('profileTags');
    this.skillState$ = this._store.select('loginTags');

    this.subscription = this.tagState$.subscribe((state) => {
      // this.stateProfile = state;
    if (state) {
      // console.log(state)
      this.stateProfile = state;
      if (state.profile_user_info) {
        if (this.stateProfile.profile_user_info.isCurrentUser === false && this.stateProfile.profile_other_loaded === true) {
          this.ownProfile = false;
          this.userProfile = this.stateProfile.profile_other;
          if (this.stateProfile.profile_other && this.stateProfile['profile_other']['profileType']) {
            this.skillsArray = this.stateProfile['profile_other']['profileType']
          }
        } else {
          this.ownProfile = true;
          // this.userProfile = this.stateProfile.profile_details;
          if (this.generalUtils.checkNestedKey(state, ['profile_details'])) {
            this.userProfile = state['profile_details'];
            // console.log(this.userProfile);
            if (this.generalUtils.checkNestedKey(this.userProfile, ['aboutMe'])) {
              this.aboutMe = this.userProfile['aboutMe'];
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['profileType'])) {
              this.loadSkill();
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['physical'])){
              if (this.generalUtils.checkNestedKey(this.userProfile['physical'], ['gender'])){
                this.gender = this.userProfile['physical']['gender'];
              }
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['extra'])) {
              if (this.generalUtils.checkNestedKey(this.userProfile['extra'], ['address'])) {
                if (this.generalUtils.checkNestedKey(this.userProfile['extra']['address'], ['line1'])) {
                  this.addressOne = this.userProfile['extra']['address']['line1'];
                }
              }
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['extra'])) {
              if (this.generalUtils.checkNestedKey(this.userProfile['extra'], ['address'])) {
                if (this.generalUtils.checkNestedKey(this.userProfile['extra']['address'], ['line2'])) {
                  this.addressTwo = this.userProfile['extra']['address']['line2'];
                }
              }
            }

            if (this.generalUtils.checkNestedKey(this.userProfile, ['extra'])) {
              if (this.generalUtils.checkNestedKey(this.userProfile['extra'],['address'])) {
                if (this.generalUtils.checkNestedKey(this.userProfile['extra']['address'], ['city'])) {
                  this.city = this.userProfile['extra']['address']['city'];
                }
              }
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['extra'])) {
              if (this.generalUtils.checkNestedKey(this.userProfile['extra'], ['address'])) {
                if (this.generalUtils.checkNestedKey(this.userProfile['extra']['address'], ['country'])) {
                  this.country = this.userProfile['extra']['address']['country'];
                }
              }
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['extra'])) {
              if (this.generalUtils.checkNestedKey(this.userProfile['extra'], ['address'])) {
                if (this.generalUtils.checkNestedKey(this.userProfile['extra']['address'], ['postalCode'])) {
                  this.pinCode = this.userProfile['extra']['address']['postalCode'];
                }
              }
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['physical'])) {
              if (this.generalUtils.checkNestedKey(this.userProfile['physical'], ['height'])) {
                this.height = this.userProfile['physical']['height'].toFixed(2);
              }
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['physical'])) {
              if (this.generalUtils.checkNestedKey(this.userProfile['physical'], ['weight'])) {
                this.weight = this.userProfile['physical']['weight'].toFixed(2);
              }
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['languages'])) {
              this.lang = this.userProfile.languages.toString();
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['physical'])) {
              if (this.generalUtils.checkNestedKey(this.userProfile['physical'], ['ethnicity'])) {
                this.ethnicity = this.userProfile['physical']['ethnicity'];
              }
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['physical'])) {
              if (this.generalUtils.checkNestedKey(this.userProfile['physical'], ['complexion'])) {
                this.complexion = this.userProfile['physical']['complexion'];
              }
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['physical'])) {
              if (this.generalUtils.checkNestedKey(this.userProfile['physical'], ['dateOfBirth'])) {
                this.dob = this.datepipe.transform(this.userProfile['physical']['dateOfBirth'], 'dd-MM-yyyy');
              }
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['email'])) {
              this.email = this.userProfile['email'];
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['contact'])) {
              if (this.generalUtils.checkNestedKey(this.userProfile['contact'], ['mobile'])) {
                if (this.generalUtils.checkNestedKey(this.userProfile['contact']['mobile'], ['mobile'])) {
                  this.number = this.userProfile['contact']['mobile']['mobile'];
                } 
              }
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['contact'])) {
              if (this.generalUtils.checkNestedKey(this.userProfile['contact'], ['website'])) {
                if (this.generalUtils.checkNestedKey(this.userProfile['contact']['website'], ['website'])) {
                  this.website = this.userProfile['contact']['website']['website'];
                } 
              }
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['contact'])) {
              if (this.generalUtils.checkNestedKey(this.userProfile['contact'], ['website'])) {
                if (this.generalUtils.checkNestedKey(this.userProfile['contact']['website'], ['access'])) {
                  this.websitePrivacy = this.userProfile['contact']['website']['access'];
                } 
              }
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['contact'])) {
              if (this.generalUtils.checkNestedKey(this.userProfile['contact'], ['mobile'])) {
                if (this.generalUtils.checkNestedKey(this.userProfile['contact']['mobile'], ['access'])) {
                  this.mobilePrivacy = this.userProfile['contact']['mobile']['access'];
                } 
              }
            }
          }
          if(state && state.isUpdating === true){
            console.log('updating');
            this.isUpdating = true;
          }
          if(state && state.isUpdating === false){
            if(this.isUpdating){
              console.log('updating done');
              this.cancelEdit();
              this.toastr.success('Your profile has been updated successfully!', '', {
                timeOut: 3000
              });
              this.isUpdating = false;
            }
          }
        }
      }
    }
    });

    this.skillState$.subscribe((state) => {
      this.findSkill = state;
    });
    this.txtQueryChanged
      .debounceTime(1000) // wait 1 sec after the last event before emitting last event
      .subscribe(model => {
        this._store.dispatch({ type: AuthActions.SEARCH_SKILL, payload: model });
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
    let reqBody;
    // for about update
    if (fieldName === 'aboutMe') {
       reqBody = {
        extras: {
          aboutMe: ''
        }
      };
      if (this.aboutMe.length <= 0) {
        reqBody.extras.aboutMe = '';
      } else {
        reqBody.extras.aboutMe = this.aboutMe.trim();
      }
    }
    if (fieldName === 'dob') {
      reqBody = {
        physical: {
          dateOfBirth: ''
        }
      };
      if (this.dob.length <= 0) {
        this.invalidDOB = true;
        return;
      } else {
          const dateArr =  this.dob.split('-');
          const day = dateArr[0];
          const month = dateArr[1];
          const year = dateArr[2];

          // check for valid day number
          if (parseInt(day, 10) > 31) {
            this.invalidDOB = true;
            return
            //  { invalidDOB: true };
          }

        // check for valid month number
        if (parseInt(month, 10) > 12) {
          this.invalidDOB = true;
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
      }
    // return null;
    }
    if (fieldName === 'height') {
      reqBody = {
        physical: {
          height: ''
        }
      };
      if (this.height.length <= 0) {
        reqBody.physical.height = 0.0;
      } else {
        if (isNaN(this.height)) {
          this.validHeight = true;
          return;
        } else {
          this.validHeight = false;
          reqBody.physical.height = parseFloat(this.height);
        }
      }
    }
    if (fieldName === 'weight') {
      reqBody = {
        physical: {
          weight: ''
        }
      };
      if (this.weight.length <= 0) {
        reqBody.physical.weight = 0.0;
      } else {
        if (isNaN(this.weight)) {
          this.validWeight = true;
          return false;
        } else {
          this.validWeight = false;
          reqBody.physical.weight = parseFloat(this.weight);
        }
      }
    }
    if (fieldName === 'language') {
      reqBody = {
        extras: {
          association: {
            languages: ''
          }
        }
      };
      if (this.lang.length <= 0) {
        reqBody.extras.association.languages = [];
      } else {
        const lang = this.lang.trim() === '' ? [] : this.lang.split(',').map(function(item) {
          return item.trim();
        });
        reqBody.extras.association.languages = lang;
      }
    }
    if (fieldName === 'address') {
      reqBody = {
        address: {
          city: '',
          country: '',
          line1: '',
          line2: '',
          postalCode: '',
        }
      };
      reqBody.address.city = this.city ? this.city.charAt(0).toUpperCase().trim() + this.city.slice(1).trim() : '';
      reqBody.address.country = this.country ? this.country.trim() : '';
      reqBody.address.line1 = this.addressOne ? this.addressOne.trim() : '';
      // reqBody.address.line2 = this.addressTwo.trim() || '';
      reqBody.address.postalCode = this.pinCode ? this.pinCode.trim() : '';

    }

    if (fieldName === 'ethnicity') {
      reqBody = {
        physical: {
          ethnicity: ''
        }
      };
      if (this.ethnicity.length <= 0) {
        reqBody.physical.ethnicity = '';
      } else {
         reqBody.physical.ethnicity = this.ethnicity.trim() || '';
      }
    }
    if (fieldName === 'skills') {
      reqBody = {
        profileTypeList: ''
      };
      if (this.skillsArray.length > 0) {
        reqBody.profileTypeList = this.skillsArray;
        this.findSkill.industries = [];
      } else {
        reqBody.profileTypeList = '';
        this.findSkill.industries = [];
      }
    }
    //  console.log(reqBody)
    this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: reqBody});
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
  //   } else {
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

onSelectionChange(val) {
  let reqBody;
    // for about update
    if (val.length > 0) {
      reqBody = {
        physical: {
          gender: ''
        }
      };
      reqBody.physical.gender = val;

      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: reqBody});
    }
  }
   /**
   * Handle Skill selection
   * @param skillCode
   */
  toggleSelectSkill(skillCode: string) {
    // Check if skill is already selected
    const selectedSkill = _find(this.skillsArray, function(s) {
      return s.code === skillCode;
    });

    // If skill exist then remove it from selection array
    if (selectedSkill !== undefined) {
      // Searching for the skill in skills array
      if (this.findSkill.industries !== undefined) {
        const skillMeta = this.selectedSkill(skillCode);
      }
      // Removing skill from selected skills array
      this.skillsArray = this.skillsArray.filter(function(skill) {
        return skill.code !== skillCode;
      });
      // Mark it not selected in UI
      if (this.findSkill.skills !== undefined) {
        this.findSkill.skills = this.findSkill.industries.filter(function(skill) {
          if (skill.code === skillCode) {
            skill.isSelected = false;
          }
          return skill;
        });
      }

    } else {
      // Mark it selected in UI
      this.findSkill.skills = this.findSkill.industries.filter(function(skill) {
        if (skill.code === skillCode) {
          skill.isSelected = true;
        }
        return skill;
      });

      // Searching for the skill in skills array
      const skillMeta = this.selectedSkill(skillCode);

      // Adding skill to the selection array
      this.skillsArray.push({
        'name': skillMeta.name,
        'code': skillMeta.code,
        'active': true
      });
    }

    // if (this.skillsArray.length > 0) {
    //   this.activateSubmitBtn = true;
    // } else {
    //   this.activateSubmitBtn = false;
    // }
  }

   /**
   * Find Skill from API Skill List
   * @param skillCode
   */
  selectedSkill(skillCode) {
    return _find(this.findSkill.industries, function(s: any) {
      return s.code === skillCode;
    });
  }

    /**
   * Search skill on profile Edit
   */
  onSearchChange(query) {
    if (query) {
      // console.log('query',query)
    //   this.profileStore.dispatch({ type: AuthActions.SEARCH_SKILL, payload: query });
    this.txtQueryChanged.next(query);
    } else {
      this.txtQueryChanged.next('undefined');
    }
    this.findSkill = [];
  }

  allowNumbersOnly(e: any) {
    const k = e.keyCode;
    return ((k >= 48 && k <= 57) || (k >= 96 && k <= 105) || k === 8);
  }

  /**
   * Exsist update skill push selected skill array
   */
  loadSkill() {
    this.skillsArray = [];
    const skill = this.userProfile['profileType']
    if (skill.length > 0) {
      for (let i = 0; i < skill.length; i++) {
        this.skillsArray.push({
          'name': skill[i].name,
          'code': skill[i].code,
          'active': true
        });
      }
    }
  }
}
