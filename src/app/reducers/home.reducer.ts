import { ActionReducer, Action } from '@ngrx/store';
import { Channel } from '../models/home.model';

import { HomeActions } from '../actions/home.action';


export const HomeReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    case HomeActions.LOAD_CHANNELS:
      return Object.assign({}, state, {
        success: true
      });

    case HomeActions.LOAD_CHANNELS_SUCCESS:
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case HomeActions.LOAD_CHANNELS_FAILED:
      return Object.assign({}, state, {
        success: false
      });

    default:
      return state;

  }

}
