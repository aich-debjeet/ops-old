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

    // this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });
    // this.buildEditForm();

  }

  ngOnInit() {
    // this.workForm.get('currentWork').valueChanges.subscribe(
    //         (currentWork) => {
    //             if (currentWork === true) {
    //                 this.workForm.get('to').setValidators([]);
    //                 this.hideTo = true;
    //                 this.hide = false;
    //             } else {
    //                 this.workForm.get('to').setValidators(Validators.required);
    //                 this.hideTo = false;
    //                 this.hide = true;
    //             }
    //             this.workForm.get('to').updateValueAndValidity();
    //         });
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
    // this.editFormPopup = false;
    // this.modalService.open('userWorkAdd');
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
   * Form initial value
   */
  // buildEditForm(): void {
  //   this.workForm = this.fb.group({
  //     'company' : ['' , [Validators.required]],
  //     'position' : ['' , [Validators.required]],
  //     'from' : ['' , [Validators.required], this.databaseValidator.validWorkFromDate.bind(this.databaseValidator)],
  //     'to' : ['' , [Validators.required], this.databaseValidator.validWorkToDate.bind(this.databaseValidator)],
  //     'currentWork' : '',
  //     'id' : '',
  //     'publicWork': '0'
  //   })
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
    
    // if ( this.workForm.valid === true ) {
      
    //   if (this.editFormPopup === false) {
        
    //     if (this.hideTo !== true) {
    //     const body = {
    //       'role': value.position,
    //       'organizationName': value.company,
    //       'workOrAward': 'work',
    //       'from': this.reverseDate(value.from) + 'T05:00:00',
    //       'to': this.reverseDate(value.to) + 'T05:00:00',
    //       'currentlyWith': Boolean(value.currentWork),
    //       'access': Number(value.publicWork)
    //     }
    //     this.profileStore.dispatch({ type: ProfileActions.ADD_USER_WORK, payload: body});
    //     this.toastr.success('Your work has been added successfully!', '', {
    //       timeOut: 3000
    //     });
    //     this.modalService.close('userWorkAdd');
    //   }
    //  if (this.hideTo === true) {
    //     const body = {
    //       'role': value.position,
    //       'organizationName': value.company,
    //       'workOrAward': 'work',
    //       'from': this.reverseDate(value.from) + 'T05:00:00',
    //       'currentlyWith': Boolean(value.currentWork),
    //       'access': Number(value.publicWork)
    //     }
    //     this.profileStore.dispatch({ type: ProfileActions.ADD_USER_WORK, payload: body});
    //     this.toastr.success('Your work has been added successfully!', '', {
    //       timeOut: 3000
    //     });
    //     this.modalService.close('userWorkAdd');
    //   }
    //   } else {
        
    //     if (this.hideTo !== true) {
    //       const body = {
    //         'role': value.position,
    //         'organizationName': value.company,
    //         'workOrAward': 'work',
    //         'from': this.reverseDate(value.from) + 'T05:00:00',
    //         'to': this.reverseDate(value.to) + 'T05:00:00',
    //         'currentlyWith': Boolean(value.currentWork),
    //         'access': Number(value.publicWork),
    //         'id': value.id,
    //       }
  
    //       this.profileStore.dispatch({ type: ProfileActions.UPDATE_USER_WORK, payload: body});
    //       this.toastr.success('Your work has been updated successfully!');
    //       this.modalService.close('userWorkAdd');
    //     }
    //     if (this.hideTo === true) {
    //       const body = {
    //         'role': value.position,
    //         'organizationName': value.company,
    //         'workOrAward': 'work',
    //         'from': this.reverseDate(value.from) + 'T05:00:00',
    //         'currentlyWith': Boolean(value.currentWork),
    //         'access': Number(value.publicWork),
    //         'id': value.id,
    //       }
  
    //       this.profileStore.dispatch({ type: ProfileActions.UPDATE_USER_WORK, payload: body});
    //       this.toastr.success('Your work has been updated successfully!');
    //       this.modalService.close('userWorkAdd');
    //     }
    //   }
    //   this.workForm.reset();
    //  // this.buildEditForm()
    // }
  }

  /**
   * Delete Current Work of user
   */
  deleteCurrentWork(id) {
    this.deleteModal.open();
    this.jobId = id;
    // this.profileStore.dispatch({ type: ProfileActions.DELETE_USER_WORK, payload: id});
    // this.toastr.success('Your work has been deleted successfully!');
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
    // this.editFormPopup = true;
    // this.workForm.patchValue({
    //   company: data.organizationName,
    //   position: data.role,
    //   from: this.datepipe.transform(data.from, 'dd-MM-yyyy'),
    //   to: this.datepipe.transform(data.to, 'dd-MM-yyyy'),
    //   currentWork: data.currentlyWith,
    //   publicWork: data.access,
    //   id: data.id
    // });
    // this.modalService.open('userWorkAdd');
  }

  /**
   * Close work add form
   */
  // workFormClose() {
  //   this.modalService.close('userWorkAdd');
  //   this.workForm.reset();
  //  // this.buildEditForm()
  // }

  /**
   * Reset Form
   */
  // reset() {
  //   this.workForm.patchValue({
  //     company: '',
  //     position: '',
  //     from: '',
  //     to: '',
  //     currentWork: false,
  //     publicWork: '0',
  //     id: ''
  //   });
  // }
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
