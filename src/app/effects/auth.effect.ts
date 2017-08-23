import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/operator/ignoreElements';
import 'rxjs/add/operator/mapTo';

import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { AuthActions } from '../actions/auth.action';

@Injectable()
export class AuthEffect {

  @Effect()
  saveSkillType$ = this.actions$
    .ofType(AuthActions.SAVE_SKILL)
    .map(toPayload)
    .switchMap((payload) => this.authService.saveSkill(payload)
      .map(res => ({ type: AuthActions.SAVE_SKILL_SUCCESS, payload: res }))
    );

  @Effect()
  getAllSkillType$ = this.actions$
    .ofType(AuthActions.LOAD_SKILL)
    .map(toPayload)
    .switchMap((payload) => this.authService.getAllSkill()
      .map(res => ({ type: AuthActions.LOAD_SKILL_SUCCESS, payload: res }))
    );

  @Effect()
  searchAllSkillType$ = this.actions$
    .ofType(AuthActions.SEARCH_SKILL)
    .map(toPayload)
    .switchMap((payload) => this.authService.searchAllSkill(payload)
      .map(res => ({ type: AuthActions.SEARCH_SKILL_SUCCESS, payload: res }))
    );


  @Effect()
  userArtistType$ = this.actions$
    .ofType(AuthActions.USER_ARTIST_FOLLOW)
    .map(toPayload)
    .switchMap((payload) => this.authService.getArtistFollow(payload)
      .map(res => ({ type: AuthActions.USER_ARTIST_FOLLOW_SUCCESS, payload: res }))
    );

  @Effect()
  registrationProfile$ = this.actions$
    .ofType(AuthActions.USER_REGISTRATION_WELCOME)
    .map(toPayload)
    .switchMap((payload) => this.authService.registerWelcome(payload)
      .map(res => ({ type: AuthActions.USER_REGISTRATION_WELCOME_SUCCESS, payload: res }))
    );

  @Effect()
  loadGallery$ = this.actions$
    .ofType(AuthActions.USER_LOGIN)
    .map(toPayload)
    .switchMap((payload) => this.authService.login(payload)
      .map(res => ({ type: AuthActions.USER_LOGIN_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: AuthActions.USER_LOGIN_FAILED, payload: res }))
    );

  @Effect()
  loadArtist$ = this.actions$
      .ofType(AuthActions.LOAD_ARTIST)
      .map(toPayload)
      .switchMap((payload) => this.authService.loadArtistType()
        .map(res => ({ type: AuthActions.LOAD_ARTIST_SUCCESS, payload: res }))
      );

  @Effect()
  registerProfile$ = this.actions$
    .ofType(AuthActions.USER_REGISTRATION_PROFILE)
    .map(toPayload)
    .switchMap((payload) => this.authService.registerProfile(payload)
      .map(res => ({ type: AuthActions.USER_REGISTRATION_PROFILE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: AuthActions.USER_REGISTRATION_PROFILE_FAILED, payload: res }))
    );

  @Effect()
  artistFollowing$ = this.actions$
    .ofType(AuthActions.ARTIST_FOLLOW)
    .map(toPayload)
    .switchMap((payload) => this.authService.registerProfile(payload)
      .map(res => ({ type: AuthActions.ARTIST_FOLLOW_SUCCESS, payload: res }))
    );

  @Effect()
  registerBasic$ = this.actions$
    .ofType(AuthActions.USER_REGISTRATION_BASIC)
    .map(toPayload)
    .switchMap((payload) => this.authService.registerStepBasic(payload)
      .map(res => ({ type: AuthActions.USER_REGISTRATION_BASIC_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: AuthActions.USER_REGISTRATION_BASIC_FAILED, payload: res }))
    );

  @Effect()
  checkOtp$ = this.actions$
    .ofType(AuthActions.OTP_CHECK)
    .map(toPayload)
    .switchMap((payload) => this.authService.checkOtp(payload)
      .map(res => ({ type: AuthActions.OTP_CHECK_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: AuthActions.OTP_CHECK_FAILED, payload: res }))
    );

  @Effect()
  checkExistUser$ = this.actions$
    .ofType(AuthActions.USER_EXISTS_CHECK)
    .map(toPayload)
    .switchMap((payload) => this.authService.userExists(payload)
      .map(res => ({ type: AuthActions.USER_EXISTS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: AuthActions.USER_EXISTS_FAILED, payload: res }))
    );

  @Effect()
  fpCheckExistUser$ = this.actions$
    .ofType(AuthActions.FP_USER_EXISTS)
    .map(toPayload)
    .switchMap((payload) => this.authService.fpUserExists(payload)
      .map(res => ({ type: AuthActions.FP_USER_EXISTS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: AuthActions.FP_USER_EXISTS_FAILED, payload: res }))
    );

  @Effect()
  forgotOTPPage$ = this.actions$
    .ofType(AuthActions.FP_USER_EXISTS_SUCCESS)
    .map(() => this.router.navigateByUrl('/account/send_password_reset' ));

  /* reset with phone */
  @Effect()
  fpResetTypePhone$ = this.actions$
    .ofType(AuthActions.FP_RESET_TYPE_PHONE)
    .map(toPayload)
    .switchMap((payload) => this.authService.fpResetTypePhone(payload)
      .map(res => ({ type: AuthActions.FP_RESET_TYPE_PHONE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: AuthActions.FP_RESET_TYPE_PHONE_FAILED, payload: res }))
    );

  @Effect()
  fpResetTypePhoneSuccess$ = this.actions$
    .ofType(AuthActions.FP_RESET_TYPE_PHONE_SUCCESS)
    .map(() => this.router.navigateByUrl('/account/confirm_pin_rest' ));
  /* reset with phone */

  /* reset with email */
  @Effect()
  fpResetTypeEmail$ = this.actions$
    .ofType(AuthActions.FP_RESET_TYPE_EMAIL)
    .map(toPayload)
    .switchMap((payload) => this.authService.fpResetTypeEmail(payload)
      .map(res => ({ type: AuthActions.FP_RESET_TYPE_EMAIL_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: AuthActions.FP_RESET_TYPE_EMAIL_FAILED, payload: res }))
    );

  @Effect()
  fpResetTypeEmailSuccess$ = this.actions$
    .ofType(AuthActions.FP_RESET_TYPE_EMAIL_SUCCESS)
    .map(() => this.router.navigateByUrl('/account/reset_mail_send' ));
  /* reset with email */

  /* otp submit */
  @Effect()
  fpSubmitOtp$ = this.actions$
    .ofType(AuthActions.FP_SUBMIT_OTP)
    .map(toPayload)
    .switchMap((payload) => this.authService.fpSubmitOtp(payload)
      .map(res => ({ type: AuthActions.FP_SUBMIT_OTP_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: AuthActions.FP_SUBMIT_OTP_FAILED, payload: res }))
    );

  @Effect()
  fpSubmitOtpSuccess$ = this.actions$
    .ofType(AuthActions.FP_SUBMIT_OTP_SUCCESS)
    .map(() => this.router.navigateByUrl('/account/password_create' ));
  /* otp submit */

  constructor(
      private actions$: Actions,
      private authService: AuthService,
      private router: Router
    ) {}
}
