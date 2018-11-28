import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { DatePipe } from '@angular/common';
import { DatabaseValidator } from '../../../helpers/form.validator';
import { ProfileActions } from '../../../actions/profile.action';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../../environments/environment';
import { Modal } from '../../../shared/modal-new/Modal';

@Component({
  selector: 'app-about-education',
  templateUrl: './about-education.component.html',
  providers: [ModalService, DatePipe, DatabaseValidator],
  styleUrls: ['./about-education.component.scss']
})
export class AboutEducationComponent implements OnInit {

  tagState$: Observable<ProfileModal>;
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
  currentId: string;
  formType: string;
  @ViewChild('deleteModal') deleteModal: Modal;

  constructor(
    public modalService: ModalService,
    private profileStore: Store<ProfileModal>,
    private toastr: ToastrService
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.stateProfile = state;
      if (state.profile_user_info) {
        if (this.stateProfile.profile_user_info.isCurrentUser === false && this.stateProfile.profile_other_loaded === true) {
          this.ownProfile = false;
          this.userProfile = this.stateProfile.profile_other;
        } else {
          this.ownProfile = true;
          this.userProfile = this.stateProfile.profile_details;
          // console.log(this.userProfile)
        }
      }
    });
  }

  ngOnInit() {
  }

  /**
   * Add Work User
   */
  addEducationUser() {
    this.activateCreateForm = true;
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
  reverseDate(string) {
    return string.split('-').reverse().join('-');
  }

  /**
   * Add Work form submit
   */
  educationFormSubmit(value) {
    // console.log(value);
    // console.log(this.formData.formType);
    if (this.formData.formType === 'create') {
      this.profileStore.dispatch({ type: ProfileActions.ADD_USER_EDUCATION, payload: value });
      this.activateCreateForm = false;
      this.toastr.success('Your education has been added successfully!', '', {
        timeOut: 3000
      });
    }
    if (this.formData.formType === 'edit') {
      this.profileStore.dispatch({ type: ProfileActions.UPDATE_USER_EDUCATION, payload: value });
      this.activateEditForm = false;
      this.toastr.success('Your education has been updated successfully!');
    }
  }

  /**
   * Delete Current Work of user
   */
  deleteCurrentEducation(id) {
    this.deleteModal.open();
    this.jobId = id;
  }

  /**
   * Edit Current Work of user
   */
  editCurrentEducation(data) {
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
      this.profileStore.dispatch({ type: ProfileActions.DELETE_USER_EDUCATION, payload: this.jobId });
      this.toastr.success('Your education has been deleted successfully!');
    }
  }

  closeCancelApplicationModal() {
    this.deleteModal.close();
  }

  formsClose(eve) {
    if (eve.formType === 'create') {
      this.activateCreateForm = false;
    }
    if (eve.formType === 'edit') {
      this.activateEditForm = false;
    }
  }
}
