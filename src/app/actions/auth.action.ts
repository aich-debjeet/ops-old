import { Action } from '@ngrx/store';
import { Login, RegisterProfile } from '../models/auth.model';

export class AuthActions {
  static USER_LOGIN = 'USER_LOGIN';
  static USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
  static USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

  static USER_REGISTER_PROFILE = 'USER_REGISTER_PROFILE';
  static USER_REGISTER_PROFILE_SUCCESS = 'USER_REGISTER_PROFILE_SUCCESS';
  static USER_REGISTER_PROFILE_FAILED = 'USER_REGISTER_PROFILE_FAILED';


  // ===================================
  //  USER
  // -----------------------------------

  userLogin(value: Login): Action {
    return {
      type: AuthActions.USER_LOGIN,
      payload: {
        value
      }
    };
  }

  userLoginSuccess(value: Login): Action {
    return {
      type: AuthActions.USER_LOGIN_SUCCESS,
      payload: {
        value
      }
    };
  }

  userLoginFailed(error: any): Action {
    return {
      type: AuthActions.USER_LOGIN_FAILED,
      payload: error
    };
  }


  userRegisterProfile(value: RegisterProfile): Action {
    return {
      type: AuthActions.USER_REGISTER_PROFILE,
      payload: {
        value
      }
    };
  }

  userRegisterProfileSuccess(value: RegisterProfile): Action {
    return {
      type: AuthActions.USER_REGISTER_PROFILE_SUCCESS,
      payload: {
        value
      }
    };
  }

  userRegisterProfileFailed(error: any): Action {
    return {
      type: AuthActions.USER_REGISTER_PROFILE_FAILED,
      payload: error
    };
  }



}
