import { ActionReducer, Action } from '@ngrx/store';
import { UserSearchActions } from '../actions/user-search.action';

export const UserSearchReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    case UserSearchActions.USER_SEARCH:
      return Object.assign({}, state, {
        success: true
      });

    case UserSearchActions.USER_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case UserSearchActions.USER_SEARCH_FAILED:
      return Object.assign({}, state, {
        success: false
      });

    case UserSearchActions.MESSAGE_USER_SEARCH:
      console.log('UserSearchActions.MESSAGE_USER_SEARCH');
      return Object.assign({}, state, {
        message_searching_user: true,
        message_search_user_query: payload
      });

    case UserSearchActions.MESSAGE_USER_SEARCH_SUCCESS:
      console.log('UserSearchActions.MESSAGE_USER_SEARCH_SUCCESS');
      return Object.assign({}, state, {
        message_search_user_data: payload,
        message_searching_user: false,
        message_search_success: true
      });

    case UserSearchActions.MESSAGE_USER_SEARCH_FAILED:
      console.log('UserSearchActions.MESSAGE_USER_SEARCH_FAILED');
      return Object.assign({}, state, {
        message_searching_user: false,
        message_search_success: false
      });

    default:
      return state;

  }

}
