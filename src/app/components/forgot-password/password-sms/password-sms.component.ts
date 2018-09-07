import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Login, initialTag } from '../../../models/auth.model';

// Action
import { AuthActions } from '../../../actions/auth.action'

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';
import { FormValidation } from '../../../helpers/form.validator';

@Component({
  selector: 'app-password-sms',
  templateUrl: './password-sms.component.html',
  styleUrls: ['./password-sms.component.scss']
})
export class PasswordSmsComponent  implements OnInit, OnDestroy {

  otpForm: FormGroup;
  tagState$: Observable<Login>;
  forgotP = initialTag;
  private loginSub: ISubscription;
  resending = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<Login>,
    private router: Router
  ) {
    this.tagState$ = store.select('loginTags');
    this.loginSub = this.tagState$.subscribe((state) => {
      this.forgotP = state;
      // send back to forgot page landing directly on this page
      if (!this.forgotP.fp_user_options) {
        this.router.navigate(['account/password_reset']);
      }
    });

    // OTP Form Builder
    this.otpForm = fb.group({
      otpNum: ['', [Validators.required, FormValidation.validateOtp]]
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

  // submit OTP
  otpSubmit(value: any) {
    if (this.otpForm.valid === true) {
      const otpValue = value.otpNum.toString();
      const formData = {
        forgetPasswordtype: 'validateOTP',
        value: this.forgotP.fp_user_input,
        cType: 'phone',
        otp: otpValue
      }
      this.store.dispatch({ type: AuthActions.FP_SUBMIT_OTP, payload: formData });
    }
  }

  // resend OTP
  resendOtp() {
    this.resending = true;
    const data = {
      value: this.forgotP.fp_user_input,
      cType: 'phone'
    }
    this.store.dispatch({ type: AuthActions.OTP_RESEND_FORGET_USER, payload: data });
    setTimeout(() => {
      this.resending = false;
    }, 1500);
  }

  allowNumbersOnly(e: any) {
    const k = e.keyCode;
    return ((k >= 48 && k <= 57) || (k >= 96 && k <= 105) || k === 8);
  }

}
