import { Action } from '@ngrx/store';

export class ProfileActions {

  /* -------------------------------- load logged in users profile -------------------------------- */
  static LOAD_USER_PROFILE = 'LOAD_USER_PROFILE';
  static LOAD_USER_PROFILE_SUCCESS = 'LOAD_USER_PROFILE_SUCCESS';
  static LOAD_USER_PROFILE_FAILED = 'LOAD_USER_PROFILE_FAILED';
  /* -------------------------------- load logged in users profile -------------------------------- */

  /* -------------------------------- load logged in users media -------------------------------- */
  static LOAD_USER_MEDIA = 'LOAD_USER_MEDIA';
  static LOAD_USER_MEDIA_SUCCESS = 'LOAD_USER_MEDIA_SUCCESS';
  static LOAD_USER_MEDIA_FAILED = 'LOAD_USER_MEDIA_FAILED';
  /* -------------------------------- load logged in users media -------------------------------- */



  /* -------------------------------- get logged in users profile -------------------------------- */
  getUserProfile(): Action {
    console.log('home action: LOAD_USER_PROFILE triggred');
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
  /* -------------------------------- get logged in users profile -------------------------------- */

  /* -------------------------------- get logged in users media -------------------------------- */
  getUserMedia(): Action {
    console.log('home action: PIN_CHANNEL triggred');
    return {
      type: ProfileActions.LOAD_USER_MEDIA
    };
  }

  getUserMediaSuccess(value): Action {
    return {
      type: ProfileActions.LOAD_USER_MEDIA_SUCCESS,
      payload: { value }
    };
  }

  getUserMediaFailed(error: any): Action {
    return {
      type: ProfileActions.LOAD_USER_MEDIA_FAILED,
      payload: error
    };
  }
  /* -------------------------------- get logged in users media -------------------------------- */

}
