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

  static GET_MESSANGER_LIST = 'GET_MESSANGER_LIST';
  static GET_MESSANGER_LIST_SUCCESS = 'GET_MESSANGER_LIST_SUCCESS';
  static GET_MESSANGER_LIST_FAILED = 'GET_MESSANGER_LIST_FAILED';

  static LOAD_CONVERSATION = 'LOAD_CONVERSATION';
  static LOAD_CONVERSATION_SUCCESS = 'LOAD_CONVERSATION_SUCCESS';
  static LOAD_CONVERSATION_FAILED = 'LOAD_CONVERSATION_FAILED';

  static SEND_MESSAGE = 'SEND_MESSAGE';
  static SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
  static SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';

  static ADD_PUSHER_MESSAGE = 'ADD_PUSHER_MESSAGE';
  static ADD_PUSHER_MESSAGE_SUCCESS = 'ADD_PUSHER_MESSAGE_SUCCESS';
  static ADD_PUSHER_MESSAGE_FAILED = 'ADD_PUSHER_MESSAGE_FAILED';

  static RESET_CONVERSATION_STATE = 'RESET_CONVERSATION_STATE';

  static MESSAGE_SEARCH_USER = 'MESSAGE_SEARCH_USER';
  static MESSAGE_SEARCH_USER_SUCCESS = 'MESSAGE_SEARCH_USER_SUCCESS';
  static MESSAGE_SEARCH_USER_FAILED = 'MESSAGE_SEARCH_USER_FAILED';

  /* -------------------------------- load current user profile data -------------------------------- */
  loadUserProfile(value): Action {
    return {
      type: MessageActions.LOAD_USER_PROFILE_DATA,
      payload: { value }
    };
  }

  loadUserProfileSuccess(value): Action {
    return {
      type: MessageActions.LOAD_USER_PROFILE_DATA_SUCCESS,
      payload: { value }
    };
  }

  loadUserProfileFailed(error: any): Action {
    return {
      type: MessageActions.LOAD_USER_PROFILE_DATA_FAILED,
      payload: error
    };
  }
  /* -------------------------------- load current user profile data -------------------------------- */



  /* -------------------------------- load non user profile data -------------------------------- */
  loadNonUserProfile(value): Action {
    return {
      type: MessageActions.LOAD_NON_USER_PROFILE_DATA,
      payload: { value }
    };
  }

  loadNonUserProfileSuccess(value): Action {
    return {
      type: MessageActions.LOAD_NON_USER_PROFILE_DATA_SUCCESS,
      payload: { value }
    };
  }

  loadNonUserProfileFailed(error: any): Action {
    return {
      type: MessageActions.LOAD_NON_USER_PROFILE_DATA_FAILED,
      payload: error
    };
  }
  /* -------------------------------- load non user profile data -------------------------------- */

  /*------------------------ get receipient details---------------------------------*/

  getReceipient(value) {
    return {
      type: MessageActions.GET_RECEIPIENT,
      payload: { value }
    };
  }
  getReceipientSuccess (value) {
    return {
      type: MessageActions.GET_RECEIPIENT_SUCCESS,
      payload: { value }
    };
  }
  getReceipientFailure (value) {
    return {
      type: MessageActions.GET_RECEIPIENT_FAILED,
      payload: { value }
    };
  }

 /*------------------------ get receipient details---------------------------------*/

   /* -------------------------------- load non user profile2 data -------------------------------- */
   loadNonUserProfile2(value): Action {
    return {
      type: MessageActions.LOAD_NON_USER_PROFILE2_DATA,
      payload: { value }
    };
  }

  loadNonUserProfile2Success(value): Action {
    return {
      type: MessageActions.LOAD_NON_USER_PROFILE2_DATA_SUCCESS,
      payload: { value }
    };
  }

  loadNonUserProfile2Failed(error: any): Action {
    return {
      type: MessageActions.LOAD_NON_USER_PROFILE2_DATA_FAILED,
      payload: error
    };
  }
  /* -------------------------------- load non user profile2 data -------------------------------- */


}
