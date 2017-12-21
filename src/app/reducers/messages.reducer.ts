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
