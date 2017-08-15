import { AuthReducer } from './reducers/auth.reducer';
import { HomeReducer } from './reducers/home.reducer';
import { SharedReducer } from './reducers/shared.reducer';
import { ProfileReducer } from './reducers/profile.reducer';
import { MessageReducer } from './reducers/messages.reducer';
import { UserSearchReducer } from './reducers/user-search.reducer';

import { combineReducers, ActionReducer } from '@ngrx/store';

const reducers = {
  loginTags: AuthReducer,
  profileTags: ProfileReducer,
  userMediaTags: ProfileReducer,
  sentMessagesTags: MessageReducer,
  userSearchTags: UserSearchReducer,
  receivedMessagesTags: MessageReducer
}
/**
 *
 *
 * @export
 * @param {*} state
 * @param {*} action
 * @returns
 */
export function reducer() {
  return reducers;
}
