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
  resending = false;
  invalidOTP = false;

  // otp numbers
  @ViewChild('otpNum1') otpNum1: ElementRef;
  @ViewChild('otpNum2') otpNum2: ElementRef;
  @ViewChild('otpNum3') otpNum3: ElementRef;
  @ViewChild('otpNum4') otpNum4: ElementRef;
  @ViewChild('otpNum5') otpNum5: ElementRef;
  @ViewChild('otpNum6') otpNum6: ElementRef;

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

    // OTP Form Builder
    this.otpForm = this.fb.group({
      otpNum1: ['', [Validators.required]],
      otpNum2: ['', [Validators.required]],
      otpNum3: ['', [Validators.required]],
      otpNum4: ['', [Validators.required]],
      otpNum5: ['', [Validators.required]],
      otpNum6: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.otpfailed = false
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  otpSubmit(value: any) {

    // console.log('otp form data', value); return;
    const otpValue = value.otpNum1.toString() +
                     value.otpNum2.toString() +
                     value.otpNum3.toString() +
                     value.otpNum4.toString() +
                     value.otpNum5.toString() +
                     value.otpNum6.toString();

    if (otpValue.length !== 6) {
      this.invalidOTP = true;
      return;
    } else {
      this.invalidOTP = false;
    }

    const formData = {
      forgetPasswordtype: 'validateOTP',
      value: this.forgotP.fp_user_input,
      cType: 'phone',
      otp: otpValue
    }
    this.store.dispatch({ type: AuthActions.FP_SUBMIT_OTP, payload: formData });
  }

  // Reset SMS
  resentSms() {
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

  // focus on next otp number
  nextOtpNum(e: any, pos: number) {
    if (e.keyCode === 8) {
      if (pos > 0 && pos < 7) {
        const prevNum = pos - 1;
        if (prevNum > 0) {
          const prevOtpInput = 'otpNum' + prevNum.toString();
          setTimeout(() => { this[prevOtpInput].nativeElement.focus(); }, 10);
        }
        return true;
      }
    } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
      if (pos > 0 && pos < 6) {
        const nextNum = pos + 1;
        const nextOtpInput = 'otpNum' + nextNum.toString();
        setTimeout(() => { this[nextOtpInput].nativeElement.focus(); }, 10);
      }
      return true;
    }
    return false;
  }

}
