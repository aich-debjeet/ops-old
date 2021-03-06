import { environment } from '../../../../environments/environment';
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { Modal } from '../../../shared/modal-new/Modal';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Subject } from 'rxjs/Subject';

// helper
import { TokenService } from '../../../helpers/token.service';
import { FormValidation, ProfileUpdateValidator } from '../../../helpers/form.validator';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { AuthActions } from '../../../actions/auth.action';
import { SharedActions } from '../../../actions/shared.action';

import { ToastrService } from 'ngx-toastr';
import { initialProfileTag, ProfileCard } from '../../../models/profile.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { find as _find, forEach as _forEach } from 'lodash';
import { ProfileHelper } from '../../../helpers/profile.helper';
import { BookmarkActions } from 'app/actions/bookmark.action';

@Component({
  selector: 'app-profile-slider',
  templateUrl: './profile-slider.component.html',
  providers: [ModalService, DatePipe, ProfileUpdateValidator],
  styleUrls: ['./profile-slider.component.scss']
})

export class ProfileSliderComponent implements OnInit, OnDestroy {
  // @ViewChild('profileImage') fileInput;
  @ViewChild('networkModal') NetworktypeModal: Modal;
  @ViewChild('blockSuccessful') blockSuccessful: Modal;
  @ViewChild('blockModal') blockModal: Modal;
  @ViewChild('reportModal') reportModal: Modal;
  @Input() profileData: any;
  @Input() isOtherProfile: any;
  @Input() userName: string;
  isOwner: boolean;
  profileObject: ProfileCard = initialProfileTag;
  changingImage: boolean;
  tagState$: Observable<ProfileModal>;
  skillState$: Observable<any>;
  private profSub: Subscription;
  private skillsSub: Subscription;
  userProfile = initialTag;
  findSkill: any;
  public profileForm: FormGroup;
  public networkForm: FormGroup;
  baseUrl: string;
  private dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  coverImage: string;
  profileImage: string;
  selectedSkills = [];
  search: String;
  activateSubmitBtn = false;
  isFollowing: boolean;
  defaultImage: string;
  followers: string;
  followersProfiles = [];
  followingProfiles = [];
  showPreloader: boolean;
  recordsPerPage = 20;
  // profileObject: ProfileCard;
  activeProfileHandle = '';
  mymodel: string; // bind this to input with ngModel
  bioMessage = '';
  personalMessage = '';
  otherProfileHandle: String;
  otherProfileName: String;
  error = false;
  showThis = false;
  isBlocked: boolean;

  hasFollowed: boolean;
  @ViewChild('followersModal') followersModal: Modal;
  @ViewChild('followingModal') followingModal: Modal;

  constructor(
    public modalService: ModalService,
    private fb: FormBuilder,
    private profileUpdateValidator: ProfileUpdateValidator,
    public datepipe: DatePipe,
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

    this.profSub = this.tagState$.subscribe((state) => {
      this.userProfile = state;
      if (state) {
        if ((state['searching_following_profiles'] === false && state['searching_following_profiles_success'] === true) || (state['searching_follower_profiles'] === false && state['searching_follower_profiles_success'] === true)) {
          this.showPreloader = false;
        }
        if (state['follower_profiles']) {
          this.followersProfiles = state['follower_profiles'];
        }
        if (state['following_profiles']) {
          this.followingProfiles = state['following_profiles'];
        }
      }
      if (state.profile_user_info) {
        if (state.profile_user_info.isCurrentUser) {
          this.profileObject = this.loadProfile(state, 'own');
          this.isOwner = true;
        } else {
          if (state.profile_user_info.isClaimForGuest && state.profile_user_info.isClaimForGuest === true) {
            if (state.profile_other && state.profile_other.length !== 0) {
              const profile = state.profile_other;
              this.profileObject = this.utils.claimProfileValueMapping(profile);
            }
          } else {
            this.profileObject = this.loadProfile(state, 'other');
            this.otherProfileHandle = this.profileObject.userDetails.handle;
            this.otherProfileName = this.profileObject.name;
            if (this.profileObject.extra) {
              this.isBlocked = this.profileObject.extra.isBlocked;
            }
          }
          this.isOwner = false;
        }
      }

    });

    this.skillsSub = this.skillState$.subscribe((state) => {
      this.findSkill = state;
    });

    this.buildEditForm();
    this.buildNetworkForm();
  }

  disableFollowForSelf(username: string) {
    if (this.userProfile && this.userProfile['profile_navigation_details']['username'] === username) {
      return true;
    }
    return false;
  }

  /**
   * User type based user load
   */
  loadProfile(profile: any, type: string) {
    return this.utils.profileValueMapping(profile, type);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.skillsSub.unsubscribe();
    this.profSub.unsubscribe();
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
      coverImageURL = 'https://cdn.onepagespotlight.com/img/profile-cover.png';
    } else {
      coverImageURL = this.baseUrl + profile.image.cover;
    }
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

  /**
   * User Follow Check
   * @param follow User follow true or false check
   * @param handle User Handle
   */
  userFollow(follow: boolean, handle: string) {
    if (follow) {
      this.profileStore.dispatch({ type: ProfileActions.PROFILE_UNFOLLOW, payload: handle });
    } else {
      this.profileStore.dispatch({ type: ProfileActions.PROFILE_FOLLOW, payload: handle });
    }
  }

  /**
   * method to open report pop-up with options for profile 
   * @param id to open specific report model
   */
  reportModalOpen() {
    this.reportModal.open();
    this.profileStore.dispatch({ type: SharedActions.GET_OPTIONS_REPORT, payload: 'profile' });
  }

  /**
   * Add current user Work
   */
  deleteAddWork(id) {
    this.profileStore.dispatch({ type: ProfileActions.DELETE_USER_WORK, payload: id });
  }

  /**
   * Form initial value
   */
  buildEditForm(): void {
    this.profileForm = this.fb.group({
      'name': ['', [Validators.required, Validators.maxLength(30)]],
      'bio': '',
      'skill': '',
      'username': ['', [Validators.required, Validators.minLength(4), FormValidation.noWhitespaceValidator], this.profileUpdateValidator.userNameValidation.bind(this.profileUpdateValidator)],
      'dob': ['', [Validators.required], this.profileUpdateValidator.validAge.bind(this.profileUpdateValidator)],

    });
    const nameValue = this.userProfile.profile_navigation_details['name'];
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
   * Exsist update skill push selected skill array
   */
  loadSkill() {
    const skill = this.userProfile.profile_details['profileType'];
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
    const selectedSkill = _find(this.selectedSkills, function (s) {
      return s.code === skillCode;
    });

    // If skill exist then remove it from selection array
    if (selectedSkill !== undefined) {
      // Searching for the skill in skills array
      if (this.findSkill.industries !== undefined) {
        const skillMeta = this.selectedSkill(skillCode);
      }
      // Removing skill from selected skills array
      this.selectedSkills = this.selectedSkills.filter(function (skill) {
        return skill.code !== skillCode;
      });
      // Mark it not selected in UI
      if (this.findSkill.skills !== undefined) {
        this.findSkill.skills = this.findSkill.industries.filter(function (skill) {
          if (skill.code === skillCode) {
            skill.isSelected = false;
          }
          return skill;
        });
      }

    } else {
      // Mark it selected in UI
      this.findSkill.skills = this.findSkill.industries.filter(function (skill) {
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
    return _find(this.findSkill.industries, function (s: any) {
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

  /**
   * Open modal for following/followers
   * */
  showModal(action: string) {

    this.showPreloader = true;

    // get user handle
    if (this.userProfile && this.userProfile['profile_user_info'] && this.userProfile['profile_user_info']['isCurrentUser'] === true) {
      this.activeProfileHandle = this.userProfile['profile_details']['handle'];
    } else {
      this.activeProfileHandle = this.userProfile['profile_other']['handle'];
    }
    if (action === 'following') {
      this.followingModal.open();
      this.profileStore.dispatch({
        type: ProfileActions.GET_FOLLOWING_PROFILES,
        payload: {
          limit: this.recordsPerPage,
          handle: this.activeProfileHandle,
          offset: 0
        }
      });
    } else {
      this.followersModal.open();
      this.profileStore.dispatch({
        type: ProfileActions.GET_FOLLOWER_PROFILES,
        payload: {
          limit: this.recordsPerPage,
          handle: this.activeProfileHandle,
          offset: 0
        }
      });
    }
  }

  /**
   * Follow an artist
   * @param user obj
   */
  followUser(user: any) {
    // this.profileObject.followingCount = this.profileObject.followingCount + 1;
    this.profileStore.dispatch({ type: ProfileActions.PROFILE_FOLLOW, payload: user.handle });
    user.extra.isFollowing = true;
  }

  /**
   * Unfollow an artist
   * @param user obj
   */
  unfollowUser(user: any) {
    // this.profileObject.followingCount = this.profileObject.followingCount - 1;
    this.profileStore.dispatch({ type: ProfileActions.PROFILE_UNFOLLOW, payload: user.handle });
    user.extra.isFollowing = false;
  }

  onFollowerScroll(event: any) {
    if (event.srcElement.scrollTop >= event.srcElement.scrollHeight - event.srcElement.offsetHeight) {
      this.showPreloader = true;
      this.profileStore.dispatch({
        type: ProfileActions.GET_FOLLOWER_PROFILES,
        payload: {
          limit: this.recordsPerPage,
          handle: this.activeProfileHandle,
          offset: this.userProfile.searching_follower_params['offset'] + this.recordsPerPage
        }
      });
    }
  }

  onFollowingScroll(event: any) {
    if (event.srcElement.scrollTop >= event.srcElement.scrollHeight - event.srcElement.offsetHeight) {
      this.showPreloader = true;
      this.profileStore.dispatch({
        type: ProfileActions.GET_FOLLOWING_PROFILES,
        payload: {
          limit: this.recordsPerPage,
          handle: this.activeProfileHandle,
          offset: this.userProfile.searching_following_params['offset'] + this.recordsPerPage
        }
      });
    }
  }

  buildNetworkForm() {
    this.networkForm = this.fb.group({
      request: [''],
      message: ['']
    });
  }
  onFormSubmit(value) {
    // console.log(value)
    // const data = this.networkForm.get('request').value;
    // console.log('request', this.networkForm.get('request').value);
    // console.log('message', this.networkForm.get('message').value);
    // if (this.networkForm.valid) {
    //   alert('Valid!');
    // } else {
    //   alert('Invalid!');
    // }
    // return false;
    // if (this.networkForm.valid) {
    if (value.request === '') {
      this.error = true;
    }
    if (value.request === 'network') {
      // console.log('network')
      const data = {
        'receiver_id': this.otherProfileHandle,
        'questionnaire': {
          'purpose': 'Hey ' + this.otherProfileName + ' I want to connect with you.',
          'brief': '',
        }
      }
      this.profileStore.dispatch({ type: ProfileActions.SENT_NETWORK_REQUEST, payload: data });
    }
    if (value.request === 'personalMessage') {
      if (this.networkForm.value.message === '') {
        alert('Please enter msg!');
        return false;
      } else {
        const data = {
          'receiver_id': this.otherProfileHandle,
          'questionnaire': {
            'purpose': 'Hey ' + this.otherProfileName + ' I want to connect with you.',
            'brief': value.message,
          }
        };
        this.profileStore.dispatch({ type: ProfileActions.SENT_NETWORK_REQUEST, payload: data });
      }
    }
    // }

    this.profileStore.select('profileTags')
      .first(network => network['network_request_success'] !== null)
      .subscribe(data => {
        if (data['network_request_success'] === true) {
          this.toastr.success('You have successfully sent a request!', '', {
            timeOut: 3000
          });
          this.NetworktypeModal.close();
        }
        if (data['network_request_success'] === false) {
          this.toastr.error('You have already sent a request', '', {
            timeOut: 3000
          })
        }
      });
  }

  openMsg(val: string) {
    if (val === 'personalMessage') {
      this.showThis = true;
    } else {
      this.showThis = false;
    }
  }

  subResponse(handle: any) {
    const data = {
      blockedHandle: handle
    }
    this.profileStore.dispatch({ type: ProfileActions.BLOCK_USER, payload: data });
    this.profileStore.select('profileTags')
      .first(state => state['isBlocked'])
      .subscribe(data => {
        if (data['isBlocked'] === true) {
          this.blockSuccessful.open();
          this.isBlocked = true;
        }
      });
  }
  updateState() {
    this.blockSuccessful.close();
  }
  unBlockUser(handle: any) {
    const data = {
      blockedHandle: handle
    }
    this.profileStore.dispatch({ type: ProfileActions.UNBLOCK_USER, payload: data });
    this.profileStore.select('profileTags')
      .first(state => state['isUnBlocked'])
      .subscribe(data => {
        if (data['isUnBlocked'] === true) {
          this.isBlocked = false;
        }
      });
  }

  removeImage(imageType: string) {
    if (imageType === 'profile') {
      this.profileStore.dispatch({ type: ProfileActions.REMOVE_PROFILE_IMAGE, payload: '' });
      this.profileStore.select('profileTags')
        .take(2)
        .subscribe(data => {
          if (data['removingProfileImage'] === false && data['removedProfileImage'] === true) {
            this.toastr.success('Profile images has been removed', 'Success!');
          }
        });
    } else if (imageType === 'cover') {
      this.profileStore.dispatch({ type: ProfileActions.REMOVE_COVER_IMAGE, payload: '' });
      this.profileStore.select('profileTags')
        .take(2)
        .subscribe(data => {
          if (data['removingCoverImage'] === false && data['removedCoverImage'] === true) {
            this.toastr.success('Cover images has been removed', 'Success!');
          }
        });
    }
  }

  bookmarkAction(action: string, userHandle: string) {
    if (action === 'add') {
      const reqBody = {
        bookmarkType: 'profile',
        contentId: userHandle
      };
      this.profileStore.dispatch({ type: BookmarkActions.BOOKMARK, payload: reqBody });
      const bookmarkSub = this.profileStore.select('bookmarkStore')
        .take(2)
        .subscribe(data => {
          if (data['bookmarking'] === false && data['bookmarked'] === true) {
            this.toastr.success('Bookmarked successfully', 'Success!');
            this.profileStore.dispatch({ type: ProfileActions.RPOFILE_BOOKAMRK_FLAG_UPDATE, payload: { isBookmarked: true } });
            bookmarkSub.unsubscribe();
          }
        });
    } else {
      const reqBody = {
        type: 'profile',
        id: userHandle
      };
      this.profileStore.dispatch({ type: BookmarkActions.DELETE_BOOKMARK, payload: reqBody });
      const bookmarkSub = this.profileStore.select('bookmarkStore')
        .take(2)
        .subscribe(data => {
          if (data['deletingBookmark'] === false && data['deletedBookmark'] === true) {
            this.toastr.success('Bookmark deleted successfully', 'Success!');
            this.profileStore.dispatch({ type: ProfileActions.RPOFILE_BOOKAMRK_FLAG_UPDATE, payload: { isBookmarked: false } });
            bookmarkSub.unsubscribe();
          }
        });
    }
  }
}

