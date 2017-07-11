import { Action } from '@ngrx/store';
import { Login } from '../models/login.model';

export class authActions {
  static USER_LOGIN = 'USER_LOGIN';
  static USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
  static USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';
  

  //===================================
  //  USER
  //-----------------------------------

  userLogin(value: Login): Action {
    return {
      type: authActions.USER_LOGIN,
      payload: {
        value
      }
    };
  }

  userLoginSuccess(value: Login): Action {
    return {
      type: authActions.USER_LOGIN_SUCCESS,
      payload: {
        value
      }
    };
  }

  userLoginFailed(error: any): Action {
    return {
      type: authActions.USER_LOGIN_FAILED,
      payload: error
    };
  }
}