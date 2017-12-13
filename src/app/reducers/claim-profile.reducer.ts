import { ActionReducer, Action } from '@ngrx/store';

import { ClaimProfileModel } from '../models/claim-profile.model';
import { ClaimProfileActions } from '../actions/claim-profile.action';

export const ClaimProfileReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

    switch (type) {

        case ClaimProfileActions.SEARCH_PROFILE:
          return Object.assign({}, state, {
            searching_profiles: true,
            search_complete: false,
            search_body: payload
          });

        case ClaimProfileActions.SEARCH_PROFILE_SUCCESS:
          return Object.assign({}, state, {
            searching_profiles: false,
            search_complete: true,
            claim_profiles: payload.STATUS
          });

        case ClaimProfileActions.SEARCH_PROFILE_FAILED:
          return Object.assign({}, state, {
            searching_profiles: false,
            search_complete: true
          });

        default:
          return state;

    }

}
