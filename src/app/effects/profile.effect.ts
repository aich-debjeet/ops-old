import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { ProfileService } from '../services/profile.service';
import { ProfileActions } from '../actions/profile.action';

@Injectable()
export class ProfileEffect {
  /**
   * Get LoggedIn User profile
   */
  @Effect()
  loadUserProfile$ = this.actions$
    .ofType(ProfileActions.LOAD_CURRENT_USER_PROFILE)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getLoggedInProfile()
      .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_FAILED, payload: res }))
    );

  /**
   *  Get LoggedIn User Quick Access
   */
  @Effect()
  loadUserQuickAcess$ = this.actions$
    .ofType(ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getLoggedInQuickAccess()
      .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS_FAILED, payload: res }))
    );

  /**
   * Get LoggedIn user full profile details
   */
  @Effect()
  loadUserProfileDetails$ = this.actions$
    .ofType(ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getLoggedInProfileDetails()
      .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS_FAILED, payload: res }))
    );

  /**
   * Get current user media profile
   */
  @Effect()
  loadUserMedia$ = this.actions$
    .ofType(ProfileActions.LOAD_USER_MEDIA)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getLoggedInMedia(payload)
      .map(res => ({ type: ProfileActions.LOAD_USER_MEDIA_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.LOAD_USER_MEDIA_FAILED, payload: res }))
    );

  /**
   * Get current user channel profile
   */
  @Effect()
  loadUserChannel$ = this.actions$
    .ofType(ProfileActions.LOAD_CURRENT_USER_CHANNEL)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getLoggedInChannel(payload)
      .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL_FAILED, payload: res }))
    );

    /**
   * Get current user channel profile
   */
  @Effect()
  saveUserChannel$ = this.actions$
    .ofType(ProfileActions.CHANNEL_SAVE)
    .map(toPayload)
    .switchMap((payload) => this.profileService.createChannel(payload)
      .map(res => ({ type: ProfileActions.CHANNEL_SAVE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.CHANNEL_SAVE_FAILED, payload: res }))
    );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) { }

}
