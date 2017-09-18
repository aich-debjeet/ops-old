import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ProfileHelper } from '../../../helpers/profile.helper';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-about-bio',
  templateUrl: './about-bio.component.html',
  providers: [ModalService],
  styleUrls: ['./about-bio.component.scss']
})
export class AboutBioComponent implements OnInit {
  public bioForm: FormGroup;
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  stateProfile = initialTag;
  userProfile: any;
  ownProfile: boolean;
  changingImage: boolean;

  constructor(
    private _http: Http,
    private _modalService: ModalService,
    private _fb: FormBuilder,
    private _utils: ProfileHelper,
    private _store: Store<ProfileModal>
  ) {
    this.tagState$ = this._store.select('profileTags');

    this.tagState$.subscribe((state) => {
      this.stateProfile = state;
      console.log(state);
      if (this.stateProfile.current_user_profile && this.stateProfile.profile_other_loaded === true) {
        this.ownProfile = false;
        this.userProfile = this.stateProfile.profile_other;
      }else {
        this.ownProfile = true;
        this.userProfile = this.stateProfile.profileDetails;
      }
    });
  }

  ngOnInit() {
    this.bioFormIinit()
  }

  isClosed(event) {
    this.changingImage = event;
    console.log(event);
  }


  openPopup() {
    this._modalService.open('bioEdit');
    this.bioFormUpdate();
  }

  // bio form submit
  bioFormSubmit(value) {
      const form =  {
        'extras': {
          'aboutMe': value.about_me,
           'association': {
            'languages': value.lang.split(',')
          }
        },
        'address': {
          'city': value.city,
          'country': value.country,
          'line1': value.address_one,
          'line2': value.address_two,
          'postalCode': value.pin_code
        },
        'physical': {
          'height': parseFloat(value.height),
          'weight': parseFloat(value.weight),
          'ethnicity' : value.ethnicity,
          'complexion' : value.complexion,
          'gender': value.gender
        }
      }

      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
      this._modalService.close('bioEdit');
  }

  editFormClose() {
    this._modalService.close('bioEdit');
  }

  // Form init
  bioFormIinit() {
    this.bioForm = this._fb.group({
      'about_me': '',
      'gender' : ['F' , [Validators.required]],
      'address_one' : '',
      'address_two' : '',
      'city' : '',
      'country' : '',
      'pin_code' : '',
      'height' : '',
      'weight' : '',
      'lang' : '',
      'ethnicity' : '',
      'complexion' : '',
    });
  }

  bioFormUpdate() {
    this.bioForm.setValue({
      about_me: this.userProfile.aboutMe,
      gender : this.userProfile['physical'].gender ,
      address_one : this.userProfile['extra']['address'].line1,
      address_two : this.userProfile['extra']['address'].line2,
      city : this.userProfile['extra']['address'].city,
      country : this.userProfile['extra']['address'].country,
      pin_code : this.userProfile['extra']['address'].postalCode,
      height : this.userProfile['physical'].height,
      weight : this.userProfile['physical'].weight,
      lang : this.userProfile.languages.toString(),
      ethnicity : this.userProfile['physical'].ethnicity,
      complexion : this.userProfile['physical'].complexion,
    });
  }

}
