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
  selector: 'app-password-sms',
  templateUrl: './password-sms.component.html',
  styleUrls: ['./password-sms.component.scss']
})
export class PasswordSmsComponent  implements OnInit {

  otpForm: FormGroup;
  tagState$: Observable<Login>;
  forgotP = initialTag;
  otpfailed: boolean;

  constructor(
    private fb: FormBuilder,
    private store: Store<Login>,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {

    this.otpForm = fb.group({
      'otpToSubmit': ['', Validators.required],
    })

    this.tagState$ = store.select('loginTags');
    this.tagState$.subscribe((state) => {
      console.log(state);
      this.forgotP = state;
      // send back to forgot page landing directly on this page
      if (!this.forgotP.fp_user_options) {
        this.router.navigate(['account/password_reset']);
      }
      if (state['fp_sumit_otp_failed']) {
        this.otpfailed = state['fp_sumit_otp_failed'];
      }
    });
  }

  ngOnInit() {
    this.otpfailed = false
  }

  submitForm(value: any) {
    if (value.otpToSubmit === '') {
      return;
    }

    const form = {
      'forgetPasswordtype': '',
      'value': '',
      'cType': 'phone',
      'otp': ''
    }

    // preparing req params
    form.forgetPasswordtype = 'validateOTP';
    form.cType = 'phone';
    form.value = this.forgotP.fp_user_input;
    form.otp = value.otpToSubmit;

    this.store.dispatch({ type: AuthActions.FP_SUBMIT_OTP, payload: form });

  }

  // Reset SMS
  resentSms() {
    const data = {
      'value': this.forgotP.fp_user_input,
      'cType': 'phone'
    }
    this.store.dispatch({ type: AuthActions.OTP_RESEND_FORGET_USER, payload: data });
  }


}
