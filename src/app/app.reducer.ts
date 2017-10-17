import { AuthReducer } from './reducers/auth.reducer';
import { HomeReducer } from './reducers/home.reducer';
import { SharedReducer } from './reducers/shared.reducer';
import { ProfileReducer, State as ProfileState } from './reducers/profile.reducer';
import { MessageReducer } from './reducers/messages.reducer';
import { NotificationReducer } from './reducers/notification.reducer';
import { UserSearchReducer } from './reducers/user-search.reducer';
import { MediaReducer } from './reducers/media.reducer';

import { combineReducers, ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { environment } from '../environments/environment';
// import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

const reducers = {
  loginTags: AuthReducer,
  profileTags: ProfileReducer,
  userMediaTags: ProfileReducer,
  messageTags: MessageReducer,
  userSearchTags: UserSearchReducer,
  mediaStore: MediaReducer,
  notificationTags: NotificationReducer
}

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface State {
  profile: ProfileState
}

const productionReducer = combineReducers(reducers);
const developmentReducer = combineReducers(reducers);
// const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
// const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

// export function reducer(state: any, action: any) {
//   return productionReducer(state, action);
// }

// export const getMyChannel = (state: State) => state.profile.user_channel;
// export const getMyProfile = (state: State) => state.profile.profileUser;
