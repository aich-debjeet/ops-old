import { ActionReducer, Action } from '@ngrx/store';
import { Channel } from '../models/home.model';

import { SharedActions } from '../actions/shared.action';


export const SharedReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    /* pinning channel */
    case SharedActions.PIN_CHANNEL:
      return Object.assign({}, state, {
        success: true
      });

    case SharedActions.PIN_CHANNEL_SUCCESS:
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case SharedActions.PIN_CHANNEL_FAILED:
      return Object.assign({}, state, {
        success: false
      });
    /* pinning channel */


    /* unpinning channel */
    case SharedActions.UNPIN_CHANNEL:
      return Object.assign({}, state, {
        success: true
      });

    case SharedActions.UNPIN_CHANNEL_SUCCESS:
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case SharedActions.UNPIN_CHANNEL_FAILED:
      return Object.assign({}, state, {
        success: false
      });
    /* unpinning channel */

    /**
     * reducer to manage state on submiting selected option for reporting
     */
    case SharedActions.POST_SELECTED_OPTION:
    return Object.assign({}, state, {
      report_success:'',
      report_failed:'',
      rep_success: false
    });

    case SharedActions.POST_SELECTED_OPTION_SUCCESS:
      return Object.assign({}, state, {
        report_success: payload,
        rep_success: true
      });

    case SharedActions.POST_SELECTED_OPTION_FAILED:
    return Object.assign({}, state, {
      report_failed:JSON.parse(payload['_body']).ERROR,
      rep_success: false
    });

    /**
     * reducer to manage state on getting options for reporting
     */
    case SharedActions.GET_OPTIONS_REPORT:
    return Object.assign({}, state, {
      report: []
    });

    case SharedActions.GET_OPTIONS_REPORT_SUCCESS:
    return Object.assign({}, state, {
      report: payload.Success.questions
    });

    case SharedActions.GET_OPTIONS_REPORT_FAILED:
    return Object.assign({}, state, {
      report: []
    });

    default:
      return state;

  }

}
