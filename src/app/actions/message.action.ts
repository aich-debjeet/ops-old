import { Action } from '@ngrx/store';
import { Message } from '../models/message.model';

export class MessageActions {

  static LOAD_SENT_MESSAGES = 'LOAD_SENT_MESSAGES';
  static LOAD_SENT_MESSAGES_SUCCESS = 'LOAD_SENT_MESSAGES_SUCCESS';
  static LOAD_SENT_MESSAGES_FAILED = 'LOAD_SENT_MESSAGES_FAILED';

  static LOAD_RECEIVED_MESSAGES = 'LOAD_RECEIVED_MESSAGES';
  static LOAD_RECEIVED_MESSAGES_SUCCESS = 'LOAD_RECEIVED_MESSAGES_SUCCESS';
  static LOAD_RECEIVED_MESSAGES_FAILED = 'LOAD_RECEIVED_MESSAGES_FAILED';

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

}
