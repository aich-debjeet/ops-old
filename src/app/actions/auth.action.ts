export class AuthActions {

  static VERIFY_REFERENCE_CODE = 'VERIFY_REFERENCE_CODE';
  static VERIFY_REFERENCE_CODE_SUCCESS = 'VERIFY_REFERENCE_CODE_SUCCESS';
  static VERIFY_REFERENCE_CODE_FAILED = 'VERIFY_REFERENCE_CODE_FAILED';

  static SEND_INVITATION = 'SEND_INVITATION';
  static SEND_INVITATION_SUCCESS = 'SEND_INVITATION_SUCCESS';
  static SEND_INVITATION_FAILED = 'SEND_INVITATION_FAILED';

  static SIGNUP_SEARCH_SKILL = 'SIGNUP_SEARCH_SKILL';
  static SIGNUP_SEARCH_SKILL_SUCCESS = 'SIGNUP_SEARCH_SKILL_SUCCESS';
  static SIGNUP_SEARCH_SKILL_FAILED = 'SIGNUP_SEARCH_SKILL_FAILED';

  static USER_LOGIN = 'USER_LOGIN';
  static USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
  static USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

  static USER_LOGGED_IN = 'USER_LOGGED_IN';
  static USER_LOGGED_IN_SUCCESS = 'USER_LOGGED_IN_SUCCESS';
  static USER_LOGGED_IN_FAILED = 'USER_LOGGED_IN_FAILED';

  static USER_LOGOUT = 'USER_LOGOUT';
  static USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
  static USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

  // Reg Step 1
  static USER_REGISTRATION_BASIC = 'USER_REGISTRATION_BASIC';
  static USER_REGISTRATION_BASIC_SUCCESS = 'USER_REGISTRATION_BASIC_SUCCESS';
  static USER_REGISTRATION_BASIC_FAILED = 'USER_REGISTRATION_BASIC_FAILED';

  static USER_PROFILE_CLAIM = 'USER_PROFILE_CLAIM';
  static USER_PROFILE_CLAIM_SUCCESS = 'USER_PROFILE_CLAIM_SUCCESS';
  static USER_PROFILE_CLAIM_FAILED = 'USER_PROFILE_CLAIM_FAILED';

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

  /**
   * Resend otp under settings
   */
  static SETTING_OTP_RESEND_SUBMIT = 'SETTING_OTP_RESEND_SUBMIT';
  static SETTING_OTP_RESEND_SUBMIT_SUCCESS = 'SETTING_OTP_RESEND_SUBMIT_SUCCESS';
  static SETTING_OTP_RESEND_SUBMIT_FAILED = 'SETTING_OTP_RESEND_SUBMIT_FAILED';

  static OTP_RESEND_FORGET_USER = 'OTP_RESEND_FORGET_USER';
  static OTP_RESEND_FORGET_USER_SUCCESS = 'OTP_RESEND_FORGET_USER_SUCCESS';
  static OTP_RESEND_FORGET_USER_FAILED = 'OTP_RESEND_FORGET_USER_FAILED';

  static OTP_NUMBER_CHANGE = 'OTP_NUMBER_CHANGE';
  static OTP_NUMBER_CHANGE_SUCCESS = 'OTP_NUMBER_CHANGE_SUCCESS';
  static OTP_NUMBER_CHANGE_FAILED = 'OTP_NUMBER_CHANGE_FAILED';

  static SETTINGS_OTP_NUMBER_CHANGE = 'SETTINGS_OTP_NUMBER_CHANGE';
  static SETTINGS_OTP_NUMBER_CHANGE_SUCCESS = 'SETTINGS_OTP_NUMBER_CHANGE_SUCCESS';
  static SETTINGS_OTP_NUMBER_CHANGE_FAILED = 'SETTINGS_OTP_NUMBER_CHANGE_FAILED';

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

  static FP_STATE_RESET = 'FP_STATE_RESET';
  static FP_STATE_RESET_SUCCESS = 'FP_STATE_RESET_SUCCESS';

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

  // Dance Get industry
  static DANCE_GET_INDUSTRY = 'DANCE_GET_INDUSTRY';
  static DANCE_GET_INDUSTRY_SUCCESS = 'DANCE_GET_INDUSTRY_SUCCESS';
  static DANCE_GET_INDUSTRY_FAILED = 'DANCE_GET_INDUSTRY_FAILED';

  static SEARCH_USER_BY_USERNAME = 'SEARCH_USER_BY_USERNAME';
  static SEARCH_USER_BY_USERNAME_SUCCESS = 'SEARCH_USER_BY_USERNAME_SUCCESS';
  static SEARCH_USER_BY_USERNAME_FAILED = 'SEARCH_USER_BY_USERNAME_FAILED';

  static SEND_CONTACTUS = 'SEND_CONTACTUS';
  static SEND_CONTACTUS_SUCCESS = 'SEND_CONTACTUS_SUCCESS';
  static SEND_CONTACTUS_FAILED = 'SEND_CONTACTUS_FAILED';

  static PROFILE_CLAIM = 'PROFILE_CLAIM';
  static PROFILE_CLAIM_SUCCESS = 'PROFILE_CLAIM_SUCCESS';
  static PROFILE_CLAIM_FAILED = 'PROFILE_CLAIM_FAILED';

  static CLAIM_OTP_ACTIVE = 'CLAIM_OTP_ACTIVE';
  static CLAIM_OTP_ACTIVE_SUCCESS = 'CLAIM_OTP_ACTIVE_SUCCESS';
  static CLAIM_OTP_ACTIVE_FAILED = 'CLAIM_OTP_ACTIVE_FAILED';

  static STORE_COUNTRY_CODE = 'STORE_COUNTRY_CODE';

}
