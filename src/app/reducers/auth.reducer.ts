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

    case AuthActions.LOAD_INDUSTRIES:
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

    case AuthActions.LOAD_INDUSTRIES_SUCCESS:
      return Object.assign({}, state, {
        completed: payload,
        industries: payload,
        success: true
      });

    case AuthActions.USER_LOGIN:
      return Object.assign({}, state, {
        success: false,
        login_completed: false,
        page_loading: true,
      });

    case AuthActions.USER_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        completed: payload,
        login_completed: true,
        success: true,
        page_loading: false,
      });

    case AuthActions.USER_LOGIN_FAILED:
      console.log('login Faild');
      const error = JSON.parse(payload._body);
      return Object.assign({}, state, {
        success: false,
        login_completed: false,
        error_description: error.error_description,
        page_loading: false
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

    // Forgot Password
    case AuthActions.FP_USER_EXISTS:
      console.log('user exist: ');
      console.log(payload);
      return Object.assign({}, state, {
        fp_user_exists: false,
        fp_user_input: payload.value
      });

    case AuthActions.FP_USER_EXISTS_SUCCESS:
      // assign success values
      let result = [];
      if (payload['SUCCESS']) {
        result = payload['SUCCESS'];
      }

      return Object.assign({}, state, {
        fp_user_exists: true,
        fp_user_options: result
      });

    case AuthActions.FP_USER_EXISTS_FAILED:
      // console.log('test failed: ')
      // console.log(payload)
      return Object.assign({}, state, {
        fp_user_exists: false
      });

    /* reset pass with phone */
    case AuthActions.FP_RESET_TYPE_PHONE:
      return Object.assign({}, state, {
        fp_user_input: payload.value
      });

    case AuthActions.FP_RESET_TYPE_PHONE_SUCCESS:
      // assign success values
      let resPhone = [];
      if (payload['SUCCESS']) { resPhone = payload['SUCCESS']; }
      return Object.assign({}, state, {
        reset_phone_response: payload.value
      });

    case AuthActions.FP_RESET_TYPE_PHONE_FAILED:
      return Object.assign({}, state, {
        status: 'failed'
      });
    /* reset pass with phone */

    /* reset pass with email */
    case AuthActions.FP_RESET_TYPE_EMAIL:
    return Object.assign({}, state, {
      fp_user_input: payload.value
    });

    case AuthActions.FP_RESET_TYPE_EMAIL_SUCCESS:
      // assign success values
      let resEmail = [];
      if (payload['SUCCESS']) { resEmail = payload['SUCCESS']; }
      return Object.assign({}, state, {
        reset_email_response: payload.value
      });

    case AuthActions.FP_RESET_TYPE_EMAIL_FAILED:
      return Object.assign({}, state, {
        status: 'failed'
      });
    /* reset pass with email */

    case AuthActions.FP_CREATE_PASS:
      return Object.assign({}, state, {
        success: false
      });

    case AuthActions.FP_CREATE_PASS_SUCCESS:
      // console.log('FP_CREATE_PASS_SUCCESS');
      return Object.assign({}, state, {
        fpCrPassSuccess: payload,
        success: true
      });

    case AuthActions.FP_CREATE_PASS_FAILED:
    // console.log('FP_CREATE_PASS_FAILED');
      return Object.assign({}, state, {
        success: false
      });

    case AuthActions.USER_SUBMIT_SKILLS:
      return Object.assign({}, state, {
        userSkillsSaveSuccess: false
      });

    case AuthActions.USER_SUBMIT_SKILLS_SUCCESS:
      return Object.assign({}, state, {
        userSkillsSaved: payload,
        userSkillsSaveSuccess: true
      });

    case AuthActions.USER_SUBMIT_SKILLS_FAILED:
      return Object.assign({}, state, {
        userSkillsSaveSuccess: false
      });

    case AuthActions.FP_GET_USERDATA:
      return Object.assign({}, state, {
        fpGetUserDataSuccess: false
      });

    case AuthActions.FP_GET_USERDATA_SUCCESS:
      return Object.assign({}, state, {
        fpGetUserData: payload,
        fpGetUserDataSuccess: true
      });

    case AuthActions.FP_GET_USERDATA_FAILED:
      return Object.assign({}, state, {
        fpGetUserDataSuccess: false
      });

    /**
     * Check with existing auth credentials if Authetincated
     */

    case AuthActions.USER_AUTHENTICATED:
      return Object.assign({}, state, {
        page_loading: true
      });
    case AuthActions.USER_AUTHENTICATED_SUCCESS:
      return Object.assign({}, state, {
        page_loading: false
      });
    case AuthActions.USER_AUTHENTICATED_FAILED:
      return Object.assign({}, state, {
        page_loading: false
      });

    default:
      return state;

  }
}

