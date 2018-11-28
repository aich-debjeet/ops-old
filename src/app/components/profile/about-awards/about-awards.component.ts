import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { environment } from '../../../../environments/environment';
import { DatabaseValidator } from '../../../helpers/form.validator';

// action
import { ProfileActions } from '../../../actions/profile.action';

import { ToastrService } from 'ngx-toastr';
import { Modal } from '../../../shared/modal-new/Modal';

// rx
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-about-awards',
  templateUrl: './about-awards.component.html',
  providers: [ModalService, DatabaseValidator],
  styleUrls: ['./about-awards.component.scss']
})
export class AboutAwardsComponent implements OnInit, OnDestroy {

  tagState$: Observable<ProfileModal>;
  private subscription: ISubscription;
  aboutWork = initialTag;
  stateProfile = initialTag;
  userProfile: any;
  ownProfile: boolean;
  imageBaseUrl = environment.API_IMAGE;
  jobId: any;
  activateCreateForm = false;
  activateEditForm = false;
  formData: any = {
    formType: '',
    data: {}
  };
  formType: string;
  currentId: string;
  @ViewChild('deleteModal') deleteModal: Modal;

  constructor(
    public modalService: ModalService,
    private profileStore: Store<ProfileModal>,
    private toastr: ToastrService,
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    // this.test = 'salabeel';
    this.subscription = this.tagState$.subscribe((state) => {
      this.stateProfile = state;
      // console.log('state', this.stateProfile)
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
   * Add Award User
   */
  addAwardUser() {
    this.activateCreateForm = true;
    this.formType = 'create';
    this.formData = {
      formType: 'create',
      data: {}
    }
  }

  /**
   * Add Work form submit
   */
  awardFormSubmit(value) {
    // console.log(value);
    // console.log(this.formData.formType);
    if (this.formData.formType === 'create') {
      this.profileStore.dispatch({ type: ProfileActions.ADD_USER_WORK, payload: value });
      this.activateCreateForm = false;
      this.toastr.success('Your award has been added successfully!', '', {
        timeOut: 3000
      });
    }
    if (this.formData.formType === 'edit') {
      this.profileStore.dispatch({ type: ProfileActions.UPDATE_USER_WORK, payload: value });
      this.activateEditForm = false;
      this.toastr.success('Your award has been updated successfully!');
    }
  }

  /**
   * Delete Current Work of user
   */
  deleteCurrentAward(id) {
    this.deleteModal.open();
    this.jobId = id;
  }

  /**
   * Edit Current Work of user
   */
  editCurrentAward(data) {
    this.currentId = data.id;
    this.formData = {
      formType: 'edit',
      data: data
    }
    this.activateEditForm = true;
    this.formType = 'edit';
  }

  confirmation(eve) {
    this.closeCancelApplicationModal();
    if (eve === 'yes') {
      this.profileStore.dispatch({ type: ProfileActions.DELETE_USER_WORK, payload: this.jobId });
      this.toastr.success('Your award has been deleted successfully!');
    }
  }

  closeCancelApplicationModal() {
    this.deleteModal.close();
  }

  formsClose(eve) {
    // console.log(eve);
    // console.log('closure under process');
    if (eve.formType === 'create') {
      this.activateCreateForm = false;
    }
    if (eve.formType === 'edit') {
      this.activateEditForm = false;
    }
  }
}
