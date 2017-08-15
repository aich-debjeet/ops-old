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

    default:
      return state;

  }

}
