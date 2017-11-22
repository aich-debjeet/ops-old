import { ActionReducer, Action } from '@ngrx/store';

import { OpportunityModel } from '../models/opportunity.model';
import { OpportunityActions } from '../actions/opportunity.action';
import { concat } from 'rxjs/observable/concat';

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
      // let opportunity_payload;
      // if (state.search_opportunities_params.offset === 0) {
      //   opportunity_payload = payload;
      // } else {
      //   opportunity_payload = [...state.search_opportunities_data, ...payload];
      // }
      return Object.assign({}, state, {
        searching_opportunities: false,
        search_opportunities_data: payload,
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



    /* apply for an opportunity */
    case OpportunityActions.APPLY_FOR_AN_OPPORTUNITY:
      return Object.assign({}, state, {
        applying_for_an_opportunity: true,
        apply_for_an_opportunity_params: payload,
        apply_for_an_opportunity_success: false
      });

    case OpportunityActions.APPLY_FOR_AN_OPPORTUNITY_SUCCESS:
      return Object.assign({}, state, {
        applying_for_an_opportunity: false,
        apply_for_an_opportunity_data: payload,
        apply_for_an_opportunity_success: true
      });

    case OpportunityActions.APPLY_FOR_AN_OPPORTUNITY_FAILED:
      return Object.assign({}, state, {
        applying_for_an_opportunity: false,
        apply_for_an_opportunity_success: false
      });
    /* apply for an opportunity */



    /* get opportunity type count */
    case OpportunityActions.GET_OPPORTUNITY_TYPE_COUNT:
      return Object.assign({}, state, {
        getting_opportunity_type_count: true,
        get_opportunity_type_params: payload,
        get_opportunity_type_success: false
      });

    case OpportunityActions.GET_OPPORTUNITY_TYPE_COUNT_SUCCESS:
      return Object.assign({}, state, {
        getting_opportunity_type_count: false,
        get_opportunity_type_data: payload,
        get_opportunity_type_success: true
      });

    case OpportunityActions.GET_OPPORTUNITY_TYPE_COUNT_FAILED:
      return Object.assign({}, state, {
        getting_opportunity_type_count: false,
        get_opportunity_type_success: false
      });
    /* get opportunity type count */

    default:
      return state;

  }

}
