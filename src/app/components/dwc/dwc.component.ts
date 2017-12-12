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
    this.loadScript('https://js.instamojo.com/v1/button.js');
  }

  testClick() {
    console.log('onclick');
  }

  loadScript(url) {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
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
      'school_teammates' : ['', [Validators.required]],
      'otherInformation' : ['Solo', [Validators.required]],
      'category_dance' : ['', [Validators.required]],
      'age_group' : ['', [Validators.required]]
    })

  }

// dwc_event_reg_success
  submitForm(value) {
    if (this.eventForm.valid) {
      // const form = {
      //   schoolName: value.school_name,
      //   schoolOwner: value.school_owner,
      //   address: value.school_address,
      //   category: value.school_category,
      //   teamates: value.school_teammates,
      // }
      this.DwctypeModal.open();
      this.loadScript('https://js.instamojo.com/v1/button.js');
      // Plz enable this code after payment implementation
      // this.store.dispatch({ type: AuthActions.DWC_EVENT_REG, payload: form});
      // this.router.navigateByUrl('/profile/user');
    }
  }

  policySubmit(value) {
    console.log(value);
    const form = {
        schoolName: value.school_name,
        schoolOwner: value.school_owner,
        address: value.school_address,
        category: value.school_category,
        teamates: value.school_teammates,
        otherInformation: value.otherInformation,
        ageGroup: value.age_group,
        danceCategory: value.category_dance,
      }
    this.router.navigateByUrl('/profile/user');
    this.store.dispatch({ type: AuthActions.DWC_EVENT_REG, payload: form});
  }

}
