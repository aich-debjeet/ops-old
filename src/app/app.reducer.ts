import { AuthReducer } from './reducers/auth.reducer';
import { HomeReducer } from './reducers/home.reducer';
import { SharedReducer } from './reducers/shared.reducer';
import { ProfileReducer, State as ProfileState } from './reducers/profile.reducer';
import { MessageReducer } from './reducers/messages.reducer';
import { NotificationReducer } from './reducers/notification.reducer';
import { SearchReducer } from './reducers/search.reducer';
import { UserSearchReducer } from './reducers/user-search.reducer';
import { MediaReducer } from './reducers/media.reducer';
import { OpportunityReducer } from './reducers/opportunity.reducer';
import { ExploreReducer } from './reducers/explore.reducer';
import { EventReducer } from './reducers/event.reducer';
import { ClaimProfileReducer } from './reducers/claim-profile.reducer';

import { combineReducers, ActionReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { environment } from '../environments/environment';
// import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

const reducers = {
  loginTags: AuthReducer,
  mediaStore: MediaReducer,
  searchTags: SearchReducer,
  messageTags: MessageReducer,
  profileTags: ProfileReducer,
  // userMediaTags: ProfileReducer,
  userSearchTags: UserSearchReducer,
  opportunityTags: OpportunityReducer,
  receivedMessagesTags: MessageReducer,
  claimProfileTags: ClaimProfileReducer,
  notificationTags: NotificationReducer,
  exploreTags: ExploreReducer,
  eventTags: EventReducer
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
    if (action.type === 'USER_LOGOUT') {
      state = undefined
    }
    return productionReducer(state, action);
  } else {
    if (action.type === 'USER_LOGOUT') {
      state = undefined
    }
    return developmentReducer(state, action);
  }
}
