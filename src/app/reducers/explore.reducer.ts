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
              return Object.assign({}, state, {
                searching_spotfeeds: false,
                search_complete: true,
                explore_spotfeeds: categorised_spotfeeds
              });
            }
          }
        } else {
          const typeIndex = _.findIndex(state.explore_spotfeeds, { 'industryType': state.search_body.industryType });
          // const newArr = state.explore_spotfeeds[typeIndex].feeds.concat(response[0].feeds);
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

      case ExploreActions.GET_EXPLORE_DATA:
        return Object.assign({}, state, {
          getExploreData: true,
          getExploreDataSuccess: false,
          exploreDataParams: payload
        });

      case ExploreActions.GET_EXPLORE_DATA_SUCCESS:
        let updatedExploreData;
        // update state for pagination
        if (state['exploreDataParams']['scrollId'] !== '') {
          updatedExploreData = state['exploreData'];
          if (state['exploreDataParams']['entityType'] === 'post') {
            updatedExploreData.mediaResponse = [...state['exploreData']['mediaResponse'], ...payload['SUCCESS']['mediaResponse']];
          }
          if (state['exploreDataParams']['entityType'] === 'channel') {
            updatedExploreData.channelResponse = [...state['exploreData']['channelResponse'], ...payload['SUCCESS']['channelResponse']];
          }
          if (state['exploreDataParams']['entityType'] === 'profile') {
            updatedExploreData.profileResponse = [...state['exploreData']['profileResponse'], ...payload['SUCCESS']['profileResponse']];
          }
        } else {
          updatedExploreData = payload['SUCCESS']
        }
        return Object.assign({}, state, {
          getExploreData: false,
          getExploreDataSuccess: true,
          exploreData: updatedExploreData
        });

      case ExploreActions.GET_EXPLORE_DATA_FAILED:
        return Object.assign({}, state, {
          getExploreData: false,
          getExploreDataSuccess: false
        });

      default:
        return state;

    }

}
