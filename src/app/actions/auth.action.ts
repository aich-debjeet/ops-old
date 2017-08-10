import { Action } from '@ngrx/store';
import { Login, Register, RegisterProfile } from '../models/auth.model';

export class AuthActions {

  static USER_LOGIN = 'USER_LOGIN';
  static USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
  static USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

  static USER_REGISTER_PROFILE = 'USER_REGISTER_PROFILE';
  static USER_REGISTER_PROFILE_SUCCESS = 'USER_REGISTER_PROFILE_SUCCESS';
  static USER_REGISTER_PROFILE_FAILED = 'USER_REGISTER_PROFILE_FAILED';

  static USER_REGISTRATION = 'USER_REGISTRATION';
  static USER_REGISTRATION_SUCCESS = 'USER_REGISTRATION_SUCCESS';
  static USER_REGISTRATION_FAILED = 'USER_REGISTRATION_FAILED';

  static OTP_CHECK = 'OTP_CHECK';
  static OTP_CHECK_SUCCESS = 'OTP_CHECK_SUCCESS';
  static OTP_CHECK_FAILED = 'OTP_CHECK_FAILED';

  static USER_EXISTS_CHECK = 'USER_EXISTS_CHECK';
  static USER_EXISTS_SUCCESS = 'USER_EXISTS_SUCCESS';
  static USER_EXISTS_FAILED = 'USER_EXISTS_FAILED';

  static SEARCH_CARDS = 'SEARCH_CARDS';
  static SEARCH_CARDS_SUCCESS = 'SEARCH_CARDS_SUCCESS';
  static SEARCH_CARDS_FAILED = 'SEARCH_CARDS_FAILED';

  // Type Of Artist
  static LOAD_ARTIST = 'LOAD_ARTIST';
  static LOAD_ARTIST_SUCCESS = 'LOAD_ARTIST_SUCCESS';

  // Post user Artist Type
  static USER_ARTIST_TYPE = 'USER_ARTIST_TYPE';
  static USER_ARTIST_TYPE_SUCCESS = 'USER_ARTIST_TYPE_SUCCESS';

  // Post Artist Follow
  static USER_ARTIST_FOLLOW = 'USER_ARTIST_FOLLOW';
  static USER_ARTIST_FOLLOW_SUCCESS = 'USER_ARTIST_FOLLOW_SUCCESS';

  // ===================================
  //  POST USER ARTIST TYPE
  // -----------------------------------
    artistFollowAction(value): Action {
      return {
        type: AuthActions.USER_ARTIST_FOLLOW,
        payload: {
          value
        }
      };
    }

    artistFollowSuccessAction(value): Action {
      return {
        type: AuthActions.USER_ARTIST_FOLLOW_SUCCESS,
        payload: {
          value
        }
      };
    }
  // ===================================
  //  POST USER ARTIST TYPE
  // -----------------------------------
    userArtistAction(value): Action {
      return {
        type: AuthActions.USER_LOGIN,
        payload: {
          value
        }
      };
    }

    userArtistSuccessAction(value): Action {
      return {
        type: AuthActions.USER_LOGIN_SUCCESS,
        payload: {
          value
        }
      };
    }
  // ===================================
  //  LOAD ARTIST
  // -----------------------------------

    loadArtistAction(): Action {
      return {
        type: AuthActions.LOAD_ARTIST
      };
    }

    loadArtistSuccesAction(value): Action {
      return {
        type: AuthActions.LOAD_ARTIST_SUCCESS,
        payload: {
          value
        }
      };
    }
  // ===================================
  //  USER LOGIN
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

  // ===================================
  //  USER REGISTRATION
  // -----------------------------------

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

  // ===================================
  //  USER OTP VALIDATION
  // -----------------------------------

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

  // ===================================
  //  USER EXSIST CHECK
  // -----------------------------------

  userExsistCheck(value): Action {
    return {
      type: AuthActions.USER_EXISTS_CHECK,
      payload: {
        value
      }
    };
  }

  userExsistSuccess(value): Action {
    return {
      type: AuthActions.USER_EXISTS_SUCCESS,
      payload: {
        value
      }
    };
  }

  userExsistFailed(value): Action {
    return {
      type: AuthActions.USER_EXISTS_FAILED,
      payload: {
        value
      }
    };
  }
//==========================================================
//SearchCards
//===========================================================

SEARCH_CARDS(value: Login): Action {
  return {
    type: AuthActions.SEARCH_CARDS,
    payload: {
      value
    }
  };
}

SEARCH_CARDS_SUCCESS(value: Login): Action {
  return {
    type: AuthActions.SEARCH_CARDS_SUCCESS,
    payload: {
      value
    }
  };
}

SEARCH_CARDS_FAILED(error: any): Action {
  return {
    type: AuthActions.SEARCH_CARDS_FAILED,
    payload: error
  };
}


}
