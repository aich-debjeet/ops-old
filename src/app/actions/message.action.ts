import { Action } from '@ngrx/store';
import { MessageModal, initialMessage } from '../models/message.model';

export class MessageActions {

  static LOAD_USER_PROFILE_DATA = 'LOAD_USER_PROFILE_DATA';
  static LOAD_USER_PROFILE_DATA_SUCCESS = 'LOAD_USER_PROFILE_DATA_SUCCESS';
  static LOAD_USER_PROFILE_DATA_FAILED = 'LOAD_USER_PROFILE_DATA_FAILED';

  static LOAD_NON_USER_PROFILE_DATA = 'LOAD_NON_USER_PROFILE_DATA';
  static LOAD_NON_USER_PROFILE_DATA_SUCCESS = 'LOAD_NON_USER_PROFILE_DATA_SUCCESS';
  static LOAD_NON_USER_PROFILE_DATA_FAILED = 'LOAD_NON_USER_PROFILE_DATA_FAILED';

  /* -------------------------------- load current user profile data -------------------------------- */
  loadUserProfile(value): Action {
    console.log('LOAD_USER_PROFILE_DATA ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_USER_PROFILE_DATA,
      payload: { value }
    };
  }

  loadUserProfileSuccess(value): Action {
    console.log('LOAD_USER_PROFILE_DATA_SUCCESS ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_USER_PROFILE_DATA_SUCCESS,
      payload: { value }
    };
  }

  loadUserProfileFailed(error: any): Action {
    console.log('LOAD_USER_PROFILE_DATA_FAILED ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_USER_PROFILE_DATA_FAILED,
      payload: error
    };
  }
  /* -------------------------------- load current user profile data -------------------------------- */



  /* -------------------------------- load non user profile data -------------------------------- */
  loadNonUserProfile(value): Action {
    console.log('LOAD_NON_USER_PROFILE_DATA ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_USER_PROFILE_DATA,
      payload: { value }
    };
  }

  loadNonUserProfileSuccess(value): Action {
    console.log('LOAD_NON_USER_PROFILE_DATA_SUCCESS ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_USER_PROFILE_DATA_SUCCESS,
      payload: { value }
    };
  }

  loadNonUserProfileFailed(error: any): Action {
    console.log('LOAD_NON_USER_PROFILE_DATA_FAILED ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_USER_PROFILE_DATA_FAILED,
      payload: error
    };
  }
  /* -------------------------------- load non user profile data -------------------------------- */
}
