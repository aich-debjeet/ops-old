import { Action } from '@ngrx/store';
import { Message } from '../models/message.model';

export class MessageActions {

  static LOAD_MESSAGES = 'LOAD_MESSAGES';
  static LOAD_MESSAGES_SUCCESS = 'LOAD_MESSAGES_SUCCESS';
  static LOAD_MESSAGES_FAILED = 'LOAD_MESSAGES_FAILED';

  /* -------------------------------- load messages -------------------------------- */
  loadMessages(value): Action {
    console.log('LOAD_MESSAGES action triggred');
    return {
      type: MessageActions.LOAD_MESSAGES,
      payload: { value }
    };
  }

  loadMessagesSuccess(value): Action {
    console.log('LOAD_MESSAGES_SUCCESS action triggred');
    return {
      type: MessageActions.LOAD_MESSAGES_SUCCESS,
      payload: { value }
    };
  }

  loadMessagesFailed(error: any): Action {
    console.log('LOAD_MESSAGES_FAILED action triggred');
    return {
      type: MessageActions.LOAD_MESSAGES_FAILED,
      payload: error
    };
  }
  /* -------------------------------- load messages -------------------------------- */

}
