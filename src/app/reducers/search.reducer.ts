import { ActionReducer, Action } from '@ngrx/store';

import { SearchModel } from '../models/search.model';
import { SearchActions } from '../actions/search.action';

export const SearchReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    /* search all reducers */
    case SearchActions.SEARCH_ALL:
      return Object.assign({}, state, {
        searching_all: true,
        search_all_params: payload,
        search_all_success: false
      });

    case SearchActions.SEARCH_ALL_SUCCESS:
      /* preparing filter list */
      let searchFilters;
      if (payload.filterList) {
        searchFilters = payload.filterList;
        // deleting filter listing from response payload
        delete payload.filterList;
      }
      return Object.assign({}, state, {
        searching_all: false,
        search_all_data: payload,
        search_filters: searchFilters, // adding filter listing to the global state
        search_all_success: true
      });
      /* preparing filter list */

    case SearchActions.SEARCH_ALL_FAILED:
      return Object.assign({}, state, {
        searching_all: false,
        search_all_success: false
      });
    /* search all reducers */

    /* search people reducers */
    case SearchActions.SEARCH_PEOPLE:
      return Object.assign({}, state, {
        searching_people: true,
        search_people_params: payload,
        search_people_success: false
      });

    case SearchActions.SEARCH_PEOPLE_SUCCESS:
      // // update state for pagination
      let people_data;
      if (state.search_people_params && state.search_people_params.searchText) {
        people_data = payload.profileResponse;
      } else {
        people_data = [...state.search_people_data.profileResponse, ...payload.profileResponse];
      }
      return Object.assign({}, state, {
        searching_people: false,
        search_people_data: {
          scrollId: payload.scrollId,
          total: payload.total,
          profileResponse: people_data
        },
        // search_people_data: payload,
        search_people_success: true
      });

    case SearchActions.SEARCH_PEOPLE_FAILED:
      return Object.assign({}, state, {
        searching_people: false,
        search_people_success: false
      });
    /* search people reducers */

    /* search post reducers */
    case SearchActions.SEARCH_POST:
      return Object.assign({}, state, {
        searching_post: true,
        search_post_params: payload,
        search_post_success: false
      });

    case SearchActions.SEARCH_POST_SUCCESS:
      // // update state for pagination
      let post_data;
      if (state.search_post_params && state.search_post_params.searchText) {
        post_data = payload.mediaResponse;
      } else {
        post_data = [...state.search_post_data.mediaResponse, ...payload.mediaResponse];
      }
      return Object.assign({}, state, {
        searching_post: false,
        search_post_data: {
          scrollId: payload.scrollId,
          total: payload.total,
          mediaResponse: post_data
        },
        // search_post_data: payload,
        search_post_success: true
      });

    case SearchActions.SEARCH_POST_FAILED:
      return Object.assign({}, state, {
        searching_post: false,
        search_post_success: false
      });
    /* search post reducers */

    /* search channel reducers */
    case SearchActions.SEARCH_CHANNEL:
      return Object.assign({}, state, {
        searching_channel: true,
        search_channel_params: payload,
        search_channel_success: false
      });

    // case SearchActions.SEARCH_CHANNEL_SUCCESS:
    //   // update state for pagination
    //   let channel_payload;
    //   if (state.search_channel_params.offset === 0) {
    //     channel_payload = payload;
    //   } else {
    //     channel_payload = [...state.search_channel_data, ...payload];
    //   }
    //   return Object.assign({}, state, {
    //     searching_channel: false,
    //     search_channel_data: channel_payload,
    //     search_channel_success: true
    //   });

    case SearchActions.SEARCH_CHANNEL_SUCCESS:
      // // update state for pagination
      let channel_data;
      if (state.search_channel_params && state.search_channel_params.searchText) {
        channel_data = payload.spotFeedResponse;
      } else {
        channel_data = [...state.search_channel_data.spotFeedResponse, ...payload.spotFeedResponse];
      }
      return Object.assign({}, state, {
        searching_channel: false,
        search_channel_data: {
          scrollId: payload.scrollId,
          total: payload.total,
          spotFeedResponse: channel_data
        },
        // search_channel_data: payload,
        search_channel_success: true
      });

    case SearchActions.SEARCH_CHANNEL_FAILED:
      return Object.assign({}, state, {
        searching_channel: false,
        search_channel_success: false
      });
    /* search channel reducers */

    /* search opportunity reducers */
    case SearchActions.SEARCH_OPPORTUNITY:
      return Object.assign({}, state, {
        searching_opportunity: true,
        search_opportunity_params: payload,
        search_opportunity_success: false
      });

    case SearchActions.SEARCH_OPPORTUNITY_SUCCESS:
      if (payload['SUCCESS']) {
        const oppsSearchData = payload['SUCCESS'];
        // // update state for pagination
        let opportunity_data;
        if (state.search_opportunity_params && state.search_opportunity_params.searchText) {
          opportunity_data = oppsSearchData.opportunityResponse;
        } else {
          opportunity_data = [...state.search_opportunity_data.opportunityResponse, ...oppsSearchData.opportunityResponse];
        }
        return Object.assign({}, state, {
          searching_opportunity: false,
          search_opportunity_data: {
            scrollId: oppsSearchData.scrollId,
            // total: oppsSearchData.total,
            opportunityResponse: opportunity_data
          },
          search_opportunity_success: true
        });
      } else {
        return state;
      }

    case SearchActions.SEARCH_OPPORTUNITY_FAILED:
      return Object.assign({}, state, {
        searching_opportunity: false,
        search_opportunity_success: false
      });
    /* search opportunity reducers */

    default:
      return state;

  }

}
