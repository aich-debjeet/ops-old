import { Action } from '@ngrx/store';
import { MessageModal, initialMessage } from '../models/message.model';

export class MessageActions {

  static LOAD_USER_PROFILE_DATA = 'LOAD_USER_PROFILE_DATA';
  static LOAD_USER_PROFILE_DATA_SUCCESS = 'LOAD_USER_PROFILE_DATA_SUCCESS';
  static LOAD_USER_PROFILE_DATA_FAILED = 'LOAD_USER_PROFILE_DATA_FAILED';

  static UNLOAD_USER_PROFILE_DATA = 'UNLOAD_USER_PROFILE_DATA';
  static UNLOAD_USER_PROFILE_DATA_SUCCESS = 'UNLOAD_USER_PROFILE_DATA_SUCCESS';
  static UNLOAD_USER_PROFILE_DATA_FAILED = 'UNLOAD_USER_PROFILE_DATA_FAILED';

  static LOAD_NON_USER_PROFILE_DATA = 'LOAD_NON_USER_PROFILE_DATA';
  static LOAD_NON_USER_PROFILE_DATA_SUCCESS = 'LOAD_NON_USER_PROFILE_DATA_SUCCESS';
  static LOAD_NON_USER_PROFILE_DATA_FAILED = 'LOAD_NON_USER_PROFILE_DATA_FAILED';

  static GET_RECEIPIENT = 'GET_RECEIPIENT';
  static GET_RECEIPIENT_SUCCESS = 'GET_RECEIPIENT_SUCCESS';
  static GET_RECEIPIENT_FAILED = 'GET_RECEIPIENT_FAILED';

  static LOAD_NON_USER_PROFILE2_DATA = 'LOAD_NON_USER_PROFILE2_DATA';
  static LOAD_NON_USER_PROFILE2_DATA_SUCCESS = 'LOAD_NON_USER_PROFILE2_DATA_SUCCESS';
  static LOAD_NON_USER_PROFILE2_DATA_FAILED = 'LOAD_NON_USER_PROFILE2_DATA_FAILED';

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
      type: MessageActions.LOAD_NON_USER_PROFILE_DATA,
      payload: { value }
    };
  }

  loadNonUserProfileSuccess(value): Action {
    console.log('LOAD_NON_USER_PROFILE_DATA_SUCCESS ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_NON_USER_PROFILE_DATA_SUCCESS,
      payload: { value }
    };
  }

  loadNonUserProfileFailed(error: any): Action {
    console.log('LOAD_NON_USER_PROFILE_DATA_FAILED ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_NON_USER_PROFILE_DATA_FAILED,
      payload: error
    };
  }
  /* -------------------------------- load non user profile data -------------------------------- */

  /*------------------------ get receipient details---------------------------------*/

  getReceipient(value) {
    console.log('GET_RECEIPIENT action triggred');
    return {
      type: MessageActions.GET_RECEIPIENT,
      payload: { value }
    };
  }
  getReceipientSuccess (value) {
    console.log('GET_RECEIPIENT_SUCCESS action triggred');
    return {
      type: MessageActions.GET_RECEIPIENT_SUCCESS,
      payload: { value }
    };
  }
  getReceipientFailure (value) {
    console.log('GET_RECEIPIENT_FAIlURE action triggred');
    return {
      type: MessageActions.GET_RECEIPIENT_FAILED,
      payload: { value }
    };
  }

 /*------------------------ get receipient details---------------------------------*/

   /* -------------------------------- load non user profile2 data -------------------------------- */
   loadNonUserProfile2(value): Action {
    console.log('LOAD_NON_USER_PROFILE2_DATA ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_NON_USER_PROFILE2_DATA,
      payload: { value }
    };
  }

  loadNonUserProfile2Success(value): Action {
    console.log('LOAD_NON_USER_PROFILE2_DATA_SUCCESS ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_NON_USER_PROFILE2_DATA_SUCCESS,
      payload: { value }
    };
  }

  loadNonUserProfile2Failed(error: any): Action {
    console.log('LOAD_NON_USER_PROFILE2_DATA_FAILED ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_NON_USER_PROFILE2_DATA_FAILED,
      payload: error
    };
  }
  /* -------------------------------- load non user profile2 data -------------------------------- */


}
