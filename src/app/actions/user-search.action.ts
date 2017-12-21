import { Action } from '@ngrx/store';

export class UserSearchActions {

  static USER_SEARCH = 'USER_SEARCH';
  static USER_SEARCH_SUCCESS = 'USER_SEARCH_SUCCESS';
  static USER_SEARCH_FAILED = 'USER_SEARCH_FAILED';

  /* -------------------------------- load sent messages -------------------------------- */
  userSearch(value): Action {
    return {
      type: UserSearchActions.USER_SEARCH,
      payload: { value }
    };
  }

  userSearchSuccess(value): Action {
    return {
      type: UserSearchActions.USER_SEARCH_SUCCESS,
      payload: { value }
    };
  }

  userSearchFailed(error: any): Action {
    return {
      type: UserSearchActions.USER_SEARCH_FAILED,
      payload: error
    };
  }
  /* -------------------------------- load sent messages -------------------------------- */

}
