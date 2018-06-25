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

    case SharedActions.GET_REPORT_OPTIONS:
    return Object.assign({}, state, {
      success: true
    });

    case SharedActions.GET_REPORT_OPTIONS_SUCCESS:
    return Object.assign({}, state, {
      report_success: payload,
      success: true
    });

    case SharedActions.GET_REPORT_OPTIONS_FAILED:
    return Object.assign({}, state, {
      success: false
    });

    default:
      return state;

  }

}
