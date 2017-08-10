import { ActionReducer, Action } from '@ngrx/store';
import { Channel } from '../models/home.model';

import { ProfileActions } from '../actions/profile.action';


export const ProfileReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {


    /* ------------------------ user profile ------------------------ */
    case ProfileActions.LOAD_USER_PROFILE:
      console.log('profile reducer: loading logged in users profile');
      console.log(payload);
      return Object.assign({}, state, {
        success: true
      });

    case ProfileActions.LOAD_USER_PROFILE_SUCCESS:
      console.log('profile reducer: loading logged in users profile success');
      console.log(payload);
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case ProfileActions.LOAD_USER_PROFILE_FAILED:
      console.log('profile reducer: loading logged in users profile failed');
      return Object.assign({}, state, {
        success: false
      });
    /* ------------------------ user profile ------------------------ */


    /* ------------------------ user media ------------------------ */
    case ProfileActions.LOAD_USER_MEDIA:
      console.log('load user media reducer: loading logged in users media');
      console.log(payload);
      return Object.assign({}, state, {
        success: true
      });

    case ProfileActions.LOAD_USER_MEDIA_SUCCESS:
      console.log('load user media reducer: loading logged in users media success');
      console.log(payload);
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case ProfileActions.LOAD_USER_MEDIA_FAILED:
      console.log('load user media reducer: loading logged in users media failed');
      return Object.assign({}, state, {
        success: false
      });
    /* ------------------------ user media ------------------------ */

    default:
      return state;

  }

}
