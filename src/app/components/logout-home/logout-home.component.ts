import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
// import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormValidation } from 'app/helpers/form.validator';
// import { Store } from '@ngrx/store';
import { AuthActions } from 'app/actions/auth.action';
// import { Modal } from 'app/shared/modal-new/Modal';
// import { ModalService } from 'app/shared/modal/modal.component.service';
@Component({
  selector: 'app-logout-home',
  templateUrl: './logout-home.component.html',
  styleUrls: ['./logout-home.component.scss']
})
export class LogoutHomeComponent implements OnInit {

  base_image = environment.API_IMAGE;
  // inviteForm: FormGroup;
  // disableSubmit = false;
  // @ViewChild('inviteSuccessModal') inviteSuccessModal: Modal;

  constructor(
    // private fb: FormBuilder,
    // private store: Store<any>,
    // public modalService: ModalService
  ) { }

  ngOnInit() {
    // this.inviteSuccessModal.open();
    // this.buildForm();
  }

  /**
   * bulding reactive form getting an email id
   */
  // buildForm() {
  //   this.inviteForm = this.fb.group({
  //     emailId: ['', [
  //       Validators.required,
  //       Validators.min(3),
  //       FormValidation.validEmail
  //     ]]
  //   });
  // }

  /**
   * submitting the form
   */
  // sendInvite() {
  //   if (!this.inviteForm.valid) {
  //     return false;
  //   }
  //   this.disableSubmit = true;
  //   const reqBody = {
  //     listData: [{ email: this.inviteForm.controls.emailId.value }]
  //   };
  //   this.store.dispatch({
  //     type: AuthActions.SEND_INVITATION,
  //     payload: reqBody
  //   });

  //   this.store.select('loginTags')
  //     .first(resp => resp['send_invite_success'] === true)
  //     .subscribe(() => {
  //       this.disableSubmit = false;
  //       this.inviteSuccessModal.open();
  //       this.buildForm();
  //       return;
  //     });
  // }

  // openModal() {
  //   this.inviteSuccessModal.open();
  // }

}
