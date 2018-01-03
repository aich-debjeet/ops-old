import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { UserMedia } from '../../../models/user-media.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {DatabaseValidator } from '../../../helpers/form.validator';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';

import { ToastrService } from 'ngx-toastr';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-about-work',
  templateUrl: './about-work.component.html',
  providers: [ModalService, DatePipe, DatabaseValidator],
  styleUrls: ['./about-work.component.scss']
})
export class AboutWorkComponent implements OnInit {

  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  public workForm: FormGroup;
  private dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  private editFormPopup: boolean;
  stateProfile = initialTag;
  userProfile: any;
  ownProfile: boolean;
  hideTo: boolean;
  imageBaseUrl = environment.API_IMAGE;

  constructor(
    private http: Http,
    public modalService: ModalService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private profileStore: Store<ProfileModal>,
    private databaseValidator: DatabaseValidator,
    private toastr: ToastrService
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    this.tagState$.subscribe((state) => {
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

    // this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });
    this.buildEditForm();

  }

  ngOnInit() {
    this.workForm.get('currentWork').valueChanges.subscribe(
            (currentWork) => {
                if (currentWork === true) {
                    this.workForm.get('to').setValidators([]);
                    this.hideTo = true;
                } else {
                    this.workForm.get('to').setValidators(Validators.required);
                    this.hideTo = false;
                }
                this.workForm.get('to').updateValueAndValidity();
            });
  }

  /**
   * Add Work User
   */
  addWorkUser() {
    this.editFormPopup = false;
    this.modalService.open('userWorkAdd');
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
    this.workForm = this.fb.group({
      'company' : ['' , [Validators.required]],
      'position' : ['' , [Validators.required]],
      'from' : ['' , [Validators.required], this.databaseValidator.validWorkFromDate.bind(this.databaseValidator)],
      'to' : ['' , [Validators.required], this.databaseValidator.validWorkToDate.bind(this.databaseValidator)],
      'currentWork' : '',
      'id' : '',
      'publicWork': '0'
    })
  }

  /**
   * Add Work form submit
   */
  workFormSubmit(value) {
    if ( this.workForm.valid === true ) {
      if (this.editFormPopup === false) {
        if (this.hideTo !== true) {
        const body = {
          'role': value.position,
          'organizationName': value.company,
          'workOrAward': 'work',
          'from': this.reverseDate(value.from) + 'T05:00:00',
          'to': this.reverseDate(value.to) + 'T05:00:00',
          'currentlyWith': Boolean(value.currentWork),
          'access': Number(value.publicWork)
        }
        this.profileStore.dispatch({ type: ProfileActions.ADD_USER_WORK, payload: body});
        this.toastr.success('Your work has been updated successfully!');
        this.modalService.close('userWorkAdd');
      }
     if (this.hideTo === true) {
        const body = {
          'role': value.position,
          'organizationName': value.company,
          'workOrAward': 'work',
          'from': this.reverseDate(value.from) + 'T05:00:00',
          'currentlyWith': Boolean(value.currentWork),
          'access': Number(value.publicWork)
        }
        this.profileStore.dispatch({ type: ProfileActions.ADD_USER_WORK, payload: body});
        this.toastr.success('Your work has been updated successfully!');
        this.modalService.close('userWorkAdd');
      }
      } else {
        const body = {
          'role': value.position,
          'organizationName': value.company,
          'workOrAward': 'work',
          'from': this.reverseDate(value.from) + 'T05:00:00',
          'to': this.reverseDate(value.to) + 'T05:00:00',
          'currentlyWith': value.currentWork,
          'access': Number(value.publicWork),
          'id': value.id,
        }

        this.profileStore.dispatch({ type: ProfileActions.UPDATE_USER_WORK, payload: body});
        this.toastr.success('Your work has been updated successfully!');
        this.modalService.close('userWorkAdd');
      }
      this.workForm.reset();
     // this.buildEditForm()
    }
  }

  /**
   * Delete Current Work of user
   */
  deleteCurrentWork(id) {
    this.profileStore.dispatch({ type: ProfileActions.DELETE_USER_WORK, payload: id});
    this.toastr.success('Your work has been deleted successfully!');
  }

  /**
   * Edit Work Popup
   */
  editCurrentWork(data) {
    this.editFormPopup = true;
    this.workForm.patchValue({
      company: data.organizationName,
      position: data.role,
      from: this.datepipe.transform(data.from, 'dd-MM-yyyy'),
      to: this.datepipe.transform(data.to, 'dd-MM-yyyy'),
      currentWork: data.currentlyWith,
      publicWork: data.access,
      id: data.id
    });
    this.modalService.open('userWorkAdd');
  }

  /**
   * Close work add form
   */
  workFormClose() {
    this.modalService.close('userWorkAdd');
    this.workForm.reset();
   // this.buildEditForm()
  }

  /**
   * Reset Form
   */
  reset() {
    this.workForm.patchValue({
      company: '',
      position: '',
      from: '',
      to: '',
      currentWork: false,
      publicWork: '0',
      id: ''
    });
  }

}
