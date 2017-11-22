import { environment } from '../../../../environments/environment';
import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { Modal } from '../../../shared/modal-new/Modal';
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

import { ToastrService } from 'ngx-toastr';

import { ProfileCard } from '../../../models/profile.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { find as _find, forEach as _forEach  } from 'lodash';
import { ProfileHelper } from '../../../helpers/profile.helper';

@Component({
  selector: 'app-profile-slider',
  templateUrl: './profile-slider.component.html',
  providers: [ModalService, DatePipe, ProfileUpdateValidator],
  styleUrls: ['./profile-slider.component.scss']
})

export class ProfileSliderComponent implements OnInit {
  // @ViewChild('profileImage') fileInput;
  @Input() profileData: any;
  @Input() isOtherProfile: any;
  @Input() userName: string;
  isOwner: boolean;
  profileObject: ProfileCard;
  changingImage: boolean;
  tagState$: Observable<ProfileModal>;
  skillState$: Observable<any>;
  private tagStateSubscription: Subscription;
  userProfile = initialTag ;
  findSkill: any;
  public profileForm: FormGroup;
  baseUrl: string;
  private dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  coverImage: string;
  profileImage: string;
  selectedSkills = [];
  search: String;
  activateSubmitBtn = false;
  router: any;
  isFollowing: boolean;
  defaultImage: string;
  followers: string;
  // profileObject: ProfileCard;

  hasFollowed: boolean;


  @ViewChild('skillModal') UsertypeModal: Modal;

  constructor(
    private http: Http,
    public modalService: ModalService,
    private fb: FormBuilder,
    private profileUpdateValidator: ProfileUpdateValidator,
    public datepipe: DatePipe,
    private _router: Router,
    public tokenService: TokenService,
    private profileStore: Store<ProfileModal>,
    private utils: ProfileHelper,
    private toastr: ToastrService
  ) {

    document.body.scrollTop = 0;
    this.baseUrl = environment.API_IMAGE;

    this.tagState$ = this.profileStore.select('profileTags');
    this.skillState$ = this.profileStore.select('loginTags');
    this.defaultImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';

    this.tagState$.subscribe((state) => {
      this.userProfile = state;
      if (state.profile_user_info) {
        if (state.profile_user_info.isCurrentUser) {
          this.profileObject = this.loadProfile( state, 'own' );
          this.isOwner = true;
        }else {
          this.profileObject = this.loadProfile( state, 'other' );
          this.isOwner = false;
        }
      }
    });

    this.skillState$.subscribe((state) => {
      this.findSkill = state;
    });

    this.buildEditForm();

    this.router = _router;


    this.profileStore.select('profileTags')
      .first(profile => profile['profile_other'].handle )
      .subscribe( data => {
        this.isFollowing = data['profile_other'].extra.isFollowing;
        this.followers = data['profile_other'].followersCount;
      });
  }

  disableFollowForSelf(username: string) {
    if (this.userProfile && this.userProfile['profileUser']['username'] === username) {
      return true;
    }
    return false;
  }

  /**
   * User type based user load
   */
  loadProfile(profile: any, type: string) {
      return this.utils.profileValueMapping(profile, type );
  }

  ngOnInit() {
  }

  modalInit() {
    this.modalService.open('ChangeProfile');
  }

  /**
   * Present Profile Cover Image
   */
  coverImageStyle(profile: any) {
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
   * Present Profile Cover Image
   */
  profileImageDefault() {
    let profileImageURL = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
    const profile = this.profileObject;
    if (profile) {
      if (profile.image && profile.image.profile !== '') {
        profileImageURL = this.baseUrl + profile.image.profile;
      }
      // Profile
      this.profileImage = profileImageURL;
    }
    // return profileImageURL;
  }

  isClosed(event) {
    this.changingImage = event;
  }

  testClick() {
    console.log('onclick');
    this.UsertypeModal.open();
  }

  /**
   * User Follow Check
   * @param follow User follow true or false check
   * @param handle User Handle
   */
  userFollow(follow: boolean, handle: string) {
    if (follow) {
      this.profileStore.dispatch({ type: ProfileActions.PROFILE_UNFOLLOW, payload: handle });
      this.isFollowing = false;
      this.profileObject.follwerCount -= 1;
    }else {
      this.profileStore.dispatch({ type: ProfileActions.PROFILE_FOLLOW, payload: handle  });
      this.isFollowing = true;
      this.profileObject.follwerCount += 1;
    }
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
    if ( this.profileForm.valid === true ) {
      const form =  {
        'extras': {
          'association': {
            'summary': value.bio
          }
        },
        'physical': {
          'dateOfBirth': this.reverseDate(value.dob) + 'T05:00:00',
        },
        'name': {
          'firstName': value.name.charAt(0).toUpperCase() + value.name.slice(1),
          'displayName': value.name.charAt(0).toUpperCase() + value.name.slice(1)
        },
        'profileTypeList': this.selectedSkills,
        'username': value.username.toLowerCase()
      }

      this.profileStore.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
      this.toastr.success('You profile has been updated successfully!');
      this.modalService.close('profileEditWindow');
    }

  }

  /**
   * Form initial value
   */
  buildEditForm(): void {
    this.profileForm = this.fb.group({
      'name' : ['' , [Validators.required]],
      'bio' : '',
      'skill': '',
      'username' : ['', [Validators.required, Validators.minLength(4), FormValidation.noWhitespaceValidator], this.profileUpdateValidator.userNameValidation.bind(this.profileUpdateValidator)],
      'dob' : ['' , [Validators.required], this.profileUpdateValidator.validAge.bind(this.profileUpdateValidator)],

    });
    const nameValue = this.userProfile.profileUser['name'];
  }

  /**
   * Checking for the valid email input on register form
   * @param control: Form email input
   */
  validEmail(control: AbstractControl) {
    if (control.value === '') {
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
    // this.upload();
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

  skillClose() {
    this.modalService.close('skillMoreWindow');
  }

  donatePopup() {
    this.modalService.open('donationPopup');
  }

  donationClose() {
    this.modalService.close('donationPopup');
  }

}

