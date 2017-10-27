import { ActionReducer, Action } from '@ngrx/store';

import { SearchModel } from '../models/search.model';
import { SearchActions } from '../actions/search.action';

export const SearchReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    /* search people reducers */
    case SearchActions.SEARCH_PEOPLE:
      return Object.assign({}, state, {
        searching_people: true,
        search_query: payload,
        search_people_success: false
      });

    case SearchActions.SEARCH_PEOPLE_SUCCESS:
      return Object.assign({}, state, {
        searching_people: false,
        search_people: payload,
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
        search_query: payload,
        search_post_success: false
      });

    case SearchActions.SEARCH_POST_SUCCESS:
      return Object.assign({}, state, {
        searching_post: false,
        search_post: payload,
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
        search_query: payload,
        search_channel_success: false
      });

    case SearchActions.SEARCH_CHANNEL_SUCCESS:
      return Object.assign({}, state, {
        searching_channel: false,
        search_channel: payload,
        search_channel_success: true
      });

    case SearchActions.SEARCH_CHANNEL_FAILED:
      return Object.assign({}, state, {
        searching_channel: false,
        search_channel_success: false
      });
    /* search channel reducers */

    default:
      return state;

  }

}
