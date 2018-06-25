import { ActionReducer, Action } from '@ngrx/store';

import { OpportunityModel } from '../models/opportunity.model';
import { OpportunityActions } from '../actions/opportunity.action';
import { concat } from 'rxjs/observable/concat';

export const OpportunityReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    /* search opportunities */
    case OpportunityActions.SEARCH_OPPORTUNITIES:
      return Object.assign({}, state, {
        searching_opportunities: true,
        search_opportunities_params: payload,
        search_opportunities_success: false,
        delete_opp_requested: false,
        delete_opp_success: false,
        delete_opp_id: ''
      });

    case OpportunityActions.SEARCH_OPPORTUNITIES_SUCCESS:
      let updated_result;
      // update state for pagination
      if (state['search_opportunities_params']['scrollId'] !== '') {
        updated_result = state['search_opportunities_result'];
        updated_result.opportunityResponse = [...state['search_opportunities_result']['opportunityResponse'], ...payload['SUCCESS']['opportunityResponse']];
        // updated_result.filterList = payload['SUCCESS']['filterList'];
        // updated_result.scrollId = payload['SUCCESS']['scrollId'];
        // updated_result.total = payload['SUCCESS']['total'];
      } else {
        updated_result = payload['SUCCESS']
      }
      return Object.assign({}, state, {
        searching_opportunities: false,
        search_opportunities_result: updated_result,
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
        get_opportunity_data: undefined,
        get_opportunity_success: false,
        delete_opp_requested: false,
        delete_opp_success: false,
        delete_opp_id: ''
      });

    case OpportunityActions.GET_OPPORTUNITY_SUCCESS:
      return Object.assign({}, state, {
        getting_opportunity: false,
        get_opportunity_data: payload.SUCCESS,
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

    /* create opportunity */
    case OpportunityActions.CREATE_OPPORTUNITY:
      return Object.assign({}, state, {
        creating_opportunity: true,
        create_opportunity_params: payload,
        create_opportunity_response: undefined,
        create_opportunity_success: false
      });

    case OpportunityActions.CREATE_OPPORTUNITY_SUCCESS:
      return Object.assign({}, state, {
        creating_opportunity: false,
        create_opportunity_response: payload.SUCCESS,
        create_opportunity_success: true
      });

    case OpportunityActions.CREATE_OPPORTUNITY_FAILED:
      return Object.assign({}, state, {
        creating_opportunity: false,
        create_opportunity_success: false
      });
    /* create opportunity */

    /* create opportunity file upload */
    case OpportunityActions.FILE_UPLOAD:
      return Object.assign({}, state, {
        fileuploading: true,
        fileupload_success: false
      });

    case OpportunityActions.FILE_UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        fileuploading: false,
        fileupload_success: true,
        fileupload_response: payload['SUCCESS']
      });

    case OpportunityActions.FILE_UPLOAD_FAILED:
      return Object.assign({}, state, {
        fileuploading: false,
        fileupload_success: false
      });
    /* create opportunity file upload */

    /* delete opp by id */
    case OpportunityActions.DELETE_OPPORTUNITY:
      return Object.assign({}, state, {
        delete_opp_id: payload,
        delete_opp_requested: true,
        delete_opp_success: false
      });

    case OpportunityActions.DELETE_OPPORTUNITY_SUCCESS:
      return Object.assign({}, state, {
        delete_opp_requested: false,
        delete_opp_success: true
      });

    case OpportunityActions.DELETE_OPPORTUNITY_FAILED:
      return Object.assign({}, state, {
        delete_opp_requested: false,
        delete_opp_success: false,
        delete_opp_response: payload
      });
    /* delete opp by id */

    /**
     * opportunity report
    */
   case OpportunityActions.OPPORTUNITY_REPORT:
    // console.log(payload)
    return Object.assign({}, state, {
      reports:[]
    });
   case OpportunityActions.OPPORTUNITY_REPORT_SUCCESS:
    // console.log(payload)
    return Object.assign({}, state, {
      reports: payload.Success.questions
    });
   case OpportunityActions.OPPORTUNITY_REPORT_FAILED:
    return Object.assign({}, state, {
      reports:[]
    });



    // /* get opportunities by filter */
    // case OpportunityActions.GET_OPPORTUNITIES:
    //   return Object.assign({}, state, {
    //     getting_opportunities: true,
    //     get_opportunities_params: payload,
    //     get_opportunities_success: false
    //   });

    // case OpportunityActions.GET_OPPORTUNITIES_SUCCESS:
    //   return Object.assign({}, state, {
    //     getting_opportunities: false,
    //     get_opportunities_data: payload,
    //     get_opportunities_success: true
    //   });

    // case OpportunityActions.GET_OPPORTUNITIES_FAILED:
    //   return Object.assign({}, state, {
    //     getting_opportunities: false,
    //     get_opportunities_success: false
    //   });
    // /* get opportunities by filter */


    // /* get opportunities by filter (applied) */
    // case OpportunityActions.GET_APPLIED_OPPORTUNITIES:
    //   return Object.assign({}, state, {
    //     getting_opportunities: true,
    //     get_opportunities_params: payload,
    //     get_opportunities_success: false
    //   });

    // case OpportunityActions.GET_APPLIED_OPPORTUNITIES_SUCCESS:
    //   return Object.assign({}, state, {
    //     getting_opportunities: false,
    //     get_opportunities_data: payload,
    //     get_opportunities_success: true
    //   });

    // case OpportunityActions.GET_APPLIED_OPPORTUNITIES_FAILED:
    //   return Object.assign({}, state, {
    //     getting_opportunities: false,
    //     get_opportunities_success: false
    //   });
    // /* get opportunities by filter (applied) */



    // /* get opportunity type count */
    // case OpportunityActions.GET_OPPORTUNITY_TYPE_COUNT:
    //   return Object.assign({}, state, {
    //     getting_opportunity_type_count: true,
    //     get_opportunity_type_params: payload,
    //     get_opportunity_type_success: false
    //   });

    // case OpportunityActions.GET_OPPORTUNITY_TYPE_COUNT_SUCCESS:
    //   return Object.assign({}, state, {
    //     getting_opportunity_type_count: false,
    //     get_opportunity_type_data: payload,
    //     get_opportunity_type_success: true
    //   });

    // case OpportunityActions.GET_OPPORTUNITY_TYPE_COUNT_FAILED:
    //   return Object.assign({}, state, {
    //     getting_opportunity_type_count: false,
    //     get_opportunity_type_success: false
    //   });
    // /* get opportunity type count */

    default:
      return state;

  }

}
