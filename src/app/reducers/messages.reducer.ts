import { ActionReducer, Action } from '@ngrx/store';
import { MessageModal, initialMessage } from '../models/message.model';
import { unionBy as _unionBy } from 'lodash';
import { MessageActions } from '../actions/message.action';


export const MessageReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    /* get messanger list reducers */
    case MessageActions.GET_MESSANGER_LIST:
      return Object.assign({}, state, {
        getting_messanger_list: true,
        getting_messanger_list_success: false,
        get_messanger_list_params: payload
      });

    case MessageActions.GET_MESSANGER_LIST_SUCCESS:
      return Object.assign({}, state, {
        getting_messanger_list: false,
        get_messanger_list_data: payload,
        getting_messanger_list_success: true
      });

    case MessageActions.GET_MESSANGER_LIST_FAILED:
      return Object.assign({}, state, {
        getting_messanger_list: false,
        getting_messanger_list_success: false
      });
    /* get messanger list reducers */

    /* load conversation */
    case MessageActions.LOAD_CONVERSATION:
      return Object.assign({}, state, {
        loading_conversation: true,
        loading_conversation_success: false,
        load_conversation_params: payload
      });

    case MessageActions.LOAD_CONVERSATION_SUCCESS:
      return Object.assign({}, state, {
        loading_conversation: false,
        load_conversation_data: payload,
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
      const conv_data = {
        subject: payload.subject,
        content: payload.subject,
        time: '2018-04-04T06:57:44.712',
        messageType: 'sent',
        profileImage: 'images-dev/N_6659E6E3_92EE_4617_8C5E_A47E27E47488/5e87475b-75f3-4720-895b-e8183ba015cb.jpeg'
      };
      // check if conversation array exist, if yes then add the sent message
      if (state && state['load_conversation_data'] !== undefined) {
        // console.log('IN', state)
        return Object.assign({}, state, {
          sending_message: true,
          sending_message_success: false,
          send_message_params: payload,
          load_conversation_data: [...state['load_conversation_data'], conv_data]
        });
      } else {
        // console.log('OUT');
        return Object.assign({}, state, {
          sending_message: true,
          sending_message_success: false,
          send_message_params: payload,
          load_conversation_data: conv_data
        });
      }

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
