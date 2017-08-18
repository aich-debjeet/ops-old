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

  constructor(
      private actions$: Actions,
      private authService: AuthService
    ) {}
}
