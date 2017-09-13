import { environment } from '../../../../environments/environment.prod';
import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { UserMedia } from '../../../models/user-media.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

// helper
import { TokenService } from '../../../helpers/token.service';
import { FormValidation, ProfileUpdateValidator } from '../../../helpers/form.validator';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { AuthActions } from '../../../actions/auth.action';
import { SharedActions } from '../../../actions/shared.action';

import { ProfileCard } from '../../../models/profile.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

import { find as _find, forEach as _forEach  } from 'lodash';

@Component({
  selector: 'app-profile-slider',
  templateUrl: './profile-slider.component.html',
  providers: [ModalService, DatePipe, ProfileUpdateValidator],
  styleUrls: ['./profile-slider.component.scss']
})

export class ProfileSliderComponent implements OnInit {
  @ViewChild('profileImage') fileInput;
  @Input() profileData: any;
  @Input() isOtherProfile: any;
  @Input() userName: string;
  @Input() profileObject: ProfileCard;
  changingImage: boolean;
  data: any;
  cropperSettings: CropperSettings;
  tagState$: Observable<ProfileModal>;
  skillState$: Observable<any>;
  private tagStateSubscription: Subscription;
  userProfile = initialTag ;
  findSkill: any;
  public profileForm: FormGroup;
  baseUrl: string;
  private dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  coverImage: string;

  selectedSkills = [];
  search: String;
  activateSubmitBtn = false;
  router: any;
  // profileObject: ProfileCard;

  hasFollowed: boolean;

  constructor(
    private http: Http,
    public modalService: ModalService,
    private fb: FormBuilder,
    private profileUpdateValidator: ProfileUpdateValidator,
    public datepipe: DatePipe,
    private _router: Router,
    public tokenService: TokenService,
    private profileStore: Store<ProfileModal>
  ) {

    this.baseUrl = environment.API_IMAGE;
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.rounded = true;
    this.data = {};

    this.tagState$ = this.profileStore.select('profileTags');
    this.skillState$ = this.profileStore.select('loginTags');

    this.tagState$.subscribe((state) => {
      this.userProfile = state;
    });

    this.skillState$.subscribe((state) => {
      this.findSkill = state;
    });

    this.buildEditForm();

    this.router = _router;

  }

  changingImageClick() {
    this.changingImage = true;
    this.modalService.open('ChangeProfile');
  }

  ngOnInit() {
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS });
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });
  }

  /**
   * Present Profile Cover Image
   */
  profileImageStyle(profile: any) {
    if (profile == null) {
      return false;
    }

    let coverImageURL;
    if (!profile.image.cover || profile.image.cover === '') {
      coverImageURL = 'https://www.dropbox.com/s/kskr4b3c0afc59i/default_coverImage__opt.jpg?raw=1';
    } else {
      coverImageURL = this.baseUrl + profile.image.cover;
    }
    // coverImageURL = 'https://www.dropbox.com/s/kskr4b3c0afc59i/default_coverImage__opt.jpg?raw=1';

    const resp = {
      'background-image': 'url(' + coverImageURL + ')',
      'background-size': 'cover'
    }

    return resp;
  }

  /**
   * Attach image url to Profile
   */
  saveImageClick() {
    if (this.data && this.data.image) {
      const data = {
        profileHandle: this.tokenService.getHandle(),
        image: this.data.image.split((/,(.+)/)[1])
      }
      this.profileStore.dispatch({ type: ProfileActions.LOAD_PROFILE_IMAGE, payload: data });
      this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
      this.changingImage = false;
    }
  }

  isClosed(event) {
    this.changingImage = event;
  }
  /**
   * Follow current Profile
   * @param profile
   */
  followUser(profile: any) {
    const handle = profile.userDetails.handle;
    this.profileStore.dispatch({ type: ProfileActions.PROFILE_FOLLOW, payload: handle });
  }

  /**
   * Profile Page Edit
   */
  profileEdit() {
    this.loadSkill();
    this.modalService.open('profileEditWindow');
    const date = this.datepipe.transform(this.userProfile.profileDetails['physical'].dateOfBirth, 'dd-MM-yyyy');
    this.profileForm.setValue({
      name: this.userProfile.profileDetails['name'],
      bio: this.userProfile.profileUser['bio'],
      skill: '',
      username: this.userProfile.profileDetails['extra'].username,
      number: this.userProfile.profileDetails['contact'].mobile.mobile,
      mobilePrivacy: this.userProfile.profileDetails['contact'].mobile.access,
      email: this.userProfile.profileDetails['email'],
      emailPrivacy: 0,
      website: this.userProfile.profileDetails['contact'].website.website,
      websitePrivacy: this.userProfile.profileDetails['contact'].website.access,
      dob: date
    });
  }

  /**
   * Close a modal window
   * @param id modal ID
   */
  modalCloser(id: string, state: boolean ) {
    if (id != null && state === false) {
      this.modalService.close(id);
    }

    if (id != null && state === true) {
      this.modalService.open(id);
    }
  }

  /**
   * Reserve date
   * @param string
   */
  reverseDate(string) {
    if (string != null) {
      return string.split('-').reverse().join('-');
    }
  }

  /**
   * Profile Form Popup close
   */
  profileFormClose() {
    this.modalService.close('profileEditWindow');
  }

  /**
   * Add current user Work
   */
  deleteAddWork(id) {
    this.profileStore.dispatch({ type: ProfileActions.DELETE_USER_WORK, payload: id });
  }

  /**
   * Edit Form Submit
   */
  profileFormSubmit(value) {
    console.log(this.profileForm.valid);
    if ( this.profileForm.valid === true ) {
      const form =  {
        'extras': {
          'association': {
            'summary': value.bio
          },
          'contact': {
            'mobile': {
              'mobile': value.number,
              'access': Number(value.mobilePrivacy)
            },
            'website': {
              'website': value.website,
              'access': Number(value.websitePrivacy)
            }
          }
        },
        'address': {
          'city': 'City',
          'state': 'State'
        },
        'physical': {
          'dateOfBirth': this.reverseDate(value.dob) + 'T05:00:00',
            'height': 0.0,
            'weight': 0.0,
        },
        'name': {
          'firstName': value.name,
          'displayName': value.name
        },
        'profileTypeList': this.selectedSkills,
        'username': value.username.toLowerCase(),
        'email': value.email
      }

      this.profileStore.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
      this.modalService.close('profileEditWindow');
    }

  }

  /**
   * Form initial value
   */
  buildEditForm(): void {
    this.profileForm = this.fb.group({
      'name' : ['' , [Validators.required]],
      'bio' : ['' , [Validators.required]],
      'skill': '',
      'username' : ['', [Validators.required, Validators.minLength(4), FormValidation.noWhitespaceValidator], this.profileUpdateValidator.userNameValidation.bind(this.profileUpdateValidator)],
      'number' : ['' , [Validators.required]],
      'mobilePrivacy' : ['0' , [Validators.required]],
      'email' : ['' , [Validators.required], this.profileUpdateValidator.emailValidation.bind(this.profileUpdateValidator)],
      'emailPrivacy' : ['0' , [Validators.required]],
      'website' : '',
      'websitePrivacy' : '0',
      'dob' : ['' , [Validators.required], this.profileUpdateValidator.validAge.bind(this.profileUpdateValidator)],

    });
    const nameValue = this.userProfile.profileUser['name'];
  }

  /**
   * Checking for the valid email input on register form
   * @param control: Form email input
   */
  validEmail(control: AbstractControl) {
    console.log(control.value);
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
   * Upload Cover image
   */
  uploadCoverImage() {
    this.upload();
  }

  /**
   * File Handler
   */
  upload() {
    const fileBrowser = this.fileInput.nativeElement;
    this.profileStore.dispatch({ type: ProfileActions.PROFILE_COVER_UPDATE, payload: fileBrowser });
  }
  /**
   * Toggle Coer Image upload modal
   */
  showCoverImageUploader() {
    this.modalCloser('ChangeCover', true);
  }

  /**
   * Search skill on profile Edit
   */
  onSearchChange(query) {
    if (query || query !== '') {
      this.profileStore.dispatch({ type: AuthActions.SEARCH_SKILL, payload: query });
    }
    this.findSkill = [];
  }

  /**
   * Exsist update skill push selected skill array
   */
  loadSkill() {
    const skill = this.userProfile.profileDetails['profileType'];
    this.selectedSkills = [];

    for (let i = 0; i < skill.length; i++) {
      this.selectedSkills.push({
        'name': skill[i].name,
        'code': skill[i].code,
        'active': true
      });
    }
  }

  /**
   * Handle Skill selection
   * @param skillCode
   */
  toggleSelectSkill(skillCode: string) {
    // Check if skill is already selected
    const selectedSkill = _find(this.selectedSkills, function(s) {
      return s.code === skillCode;
    });

   console.log(selectedSkill);

    // If skill exist then remove it from selection array
    if (selectedSkill !== undefined) {
      // Searching for the skill in skills array
      if (this.findSkill.skills !== undefined) {
        const skillMeta = this.selectedSkill(skillCode);
      }
      // Removing skill from selected skills array
      this.selectedSkills = this.selectedSkills.filter(function(skill) {
        return skill.code !== skillCode;
      });
      // Mark it not selected in UI
      if (this.findSkill.skills !== undefined) {
        this.findSkill.skills = this.findSkill.skills.filter(function(skill) {
          if (skill.code === skillCode) {
            skill.isSelected = false;
          }
          return skill;
        });
      }

    } else {
      // Mark it selected in UI
      this.findSkill.skills = this.findSkill.skills.filter(function(skill) {
        if (skill.code === skillCode) {
          skill.isSelected = true;
        }
        return skill;
      });

      // Searching for the skill in skills array
      const skillMeta = this.selectedSkill(skillCode);

      // Adding skill to the selection array
      this.selectedSkills.push({
        'name': skillMeta.name,
        'code': skillMeta.code,
        'active': true
      });
    }

    if (this.selectedSkills.length > 0) {
      this.activateSubmitBtn = true;
    } else {
      this.activateSubmitBtn = false;
    }
  }

   /**
   * Find Skill from API Skill List
   * @param skillCode
   */
  selectedSkill(skillCode) {
    return _find(this.findSkill.skills, function(s: any) {
      return s.code === skillCode;
    });
  }

  // Skill Popup
  skillPopup() {
    this.modalService.open('skillMoreWindow');
  }

}

