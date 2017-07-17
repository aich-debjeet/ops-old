import { Action } from '@ngrx/store';
import { Login, Register } from '../models/auth.model';

export class AuthActions {

  static USER_LOGIN = 'USER_LOGIN';
  static USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
  static USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

  static USER_REGISTRATION = 'USER_REGISTRATION';
  static USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS';
  static USER_REGISTRATION_FAILED = 'USER_REGISTRATION_FAILED';

  static OTP_CHECK = 'OTP_CHECK';
  static OTP_CHECK_SUCCESS = 'OTP_CHECK_SUCCESS';
  static OTP_CHECK_FAILED = 'OTP_CHECK_FAILED';


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

  userRegister(value: Register): Action {
    return {
      type: AuthActions.USER_REGISTRATION,
      payload: {
        value
      }
    };
  }

  userRegistrationSuccess(value: Register): Action {
    return {
      type: AuthActions.USER_REGISTRATION_SUCCESS,
      payload: {
        value
      }
    };
  }

  userRegistrationFailed(error: any): Action {
    return {
      type: AuthActions.USER_REGISTRATION_FAILED,
      payload: error
    };
  }

  /* OTP check */
  otpCheck(value): Action {
    return {
      type: AuthActions.OTP_CHECK,
      payload: {
        value
      }
    };
  }

  otpCheckSuccess(value: Login): Action {
    return {
      type: AuthActions.OTP_CHECK_SUCCESS,
      payload: {
        value
      }
    };
  }

  otpCheckFailed(error: any): Action {
    return {
      type: AuthActions.OTP_CHECK_FAILED,
      payload: error
    };
  }
  /* OTP check */

}
