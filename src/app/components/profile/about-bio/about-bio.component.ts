import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ProfileHelper } from '../../../helpers/profile.helper';
import { FormValidation, ProfileUpdateValidator } from '../../../helpers/form.validator';

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
  providers: [ModalService],
  styleUrls: ['./about-bio.component.scss']
})
export class AboutBioComponent implements OnInit, OnDestroy {
  public bioForm: FormGroup;
  tagState$: Observable<ProfileModal>;
  subscription: Subscription;
  stateProfile = initialTag;
  userProfile: any;
  ownProfile: boolean;
  changingImage: boolean;

  constructor(
    private _http: Http,
    private _modalService: ModalService,
    private _fb: FormBuilder,
    private _utils: ProfileHelper,
    private profileUpdateValidator: ProfileUpdateValidator,
    private _store: Store<ProfileModal>,
    private toastr: ToastrService
  ) {
    this.tagState$ = this._store.select('profileTags');

    this.subscription = this.tagState$.subscribe((state) => {
      this.stateProfile = state;

      if (state.profile_user_info) {
        if (this.stateProfile.profile_user_info.isCurrentUser === false && this.stateProfile.profile_other_loaded === true) {
          this.ownProfile = false;
          this.userProfile = this.stateProfile.profile_other;
        }else {
          this.ownProfile = true;
          this.userProfile = this.stateProfile.profile_details;
        }
      }
    });
  }

  ngOnInit() {
    this.bioFormIinit()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isClosed(event) {
    this.changingImage = event;
  }


  openPopup() {
    this._modalService.open('bioEdit');
    this.bioFormUpdate();
  }

  // bio form submit
  bioFormSubmit(value) {
    if ( this.bioForm.valid === true ) {
      const height = value.height === null ? 0 : value.height;
      const weight = value.weight === null ? 0 : value.weight;
      const pincode = value.pin_code === null ? '' : value.pin_code.toString();
      const lang = value.lang.trim() === '' ? [] : value.lang.split(',').map(function(item) {
        return item.trim();
      });
        const form =  {
          'email': value.email.trim(),
          'extras': {
            'aboutMe': value.about_me.trim(),
            'association': {
              'languages': lang
            },
            'contact': {
              'mobile': {
                'mobile': value.number.trim(),
                'access': Number(value.mobilePrivacy)
              },
              'website': {
                'website': value.website.trim(),
                'access': Number(value.websitePrivacy)
              }
            }
          },
          'address': {
            'city': value.city.charAt(0).toUpperCase().trim() + value.city.slice(1).trim(),
            'country': value.country.trim(),
            'line1': value.address_one.trim(),
            'line2': value.address_two.trim(),
            'postalCode': pincode,
          },
          'physical': {
            'height': parseFloat(height),
            'weight': parseFloat(weight),
            'ethnicity' : value.ethnicity.trim(),
            'complexion' : value.complexion.trim(),
            'gender': value.gender.trim()
          }
        }

        this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
        this.toastr.success('Your profile has been updated successfully!');
        this._modalService.close('bioEdit');
    }else {
      this.toastr.error('Please fill out all required fields');
    }
  }

  editFormClose() {
    this._modalService.close('bioEdit');
  }

  // Form init
  bioFormIinit() {
    this.bioForm = this._fb.group({
      'about_me': '',
      'gender': ['M' , [Validators.required]],
      'address_one': '',
      'address_two': '',
      'city': '',
      'country': '',
      'pin_code': '',
      'height': '',
      'weight': '',
      'lang': '',
      'ethnicity': '',
      'complexion': '',
      'number': ['' , [Validators.required], this.profileUpdateValidator.mobileValidation.bind(this.profileUpdateValidator)],
      'mobilePrivacy': ['0' , [Validators.required]],
      'email': ['' , [Validators.required], this.profileUpdateValidator.emailValidation.bind(this.profileUpdateValidator)],
      'emailPrivacy': ['0' , [Validators.required]],
      'website': '',
      'websitePrivacy': '0',
    });
  }

  bioFormUpdate() {
    const height = this.userProfile['physical'].height === 0 ? '' : this.userProfile['physical'].height.toFixed(2);
    const weight = this.userProfile['physical'].weight === 0 ? '' : this.userProfile['physical'].weight;
    this.bioForm.setValue({
      about_me: this.userProfile.aboutMe,
      gender: this.userProfile['physical'].gender ,
      address_one: this.userProfile['extra']['address'].line1,
      address_two: this.userProfile['extra']['address'].line2,
      city: this.userProfile['extra']['address'].city,
      country: this.userProfile['extra']['address'].country,
      pin_code: this.userProfile['extra']['address'].postalCode,
      height: height,
      weight: weight,
      lang: this.userProfile.languages.toString(),
      ethnicity: this.userProfile['physical'].ethnicity,
      complexion: this.userProfile['physical'].complexion,
      number: this.userProfile['contact'].mobile.mobile,
      mobilePrivacy: this.userProfile['contact'].mobile.access,
      email: this.userProfile['email'],
      emailPrivacy: 0,
      website: this.userProfile['contact'].website.website,
      websitePrivacy: this.userProfile['contact'].website.access,
    });
  }

}
