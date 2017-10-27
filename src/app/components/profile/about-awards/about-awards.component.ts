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

import { ToastrService } from 'ngx-toastr';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-about-awards',
  templateUrl: './about-awards.component.html',
  providers: [ModalService],
  styleUrls: ['./about-awards.component.scss']
})
export class AboutAwardsComponent implements OnInit {

  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  aboutWork = initialTag ;
  public awardForm: FormGroup;
  private dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  private editFormPopup: boolean;
  stateProfile = initialTag;
  userProfile: any;
  ownProfile: boolean;

  constructor(
    private http: Http,
    public modalService: ModalService,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private profileStore: Store<ProfileModal>,
    private toastr: ToastrService
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    // this.test = 'salabeel';
    this.tagState$.subscribe((state) => {
      this.stateProfile = state;
      if (state.profile_user_info) {
        if (this.stateProfile.profile_user_info.isCurrentUser === false && this.stateProfile.profile_other_loaded === true) {
          this.ownProfile = false;
          this.userProfile = this.stateProfile.profile_other;
        }else {
          this.ownProfile = true;
          this.userProfile = this.stateProfile.profileDetails;
        }
      }
    });

    // this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });

    // Init From
    this.buildEditForm();
  }

  ngOnInit() {
  }

  /**
   * Add Award User
   */
  openPopupAwardForm() {
    this.editFormPopup = false;
    this.modalService.open('addAwardPopup');
  }

  /**
   * Reserve date
   * @param string
   */
  reverseDate(string) {
    return string.split('-').reverse().join('-');
  }

  /**
   * Form initial value
   */
  buildEditForm(): void {
    this.awardForm = this.fb.group({
      'award' : ['' , [Validators.required]],
      'organization' : ['' , [Validators.required]],
      'timeperiod' : ['' , [Validators.required]],
      'id': ''
    })
  }

  /**
   * Add Work form submit
   */
  awardFormSubmit(value) {
    if ( this.awardForm.valid === true ) {
      if (this.editFormPopup === false) {
        const body = {
          'role': value.award,
          'organizationName': value.organization,
          'workOrAward': 'awards',
          'from': this.reverseDate(value.timeperiod) + 'T05:00:00',
          'access': 0
        }
        this.profileStore.dispatch({ type: ProfileActions.ADD_USER_WORK, payload: body});
        this.toastr.success('New award has been added successfully!');
        this.modalService.close('addAwardPopup');
      } else {
        const body = {
          'role': value.award,
          'organizationName': value.organization,
          'workOrAward': 'awards',
          'from': this.reverseDate(value.timeperiod) + 'T05:00:00',
          'access': 0,
          'id': value.id,
        }
        this.profileStore.dispatch({ type: ProfileActions.UPDATE_USER_WORK, payload: body});
        this.toastr.success('Your award has been updated successfully!');
        this.modalService.close('addAwardPopup');
      }
    }
  }

  /**
   * Delete Current Work of user
   */
  deleteCurrentAward(id) {
    this.profileStore.dispatch({ type: ProfileActions.DELETE_USER_WORK, payload: id});
  }

  /**
   * Edit Current Work of user
   */
  editCurrentAward(data) {
    this.editFormPopup = true;
    this.awardForm.patchValue({
      award: data.role,
      organization: data.organizationName,
      timeperiod: this.datepipe.transform(data.from, 'dd-MM-yyyy'),
      id: data.id
    });
    this.modalService.open('addAwardPopup');
  }

  /**
   * Close work add form
   */
  awardFormClose() {
    this.modalService.close('addAwardPopup');
  }

}
