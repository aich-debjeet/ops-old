import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { UserMedia } from '../../../models/user-media.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-slider',
  templateUrl: './profile-slider.component.html',
  providers: [ModalService, DatePipe],
  styleUrls: ['./profile-slider.component.scss']
})
export class ProfileSliderComponent implements OnInit {

  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  userProfile = initialTag ;
  public profileForm: FormGroup;

  constructor(
    private http: Http,
    public modalService: ModalService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private profileStore: Store<ProfileModal>
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    // this.test = 'salabeel';
    this.tagState$.subscribe((state) => {
      console.log(state);
      this.userProfile = state;
    });

    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS });
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });
    this.buildEditForm();

  }

  ngOnInit() {

  }

  /**
   * Profile Page Edit
   */
  profileEdit() {
    console.log('effect log');
    this.modalService.open('profileEditWindow');
    console.log(this.userProfile.profileUser['name']);

    const date = this.datepipe.transform(this.userProfile.profileDetails['physical'].dateOfBirth, 'dd-MM-yyyy');

    this.profileForm.setValue({
      name: this.userProfile.profileDetails['name'],
      bio: this.userProfile.profileUser['bio'],
      username: this.userProfile.profileDetails['extra'].username,
      number: this.userProfile.profileDetails['contact'].mobile.mobile,
      email: this.userProfile.profileDetails['email'],
      website: this.userProfile.profileDetails['contact'].website,
      dob: date,

    });
  }

  /**
   * Reserve date
   * @param string
   */
  reverseDate(string) {
    return string.split('-').reverse().join('-');
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
    this.profileStore.dispatch({ type: ProfileActions.DELETE_USER_WORK, payload: id});
    // console.log(value);
  }

  /**
   * Edit Form Submit
   */
  profileFormSubmit(value) {
    console.log(value);
    const form =  {
      'extras': {
        'association': {
          'summary': value.bio
        },
        'contact': {
          'mobile': value.number,
          'website': value.website
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
      }
      // 'email': 'Email Address'
    }

       this.profileStore.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
       this.modalService.close('profileEditWindow');
  }

  /**
   * Form initial value
   */
  buildEditForm(): void {
    this.profileForm = this.fb.group({
      'name' : ['' , [Validators.required]],
      'bio' : ['' , [Validators.required]],
      'username' : [{value: '', disabled: true} , [Validators.required]],
      'number' : ['' , [Validators.required]],
      'email' : ['' , [Validators.required]],
      'website' : '',
      'dob' : ['' , [Validators.required]],

    })
    const nameValue = this.userProfile.profileUser['name'];
  }
}
