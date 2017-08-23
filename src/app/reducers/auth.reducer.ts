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

      if (payload.length > 0) {
        return Object.assign({}, state, {
          completed: payload,
          is_data: true,
          success: true
        });
      }else {
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

    case AuthActions.SAVE_SKILL:
      return Object.assign({}, state, {
        skill_saved: false
      });

    case AuthActions.SAVE_SKILL_SUCCESS:
      return Object.assign({}, state, {
        skill_saved: true
      });

    case AuthActions.LOAD_SKILL:
      return Object.assign({}, state, {
        success: false
      });

    case AuthActions.SEARCH_SKILL:
      return Object.assign({}, state, {
        skills: [],
        skills_loaded: false
      });

    case AuthActions.SEARCH_SKILL_SUCCESS:
      return Object.assign({}, state, {
        skills: payload,
        skills_loaded: true
      });

    case AuthActions.LOAD_SKILL_SUCCESS:
      return Object.assign({}, state, {
        completed: payload,
        skills: payload,
        success: true
      });

    case AuthActions.USER_LOGIN:
      return Object.assign({}, state, {
        success: true
      });

    case AuthActions.USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case AuthActions.USER_LOGIN_FAILED:
      console.log('login Faild');
      const error = JSON.parse(payload._body);
      return Object.assign({}, state, {
        success: false,
        error_description: error.error_description
      });


    case AuthActions.USER_REGISTRATION_BASIC:
      console.log(payload);
      console.log('registration started');
      return Object.assign({}, state, {
        success: true
      });

    case AuthActions.USER_REGISTRATION_BASIC_SUCCESS:
      console.log('registration sucess');
      console.log(payload);
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case AuthActions.USER_REGISTRATION_BASIC_FAILED:
      console.log('registration Faild');
      console.log(payload);
      return Object.assign({}, state, {
        success: false,
        completed: payload
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
      console.log('user Done');
      return Object.assign({}, state, {
        success: false
      });

    case AuthActions.USER_EXISTS_SUCCESS:
    // console.log('user Exists Done');
    console.log(payload);
      if (payload.code === 0) {
        return Object.assign({}, state, {
          completed: payload,
          success: false,
          user_unique: true
        });
      }else {
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

    case AuthActions.FP_USER_EXISTS:
      return Object.assign({}, state, {
        fp_user_exists: false,
        success: true
      });

    case AuthActions.FP_USER_EXISTS_SUCCESS:
      console.log('test success: ')
      console.log(payload)

      return Object.assign({}, state, {
        fp_user_exists: true,
        completed: payload,
        success: true
      });

    case AuthActions.FP_USER_EXISTS_FAILED:
      console.log('test failed: ')
      console.log(payload)
      return Object.assign({}, state, {
        fp_user_exists: false,
        success: false
      });

    default:
      return state;
  }
}

