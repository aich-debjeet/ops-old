import { ActionReducer, Action } from '@ngrx/store';
import { Channel } from '../models/home.model';

import { SharedActions } from '../actions/shared.action';


export const SharedReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    /* pinning channel */
    case SharedActions.PIN_CHANNEL:
      console.log('pinning channels');
      console.log(payload);
      return Object.assign({}, state, {
        success: true
      });

    case SharedActions.PIN_CHANNEL_SUCCESS:
      console.log('pinning channels success');
      console.log(payload);
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case SharedActions.PIN_CHANNEL_FAILED:
      console.log('pinning channels failed');
      return Object.assign({}, state, {
        success: false
      });
    /* pinning channel */


    /* unpinning channel */
    case SharedActions.UNPIN_CHANNEL:
      console.log('unpinning channels');
      console.log(payload);
      return Object.assign({}, state, {
        success: true
      });

    case SharedActions.UNPIN_CHANNEL_SUCCESS:
      console.log('unpinning channels success');
      console.log(payload);
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case SharedActions.UNPIN_CHANNEL_FAILED:
      console.log('unpinning channels failed');
      return Object.assign({}, state, {
        success: false
      });
    /* unpinning channel */

    default:
      return state;

  }

}
