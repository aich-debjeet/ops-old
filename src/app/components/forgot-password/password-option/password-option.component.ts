import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Login, initialTag } from '../../../models/auth.model';

// Action
import { AuthActions } from '../../../actions/auth.action'

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-password-option',
  templateUrl: './password-option.component.html',
  styleUrls: ['./password-option.component.scss']
})

export class PasswordOptionComponent {
  resetForm: FormGroup;
  tagState$: Observable<Login>;
  forgotP = initialTag;

  constructor(private fb: FormBuilder, private store: Store<Login>,  private router: Router) {
    this.resetForm = fb.group({
      'typePassword': ['mail', Validators.required],
    })

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      this.forgotP = state;
      console.log('state: ');
      console.log(this.forgotP);
      // send back to forgot page landing directly on this page
      if (!this.forgotP.fp_user_options) {
        this.router.navigate(['account/password_reset']);
      }
    });

  }

  // submit the recovery option
  submitForm(value: any) {

    const form = {
      'forgetPasswordtype': '',
      'value': '',
      'cType': 'phone'
    }

    // check for the recovery type
    if (value.typePassword === 'mobile') {
      // preparing req params
      form.forgetPasswordtype = 'forgetPasswordLink';
      form.cType = 'phone';
      form.value = this.forgotP.fp_user_input;
    } else if (value.typePassword === 'mail') {
      // preparing req params
      form.forgetPasswordtype = 'forgetPasswordLink';
      form.cType = 'email';
      form.value = this.forgotP.fp_user_input;
    }

    // console.log('payload send: ');
    // console.log(form);

    this.store.dispatch({ type: AuthActions.FP_RESET_TYPE, payload: form });

  }

}
