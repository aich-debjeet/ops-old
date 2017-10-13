import { Action } from '@ngrx/store';
import { MessageModal, initialMessage } from '../models/message.model';

export class MessageActions {

  // static LOAD_SENT_MESSAGES = 'LOAD_SENT_MESSAGES';
  // static LOAD_SENT_MESSAGES_SUCCESS = 'LOAD_SENT_MESSAGES_SUCCESS';
  // static LOAD_SENT_MESSAGES_FAILED = 'LOAD_SENT_MESSAGES_FAILED';

  // static LOAD_RECEIVED_MESSAGES = 'LOAD_RECEIVED_MESSAGES';
  // static LOAD_RECEIVED_MESSAGES_SUCCESS = 'LOAD_RECEIVED_MESSAGES_SUCCESS';
  // static LOAD_RECEIVED_MESSAGES_FAILED = 'LOAD_RECEIVED_MESSAGES_FAILED';

  static LOAD_COMBINED_MESSAGES = 'LOAD_COMBINED_MESSAGES';
  static LOAD_COMBINED_MESSAGES_SUCCESS = 'LOAD_COMBINED_MESSAGES_SUCCESS';
  static LOAD_COMBINED_MESSAGES_FAILED = 'LOAD_COMBINED_MESSAGES_FAILED';

  static SEND_MESSAGE = 'SEND_MESSAGE';
  static SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
  static SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';

  static LOAD_USER_PROFILE_DATA = 'LOAD_USER_PROFILE_DATA';
  static LOAD_USER_PROFILE_DATA_SUCCESS = 'LOAD_USER_PROFILE_DATA_SUCCESS';
  static LOAD_USER_PROFILE_DATA_FAILED = 'LOAD_USER_PROFILE_DATA_FAILED';

  static LOAD_NON_USER_PROFILE_DATA = 'LOAD_NON_USER_PROFILE_DATA';
  static LOAD_NON_USER_PROFILE_DATA_SUCCESS = 'LOAD_NON_USER_PROFILE_DATA_SUCCESS';
  static LOAD_NON_USER_PROFILE_DATA_FAILED = 'LOAD_NON_USER_PROFILE_DATA_FAILED';

  static LOAD_SEARCHED_NON_USER_PROFILE_DATA = 'LOAD_SEARCHED_NON_USER_PROFILE_DATA';
  static LOAD_SEARCHED_NON_USER_PROFILE_DATA_SUCCESS = 'LOAD_SEARCHED_NON_USER_PROFILE_DATA_SUCCESS';
  static LOAD_SEARCHED_NON_USER_PROFILE_DATA_FAILED = 'LOAD_SEARCHED_NON_USER_PROFILE_DATA_FAILED';

  static LOAD_HANDLE_PROFILE_DATA = 'LOAD_HANDLE_PROFILE_DATA';
  static LOAD_HANDLE_PROFILE_DATA_SUCCESS = 'LOAD_HANDLE_PROFILE_DATA_SUCCESS';
  static LOAD_HANDLE_PROFILE_DATA_FAILED = 'LOAD_HANDLE_PROFILE_DATA_FAILED';

  static MARK_MESSAGES_READ = 'MARK_MESSAGES_READ';
  static MARK_MESSAGES_READ_SUCCESS = 'MARK_MESSAGES_READ_SUCCESS';
  static MARK_MESSAGES_READ_FAILED = 'MARK_MESSAGES_READ_FAILED';

  static SORT_MESSAGES_BY_TIME = 'SORT_MESSAGES_BY_TIME';
  static SORT_MESSAGES_BY_TIME_SUCCESS = 'SORT_MESSAGES_BY_TIME_SUCCESS';
  static SORT_MESSAGES_BY_TIME_FAILED = 'SORT_MESSAGES_BY_TIME_FAILED';

  static GET_RECEIPIENT = 'GET_RECEIPIENT';
  static GET_RECEIPIENT_SUCCESS = 'GET_RECEIPIENT_SUCCESS';
  static GET_RECEIPIENT_FAILED = 'GET_RECEIPIENT_FAILED';

  /* -------------------------------- load COMBINED messages -------------------------------- */
  loadCombinedMessages(value): Action {
    console.log('LOAD_COMBINED_MESSAGES ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_COMBINED_MESSAGES,
      payload: { value }
    };
  }

  loadCombinedMessagesSuccess(value): Action {
    console.log('LOAD_COMBINED_MESSAGES_SUCCESS ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_COMBINED_MESSAGES_SUCCESS,
      payload: { value }
    };
  }

  loadCombinedMessagesFailed(error: any): Action {
    console.log('LOAD_COMBINED_MESSAGES_FAILED ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_COMBINED_MESSAGES_FAILED,
      payload: error
    };
  }
   /* -------------------------------- load COMBINED messages -------------------------------- */


  // /* -------------------------------- load sent messages -------------------------------- */
  // loadSentMessages(value): Action {
  //   console.log('LOAD_SENT_MESSAGES ACTION TRIGGERED');
  //   return {
  //     type: MessageActions.LOAD_SENT_MESSAGES,
  //     payload: { value }
  //   };
  // }

  // loadSentMessagesSuccess(value): Action {
  //   console.log('LOAD_SENT_MESSAGES_SUCCESS ACTION TRIGGERED');
  //   return {
  //     type: MessageActions.LOAD_SENT_MESSAGES_SUCCESS,
  //     payload: { value }
  //   };
  // }

  // loadSentMessagesFailed(error: any): Action {
  //   console.log('LOAD_SENT_MESSAGES_FAILED ACTION TRIGGERED');
  //   return {
  //     type: MessageActions.LOAD_SENT_MESSAGES_FAILED,
  //     payload: error
  //   };
  // }
  // /* -------------------------------- load sent messages -------------------------------- */

  // /* -------------------------------- load received messages -------------------------------- */
  // loadReceivedMessages(value): Action {
  //   console.log('LOAD_RECEIVED_MESSAGES ACTION TRIGGERED');
  //   return {
  //     type: MessageActions.LOAD_RECEIVED_MESSAGES,
  //     payload: { value }
  //   };
  // }

  // loadReceivedMessagesSuccess(value): Action {
  //   console.log('LOAD_RECEIVED_MESSAGES_SUCCESS ACTION TRIGGERED');
  //   return {
  //     type: MessageActions.LOAD_RECEIVED_MESSAGES_SUCCESS,
  //     payload: { value }
  //   };
  // }

  // loadReceivedMessagesFailed(error: any): Action {
  //   console.log('LOAD_RECEIVED_MESSAGES_FAILED ACTION TRIGGERED');
  //   return {
  //     type: MessageActions.LOAD_RECEIVED_MESSAGES_FAILED,
  //     payload: error
  //   };
  // }
  // /* -------------------------------- load received messages -------------------------------- */

  /* -------------------------------- send message -------------------------------- */
  sendMessage(value): Action {
    console.log('SEND_MESSAGE ACTION TRIGGERED');
    return {
      type: MessageActions.SEND_MESSAGE,
      payload: { value }
    };
  }

  sendMessageSuccess(value): Action {
    console.log('SEND_MESSAGE_SUCCESS ACTION TRIGGERED');
    return {
      type: MessageActions.SEND_MESSAGE_SUCCESS,
      payload: { value }
    };
  }

  sendMessageFailed(error: any): Action {
    console.log('SEND_MESSAGE_FAILED ACTION TRIGGERED');
    return {
      type: MessageActions.SEND_MESSAGE_FAILED,
      payload: error
    };
  }
  /* -------------------------------- send message -------------------------------- */

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

  /* -------------------------------- load profile data according to list of handles-------------------------------- */
  loadHandleProfile(value): Action {
    console.log('LOAD_HANDLE_PROFILE_DATA ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_HANDLE_PROFILE_DATA,
      payload: { value }
    };
  }

  loadHandleProfileSuccess(value): Action {
    console.log('LOAD_HANDLE_PROFILE_DATA_SUCCESS ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_HANDLE_PROFILE_DATA_SUCCESS,
      payload: { value }
    };
  }

  loadhandleProfileFailed(error: any): Action {
    console.log('LOAD_HANDLE_PROFILE_DATA_FAILED ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_HANDLE_PROFILE_DATA_FAILED,
      payload: error
    };
  }
  /* -------------------------------- load profile data according to list of handles -------------------------------- */

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

   /* -------------------------------- load searched non user profile data -------------------------------- */
   loadSearchedNonUserProfile(value): Action {
    console.log('LOAD_SEARCHED_NON_USER_PROFILE_DATA ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_SEARCHED_NON_USER_PROFILE_DATA,
      payload: { value }
    };
  }

  loadSearchedNonUserProfileSuccess(value): Action {
    console.log('LOAD_SEARCHED_NON_USER_PROFILE_DATA_SUCCESS ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_SEARCHED_NON_USER_PROFILE_DATA_SUCCESS,
      payload: { value }
    };
  }

  loadSearchedNonUserProfileFailed(error: any): Action {
    console.log('LOAD_SEARCHED_NON_USER_PROFILE_DATA_FAILED ACTION TRIGGERED');
    return {
      type: MessageActions.LOAD_SEARCHED_NON_USER_PROFILE_DATA_FAILED,
      payload: error
    };
  }
  /* -------------------------------- load searched non user profile data -------------------------------- */


  /* -------------------------------- make messages read -------------------------------- */
  markMessagesRead(value): Action {
    console.log('MARK_MESSAGES_READ ACTION TRIGGERED');
    return {
      type: MessageActions.MARK_MESSAGES_READ,
      payload: { value }
    };
  }

  markMessagesReadSuccess(value): Action {
    console.log('MARK_MESSAGES_READ_SUCCESS ACTION TRIGGERED');
    return {
      type: MessageActions.MARK_MESSAGES_READ_SUCCESS,
      payload: { value }
    };
  }

  markMessagesReadFailed(error: any): Action {
    console.log('MARK_MESSAGES_READ_FAILED ACTION TRIGGERED');
    return {
      type: MessageActions.MARK_MESSAGES_READ_FAILED,
      payload: error
    };
  }
  /* -------------------------------- make messages read -------------------------------- */


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
  
}
