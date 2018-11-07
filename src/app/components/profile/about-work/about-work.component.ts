import { Component, OnInit, OnDestroy,ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {DatabaseValidator } from '../../../helpers/form.validator';
import { DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { Modal } from '../../../shared/modal-new/Modal';

// action
import { ProfileActions } from '../../../actions/profile.action';

import { ToastrService } from 'ngx-toastr';

// rx
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-about-work',
  templateUrl: './about-work.component.html',
  providers: [ModalService, DatePipe, DatabaseValidator],
  styleUrls: ['./about-work.component.scss']
})
export class AboutWorkComponent implements OnInit, OnDestroy {

  tagState$: Observable<ProfileModal>;
  private subscription: ISubscription;
  public workForm: FormGroup;
  // private dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  private editFormPopup: boolean;
  stateProfile = initialTag;
  userProfile: any;
  ownProfile: boolean;
  hideTo: boolean;
  hide = true;
  imageBaseUrl = environment.API_IMAGE;
  jobId: any;
  activateCreateForm: boolean = false;
  activateEditForm: boolean = false;
  formData: any = {
    formType: '',
    data: {}
  };
  hideme = {};
  currentId: string;
  formType: string;

  @ViewChild('deleteModal') deleteModal: Modal;

  constructor(
    public modalService: ModalService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private profileStore: Store<ProfileModal>,
    private databaseValidator: DatabaseValidator,
    private toastr: ToastrService
  ) {
    this.hideme = {};
    this.tagState$ = this.profileStore.select('profileTags');
    this.subscription = this.tagState$.subscribe((state) => {
      this.stateProfile = state;
      if (state.profile_user_info) {
        if (this.stateProfile.profile_user_info.isCurrentUser === false && this.stateProfile.profile_other_loaded === true) {
          this.ownProfile = false;
          this.userProfile = this.stateProfile.profile_other;
        } else {
          this.ownProfile = true;
          this.userProfile = this.stateProfile.profile_details;
        }
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Add Work User
   */
  addWorkUser() {
    this.activateCreateForm =true;
    this.formType = 'create';
    this.formData = {
      formType: 'create',
      data: {}
    }
  }

  /**
   * Reserve date
   * @param string
   */
  // reverseDate(string) {
  //   return string.split('-').reverse().join('-');
  // }

  /**
   * Add Work form submit
   */
  workFormSubmit(value) {
    console.log(value);
    console.log(this.formData.formType);
    if(this.formData.formType === 'create'){
      this.profileStore.dispatch({ type: ProfileActions.ADD_USER_WORK, payload: value});
      this.activateCreateForm = false;
        this.toastr.success('Your work has been added successfully!', '', {
          timeOut: 3000
        });
    }
    if(this.formData.formType === 'edit'){
      this.profileStore.dispatch({ type: ProfileActions.UPDATE_USER_WORK, payload: value});
      this.activateEditForm = false;
      this.toastr.success('Your work has been updated successfully!');
    }
  }

  /**
   * Delete Current Work of user
   */
  deleteCurrentWork(id) {
    this.deleteModal.open();
    this.jobId = id;
  }

  /**
   * Edit Work Popup
   */
  editCurrentWork(data) {
    // Object.keys(this.hideme).forEach(h => {
    //   this.hideme[h] = false;
    // });
    // this.hideme[data.id] = true;
    this.currentId = data.id;
    this.formData = {
      formType: 'edit',
      data: data
    }
    this.activateEditForm =true;
    this.formType = 'edit';
  }
  confirmation(eve){
    this.closeCancelApplicationModal();
    if (eve === 'yes') {
      this.profileStore.dispatch({ type: ProfileActions.DELETE_USER_WORK, payload: this.jobId});
      this.toastr.success('Your work has been deleted successfully!');
    }
  }

  closeCancelApplicationModal() {
    this.deleteModal.close();
  }

  formsClose(eve){
    console.log(eve);
    console.log('closure under process');
    if(eve.formType === 'create'){
      this.activateCreateForm = false;
    }
    if(eve.formType === 'edit') {
      this.activateEditForm = false;
    }
  }
}
