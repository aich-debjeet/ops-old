import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

// Action
import { AuthActions } from '../../../actions/auth.action'

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { Login, initialTag } from '../../../models/auth.model';

@Component({
  selector: 'app-password-mail',
  templateUrl: './password-mail.component.html',
  styleUrls: ['./password-mail.component.scss']
})

export class PasswordMailComponent {
  tagState$: Observable<Login>;
  forgotP = initialTag;

  constructor(
    private fb: FormBuilder,
    private store: Store<Login>,
    private router: Router
  ) {

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      this.forgotP = state;
      // send back to forgot page landing directly on this page
      if (!this.forgotP.fp_user_options) {
        this.router.navigate(['account/password_reset']);
      }
    });

  }

  // Reset email
  resentMail() {
    const data = {
      value: this.forgotP.fp_user_input,
      cType: 'email'
    }
    this.store.dispatch({ type: AuthActions.OTP_RESEND_FORGET_USER, payload: data });
  }
}
