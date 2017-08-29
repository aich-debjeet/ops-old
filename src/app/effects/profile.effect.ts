import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Rx'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

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
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_CURRENT_USER_PROFILE_FAILED,
        payload: { errorStatus: res.status }
      }))
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
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS_FAILED,
        payload: { errorStatus: res.status }
      }))
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
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS_FAILED,
        payload: { errorStatus: res.status }
      }))
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
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_USER_MEDIA_FAILED,
        payload: { errorStatus: res.status }
      }))
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
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_CURRENT_USER_CHANNEL_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Get current user channel profile
   */
  @Effect()
  userProfileUpdate$ = this.actions$
    .ofType(ProfileActions.LOAD_PROFILE_UPDATE)
    .map(toPayload)
    .switchMap((payload) => this.profileService.userProfileUpdate(payload)
      .map(res => ({ type: ProfileActions.LOAD_PROFILE_UPDATE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ProfileActions.LOAD_PROFILE_UPDATE_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Add Current user work
   */
  @Effect()
  addUserWork$ = this.actions$
    .ofType(ProfileActions.ADD_USER_WORK)
    .map(toPayload)
    .switchMap((payload) => this.profileService.addUserWork(payload)
      .map(res => ({ type: ProfileActions.ADD_USER_WORK_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.ADD_USER_WORK_FAILED, payload: res }))
    );

  // /**
  //  * Edit Current user work
  //  */
  // @Effect()
  // editUserWork$ = this.actions$
  //   .ofType(ProfileActions.EDIT_USER_WORK)
  //   .map(toPayload)
  //   .switchMap((payload) => this.profileService.editUserWork(payload)
  //     .map(res => ({ type: ProfileActions.EDIT_USER_WORK_SUCCESS, payload: res }))
  //     .catch((res) => Observable.of({ type: ProfileActions.EDIT_USER_WORK_FAILED, payload: res }))
  //   );

  /**
   * Get Current work and award
   */
  @Effect()
  getCurrentWork$ = this.actions$
    .ofType(ProfileActions.GET_USER_WORK)
    .map(toPayload)
    .switchMap((payload) => this.profileService.getCurrentWork(payload)
      .map(res => ({ type: ProfileActions.GET_USER_WORK_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.GET_USER_WORK_FAILED, payload: res }))
    );

  /**
   * Update Current work and award
   */
  @Effect()
  updateCurrentWork$ = this.actions$
    .ofType(ProfileActions.UPDATE_USER_WORK)
    .map(toPayload)
    .switchMap((payload) => this.profileService.updateUserWork(payload)
      .map(res => ({ type: ProfileActions.UPDATE_USER_WORK_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.UPDATE_USER_WORK_FAILED, payload: res }))
    );

  /**
   * User Work Update Success
   */
  @Effect()
  userWorkUpdateSuccess$ = this.actions$
    .ofType(ProfileActions.UPDATE_USER_WORK_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS  }))

  /**
   * Delete Current user work
   */
  @Effect()
  deleteUserWork$ = this.actions$
    .ofType(ProfileActions.DELETE_USER_WORK)
    .map(toPayload)
    .switchMap((payload) => this.profileService.deleteUserWork(payload)
      .map(res => ({ type: ProfileActions.DELETE_USER_WORK_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.DELETE_USER_WORK_FAILED, payload: res }))
    );

  /**
   * Add Current user Education
   */
  @Effect()
  addUserEducation$ = this.actions$
    .ofType(ProfileActions.ADD_USER_EDUCATION)
    .map(toPayload)
    .switchMap((payload) => this.profileService.addUserEducation(payload)
      .map(res => ({ type: ProfileActions.ADD_USER_EDUCATION_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.ADD_USER_EDUCATION_FAILED, payload: res }))
    );

  /**
   * Delete Current user Education
   */
  @Effect()
  deleteUserEducation$ = this.actions$
    .ofType(ProfileActions.DELETE_USER_EDUCATION)
    .map(toPayload)
    .switchMap((payload) => this.profileService.deleteUserEducation(payload)
      .map(res => ({ type: ProfileActions.DELETE_USER_EDUCATION_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.DELETE_USER_EDUCATION_FAILED, payload: res }))
    );

  /**
   * Update Current Education
   */
  @Effect()
  updateCurrentEducation$ = this.actions$
    .ofType(ProfileActions.UPDATE_USER_EDUCATION)
    .map(toPayload)
    .switchMap((payload) => this.profileService.updateUserEducation(payload)
      .map(res => ({ type: ProfileActions.UPDATE_USER_EDUCATION_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.UPDATE_USER_EDUCATION_FAILED, payload: res }))
    );

  /**
   * User Work Update Success
   */
  @Effect()
  userEducationUpdateSuccess$ = this.actions$
    .ofType(ProfileActions.UPDATE_USER_EDUCATION_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS  }))


  // /**
  //  * Edit Current user Award
  //  */
  // @Effect()
  // editUserAward$ = this.actions$
  //   .ofType(ProfileActions.EDIT_USER_WORK)
  //   .map(toPayload)
  //   .switchMap((payload) => this.profileService.editUserWork(payload)
  //     .map(res => ({ type: ProfileActions.EDIT_USER_WORK_SUCCESS, payload: res }))
  //     .catch((res) => Observable.of({ type: ProfileActions.EDIT_USER_WORK_FAILED, payload: res }))
  //   );

  /**
   * Delete Current user Award
   */
  @Effect()
  deleteUserAward$ = this.actions$
    .ofType(ProfileActions.DELETE_USER_WORK)
    .map(toPayload)
    .switchMap((payload) => this.profileService.deleteUserWork(payload)
      .map(res => ({ type: ProfileActions.DELETE_USER_WORK_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.DELETE_USER_WORK_FAILED, payload: res }))
    );

  /**
   * 401 error
   */
  @Effect() errorStatus401$ = this.actions$
    .map(action => action.payload)
    .filter(payload => payload && payload.errorStatus === 401)
    .switchMap(payload => {
        localStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
        return Observable.empty();
    });

  /**
   * User Work Delete Success
   */
  @Effect()
  userWorkDeleteSuccess$ = this.actions$
    .ofType(ProfileActions.DELETE_USER_WORK_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS  }))

  /**
   * User Education Delete Success
   */
  @Effect()
  userWorkEducationSuccess$ = this.actions$
    .ofType(ProfileActions.DELETE_USER_EDUCATION_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS  }))

  /**
   * User Work Add Success
   */
  @Effect()
  userWorkAddSuccess$ = this.actions$
    .ofType(ProfileActions.ADD_USER_WORK_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS }))

  /**
   * Profile Update Success
   */
  @Effect()
  userProfileUpdateSuccess$ = this.actions$
    .ofType(ProfileActions.LOAD_PROFILE_UPDATE_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE }))

  @Effect()
  userProfileUpdateDetailsSuccess$ = this.actions$
    .ofType(ProfileActions.LOAD_PROFILE_UPDATE_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS }))

  /**
   * User Education Add Success
   */
  @Effect()
  userEducationAddSuccess$ = this.actions$
    .ofType(ProfileActions.ADD_USER_EDUCATION_SUCCESS)
    .map(res => ({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS }))

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
    private router: Router,
    private profileService: ProfileService
  ) { }

}
