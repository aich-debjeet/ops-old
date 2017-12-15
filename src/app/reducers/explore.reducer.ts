import { ActionReducer, Action } from '@ngrx/store';

import { ExploreModel } from '../models/explore.model';
import { ExploreActions } from '../actions/explore.action';
import { concat } from 'rxjs/observable/concat';

export const ExploreReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

    switch (type) {

        case ExploreActions.LOAD_SPOTFEEDS:
          return Object.assign({}, state, {
            searching_spotfeeds: true,
            search_complete: false,
            search_body: payload
          });

        case ExploreActions.LOAD_SPOTFEEDS_SUCCESS:

          const spotfeed_categories = [];
          const response = payload.SUCCESS;
          if (response) {
            for (let i = 0, len = response.length; i < len; i++) {
              spotfeed_categories.push({
                // [response[i].industry]: response[i].feeds
                industryType: response[i].industry,
                feeds: response[i].feeds
              });
              if (i >= (response.length - 1)) {
                // console.log('finish');
                return Object.assign({}, state, {
                  searching_spotfeeds: false,
                  search_complete: true,
                  explore_spotfeeds: spotfeed_categories
                });
              }
            }
          }
          return Object.assign({}, state, {
            searching_spotfeeds: false,
            search_complete: true,
            explore_spotfeeds: spotfeed_categories
          });

        case ExploreActions.LOAD_SPOTFEEDS_FAILED:
          return Object.assign({}, state, {
            searching_spotfeeds: false,
            search_complete: true
          });

        default:
          return state;

    }

}
