import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { Login, initialTag } from '../../models/auth.model';

// actions
import { AuthActions } from '../../actions/auth.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

import { environment } from '../../../environments/environment';
import { ModalService } from '../../shared/modal/modal.component.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  loginState$: Observable<Login>;
  loginState = initialTag;
  loginForm: FormGroup;
  redirectUrl: any;
  queryParam: any;
  imageBaseUrl = environment.API_IMAGE;
  private loginSub: ISubscription;
  resendingOtp = false;

  contactNumber = '';
  countryCode = '';

  // otp numbers
  @ViewChild('otpNum1') otpNum1: ElementRef;
  @ViewChild('otpNum2') otpNum2: ElementRef;
  @ViewChild('otpNum3') otpNum3: ElementRef;
  @ViewChild('otpNum4') otpNum4: ElementRef;
  @ViewChild('otpNum5') otpNum5: ElementRef;
  @ViewChild('otpNum6') otpNum6: ElementRef;
  public otpForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private store: Store<Login>,
    private router: Router,
    public route: ActivatedRoute,
    public modalService: ModalService
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })

    this.loginState$ = store.select('loginTags');
    this.loginSub = this.loginState$.subscribe((state) => {
      this.loginState = state;
      if (state) {
        if (state['login_success'] === true) {
          // org registration successful
          if (this.redirectUrl !== undefined) {
            this.router.navigateByUrl(this.redirectUrl);
            return;
          } else {
            this.router.navigateByUrl('/home');
            return;
          }
        }
        if (state['error_description']
        ) {
          if (state['error_description']['contactNumber']) {
            this.contactNumber = state['error_description']['contactNumber'];
          }
          if (state['error_description']['countryCode']) {
            this.countryCode = state['error_description']['countryCode'];
          }
          if (state['error_description']['error_desc']
            && state['error_description']['error_desc'] === 'OTP_NOT_VALIDATED'
          ) {
            this.modalService.open('otpWindow');
          }
        }
        if (typeof state['user_otp_success'] !== 'undefined' && state['user_otp_success'] === true) {
          this.router.navigateByUrl('/reg/addskill');
        }
      }
    });

    // OTP Form Builder
    this.otpForm = fb.group({
      otpNum1: ['', [Validators.required]],
      otpNum2: ['', [Validators.required]],
      otpNum3: ['', [Validators.required]],
      otpNum4: ['', [Validators.required]],
      otpNum5: ['', [Validators.required]],
      otpNum6: ['', [Validators.required]]
    });
  }

  // focus on next otp number
  nextOtpNum(e: any, num: number) {
    if (e.keyCode >= 48 && e.keyCode <= 57) {
      if (num > 0 && num < 6) {
        const nextNum = num + 1;
        const nextOtpInput = 'otpNum' + nextNum.toString();
        this[nextOtpInput].nativeElement.focus();
      }
      return true;
    }
    return false;
  }

  resendOtp() {
    this.resendingOtp = true;
    this.store.dispatch({ type: AuthActions.OTP_RESEND_SUBMIT });
    this.store.select('loginTags').subscribe(data => {
      setTimeout(() => {
        this.resendingOtp = false;
      }, 1500);
    })
  }

  // OTP Validation
  otpSubmit(value) {
    // if (this.otpForm.valid === true && this.countryCode.length > 0 && this.contactNumber.length > 0) {
    if (this.otpForm.valid === true) {
      // console.log('otp form data', value); return;
      const otpValue = value.otpNum1.toString() +
                       value.otpNum2.toString() +
                       value.otpNum3.toString() +
                       value.otpNum4.toString() +
                       value.otpNum5.toString() +
                       value.otpNum6.toString();
      const otpData = {
        contactNumber: this.contactNumber,
        countryCode: this.countryCode,
        otp: otpValue
      }
      this.store.dispatch({ type: AuthActions.OTP_SUBMIT, payload: otpData });
    }
  }

  ngOnInit() {
    // if redriect url there
    if (this.route.snapshot.queryParams['next']) {
      this.redirectUrl = this.route.snapshot.queryParams['next'];
    }

    // redrection query param
    if (this.route.snapshot.queryParams) {
      this.queryParam = this.route.snapshot.queryParams;
    }

    const user = JSON.parse(localStorage.getItem('currentUser'));
    // console.log('calling');
    if (user && user.access_token) {
      // console.log('authentication', user.access_token);
      this.store.dispatch({ type: AuthActions.USER_AUTHENTICATED, payload: ''});
    }
  }


  submitForm(value: any) {
    if (this.loginForm.valid === true) {
      const form =  {
        client_id: 'AKIAI7P3SOTCRBKNR3IA',
        client_secret: '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',
        username: value.email,
        password: value.password,
        grant_type: 'password'
      }
      this.store.dispatch({ type: AuthActions.USER_LOGIN, payload: form});
    }
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

}
