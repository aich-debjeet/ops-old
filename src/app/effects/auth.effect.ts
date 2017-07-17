import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { AuthService } from '../services/auth.service';
import { AuthActions } from '../actions/auth.action';

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
  @Effect()
  loadGallery$ = this.actions$
    .ofType(AuthActions.USER_LOGIN)
    .map(toPayload)
    .switchMap((payload) => this.authService.login(payload)
      .map(res => ({ type: AuthActions.USER_LOGIN_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: AuthActions.USER_LOGIN_FAILED, payload: res }))
    );

  @Effect()
  registerProfile$ = this.actions$
    .ofType(AuthActions.USER_REGISTER_PROFILE)
    .map(toPayload)
    .switchMap((payload) => this.authService.registerProfile(payload)
      .map(res => ({ type: AuthActions.USER_REGISTER_PROFILE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: AuthActions.USER_REGISTER_PROFILE_FAILED, payload: res }))
    );

  @Effect()
  loadAccountForm$ = this.actions$
    .ofType(AuthActions.USER_REGISTRATION)
    .map(toPayload)
    .switchMap((payload) => this.authService.register(payload)
      .map(res => ({ type: AuthActions.USER_REGISTRATION_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: AuthActions.USER_REGISTRATION_FAILED, payload: res }))
    );

  @Effect()
  checkOtp$ = this.actions$
    .ofType(AuthActions.OTP_CHECK)
    .map(toPayload)
    .switchMap((payload) => this.authService.checkOtp(payload)
      .map(res => ({ type: AuthActions.OTP_CHECK_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: AuthActions.OTP_CHECK_FAILED, payload: res }))
    );

}
