import { ActionReducer, Action } from '@ngrx/store';

import { OpportunityModel } from '../models/opportunity.model';
import { OpportunityActions } from '../actions/opportunity.action';

export const OpportunityReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    /* create opportunity */
    case OpportunityActions.CREATE_OPPORTUNITY:
      return Object.assign({}, state, {
        creating_opportunity: true,
        create_opportunity_params: payload,
        create_opportunity_success: false
      });

    case OpportunityActions.CREATE_OPPORTUNITY_SUCCESS:
      return Object.assign({}, state, {
        creating_opportunity: false,
        create_opportunity_data: payload,
        create_opportunity_success: true
      });

    case OpportunityActions.CREATE_OPPORTUNITY_FAILED:
      return Object.assign({}, state, {
        creating_opportunity: false,
        create_opportunity_success: false
      });
    /* create opportunity */



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



    /* get opportunity */
    case OpportunityActions.GET_OPPORTUNITY:
      return Object.assign({}, state, {
        getting_opportunity: true,
        get_opportunity_params: payload,
        get_opportunity_success: false
      });

    case OpportunityActions.GET_OPPORTUNITY_SUCCESS:
      return Object.assign({}, state, {
        getting_opportunity: false,
        get_opportunity_data: payload,
        get_opportunity_success: true
      });

    case OpportunityActions.GET_OPPORTUNITY_FAILED:
      return Object.assign({}, state, {
        getting_opportunity: false,
        get_opportunity_success: false
      });
    /* get opportunity */

    default:
      return state;

  }

}
