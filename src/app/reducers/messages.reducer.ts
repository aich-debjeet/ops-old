import { ActionReducer, Action } from '@ngrx/store';
import { MessageModal, initialMessage } from '../models/message.model';
import { unionBy as _unionBy } from 'lodash';
import { MessageActions } from '../actions/message.action';

function merger(sentMsgs, recvdMsgs) {
  let mergedMsgs = [];
  mergedMsgs = _unionBy(sentMsgs, recvdMsgs, 'id')
  return mergedMsgs;
}

const sentMessages = [];
const receivedMessages = [];
const mergedMessages = [];

export const MessageReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    case MessageActions.LOAD_SENT_MESSAGES:
      return Object.assign({}, state, {
        success: true
      });

    case MessageActions.LOAD_SENT_MESSAGES_SUCCESS:
      this.sentMessages = payload.messages.sent;
       this.mergedMessages = merger(this.sentMessages, this.receivedMessages);
      return Object.assign({}, state, {
        sentAll: payload.messages.sent,
        mergedMessages: this.mergedMessages,
        success: true
      });

    case MessageActions.LOAD_SENT_MESSAGES_FAILED:
      return Object.assign({}, state, {
        success: false
      });

      case MessageActions.LOAD_USER_PROFILE_DATA:
      return Object.assign({}, state, {
        success: true
      });

    case MessageActions.LOAD_USER_PROFILE_DATA_SUCCESS:
      return Object.assign({}, state, {
        userProfileDetails: payload,
        success: true
      });

    case MessageActions.LOAD_USER_PROFILE_DATA_FAILED:
      return Object.assign({}, state, {
        success: false
      });


    case MessageActions.LOAD_RECEIVED_MESSAGES:
      return Object.assign({}, state, {
        success: true
      });

    case MessageActions.LOAD_RECEIVED_MESSAGES_SUCCESS:
      this.receivedMessages = payload.messages.received;
      this.mergedMessages = merger(this.sentMessages, this.receivedMessages);
      return Object.assign({}, state, {
        receivedAll: payload.messages.received,
        mergedMessages: this.mergedMessages,
        success: true
      });

    case MessageActions.LOAD_RECEIVED_MESSAGES_FAILED:
      return Object.assign({}, state, {
        success: false
      });

    case MessageActions.SEND_MESSAGE:
      return Object.assign({}, state, {
        success: true
      });

    case MessageActions.SEND_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case MessageActions.SEND_MESSAGE_FAILED:
      return Object.assign({}, state, {
        success: false
      });


    case MessageActions.LOAD_HANDLE_PROFILE_DATA:
      return Object.assign({}, state, {
        success: true
      });

    case MessageActions.LOAD_HANDLE_PROFILE_DATA_SUCCESS:
      return Object.assign({}, state, {
        profileHandles: payload,
        success: true
      });

    case MessageActions.LOAD_HANDLE_PROFILE_DATA_FAILED:
      return Object.assign({}, state, {
        success: false
      });

    default:
      return state;

  }

}
