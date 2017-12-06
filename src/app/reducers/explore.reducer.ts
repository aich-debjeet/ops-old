import { ActionReducer, Action } from '@ngrx/store';

import { ExploreModel } from '../models/explore.model';
import { ExploreActions } from '../actions/explore.action';
import { concat } from 'rxjs/observable/concat';

export const ExploreReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

    switch (type) {

        case ExploreActions.EXPLORE:
          return Object.assign({}, state, {
            searching_spotfeeds: true,
            search_complete: false,
            search_body: payload
          });

        case ExploreActions.EXPLORE_SUCCESS:
          return Object.assign({}, state, {
            searching_spotfeeds: false,
            search_complete: true,
            spotfeeds: payload
          });

        case ExploreActions.EXPLORE_FAILED:
          return Object.assign({}, state, {
            searching_spotfeeds: false,
            search_complete: true
          });

        default:
          return state;

    }

}
