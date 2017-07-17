import { ActionReducer, Action } from '@ngrx/store';
import { Login, initialTag } from '../models/auth.model';

import { AuthActions } from '../actions/auth.action';


export const LoginReducer: ActionReducer<any> = (state = initialTag, {payload, type}: Action) =>  {
  switch (type) {
    case AuthActions.USER_LOGIN:
      console.log(payload);
      return Object.assign({}, state, {
        success: true
      });

    case AuthActions.USER_LOGIN_SUCCESS:
      console.log('login sucess');
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case AuthActions.USER_LOGIN_FAILED:
      console.log('login Faild');
      return Object.assign({}, state, {
        success: false
      });

    case AuthActions.USER_REGISTER_PROFILE:
      console.log(payload);
      return Object.assign({}, state, {
        success: true
      });

    case AuthActions.USER_REGISTER_PROFILE_SUCCESS:
      console.log('REGISTER_PROFILE sucess');
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case AuthActions.USER_REGISTER_PROFILE_FAILED:
      console.log('REGISTER_PROFILE Faild');
      return Object.assign({}, state, {
        success: false
      });

    default:
      return state;
  }
}
