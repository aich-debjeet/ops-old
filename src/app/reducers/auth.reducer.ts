import { ActionReducer, Action } from '@ngrx/store';
import { Login, initialTag } from '../models/auth.model';

import { AuthActions } from '../actions/auth.action';


export const AuthReducer: ActionReducer<any> = (state = initialTag, {payload, type}: Action) =>  {
  switch (type) {
    case AuthActions.USER_LOGIN:
      console.log(payload);
      return Object.assign({}, state, {
        success: true
      });

    case AuthActions.USER_LOGIN_SUCCESS:
      console.log(payload);
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case AuthActions.USER_LOGIN_FAILED:
      console.log('login Faild');
      return Object.assign({}, state, {
        success: false
      });


    case AuthActions.USER_REGISTRATION:
      console.log(payload);
      return Object.assign({}, state, {
        success: true
      });

    case AuthActions.USER_REGISTRATION_SUCCESS:
      console.log('registration sucess');
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case AuthActions.USER_REGISTRATION_FAILED:
      console.log('registration Faild');
      return Object.assign({}, state, {
        success: false
      });

    case AuthActions.OTP_CHECK:
      console.log(payload);
      return Object.assign({}, state, {
        success: true
      });

    case AuthActions.OTP_CHECK_SUCCESS:
      console.log('otp sucess');
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case AuthActions.OTP_CHECK_FAILED:
      console.log('otp Faild');
      return Object.assign({}, state, {
        success: false
      });

    case AuthActions.USER_EXISTS_CHECK:
      return Object.assign({}, state, {
        success: false
      });

    case AuthActions.USER_EXISTS_SUCCESS:
    console.log('user Exists Done');
      console.log(payload.code);
      if(payload.code == 0){
        return Object.assign({}, state, {
          completed: payload,
          success: false,
          user_unique: true
        });
      }
      else{
        return Object.assign({}, state, {
          completed: payload,
          success: false,
          user_unique: false
        });
      }
      

    default:
      return state;
  }
}
