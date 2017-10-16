import { ActionReducer, Action } from '@ngrx/store';

import { SearchModel } from '../models/search.model';
import { SearchActions } from '../actions/search.action';

export const NotificationReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    case SearchActions.SEARCH_PEOPLE:
      return Object.assign({}, state, {
        search_people_success: false
      });

    case SearchActions.SEARCH_PEOPLE_SUCCESS:
      return Object.assign({}, state, {
        search_people: payload,
        search_people_success: true
      });

    case SearchActions.SEARCH_PEOPLE_FAILED:
      return Object.assign({}, state, {
        search_people_success: false
      });

    default:
      return state;

  }

}
