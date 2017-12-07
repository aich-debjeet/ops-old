import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Register, UserTag, initialTag, AuthModel, RightBlockTag } from '../../models/auth.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Modal } from '../../shared/modal-new/Modal';

// Action
import { AuthActions } from '../../actions/auth.action'

@Component({
  selector: 'app-dwc',
  templateUrl: './dwc.component.html',
  styleUrls: ['./dwc.component.scss']
})
export class DwcComponent implements OnInit {
  public eventForm: FormGroup;
  @ViewChild('dwcModal') DwctypeModal: Modal;
  constructor(
    private fb: FormBuilder,
    private store: Store<AuthModel>,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.buildForm();
  }

  testClick() {
    console.log('onclick');
    
  }

  /**
   * Form init
   */
  buildForm() {
    this.eventForm = this.fb.group({
      'school_name' : ['', [Validators.required]],
      'school_owner' : ['', [Validators.required]],
      'school_address' : ['', [Validators.required]],
      'school_category' : ['', [Validators.required]],
      'school_teammates' : ['', [Validators.required]]
    })

  }

// dwc_event_reg_success
  submitForm(value) {
    if (this.eventForm.valid) {
      const form = {
        schoolName: value.school_name,
        schoolOwner: value.school_owner,
        address: value.school_address,
        category: value.school_category,
        teamates: value.school_teammates,
      }
      this.DwctypeModal.open();

      // Plz enable this code after payment implementation
      // this.store.dispatch({ type: AuthActions.DWC_EVENT_REG, payload: form});
      // this.router.navigateByUrl('/profile/user');
    }
  }

  policySubmit() {
    this.router.navigateByUrl('/profile/user');
  }

}
