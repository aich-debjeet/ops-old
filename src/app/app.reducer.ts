import { AuthReducer } from './reducers/auth.reducer';
import { HomeReducer } from './reducers/home.reducer';
import { SharedReducer } from './reducers/shared.reducer';
import { ProfileReducer, State as ProfileState } from './reducers/profile.reducer';
import { MessageReducer } from './reducers/messages.reducer';
import { NotificationReducer } from './reducers/notification.reducer';
import { SearchReducer } from './reducers/search.reducer';
import { UserSearchReducer } from './reducers/user-search.reducer';
import { MediaReducer } from './reducers/media.reducer';
import { OrganizationReducer } from './reducers/organization.reducer';

import { combineReducers, ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { environment } from '../environments/environment';
// import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

const reducers = {
  loginTags: AuthReducer,
  mediaStore: MediaReducer,
  searchTags: SearchReducer,
  profileTags: ProfileReducer,
  userMediaTags: ProfileReducer,
  messageTags: MessageReducer,
  userSearchTags: UserSearchReducer,
  receivedMessagesTags: MessageReducer,
  notificationTags: NotificationReducer,
  organizationTags: OrganizationReducer,
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
