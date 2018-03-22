import { ActionReducer, Action } from '@ngrx/store';
import { CommunitiesActions } from '../actions/communities.action';


export const CommunitiesReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    // case HomeActions.LOAD_CHANNELS:
    //   return Object.assign({}, state, {
    //     success: true
    //   });

    // case HomeActions.LOAD_CHANNELS_SUCCESS:
    //   return Object.assign({}, state, {
    //     completed: payload,
    //     success: true
    //   });

    // case HomeActions.LOAD_CHANNELS_FAILED:
    //   return Object.assign({}, state, {
    //     success: false
    //   });

    default:
      return state;

  }

}
