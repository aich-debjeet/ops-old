import { ActionReducer, Action } from '@ngrx/store';
import { MessageActions } from '../actions/message.action';

import { findIndex as _findIndex } from 'lodash';
import { remove as _remove } from 'lodash';
import { uniqBy as _uniqBy } from 'lodash';
import { GeneralUtilities } from 'app/helpers/general.utils';

const gUtils = new GeneralUtilities;

export const MessageReducer: ActionReducer<any> = (state, { payload, type }: Action) => {

  switch (type) {

    /** delete conversation */
    case MessageActions.DELETE_CONVERSATION:
      return Object.assign({}, state, {
        deletingConversation: true,
        deletedConversation: false,
        deleteConversationReqBody: payload
      });

    case MessageActions.DELETE_CONVERSATION_SUCCESS:
      return Object.assign({}, state, {
        deletingConversation: false,
        deletedConversation: true,
        deleteConversationResBody: payload,
        messanger_list_data: gUtils.messangerListRemoveClearedRecords(state.messanger_list_data, state.deleteConversationReqBody.otherHandle)
      });

    case MessageActions.DELETE_CONVERSATION_FAILED:
      return Object.assign({}, state, {
        deletingConversation: false,
        deletedConversation: false
      });
    /** delete conversation */

    /* reachout opportunity applicant */
    case MessageActions.ADD_TO_MESSANGER_LIST:
      return Object.assign({}, state, {
        messanger_list_data: [payload]
      });
    /* reachout opportunity applicant */

    /* newtwork request action */
    case MessageActions.NETWORK_REQUEST_ACTION:
      return Object.assign({}, state, {
        network_request_action_sent: true,
        network_request_action_params: payload
      });

    case MessageActions.NETWORK_REQUEST_ACTION_SUCCESS:
      return Object.assign({}, state, {
        network_request_action_sent: false,
        network_request_action_response: payload,
        network_request_action_success: true
      });

    case MessageActions.NETWORK_REQUEST_ACTION_FAILED:
      return Object.assign({}, state, {
        network_request_action_sent: false,
        network_request_action_success: false
      });
    /* newtwork request action */

    /* message delete */
    case MessageActions.DELETE_MESSAGE:
      let messanger_list_data_updated_on_del = state['messanger_list_data'];
      const msngr_list = state['messanger_list_data'];
      const msngrMsgIndexDel = _findIndex(msngr_list, (obj) => obj.handle === payload.messageDetails.to);
      if (msngrMsgIndexDel > -1) {
        if (msngr_list[msngrMsgIndexDel] && msngr_list[msngrMsgIndexDel] !== undefined && msngr_list[msngrMsgIndexDel].latestMessage === payload.messageDetails.content) {
          // update details
          msngr_list[msngrMsgIndexDel].isDeleted = true;
          msngr_list[msngrMsgIndexDel].latestMessage = 'This message has been deleted';
          messanger_list_data_updated_on_del = msngr_list;
        }
      }
      let load_conversation_data_updated = state['load_conversation_data'];
      const conv_list = state['load_conversation_data'];
      const convMsgIndexDel = _findIndex(conv_list, (obj) => obj.id === payload.messageId);
      if (convMsgIndexDel > -1) {
        // get the message object
        if (conv_list[convMsgIndexDel] && conv_list[convMsgIndexDel] !== undefined) {
          // update details
          conv_list[convMsgIndexDel].isDeleted = true;
          conv_list[convMsgIndexDel].subject = 'This message has been deleted';
          conv_list[convMsgIndexDel].content = 'This message has been deleted';
          // prepare updated conv list
          load_conversation_data_updated = conv_list;
        }
      }
      return Object.assign({}, state, {
        delete_message_sent: true,
        delete_message_params: payload,
        messanger_list_data: messanger_list_data_updated_on_del,
        load_conversation_data: load_conversation_data_updated
      });

    case MessageActions.DELETE_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        delete_message_sent: false,
        delete_message_response: payload,
        delete_message_success: true
      });

    case MessageActions.DELETE_MESSAGE_FAILED:
      return Object.assign({}, state, {
        delete_message_sent: false,
        delete_message_success: false
      });
    /* message delete */

    case MessageActions.NETWORK_REQUEST_DECLINE:
      const messanger_list_data_updated = _remove(state['messanger_list_data'], (obj) => obj.handle !== payload.by);
      return Object.assign({}, state, {
        messanger_list_data: messanger_list_data_updated
      });

    /* get messanger list reducers */
    case MessageActions.GET_MESSANGER_LIST:
      return Object.assign({}, state, {
        getting_messanger_list: true,
        getting_messanger_list_success: false,
        messanger_list_params: payload
      });

    case MessageActions.GET_MESSANGER_LIST_SUCCESS:
      let messanger_list_data_if_reached_out;
      if (state && state['messanger_list_data'] !== undefined) {
        messanger_list_data_if_reached_out = [...payload, ...state['messanger_list_data']];
        messanger_list_data_if_reached_out = _uniqBy(messanger_list_data_if_reached_out, 'handle');
      } else {
        messanger_list_data_if_reached_out = payload;
      }
      return Object.assign({}, state, {
        getting_messanger_list: false,
        getting_messanger_list_success: true,
        messanger_list_data: messanger_list_data_if_reached_out
      });

    case MessageActions.GET_MESSANGER_LIST_FAILED:
      return Object.assign({}, state, {
        getting_messanger_list: false,
        getting_messanger_list_success: false
      });
    /* get messanger list reducers */

    /* get searched users */
    case MessageActions.MESSAGE_SEARCH_USER:
      return Object.assign({}, state, {
        message_searching_user: true,
        message_searching_user_success: false,
        message_search_user_params: payload
      });

    case MessageActions.MESSAGE_SEARCH_USER_SUCCESS:
      return Object.assign({}, state, {
        message_searching_user: false,
        messanger_list_data: payload,
        message_searching_user_success: true
      });

    case MessageActions.MESSAGE_SEARCH_USER_FAILED:
      return Object.assign({}, state, {
        message_searching_user: false,
        message_searching_user_success: false
      });
    /* get searched users */

    /* load conversation */
    case MessageActions.LOAD_CONVERSATION:
      return Object.assign({}, state, {
        loading_conversation: true,
        loading_conversation_success: false,
        load_conversation_params: payload
      });

    case MessageActions.LOAD_CONVERSATION_SUCCESS:
      let updated_load_conv_data = [];
      if (state && state['load_conversation_data'] !== undefined) {
        updated_load_conv_data = [...payload, ...state['load_conversation_data']];
      } else {
        updated_load_conv_data = payload;
      }
      return Object.assign({}, state, {
        loading_conversation: false,
        load_conversation_data: updated_load_conv_data,
        loading_conversation_success: true
      });

    case MessageActions.LOAD_CONVERSATION_FAILED:
      return Object.assign({}, state, {
        loading_conversation: false,
        loading_conversation_success: false
      });
    /* load conversation */

    /* send message */
    case MessageActions.SEND_MESSAGE:

      // check if conversation array exist, if yes then add the sent message
      let updated_conversation = [];
      if (state && state['load_conversation_data'] !== undefined) {
        updated_conversation = [...state['load_conversation_data'], payload];
      } else {
        updated_conversation = [payload];
      }

      // check if messanger list array exist, if yes then update it
      let updated_messanger_list = [];
      const messanger_list = state['messanger_list_data'];
      if (state && messanger_list !== undefined) {
        // remove the user with the same handle
        const msgIndexSend = _findIndex(messanger_list, (obj) => obj.handle === payload.to);
        if (msgIndexSend > -1) {
          // get the user object
          const msgObj = messanger_list[msgIndexSend];
          if (msgObj && msgObj !== undefined) {
            // delete object
            messanger_list.splice(msgIndexSend, 1);
            // update details
            msgObj.messageType = 'sent';
            msgObj.latestMessage = payload.content;
            msgObj.time = payload.time;
            // prepare updated messanger list
            updated_messanger_list = [msgObj].concat(messanger_list);
          }
        }
      } else {
        updated_messanger_list = [payload];
      }

      return Object.assign({}, state, {
        sending_message: true,
        sending_message_success: false,
        send_message_params: payload,
        load_conversation_data: updated_conversation,
        messanger_list_data: updated_messanger_list
      });

    case MessageActions.SEND_MESSAGE_SUCCESS:
      // mark message delivered
      if (payload && payload.SUCCESS) {
        // find the message
        const sentMsgIndex = _findIndex(state.load_conversation_data, (obj) => obj.content === payload.SUCCESS.content);
        if (sentMsgIndex > -1) {
          if (state.load_conversation_data[sentMsgIndex] && state.load_conversation_data[sentMsgIndex] !== undefined) {
            // delete object
            state.load_conversation_data[sentMsgIndex].id = payload.SUCCESS.id;
            delete state.load_conversation_data[sentMsgIndex].isSending;
          }
        }
      }
      return Object.assign({}, state, {
        sending_message: false,
        send_message_data: payload,
        sending_message_success: true,
        // load_conversation_data: updated_conv_list
      });

    case MessageActions.SEND_MESSAGE_FAILED:
      return Object.assign({}, state, {
        sending_message: false,
        sending_message_success: false
      });
    /* send message */

    /* prepend user to conv listing */
    case MessageActions.PREPEND_ELEMENT_TO_USER_LIST:
      let messanger_list_updated;
      if (state && state.messanger_list_data) {
        const new_conv_data = [payload];
        messanger_list_updated = new_conv_data.concat(state.messanger_list_data);
      } else {
        messanger_list_updated = state.messanger_list_data;
      }
      return Object.assign({}, state, {
        messanger_list_data: messanger_list_updated
      });
    /* prepend user to conv listing */

    /* update pusher message */
    case MessageActions.ADD_PUSHER_MESSAGE:
      // check for the selected user handle to append the message
      let updated_load_conversation_data = [];
      if (state && state['load_conversation_params'] !== undefined && state['load_conversation_params']['handle'] !== undefined && state['load_conversation_params']['handle'] === payload['by']) {
        if (state && state['load_conversation_data'] !== undefined) {
          updated_load_conversation_data = [...state['load_conversation_data'], payload];
        } else {
          updated_load_conversation_data = [payload];
        }
      } else {
        updated_load_conversation_data = state.load_conversation_data;
      }
      // cache existing listing
      let updated_messanger_list_data = [];
      if (state && state['messanger_list_data']) {
        updated_messanger_list_data = state['messanger_list_data'];
      }
      // console.log('BEFORE', updated_messanger_list_data);
      // update the user in listing with new message
      const listingIndex = _findIndex(state.messanger_list_data, (obj) => obj.handle === payload.by);
      if (listingIndex > -1) {
        // get the user object
        const msgObj = state.messanger_list_data[listingIndex];
        if (msgObj && msgObj !== undefined) {
          msgObj.time = payload.time;
          msgObj.latestMessage = payload.content;
          msgObj.messageType = payload.messageType;
          msgObj.isRead = false;
          state.messanger_list_data.splice(listingIndex, 1);
          const new_list_data = [msgObj];
          updated_messanger_list_data = new_list_data.concat(state.messanger_list_data);
        }
      } else {
        const new_list_data = [payload];
        updated_messanger_list_data = new_list_data.concat(state.messanger_list_data);
      }
      // console.log('AFTER', updated_messanger_list_data);
      return Object.assign({}, state, {
        load_conversation_data: updated_load_conversation_data,
        messanger_list_data: updated_messanger_list_data
      });
    /* update pusher message */

    /* reset conversation state */
    case MessageActions.RESET_CONVERSATION_STATE:
      return Object.assign({}, state, {
        load_conversation_data: []
      });

    case MessageActions.GET_RECEIPIENT:
      return Object.assign({}, state, {
        receipients: [],
        receipients_loaded: false
      });
    case MessageActions.GET_RECEIPIENT_SUCCESS:
      return Object.assign({}, state, {
        receipients: payload,
        receipients_loaded: true
      });
    case MessageActions.GET_RECEIPIENT_FAILED:
      return Object.assign({}, state, {
        success: false,
        receipients_loaded: false
      });

    default:
      return state;
  }
}
