import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { GeneralUtilities } from '../../../helpers/general.utils';
import { ProfileActions } from '../../../actions/profile.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-about-contact',
  templateUrl: './about-contact.component.html',
  styleUrls: ['./about-contact.component.scss']
})
export class AboutContactComponent implements OnInit, OnDestroy {
  tagState$: Observable<ProfileModal>;
  profSub: Subscription;
  stateProfile = initialTag;
  imageBaseUrl = environment.API_IMAGE;
  userProfile: any;
  ownProfile: boolean;
  editingField: string;
  privacy: number;
  website:any;
  email:any;
  number:any;
  websitePrivacy:any;
  mobilePrivacy:any;
  emailPrivacy: any;

  constructor(
    private profileStore: Store<ProfileModal>,
    private generalUtils: GeneralUtilities
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    this.profSub = this.tagState$.subscribe((state) => {
      console.log(state)
      this.stateProfile = state;
      if (state.profile_user_info) {
        if (this.stateProfile.profile_user_info.isCurrentUser === false && this.stateProfile.profile_other_loaded === true) {
          this.ownProfile = false;
          this.userProfile = this.stateProfile.profile_other;
        } else {
          this.ownProfile = true;
          if (this.generalUtils.checkNestedKey(state, ['profile_details'])) {
            this.userProfile = state['profile_details'];
            // console.log(this.userProfile);
            if (this.generalUtils.checkNestedKey(this.userProfile, ['contact', 'email', 'email'])) {
              this.email = this.userProfile['contact']['email']['email'];
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['contact', 'email', 'access'])) {
              this.emailPrivacy = this.userProfile['contact']['email']['access'];
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['contact', 'mobile', 'mobile'])) {
              this.number = this.userProfile['contact']['mobile']['mobile'];
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['contact', 'website', 'website'])) {
              this.website = this.userProfile['contact']['website']['website'];
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['contact', 'website', 'access'])) {
              this.websitePrivacy = this.userProfile['contact']['website']['access'];
            }
            if (this.generalUtils.checkNestedKey(this.userProfile, ['contact', 'mobile', 'access'])) {
              this.mobilePrivacy = this.userProfile['contact']['mobile']['access'];
            }
          }
        }
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.profSub.unsubscribe();
  }
  editField(fieldName: string) {
    this.editingField = fieldName;
  }

  choosePrivacy(val: number,fieldName: string){
    if(fieldName === 'website'){
      this.websitePrivacy = val;
    }
    if(fieldName === 'number'){
      this.mobilePrivacy = val;
    }
    if(fieldName === 'email'){
      this.emailPrivacy = val;
    }
  }
  updateAbout(fieldName: string) {
    let reqBody;
    if (fieldName === 'website') {
      reqBody = {
        extras: {
          contact: {
            website:{
              access: Number(this.websitePrivacy),
              website: this.website
            }
          }
        }
      };
    }
    if (fieldName === 'number') {
      reqBody = {
        extras: {
          contact: {
            mobile:{
              access: Number(this.mobilePrivacy),
              mobile: this.number
            }
          }
        }
      };
    }
    if (fieldName === 'email') {
      reqBody = {
        extras: {
          contact: {
            email:{
              access: Number(this.emailPrivacy),
              email: this.email
            }
          }
        }
      };
    }
    this.profileStore.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: reqBody });
    this.cancelEdit();
  }
  cancelEdit() {
    this.editingField = '';
  }

}
