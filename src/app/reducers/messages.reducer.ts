import { action } from 'aws-sdk/clients/sns';
import { ActionReducer, Action } from '@ngrx/store';
import { MessageModal, initialMessage } from '../models/message.model';
import { unionBy as _unionBy } from 'lodash';
import { MessageActions } from '../actions/message.action';


export const MessageReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

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

    default:
    return state;
  }
}
