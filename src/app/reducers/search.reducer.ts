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
      // update state for pagination
      // let data_payload;
      // if (state.search_all_params.offset === 0) {
      //   data_payload = payload;
      // } else {
      //   data_payload = [...state.search_all_data, ...payload];
      // }
      return Object.assign({}, state, {
        searching_all: false,
        // search_all_data: data_payload,
        search_all_data: payload,
        search_all_success: true
      });

    case SearchActions.SEARCH_ALL_FAILED:
      return Object.assign({}, state, {
        searching_all: false,
        search_all_success: false
      });
    /* search all reducers */

    // /* search people reducers */
    // case SearchActions.SEARCH_PEOPLE:
    //   return Object.assign({}, state, {
    //     searching_people: true,
    //     search_people_params: payload,
    //     search_people_success: false
    //   });

    // case SearchActions.SEARCH_PEOPLE_SUCCESS:
    //   // update state for pagination
    //   let people_payload;
    //   if (state.search_people_params.offset === 0) {
    //     people_payload = payload;
    //   } else {
    //     people_payload = [...state.search_people_data, ...payload];
    //   }
    //   return Object.assign({}, state, {
    //     searching_people: false,
    //     search_people_data: people_payload,
    //     search_people_success: true
    //   });

    // case SearchActions.SEARCH_PEOPLE_FAILED:
    //   return Object.assign({}, state, {
    //     searching_people: false,
    //     search_people_success: false
    //   });
    // /* search people reducers */

    // /* search post reducers */
    // case SearchActions.SEARCH_POST:
    //   return Object.assign({}, state, {
    //     searching_post: true,
    //     search_post_params: payload,
    //     search_post_success: false
    //   });

    // case SearchActions.SEARCH_POST_SUCCESS:
    //   // update state for pagination
    //   let post_payload;
    //   if (state.search_post_params.offset === 0) {
    //     post_payload = payload;
    //   } else {
    //     post_payload = [...state.search_post_data, ...payload];
    //   }
    //   return Object.assign({}, state, {
    //     searching_post: false,
    //     search_post_data: post_payload,
    //     search_post_success: true
    //   });

    // case SearchActions.SEARCH_POST_FAILED:
    //   return Object.assign({}, state, {
    //     searching_post: false,
    //     search_post_success: false
    //   });
    // /* search post reducers */

    // /* search channel reducers */
    // case SearchActions.SEARCH_CHANNEL:
    //   return Object.assign({}, state, {
    //     searching_channel: true,
    //     search_channel_params: payload,
    //     search_channel_success: false
    //   });

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

    // case SearchActions.SEARCH_CHANNEL_FAILED:
    //   return Object.assign({}, state, {
    //     searching_channel: false,
    //     search_channel_success: false
    //   });
    // /* search channel reducers */

    default:
      return state;

  }

}
