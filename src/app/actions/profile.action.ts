import { Action } from '@ngrx/store';

export class ProfileActions {

  /* -------------------------------- load logged in users profile -------------------------------- */
  static LOAD_USER_PROFILE = 'LOAD_USER_PROFILE';
  static LOAD_USER_PROFILE_SUCCESS = 'LOAD_USER_PROFILE_SUCCESS';
  static LOAD_USER_PROFILE_FAILED = 'LOAD_USER_PROFILE_FAILED';
  /* -------------------------------- load logged in users profile -------------------------------- */

  /* -------------------------------- PIN channel methods -------------------------------- */
  getUserProfile(): Action {
    console.log('home action: PIN_CHANNEL triggred');
    return {
      type: ProfileActions.LOAD_USER_PROFILE
    };
  }

  getUserProfileSuccess(value): Action {
    return {
      type: ProfileActions.LOAD_USER_PROFILE_SUCCESS,
      payload: { value }
    };
  }

  getUserProfileFailed(error: any): Action {
    return {
      type: ProfileActions.LOAD_USER_PROFILE_FAILED,
      payload: error
    };
  }
  /* -------------------------------- PIN channel methods -------------------------------- */

}
