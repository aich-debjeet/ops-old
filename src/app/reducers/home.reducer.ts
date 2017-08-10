import { ActionReducer, Action } from '@ngrx/store';
import { Channel } from '../models/home.model';

import { HomeActions } from '../actions/home.action';


export const HomeReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    case HomeActions.LOAD_CHANNELS:
      console.log('loading channels');
      console.log(payload);
      return Object.assign({}, state, {
        success: true
      });

    case HomeActions.LOAD_CHANNELS_SUCCESS:
      console.log('loading channels success');
      console.log(payload);
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case HomeActions.LOAD_CHANNELS_FAILED:
      console.log('loading channels failed');
      return Object.assign({}, state, {
        success: false
      });

    default:
      return state;

  }

}
