import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Register, UserTag, initialTag, AuthModel, RightBlockTag } from '../../models/auth.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

// Action
import { AuthActions } from '../../actions/auth.action'

@Component({
  selector: 'app-dwc',
  templateUrl: './dwc.component.html',
  styleUrls: ['./dwc.component.scss']
})
export class DwcComponent implements OnInit {
  public eventForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<AuthModel>,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.buildForm();
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
      this.store.dispatch({ type: AuthActions.DWC_EVENT_REG, payload: form});
      this.router.navigateByUrl('/profile/user');
    }
  }

}