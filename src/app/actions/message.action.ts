import { Action } from '@ngrx/store';
import { MessageModal, initialMessage } from '../models/message.model';

export class MessageActions {

  static LOAD_SENT_MESSAGES = 'LOAD_SENT_MESSAGES';
  static LOAD_SENT_MESSAGES_SUCCESS = 'LOAD_SENT_MESSAGES_SUCCESS';
  static LOAD_SENT_MESSAGES_FAILED = 'LOAD_SENT_MESSAGES_FAILED';

  static LOAD_RECEIVED_MESSAGES = 'LOAD_RECEIVED_MESSAGES';
  static LOAD_RECEIVED_MESSAGES_SUCCESS = 'LOAD_RECEIVED_MESSAGES_SUCCESS';
  static LOAD_RECEIVED_MESSAGES_FAILED = 'LOAD_RECEIVED_MESSAGES_FAILED';

  static SEND_MESSAGE = 'SEND_MESSAGE';
  static SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
  static SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';

  static LOAD_USER_PROFILE_DATA = 'LOAD_USER_PROFILE_DATA';
  static LOAD_USER_PROFILE_DATA_SUCCESS = 'LOAD_USER_PROFILE_DATA_SUCCESS';
  static LOAD_USER_PROFILE_DATA_FAILED = 'LOAD_USER_PROFILE_DATA_FAILED';

  static LOAD_HANDLE_PROFILE_DATA = 'LOAD_HANDLE_PROFILE_DATA';
  static LOAD_HANDLE_PROFILE_DATA_SUCCESS = 'LOAD_HANDLE_PROFILE_DATA_SUCCESS';
  static LOAD_HANDLE_PROFILE_DATA_FAILED = 'LOAD_HANDLE_PROFILE_DATA_FAILED';

  /* -------------------------------- load sent messages -------------------------------- */
  loadSentMessages(value): Action {
    console.log('LOAD_SENT_MESSAGES action triggred');
    return {
      type: MessageActions.LOAD_SENT_MESSAGES,
      payload: { value }
    };
  }

  loadSentMessagesSuccess(value): Action {
    console.log('LOAD_SENT_MESSAGES_SUCCESS action triggred');
    return {
      type: MessageActions.LOAD_SENT_MESSAGES_SUCCESS,
      payload: { value }
    };
  }

  loadSentMessagesFailed(error: any): Action {
    console.log('LOAD_SENT_MESSAGES_FAILED action triggred');
    return {
      type: MessageActions.LOAD_SENT_MESSAGES_FAILED,
      payload: error
    };
  }
  /* -------------------------------- load sent messages -------------------------------- */

  /* -------------------------------- load received messages -------------------------------- */
  loadReceivedMessages(value): Action {
    console.log('LOAD_RECEIVED_MESSAGES action triggred');
    return {
      type: MessageActions.LOAD_RECEIVED_MESSAGES,
      payload: { value }
    };
  }

  loadReceivedMessagesSuccess(value): Action {
    console.log('LOAD_RECEIVED_MESSAGES_SUCCESS action triggred');
    return {
      type: MessageActions.LOAD_RECEIVED_MESSAGES_SUCCESS,
      payload: { value }
    };
  }

  loadReceivedMessagesFailed(error: any): Action {
    console.log('LOAD_RECEIVED_MESSAGES_FAILED action triggred');
    return {
      type: MessageActions.LOAD_RECEIVED_MESSAGES_FAILED,
      payload: error
    };
  }
  /* -------------------------------- load received messages -------------------------------- */

  /* -------------------------------- send message -------------------------------- */
  sendMessage(value): Action {
    console.log('SEND_MESSAGE action triggred');
    return {
      type: MessageActions.SEND_MESSAGE,
      payload: { value }
    };
  }

  sendMessageSuccess(value): Action {
    console.log('SEND_MESSAGE_SUCCESS action triggred');
    return {
      type: MessageActions.SEND_MESSAGE_SUCCESS,
      payload: { value }
    };
  }

  sendMessageFailed(error: any): Action {
    console.log('SEND_MESSAGE_FAILED action triggred');
    return {
      type: MessageActions.SEND_MESSAGE_FAILED,
      payload: error
    };
  }
  /* -------------------------------- send message -------------------------------- */

  /* -------------------------------- load current user profile data -------------------------------- */
  loadUserProfile(value): Action {
    console.log('LOAD_USER_PROFILE_DATA action triggred');
    return {
      type: MessageActions.LOAD_USER_PROFILE_DATA,
      payload: { value }
    };
  }

  loadUserProfileSuccess(value): Action {
    console.log('LOAD_USER_PROFILE_DATA_SUCCESS action triggred');
    return {
      type: MessageActions.LOAD_USER_PROFILE_DATA_SUCCESS,
      payload: { value }
    };
  }

  loadUserProfileFailed(error: any): Action {
    console.log('LOAD_USER_PROFILE_DATA_FAILED action triggred');
    return {
      type: MessageActions.LOAD_USER_PROFILE_DATA_FAILED,
      payload: error
    };
  }
  /* -------------------------------- load current user profile data -------------------------------- */

  /* -------------------------------- load profile data according to list of handles-------------------------------- */
  loadHandleProfile(value): Action {
    console.log('LOAD_HANDLE_PROFILE_DATA action triggred');
    return {
      type: MessageActions.LOAD_HANDLE_PROFILE_DATA,
      payload: { value }
    };
  }

  loadHandleProfileSuccess(value): Action {
    console.log('LOAD_HANDLE_PROFILE_DATA_SUCCESS action triggred');
    return {
      type: MessageActions.LOAD_HANDLE_PROFILE_DATA_SUCCESS,
      payload: { value }
    };
  }

  loadhandleProfileFailed(error: any): Action {
    console.log('LOAD_HANDLE_PROFILE_DATA_FAILED action triggred');
    return {
      type: MessageActions.LOAD_HANDLE_PROFILE_DATA_FAILED,
      payload: error
    };
  }
  /* -------------------------------- load profile data according to list of handles -------------------------------- */

}
