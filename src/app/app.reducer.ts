import { AuthReducer } from './reducers/auth.reducer';
import { HomeReducer } from './reducers/home.reducer';
import { SharedReducer } from './reducers/shared.reducer';
import { ProfileReducer } from './reducers/profile.reducer';
import { MessageReducer } from './reducers/messages.reducer';
import { UserSearchReducer } from './reducers/user-search.reducer';
import { MediaReducer } from './reducers/media.reducer';

import { combineReducers, ActionReducer } from '@ngrx/store';
// import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

const reducers = {
  loginTags: AuthReducer,
  profileTags: ProfileReducer,
  userMediaTags: ProfileReducer,
  sentMessagesTags: MessageReducer,
  userSearchTags: UserSearchReducer,
  receivedMessagesTags: MessageReducer,
  mediaStore: MediaReducer
}

const productionReducer = combineReducers(reducers);

export function reducer(state: any, action: any) {
  return productionReducer(state, action);
}
