import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Login, initialTag } from '../../../models/auth.model';

// Action
import { AuthActions } from '../../../actions/auth.action'

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-password-sms',
  templateUrl: './password-sms.component.html',
  styleUrls: ['./password-sms.component.scss']
})
export class PasswordSmsComponent  implements OnInit, OnDestroy {

  otpForm: FormGroup;
  tagState$: Observable<Login>;
  forgotP = initialTag;
  otpfailed: boolean;
  private subscription: ISubscription;

  constructor(
    private fb: FormBuilder,
    private store: Store<Login>,
    private router: Router
    ) {

    this.otpForm = fb.group({
      otpToSubmit: ['', Validators.required],
    })

    this.tagState$ = store.select('loginTags');
    this.subscription = this.tagState$.subscribe((state) => {
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  submitForm(value: any) {
    if (value.otpToSubmit === '') {
      return;
    }
    const formData = {
      forgetPasswordtype: 'validateOTP',
      value: this.forgotP.fp_user_input,
      cType: 'phone',
      otp: value.otpToSubmit
    }
    this.store.dispatch({ type: AuthActions.FP_SUBMIT_OTP, payload: formData });
  }

  // Reset SMS
  resentSms() {
    const data = {
      value: this.forgotP.fp_user_input,
      cType: 'phone'
    }
    this.store.dispatch({ type: AuthActions.OTP_RESEND_FORGET_USER, payload: data });
  }


}
