import { ActionReducer, Action } from '@ngrx/store';
import { Login, initialTag } from '../models/auth.model';

import { AuthActions } from '../actions/auth.action';


export const AuthReducer: ActionReducer<any> = (state = initialTag, {payload, type}: Action) =>  {
  switch (type) {
    case AuthActions.USER_REGISTRATION_WELCOME:
      return Object.assign({}, state, {
        success: true
      });

    case AuthActions.USER_REGISTRATION_WELCOME_SUCCESS:
      console.log(payload);
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });
      
    case AuthActions.USER_ARTIST_FOLLOW:
     console.log(payload);
      return Object.assign({}, state, {
        success: true
      });
      

    case AuthActions.USER_ARTIST_FOLLOW_SUCCESS:
    console.log('user artist sucess');
      console.log(payload);
      if (payload.length > 0) {
        return Object.assign({}, state, {
          completed: payload,
          is_data: true,
          success: true
        });
      }
      else{
        return Object.assign({}, state, {
          success: true,
          is_data: false
        });
      }

    case AuthActions.LOAD_ARTIST:
      return Object.assign({}, state, {
        success: true
      });

    case AuthActions.LOAD_ARTIST_SUCCESS:
      console.log(payload);
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case AuthActions.LOAD_SKILL:
      console.log('Load Skill');
      return Object.assign({}, state, {
        success: true
      });

    case AuthActions.LOAD_SKILL_SUCCESS:
      // console.log(payload);
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

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
      var error = JSON.parse(payload._body);
      return Object.assign({}, state, {
        success: false,
        error_description: error.error_description
      });


    case AuthActions.USER_REGISTRATION_BASIC:
      console.log(payload);
      return Object.assign({}, state, {
        success: true
      });

    case AuthActions.USER_REGISTRATION_BASIC_SUCCESS:
      console.log('registration sucess');
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case AuthActions.USER_REGISTRATION_BASIC_FAILED:
      console.log('registration Faild');
      return Object.assign({}, state, {
        success: false
      });

    case AuthActions.USER_REGISTRATION_PROFILE:
      console.log(payload);
      return Object.assign({}, state, {
        success: true
      });

    case AuthActions.USER_REGISTRATION_PROFILE_SUCCESS:
      console.log('registration step2');
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case AuthActions.USER_REGISTRATION_PROFILE_FAILED:
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
    // console.log('user Exists Done');
    //   console.log(payload.code);
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

    case AuthActions.ARTIST_FOLLOW:
      console.log(payload);
      return Object.assign({}, state, {
        success: true
      });

    case AuthActions.ARTIST_FOLLOW_SUCCESS:
      console.log('otp sucess');
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

      

    default:
      return state;
  }
}
