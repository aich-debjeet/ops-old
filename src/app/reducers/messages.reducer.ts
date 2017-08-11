import { ActionReducer, Action } from '@ngrx/store';
import { Message } from '../models/message.model';

import { MessageActions } from '../actions/message.action';


export const MessageReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    case MessageActions.LOAD_MESSAGES:
      console.log('loading channels');
      console.log(payload);
      return Object.assign({}, state, {
        success: true
      });

    case MessageActions.LOAD_MESSAGES_SUCCESS:
      console.log('loading channels success');
      console.log(payload);
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case MessageActions.LOAD_MESSAGES_FAILED:
      console.log('loading channels failed');
      return Object.assign({}, state, {
        success: false
      });

    default:
      return state;

  }

}
