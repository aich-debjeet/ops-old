import { ActionReducer, Action } from '@ngrx/store';

import { OpportunityModel } from '../models/opportunity.model';
import { OpportunityActions } from '../actions/opportunity.action';
import { concat } from 'rxjs/observable/concat';
import { GeneralUtilities } from './../helpers/general.utils';

const generalUtils = new GeneralUtilities;

export const OpportunityReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    case OpportunityActions.OPPORTUNITY_BOOKAMRK_FLAG_UPDATE:
      return Object.assign({}, state, {
        get_opportunity_data: {
          ...state.get_opportunity_data,
          isBookmarked: payload.isBookmarked
        }
      });

    /* get opportunity collabs */
    case OpportunityActions.GET_OPPORTUNITY_COLLABORATORS:
      return Object.assign({}, state, {
        getOppCollabs: true,
        getOppCollabsParams: payload,
        getOppCollabsData: undefined,
        getOppCollabsSuccess: false
      });

    case OpportunityActions.GET_OPPORTUNITY_COLLABORATORS_SUCCESS:
      return Object.assign({}, state, {
        getOppCollabs: false,
        getOppCollabsData: payload['SUCCESS'],
        getOppCollabsSuccess: true
      });

    case OpportunityActions.GET_OPPORTUNITY_COLLABORATORS_FAILED:
      return Object.assign({}, state, {
        getOppCollabs: false,
        getOppCollabsSuccess: false
      });
    /* get opportunity collabs */

    /* search opportunities */
    case OpportunityActions.GET_SIMILAR_OPPORTUNITIES:
      return Object.assign({}, state, {
        getSimilarOppsLoading: true,
        getSimilarOppsSuccess: false,
        getSimilarOppsParams: payload
      });

    case OpportunityActions.GET_SIMILAR_OPPORTUNITIES_SUCCESS:
      return Object.assign({}, state, {
        getSimilarOppsLoading: false,
        getSimilarOppsSuccess: true,
        getSimilarOppsResult: payload['SUCCESS']['opportunityResponse']
      });

    case OpportunityActions.GET_SIMILAR_OPPORTUNITIES_FAILED:
      return Object.assign({}, state, {
        getSimilarOppsParams: false,
        getSimilarOppsSuccess: false
      });
    /* search opportunities */

    /* remove application by id */
    case OpportunityActions.CANCEL_APPLICATION:
      return Object.assign({}, state, {
        cancel_application: true,
        cancel_application_params: payload,
        cancel_application_success: false,
      });

    case OpportunityActions.CANCEL_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        cancel_application: false,
        cancel_application_success: true,
        cancel_application_result: payload
      });

    case OpportunityActions.CANCEL_APPLICATION_FAILED:
      return Object.assign({}, state, {
        cancel_application: false,
        cancel_application_success: false,
      });
    /* remove application by id */

    /* remove application by id */
    case OpportunityActions.REMOVE_APPLICATION:
      return Object.assign({}, state, {
        remove_application: true,
        remove_application_params: payload,
        remove_application_success: false,
      });

    case OpportunityActions.REMOVE_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        remove_application: false,
        remove_application_success: true,
        remove_application_result: payload
      });

    case OpportunityActions.REMOVE_APPLICATION_FAILED:
      return Object.assign({}, state, {
        remove_application: false,
        remove_application_success: false,
      });
    /* remove application by id */

    /* load opportunities by id */
    case OpportunityActions.GET_APPLICATIONS:
      return Object.assign({}, state, {
        get_applications: true,
        get_applications_params: payload,
        get_applications_success: false,
      });

    case OpportunityActions.GET_APPLICATIONS_SUCCESS:
      return Object.assign({}, state, {
        get_applications: false,
        get_applications_result: payload['SUCCESS'],
        get_applications_success: true,
      });

    case OpportunityActions.GET_APPLICATIONS_FAILED:
      return Object.assign({}, state, {
        get_applications: false,
        get_applications_success: false,
      });
    /* load opportunities by id */

    /* search opportunities */
    case OpportunityActions.SEARCH_OPPORTUNITIES:
      let updated_opps;
      if (state) {
        if (generalUtils.checkNestedKey(state, ['search_opportunities_params', 'searchType'])
          && state['search_opportunities_params']['searchType'] !== payload['searchType']
          && state['search_opportunities_result']
        ) {
          updated_opps = state['search_opportunities_result'];
          updated_opps['opportunityResponse'] = [];
        } else {
          if (state['search_opportunities_result']) {
            updated_opps = state['search_opportunities_result'];
          }
        }
      }
      return Object.assign({}, state, {
        searching_opportunities: true,
        search_opportunities_result: updated_opps,
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
      const viewOppData = state['get_opportunity_data'];
      viewOppData['isApplied'] = true;
      return Object.assign({}, state, {
        get_opportunity_data: viewOppData,
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
        create_opportunity_success: true,
        fileupload_response: []
      });

    case OpportunityActions.CREATE_OPPORTUNITY_FAILED:
      return Object.assign({}, state, {
        creating_opportunity: false,
        create_opportunity_success: false
      });
    /* create opportunity */

    /* update opportunity */
    case OpportunityActions.UPDATE_OPPORTUNITY:
      return Object.assign({}, state, {
        updating_opportunity: true,
        update_opportunity_params: payload,
        update_opportunity_response: undefined,
        update_opportunity_success: false
      });

    case OpportunityActions.UPDATE_OPPORTUNITY_SUCCESS:
      return Object.assign({}, state, {
        updating_opportunity: false,
        update_opportunity_response: payload.SUCCESS,
        update_opportunity_success: true
      });

    case OpportunityActions.UPDATE_OPPORTUNITY_FAILED:
      return Object.assign({}, state, {
        updating_opportunity: false,
        update_opportunity_success: false
      });
    /* update opportunity */

    /* create opportunity file upload */
    case OpportunityActions.OPPORTUNITY_FILE_UPLOAD:
      return Object.assign({}, state, {
        fileuploading: true,
        fileupload_success: false
      });

    case OpportunityActions.OPPORTUNITY_FILE_UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        fileuploading: false,
        fileupload_success: true,
        fileupload_response: payload['SUCCESS']
      });

    case OpportunityActions.OPPORTUNITY_FILE_UPLOAD_FAILED:
      return Object.assign({}, state, {
        fileuploading: false,
        fileupload_success: false
      });
    /* create opportunity file upload */

    case OpportunityActions.OPPORTUNITY_FORM_REMOVE_ATTACHMENTS:
      return Object.assign({}, state, {
        fileupload_response: []
      });

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
