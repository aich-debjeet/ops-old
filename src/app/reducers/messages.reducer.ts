import { ActionReducer, Action } from '@ngrx/store';
import { MessageModal, initialMessage } from '../models/message.model';
import { unionBy as _unionBy } from 'lodash';
import { MessageActions } from '../actions/message.action';

import * as _ from 'lodash';

export const MessageReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    /* get messanger list reducers */
    case MessageActions.GET_MESSANGER_LIST:
      return Object.assign({}, state, {
        getting_messanger_list: true,
        getting_messanger_list_success: false,
        messanger_list_params: payload
      });

    case MessageActions.GET_MESSANGER_LIST_SUCCESS:
      return Object.assign({}, state, {
        getting_messanger_list: false,
        messanger_list_data: payload,
        getting_messanger_list_success: true
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
        const msgIndex = _.findIndex(messanger_list, (obj) => obj.handle === payload.to);
        if (msgIndex > -1) {
          // get the user object
          const msgObj = messanger_list[msgIndex];
          if (msgObj && msgObj !== undefined) {
            // delete object
            messanger_list.splice(msgIndex, 1);
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
      return Object.assign({}, state, {
        sending_message: false,
        send_message_data: payload,
        sending_message_success: true
      });

    case MessageActions.SEND_MESSAGE_FAILED:
      return Object.assign({}, state, {
        sending_message: false,
        sending_message_success: false
      });
    /* send message */

    /* update pusher message */
    case MessageActions.ADD_PUSHER_MESSAGE:
      let updated_load_conversation_data = [];
      if (state && state['load_conversation_data'] !== undefined) {
        updated_load_conversation_data = [...state['load_conversation_data'], payload];
      } else {
        updated_load_conversation_data = [payload];
      }
      return Object.assign({}, state, {
        load_conversation_data: updated_load_conversation_data
      });
    /* update pusher message */

    /* reset conversation state */
    case MessageActions.RESET_CONVERSATION_STATE:
      return Object.assign({}, state, {
        load_conversation_data: []
      });

    case MessageActions.LOAD_USER_PROFILE_DATA:
    return (<any>Object).assign({}, state, {
      success: true,
    });

    case MessageActions.LOAD_USER_PROFILE_DATA_SUCCESS:
    return (<any>Object).assign({}, state, {
      userProfileDetails: payload,
      success: true,
    });

    case MessageActions.LOAD_USER_PROFILE_DATA_FAILED:
    return (<any>Object).assign({}, state, {
      success: false,
    });

    case MessageActions.UNLOAD_USER_PROFILE_DATA:
    return (<any>Object).assign({}, state, {
      success: true,
    });

    case MessageActions.UNLOAD_USER_PROFILE_DATA_SUCCESS:
    return

    case MessageActions.LOAD_NON_USER_PROFILE_DATA:
    return (<any>Object).assign({}, state, {
      success: true
    });

    case MessageActions.LOAD_NON_USER_PROFILE_DATA_SUCCESS:
    return (<any>Object).assign({}, state, {
      nonUserProfileDetails: payload,
      success: true
    });

    case MessageActions.LOAD_NON_USER_PROFILE_DATA_FAILED:
    return (<any>Object).assign({}, state, {
      success: false
    });

    case MessageActions.LOAD_NON_USER_PROFILE2_DATA:
    return (<any>Object).assign({}, state, {
      success: true
    });

    case MessageActions.LOAD_NON_USER_PROFILE2_DATA_SUCCESS:
    return (<any>Object).assign({}, state, {
      nonUserProfile2Details: payload,
      success: true
    });

    case MessageActions.LOAD_NON_USER_PROFILE2_DATA_FAILED:
    return (<any>Object).assign({}, state, {
      success: false
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
