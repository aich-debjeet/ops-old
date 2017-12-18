import { ActionReducer, Action } from '@ngrx/store';

import { ExploreModel } from '../models/explore.model';
import { ExploreActions } from '../actions/explore.action';
import { concat } from 'rxjs/observable/concat';

import * as _ from 'lodash';

export const ExploreReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

    switch (type) {

        case ExploreActions.LOAD_SPOTFEEDS:
          return Object.assign({}, state, {
            searching_spotfeeds: true,
            search_complete: false,
            search_body: payload
          });

        case ExploreActions.LOAD_SPOTFEEDS_SUCCESS:

          const response = payload.SUCCESS;
          if (response && state && state['search_body']['industryType'] === '') {
            const categorised_spotfeeds = [];
            for (let i = 0, len = response.length; i < len; i++) {
              categorised_spotfeeds.push({
                // [response[i].industry]: response[i].feeds
                industryType: response[i].industry,
                feeds: response[i].feeds
              });
              if (i >= (response.length - 1)) {
                // console.log('finish');
                return Object.assign({}, state, {
                  searching_spotfeeds: false,
                  search_complete: true,
                  explore_spotfeeds: categorised_spotfeeds
                });
              }
            }
          } else {
            // console.log('before load more state', state);
            const typeIndex = _.findIndex(state.explore_spotfeeds, { 'industryType': state.search_body.industryType });
            // const newArr = state.explore_spotfeeds[typeIndex].feeds.concat(response[0].feeds);
            // console.log('new state for type' + state.search_body.industryType, newArr);
            state.explore_spotfeeds[typeIndex].feeds = state.explore_spotfeeds[typeIndex].feeds.concat(response[0].feeds);
            return Object.assign({}, state, {
              searching_spotfeeds: false,
              search_complete: true,
              explore_spotfeeds: state.explore_spotfeeds
            });
          }
          return Object.assign({}, state, {
            searching_spotfeeds: false,
            search_complete: true
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
