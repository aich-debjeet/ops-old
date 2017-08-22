import { Action } from '@ngrx/store';
import { Login, Register, RegisterProfile } from '../models/auth.model';

export class AuthActions {

  static USER_LOGIN = 'USER_LOGIN';
  static USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
  static USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

  // Reg Step 1
  static USER_REGISTRATION_BASIC = 'USER_REGISTRATION_BASIC';
  static USER_REGISTRATION_BASIC_SUCCESS = 'USER_REGISTRATION_BASIC_SUCCESS';
  static USER_REGISTRATION_BASIC_FAILED = 'USER_REGISTRATION_BASIC_FAILED';

  // Reg Step 2
  static USER_REGISTRATION_PROFILE = 'USER_REGISTRATION_PROFILE';
  static USER_REGISTRATION_PROFILE_SUCCESS = 'USER_REGISTRATION_PROFILE_SUCCESS';
  static USER_REGISTRATION_PROFILE_FAILED = 'USER_REGISTRATION_PROFILE_FAILED';

  static OTP_CHECK = 'OTP_CHECK';
  static OTP_CHECK_SUCCESS = 'OTP_CHECK_SUCCESS';
  static OTP_CHECK_FAILED = 'OTP_CHECK_FAILED';

  static USER_EXISTS_CHECK = 'USER_EXISTS_CHECK';
  static USER_EXISTS_SUCCESS = 'USER_EXISTS_SUCCESS';
  static USER_EXISTS_FAILED = 'USER_EXISTS_FAILED';

  static FP_USER_EXISTS_CHECK = 'FP_USER_EXISTS_CHECK';
  static FP_USER_EXISTS_SUCCESS = 'FP_USER_EXISTS_SUCCESS';
  static FP_USER_EXISTS_FAILED = 'FP_USER_EXISTS_FAILED';

  static SEARCH_CARDS = 'SEARCH_CARDS';
  static SEARCH_CARDS_SUCCESS = 'SEARCH_CARDS_SUCCESS';
  static SEARCH_CARDS_FAILED = 'SEARCH_CARDS_FAILED';

  // Get all skill step3
  static SAVE_SKILL = 'SAVE_SKILL';
  static SAVE_SKILL_SUCCESS = 'SAVE_SKILL_SUCCESS';

  static LOAD_SKILL = 'LOAD_SKILL';
  static LOAD_SKILL_SUCCESS = 'LOAD_SKILL_SUCCESS';

  static SEARCH_SKILL = 'SEARCH_SKILL';
  static SEARCH_SKILL_SUCCESS = 'SEARCH_SKILL_SUCCESS';

  // Type Of Artist
  static LOAD_ARTIST = 'LOAD_ARTIST';
  static LOAD_ARTIST_SUCCESS = 'LOAD_ARTIST_SUCCESS';

  // Type Of Artist
  static ARTIST_FOLLOW = 'ARTIST_FOLLOW';
  static ARTIST_FOLLOW_SUCCESS = 'ARTIST_FOLLOW_SUCCESS';

  // Post user Artist Type
  static USER_ARTIST_TYPE = 'USER_ARTIST_TYPE';
  static USER_ARTIST_TYPE_SUCCESS = 'USER_ARTIST_TYPE_SUCCESS';
  // welcome screen
  static USER_REGISTRATION_WELCOME = 'USER_REGISTRATION_WELCOME';
  static USER_REGISTRATION_WELCOME_SUCCESS = 'USER_REGISTRATION_WELCOME_SUCCESS';

  // Post Artist Follow
  static USER_ARTIST_FOLLOW = 'USER_ARTIST_FOLLOW';
  static USER_ARTIST_FOLLOW_SUCCESS = 'USER_ARTIST_FOLLOW_SUCCESS';

   // ===================================
  //  Get all skill step3
  // -----------------------------------
    artistFollowingAction(value): Action {
      return {
        type: AuthActions.ARTIST_FOLLOW,
        payload: {
          value
        }
      };
    }

    artistFollowingSuccessAction(value): Action {
      return {
        type: AuthActions.ARTIST_FOLLOW_SUCCESS,
        payload: {
          value
        }
      };
    }

    // ===================================
  //  Get all skill step3
  // -----------------------------------
    registrationWelcomeAction(value): Action {
      return {
        type: AuthActions.USER_REGISTRATION_WELCOME,
        payload: {
          value
        }
      };
    }

    registrationWelcomeSuccessAction(value): Action {
      return {
        type: AuthActions.USER_REGISTRATION_WELCOME_SUCCESS,
        payload: {
          value
        }
      };
    }

   // ===================================
  //  Get all skill step3
  // -----------------------------------

    loadSkillAction(): Action {
      return {
        type: AuthActions.LOAD_SKILL
      };
    }

    loadSkillSuccesAction(value): Action {
      return {
        type: AuthActions.LOAD_SKILL_SUCCESS,
        payload: {
          value
        }
      };
    }

    searchSkillAction(): Action {
      return {
        type: AuthActions.SEARCH_SKILL
      };
    }

    searchSkillSuccesAction(value): Action {
      return {
        type: AuthActions.SEARCH_SKILL_SUCCESS,
        payload: {
          value
        }
      };
    }

    saveSkillAction(value): Action {
      return {
        type: AuthActions.SAVE_SKILL,
        payload: { value }
      };
    }

    saveSkillSuccessAction(): Action {
      return {
        type: AuthActions.SAVE_SKILL_SUCCESS
      };
    }

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
  //  USER REGISTRATION STEP-1
  // -----------------------------------

  userRegisterBasic(value: Register): Action {
    return {
      type: AuthActions.USER_REGISTRATION_BASIC,
      payload: {
        value
      }
    };
  }


  userRegistrationBasicSuccess(value: Register): Action {
    return {
      type: AuthActions.USER_REGISTRATION_BASIC_SUCCESS,
      payload: {
        value
      }
    };
  }


  userRegistrationBasicFailed(error: any): Action {
    return {
      type: AuthActions.USER_REGISTRATION_BASIC_FAILED,
      payload: error
    };
  }

  // ===================================
  //  USER REGISTRATION STEP-2
  // -----------------------------------

  userRegisterProfile(value: any): Action {
    return {
      type: AuthActions.USER_REGISTRATION_PROFILE,
      payload: {
        value
      }
    };
  }


  userRegisterProfileSuccess(value: any): Action {
    return {
      type: AuthActions.USER_REGISTRATION_PROFILE_SUCCESS,
      payload: {
        value
      }
    };
  }


  userRegisterProfileFailed(error: any): Action {
    return {
      type: AuthActions.USER_REGISTRATION_PROFILE_FAILED,
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
  //  USER EXSIST CHECK for Forgot Password
  // -----------------------------------
  fpUserExsistCheck(value): Action {
    return {
      type: AuthActions.FP_USER_EXISTS_CHECK,
      payload: {
        value
      }
    };
  }

  fpUserExsistSuccess(value): Action {
    return {
      type: AuthActions.FP_USER_EXISTS_SUCCESS,
      payload: {
        value
      }
    };
  }

  fpUserExsistFailed(value): Action {
    return {
      type: AuthActions.FP_USER_EXISTS_FAILED,
      payload: {
        value
      }
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
