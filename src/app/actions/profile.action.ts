import { Action } from '@ngrx/store';

export class ProfileActions {

  /**
   * Load logged in users profile
   */
  static LOAD_CURRENT_USER_PROFILE = 'LOAD_CURRENT_USER_PROFILE';
  static LOAD_CURRENT_USER_PROFILE_SUCCESS = 'LOAD_CURRENT_USER_PROFILE_SUCCESS';
  static LOAD_CURRENT_USER_PROFILE_FAILED = 'LOAD_CURRENT_USER_PROFILE_FAILED';

  /**
   * Load logged in users Quick Access
   */
  static LOAD_CURRENT_USER_QUICK_ACCESS = 'LOAD_CURRENT_USER_QUICK_ACCESS';
  static LOAD_CURRENT_USER_QUICK_ACCESS_SUCCESS = 'LOAD_CURRENT_USER_QUICK_ACCESS_SUCCESS';
  static LOAD_CURRENT_USER_QUICK_ACCESS_FAILED = 'LOAD_CURRENT_USER_QUICK_ACCESS_FAILED';

  /**
   * Load logged in users profile details
   */
  static LOAD_CURRENT_USER_PROFILE_DETAILS = 'LOAD_CURRENT_USER_PROFILE_DETAILS';
  static LOAD_CURRENT_USER_PROFILE_DETAILS_SUCCESS = 'LOAD_CURRENT_USER_PROFILE_DETAILS_SUCCESS';
  static LOAD_CURRENT_USER_PROFILE_DETAILS_FAILED = 'LOAD_CURRENT_USER_PROFILE_DETAILS_FAILED';

  /**
   * Load logged in users Channel
   */
  static LOAD_CURRENT_USER_CHANNEL = 'LOAD_CURRENT_USER_CHANNEL';
  static LOAD_CURRENT_USER_CHANNEL_SUCCESS = 'LOAD_CURRENT_USER_CHANNEL_SUCCESS';
  static LOAD_CURRENT_USER_CHANNEL_FAILED = 'LOAD_CURRENT_USER_CHANNEL_FAILED';

  /**
   * Load logged in users media
   */
  static LOAD_USER_MEDIA = 'LOAD_USER_MEDIA';
  static LOAD_USER_MEDIA_SUCCESS = 'LOAD_USER_MEDIA_SUCCESS';
  static LOAD_USER_MEDIA_FAILED = 'LOAD_USER_MEDIA_FAILED';

  /**
   * Save New Channel
   */
  static CHANNEL_SAVE = 'CHANNEL_SAVE';
  static CHANNEL_SAVE_SUCCESS = 'CHANNEL_SAVE_SUCCESS';
  static CHANNEL_SAVE_FAILED = 'CHANNEL_SAVE_FAILED';

  /**
   * Load Current user profile
   */
  getUserProfile(): Action {
    return {
      type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS
    };
  }

  getUserProfileSuccess(value): Action {
    return {
      type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS_SUCCESS,
      payload: { value }
    };
  }

  getUserProfileFailed(error: any): Action {
    return {
      type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS_FAILED,
      payload: error
    };
  }

  /**
   * Load Current  details user profile
   */
  getUserDetailsProfile(): Action {
    return {
      type: ProfileActions.LOAD_CURRENT_USER_PROFILE
    };
  }

  getUserDetailsSuccess(value): Action {
    return {
      type: ProfileActions.LOAD_CURRENT_USER_PROFILE_SUCCESS,
      payload: { value }
    };
  }

  getUserDetailsFailed(error: any): Action {
    return {
      type: ProfileActions.LOAD_CURRENT_USER_PROFILE_FAILED,
      payload: error
    };
  }

  /**
   * Get logged in Quick Access
   */
  getCurrentQuickAccess(): Action {
    return {
      type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS
    };
  }

  getQuickAccessSuccess(value): Action {
    return {
      type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS_SUCCESS,
      payload: { value }
    };
  }

  getQuickAccessFailed(error: any): Action {
    return {
      type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS_FAILED,
      payload: error
    };
  }


  /**
   * Get logged in users media
   * @param value
   */
  getUserMedia(value): Action {
    return {
      type: ProfileActions.LOAD_USER_MEDIA,
      payload: { value }
    };
  }

  getUserMediaSuccess(value): Action {
    return {
      type: ProfileActions.LOAD_USER_MEDIA_SUCCESS,
      payload: { value }
    };
  }

  getUserMediaFailed(error: any): Action {
    return {
      type: ProfileActions.LOAD_USER_MEDIA_FAILED,
      payload: error
    };
  }

  /**
   * Get logged in users Channel
   * @param value
   */
  getUserChannel(value): Action {
    return {
      type: ProfileActions.LOAD_CURRENT_USER_CHANNEL,
      payload: { value }
    };
  }

  getUserChannelSuccess(value): Action {
    return {
      type: ProfileActions.LOAD_CURRENT_USER_CHANNEL_SUCCESS,
      payload: { value }
    };
  }

  getUserChannelFailed(error: any): Action {
    return {
      type: ProfileActions.LOAD_CURRENT_USER_CHANNEL_FAILED,
      payload: error
    };
  }
}

