import { Action } from '@ngrx/store';
import { Login, Register, RegisterProfile } from '../models/auth.model';

export class AuthActions {

  static USER_LOGIN = 'USER_LOGIN';
  static USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
  static USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

  static USER_LOGGED_IN = 'USER_LOGGED_IN';
  static USER_LOGGED_IN_SUCCESS = 'USER_LOGGED_IN_SUCCESS';
  static USER_LOGGED_IN_FAILED = 'USER_LOGGED_IN_FAILED';

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

  static FP_SUBMIT_OTP = 'FP_SUBMIT_OTP';
  static FP_SUBMIT_OTP_SUCCESS = 'FP_SUBMIT_OTP_SUCCESS';
  static FP_SUBMIT_OTP_FAILED = 'FP_SUBMIT_OTP_FAILED';

  static OTP_SUBMIT = 'OTP_SUBMIT';
  static OTP_SUBMIT_SUCCESS = 'OTP_SUBMIT_SUCCESS';
  static OTP_SUBMIT_FAILED = 'OTP_SUBMIT_FAILED';

  static OTP_LOGIN_SUBMIT = 'OTP_LOGIN_SUBMIT';
  static OTP_LOGIN_SUBMIT_SUCCESS = 'OTP_LOGIN_SUBMIT_SUCCESS';
  static OTP_LOGIN_SUBMIT_FAILED = 'OTP_LOGIN_SUBMIT_FAILED';

  static OTP_RESEND_SUBMIT = 'OTP_RESEND_SUBMIT';
  static OTP_RESEND_SUBMIT_SUCCESS = 'OTP_RESEND_SUBMIT_SUCCESS';
  static OTP_RESEND_SUBMIT_FAILED = 'OTP_RESEND_SUBMIT_FAILED';

  static OTP_RESEND_FORGET_USER = 'OTP_RESEND_FORGET_USER';
  static OTP_RESEND_FORGET_USER_SUCCESS = 'OTP_RESEND_FORGET_USER_SUCCESS';
  static OTP_RESEND_FORGET_USER_FAILED = 'OTP_RESEND_FORGET_USER_FAILED';

  static OTP_NUMBER_CHANGE = 'OTP_NUMBER_CHANGE';
  static OTP_NUMBER_CHANGE_SUCCESS = 'OTP_NUMBER_CHANGE_SUCCESS';
  static OTP_NUMBER_CHANGE_FAILED = 'OTP_NUMBER_CHANGE_FAILED';

  static USER_EXISTS_CHECK = 'USER_EXISTS_CHECK';
  static USER_EXISTS_SUCCESS = 'USER_EXISTS_SUCCESS';
  static USER_EXISTS_FAILED = 'USER_EXISTS_FAILED';

  static FP_USER_EXISTS = 'FP_USER_EXISTS';
  static FP_USER_EXISTS_SUCCESS = 'FP_USER_EXISTS_SUCCESS';
  static FP_USER_EXISTS_FAILED = 'FP_USER_EXISTS_FAILED';

  static FP_RESET_TYPE_PHONE = 'FP_RESET_TYPE_PHONE';
  static FP_RESET_TYPE_PHONE_SUCCESS = 'FP_RESET_TYPE_PHONE_SUCCESS';
  static FP_RESET_TYPE_PHONE_FAILED = 'FP_RESET_TYPE_PHONE_FAILED';

  static FP_RESET_TYPE_EMAIL = 'FP_RESET_TYPE_EMAIL';
  static FP_RESET_TYPE_EMAIL_SUCCESS = 'FP_RESET_TYPE_EMAIL_SUCCESS';
  static FP_RESET_TYPE_EMAIL_FAILED = 'FP_RESET_TYPE_EMAIL_FAILED';

  static FP_CREATE_PASS = 'FP_CREATE_PASS';
  static FP_CREATE_PASS_SUCCESS = 'FP_CREATE_PASS_SUCCESS';
  static FP_CREATE_PASS_FAILED = 'FP_CREATE_PASS_FAILED';

  // Forget User Password getfpGetUser
  static FP_GET_USER_EMAIL = 'FP_GET_USER_EMAIL';
  static FP_GET_USER_EMAIL_SUCCESS = 'FP_GET_USER_EMAIL_SUCCESS';
  static FP_GET_USER_EMAIL_FAILED = 'FP_GET_USER_EMAIL_FAILED';

  static SEARCH_CARDS = 'SEARCH_CARDS';
  static SEARCH_CARDS_SUCCESS = 'SEARCH_CARDS_SUCCESS';
  static SEARCH_CARDS_FAILED = 'SEARCH_CARDS_FAILED';

  static USER_SUBMIT_SKILLS = 'USER_SUBMIT_SKILLS';
  static USER_SUBMIT_SKILLS_SUCCESS = 'USER_SUBMIT_SKILLS_SUCCESS';
  static USER_SUBMIT_SKILLS_FAILED = 'USER_SUBMIT_SKILLS_FAILED';

  static FP_GET_USERDATA = 'FP_GET_USERDATA';
  static FP_GET_USERDATA_SUCCESS = 'FP_GET_USERDATA_SUCCESS';
  static FP_GET_USERDATA_FAILED = 'FP_GET_USERDATA_FAILED';

  // Get all skill step3
  static SAVE_SKILL = 'SAVE_SKILL';
  static SAVE_SKILL_SUCCESS = 'SAVE_SKILL_SUCCESS';

  static LOAD_INDUSTRIES = 'LOAD_INDUSTRIES';
  static LOAD_INDUSTRIES_SUCCESS = 'LOAD_INDUSTRIES_SUCCESS';

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


  // Check if user is already authenticated
  static USER_AUTHENTICATED = 'USER_AUTHENTICATED';
  static USER_AUTHENTICATED_SUCCESS = 'USER_AUTHENTICATED_SUCCESS';
  static USER_AUTHENTICATED_FAILED = 'USER_AUTHENTICATED_FAILED';


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
    //  Get all industries
    // -----------------------------------
    loadIndustriesAction(): Action {
      return {
        type: AuthActions.LOAD_INDUSTRIES
      };
    }

    loadIndustriesSuccesAction(value): Action {
      return {
        type: AuthActions.LOAD_INDUSTRIES_SUCCESS,
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
  fpUserExistCheck(value): Action {
    return {
      type: AuthActions.FP_USER_EXISTS,
      payload: {
        value
      }
    };
  }

  fpUserExistSuccess(value): Action {
    return {
      type: AuthActions.FP_USER_EXISTS_SUCCESS,
      payload: {
        value
      }
    };
  }

  fpUserExistFailed(value): Action {
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

  // ===================================
  //  FP RESET TYPE PHONE
  // -----------------------------------
  fpResetTypePhone(value): Action {
    return {
      type: AuthActions.FP_RESET_TYPE_PHONE,
      payload: {
        value
      }
    };
  }

  fpResetTypePhoneSuccess(value): Action {
    return {
      type: AuthActions.FP_RESET_TYPE_PHONE_SUCCESS,
      payload: {
        value
      }
    };
  }

  fpResetTypePhoneFailed(value): Action {
    return {
      type: AuthActions.FP_RESET_TYPE_PHONE_FAILED,
      payload: {
        value
      }
    };
  }

  // ===================================
  //  FP RESET TYPE EMAIL
  // -----------------------------------
  fpResetTypeEmail(value): Action {
    return {
      type: AuthActions.FP_RESET_TYPE_EMAIL,
      payload: {
        value
      }
    };
  }

  fpResetTypeEmailSuccess(value): Action {
    return {
      type: AuthActions.FP_RESET_TYPE_EMAIL_SUCCESS,
      payload: {
        value
      }
    };
  }

  fpResetTypeEmailFailed(value): Action {
    return {
      type: AuthActions.FP_RESET_TYPE_EMAIL_FAILED,
      payload: {
        value
      }
    };
  }

  // ==========================================================
  // SearchCards
  // ===========================================================

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

  // ===================================
  //  FP SUBMIT OTP
  // -----------------------------------
  fpSubmitOtp(value): Action {
    return {
      type: AuthActions.FP_SUBMIT_OTP,
      payload: {
        value
      }
    };
  }

  fpSubmitOtpSuccess(value): Action {
    return {
      type: AuthActions.FP_SUBMIT_OTP_SUCCESS,
      payload: {
        value
      }
    };
  }

  fpSubmitOtpFailed(value): Action {
    return {
      type: AuthActions.FP_SUBMIT_OTP_FAILED,
      payload: {
        value
      }
    };
  }

  // ===================================
  //  FP CREATE PASS
  // -----------------------------------
  fpCreatePass(value): Action {
    return {
      type: AuthActions.FP_CREATE_PASS,
      payload: {
        value
      }
    };
  }

  fpCreatePassSuccess(value): Action {
    return {
      type: AuthActions.FP_CREATE_PASS_SUCCESS,
      payload: {
        value
      }
    };
  }

  fpCreatePassFailed(value): Action {
    return {
      type: AuthActions.FP_CREATE_PASS_FAILED,
      payload: {
        value
      }
    };
  }

  // ===================================
  //  CHECK IF USER LOGGED IN
  // -----------------------------------
  isUserLoggedIn(value): Action {
    return {
      type: AuthActions.USER_LOGGED_IN,
      payload: { value }
    };
  }

  isUserLoggedInSuccess(value): Action {
    return {
      type: AuthActions.USER_LOGGED_IN_SUCCESS,
      payload: { value }
    };
  }

  isUserLoggedInFailed(error): Action {
    return {
      type: AuthActions.USER_LOGGED_IN_FAILED,
      payload: error
    };
  }

}
