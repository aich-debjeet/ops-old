import { ActionReducer, Action } from '@ngrx/store';

import { OpportunityModel } from '../models/opportunity.model';
import { OpportunityActions } from '../actions/opportunity.action';

export const SearchReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    /* search opportunities */
    case OpportunityActions.SEARCH_OPPORTUNITIES:
      return Object.assign({}, state, {
        searching_opportunities: true,
        search_opportunities_params: payload,
        search_opportunities_success: false
      });

    case OpportunityActions.SEARCH_OPPORTUNITIES_SUCCESS:
      // update state for pagination
      let opportunity_payload;
      if (state.search_opportunities_params.offset === 0) {
        opportunity_payload = payload;
      } else {
        opportunity_payload = [...state.search_opportunities_data, ...payload];
      }
      return Object.assign({}, state, {
        searching_opportunities: false,
        search_opportunities_data: opportunity_payload,
        search_opportunities_success: true
      });

    case OpportunityActions.SEARCH_OPPORTUNITIES_FAILED:
      return Object.assign({}, state, {
        searching_opportunities: false,
        search_opportunities_success: false
      });
    /* search opportunities */

    default:
      return state;

  }

}
