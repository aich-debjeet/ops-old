import { ActionReducer, Action } from '@ngrx/store';
import { Channel } from '../models/home.model';

import { ProfileActions } from '../actions/profile.action';


export const ProfileReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    case ProfileActions.LOAD_USER_PROFILE:
      console.log('loading logged in users profile');
      console.log(payload);
      return Object.assign({}, state, {
        success: true
      });

    case ProfileActions.LOAD_USER_PROFILE_SUCCESS:
      console.log('loading logged in users profile success');
      console.log(payload);
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case ProfileActions.LOAD_USER_PROFILE_FAILED:
      console.log('loading logged in users profile failed');
      return Object.assign({}, state, {
        success: false
      });

    default:
      return state;

  }

}
