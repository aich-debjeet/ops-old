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
   * Load logged in profile update
   */
  static LOAD_PROFILE_UPDATE = 'LOAD_PROFILE_UPDATE';
  static LOAD_PROFILE_UPDATE_SUCCESS = 'LOAD_PROFILE_UPDATE_SUCCESS';
  static LOAD_PROFILE_UPDATE_FAILED = 'LOAD_PROFILE_UPDATE_FAILED';

  /**
   * Delete user work
   */
  static DELETE_USER_WORK = 'DELETE_USER_WORK';
  static DELETE_USER_WORK_SUCCESS = 'DELETE_USER_WORK_SUCCESS';
  static DELETE_USER_WORK_FAILED = 'DELETE_USER_WORK_FAILED';

  /**
   * Add user work
   */
  static ADD_USER_WORK = 'ADD_USER_WORK';
  static ADD_USER_WORK_SUCCESS = 'ADD_USER_WORK_SUCCESS';
  static ADD_USER_WORK_FAILED = 'ADD_USER_WORK_FAILED';

  /**
   * Edit user work
   */
  static EDIT_USER_WORK = 'EDIT_USER_WORK';
  static EDIT_USER_WORK_SUCCESS = 'EDIT_USER_WORK_SUCCESS';
  static EDIT_USER_WORK_FAILED = 'EDIT_USER_WORK_FAILED';

  /**
   * Delete user Education
   */
  static DELETE_USER_EDUCATION = 'DELETE_USER_EDUCATION';
  static DELETE_USER_EDUCATION_SUCCESS = 'DELETE_USER_EDUCATION_SUCCESS';
  static DELETE_USER_EDUCATION_FAILED = 'DELETE_USER_EDUCATION_FAILED';

  /**
   * Add user Education
   */
  static ADD_USER_EDUCATION = 'ADD_USER_EDUCATION';
  static ADD_USER_EDUCATION_SUCCESS = 'ADD_USER_EDUCATION_SUCCESS';
  static ADD_USER_EDUCATION_FAILED = 'ADD_USER_EDUCATION_FAILED';

  /**
   * Edit user Education
   */
  static EDIT_USER_EDUCATION = 'EDIT_USER_EDUCATION';
  static EDIT_USER_EDUCATION_SUCCESS = 'EDIT_USER_EDUCATION_SUCCESS';
  static EDIT_USER_EDUCATION_FAILED = 'EDIT_USER_EDUCATION_FAILED';

  /**
   * Load image to database
   */
  static LOAD_PROFILE_IMAGE = 'LOAD_PROFILE_IMAGE ';
  static LOAD_PROFILE_IMAGE_SUCCESS = 'LOAD_PROFILE_IMAGE_SUCCESS';
  static LOAD_PROFILE_IMAGE_FAILED = 'LOAD_PROFILE_IMAGE_FAILED';

  /**
   * save image to ProfileUI
   */
  static SAVE_PROFILE_IMAGE = 'SAVE_PROFILE_IMAGE ';
  static SAVE_PROFILE_IMAGE_SUCCESS = 'SAVE_PROFILE_IMAGE_SUCCESS';
  static SAVE_PROFILE_IMAGE_FAILED = 'SAVE_PROFILE_IMAGE_FAILED';


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

  /**
   * Update Profile Details
   * @param value
   */
  updateUserProfile(value): Action {
    return {
      type: ProfileActions.LOAD_PROFILE_UPDATE,
      payload: { value }
    };
  }

  updateUserProfileSuccess(value): Action {
    return {
      type: ProfileActions.LOAD_PROFILE_UPDATE_SUCCESS,
      payload: { value }
    };
  }

  updateUserProfileFailed(error: any): Action {
    return {
      type: ProfileActions.LOAD_PROFILE_UPDATE_FAILED,
      payload: error
    };
  }

  /**
   * Add User Work
   * @param value
   */
  addUserWork(value): Action {
    return {
      type: ProfileActions.ADD_USER_WORK,
      payload: { value }
    };
  }

  addUserWorkSuccess(value): Action {
    return {
      type: ProfileActions.ADD_USER_WORK_SUCCESS,
      payload: { value }
    };
  }

  addUserWorkFailed(error: any): Action {
    return {
      type: ProfileActions.ADD_USER_WORK_FAILED,
      payload: error
    };
  }

  /**
   * Edit User Work
   * @param value
   */
  editUserWork(value): Action {
    return {
      type: ProfileActions.EDIT_USER_WORK,
      payload: { value }
    };
  }

  editUserWorkSuccess(value): Action {
    return {
      type: ProfileActions.EDIT_USER_WORK_SUCCESS,
      payload: { value }
    };
  }

  editUserWorkFailed(error: any): Action {
    return {
      type: ProfileActions.EDIT_USER_WORK_FAILED,
      payload: error
    };
  }

  /**
   * Delete User Work
   * @param value
   */
  deleteUserWork(value): Action {
    return {
      type: ProfileActions.DELETE_USER_WORK,
      payload: { value }
    };
  }

  deleteUserWorkSuccess(value): Action {
    return {
      type: ProfileActions.DELETE_USER_WORK_SUCCESS,
      payload: { value }
    };
  }

  deleteUserWorkFailed(error: any): Action {
    return {
      type: ProfileActions.DELETE_USER_WORK_FAILED,
      payload: error
    };
  }

 /**
   * Load image to database
   */
  sendProfileImage(): Action {
    return {
      type: ProfileActions.LOAD_PROFILE_IMAGE,
    };
  }

  sendProfileImageSuccess(value): Action {
    return {
      type: ProfileActions.LOAD_PROFILE_IMAGE_SUCCESS,
      payload: { value }
    };
  }

  sendProfileImageFailed(error: any): Action {
    return {
      type: ProfileActions.LOAD_PROFILE_IMAGE_FAILED,
      payload: error
    };
  }
    /**
     * SAVE image to ProfileUI
     */
    saveProfileImage(): Action {
      return {
      type: ProfileActions.SAVE_PROFILE_IMAGE,
      };
    }

    saveProfileImageSuccess(value): Action {
      return {
        type: ProfileActions.SAVE_PROFILE_IMAGE_SUCCESS,
        payload: { value }
      };
    }

    saveProfileImageFailed(error: any): Action {
      return {
        type: ProfileActions.SAVE_PROFILE_IMAGE_FAILED,
        payload: error
      };
    }



}
