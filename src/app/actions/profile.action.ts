import { Action } from '@ngrx/store';

export class ProfileActions {

  /**
   * Chnage
   */
  static CHANGE_DWC_MEDIA_STATE = 'CHANGE_DWC_MEDIA_STATE';

  /**
   * Load logged in users profile
   */
  static LOAD_CURRENT_USER_PROFILE = 'LOAD_CURRENT_USER_PROFILE';
  static LOAD_CURRENT_USER_PROFILE_SUCCESS = 'LOAD_CURRENT_USER_PROFILE_SUCCESS';
  static LOAD_CURRENT_USER_PROFILE_FAILED = 'LOAD_CURRENT_USER_PROFILE_FAILED';

  /**
   * Change Between Profile & Organization
   */
  static CHANGE_PROFILE = 'CHANGE_PROFILE';

  /**
   * Load spotfeed details
   */
  static GET_SPOTFEED_DETAILS = 'GET_SPOTFEED_DETAILS';
  static GET_SPOTFEED_DETAILS_SUCCESS = 'GET_SPOTFEED_DETAILS_SUCCESS';
  static GET_SPOTFEED_DETAILS_FAILED = 'GET_SPOTFEED_DETAILS_FAILED';

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
   * Load home page spotfeeds
   */
  static LOAD_HOME_PAGE_SPOTFEEDS = 'LOAD_HOME_PAGE_SPOTFEEDS';
  static LOAD_HOME_PAGE_SPOTFEEDS_SUCCESS = 'LOAD_HOME_PAGE_SPOTFEEDS_SUCCESS';
  static LOAD_HOME_PAGE_SPOTFEEDS_FAILED = 'LOAD_HOME_PAGE_SPOTFEEDS_FAILED';

  /**
   * Load logged in users Channel
   */
  static LOAD_CURRENT_USER_CHANNEL = 'LOAD_CURRENT_USER_CHANNEL';
  static LOAD_CURRENT_USER_CHANNEL_SUCCESS = 'LOAD_CURRENT_USER_CHANNEL_SUCCESS';
  static LOAD_CURRENT_USER_CHANNEL_FAILED = 'LOAD_CURRENT_USER_CHANNEL_FAILED';

  /**
   * Load logged in user following Channel
   */
  static LOAD_CURRENT_USER_FOLLOWING_CHANNEL = 'LOAD_CURRENT_USER_FOLLOWING_CHANNEL';
  static LOAD_CURRENT_USER_FOLLOWING_CHANNEL_SUCCESS = 'LOAD_CURRENT_USER_FOLLOWING_CHANNEL_SUCCESS';
  static LOAD_CURRENT_USER_FOLLOWING_CHANNEL_FAILED = 'LOAD_CURRENT_USER_FOLLOWING_CHANNEL_FAILED';

  /**
   * Load logged in users Channel
   */
  static LOAD_USER_CHANNEL = 'LOAD_USER_CHANNEL';
  static LOAD_USER_CHANNEL_SUCCESS = 'LOAD_USER_CHANNEL_SUCCESS';
  static LOAD_USER_CHANNEL_FAILED = 'LOAD_USER_CHANNEL_FAILED';

  /**
   * Load logged in users media
   */
  static LOAD_USER_MEDIA = 'LOAD_USER_MEDIA';
  static LOAD_USER_MEDIA_SUCCESS = 'LOAD_USER_MEDIA_SUCCESS';
  static LOAD_USER_MEDIA_FAILED = 'LOAD_USER_MEDIA_FAILED';

    /**
   * Load logged in users foolowing posts
   */
  static LOAD_USER_FOLLOWING_POSTS = 'LOAD_USER_FOLLOWING_POSTS';
  static LOAD_USER_FOLLOWING_POSTS_SUCCESS = 'LOAD_USER_FOLLOWING_POSTS_SUCCESS';
  static LOAD_USER_FOLLOWING_POSTS_FAILED = 'LOAD_USER_FOLLOWING_POSTS_FAILED';

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
   * Get current work and award
   */
  static GET_USER_WORK = 'GET_USER_WORK';
  static GET_USER_WORK_SUCCESS = 'GET_USER_WORK_SUCCESS';
  static GET_USER_WORK_FAILED = 'GET_USER_WORK_FAILED';

  /**
   * Update current work and award
   */
  static UPDATE_USER_WORK = 'UPDATE_USER_WORK';
  static UPDATE_USER_WORK_SUCCESS = 'UPDATE_USER_WORK_SUCCESS';
  static UPDATE_USER_WORK_FAILED = 'UPDATE_USER_WORK_FAILED';

  /**
   * Delete user Education
   */
  static DELETE_USER_EDUCATION = 'DELETE_USER_EDUCATION';
  static DELETE_USER_EDUCATION_SUCCESS = 'DELETE_USER_EDUCATION_SUCCESS';
  static DELETE_USER_EDUCATION_FAILED = 'DELETE_USER_EDUCATION_FAILED';

  /**
   * Update current Education
   */
  static UPDATE_USER_EDUCATION = 'UPDATE_USER_EDUCATION';
  static UPDATE_USER_EDUCATION_SUCCESS = 'UPDATE_USER_EDUCATION_SUCCESS';
  static UPDATE_USER_EDUCATION_FAILED = 'UPDATE_USER_EDUCATION_FAILED';

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
   * Update Profile Image
   */
  static PROFILE_COVER_UPDATE = 'PROFILE_COVER_UPDATE';
  static PROFILE_COVER_UPDATE_SUCCESS = 'PROFILE_COVER_UPDATE_SUCCESS';
  static PROFILE_COVER_UPDATE_FAILED = 'PROFILE_COVER_UPDATE_FAILED';

  static PROFILE_COVER_URL_UPDATE_SUCCESS = 'PROFILE_COVER_URL_UPDATE_SUCCESS';
  static PROFILE_COVER_URL_UPDATE_FAILED = 'PROFILE_COVER_URL_UPDATE_FAILED';
  /**
   * save image to ProfileUI
   */
  static SAVE_PROFILE_IMAGE = 'SAVE_PROFILE_IMAGE';
  static SAVE_PROFILE_IMAGE_SUCCESS = 'SAVE_PROFILE_IMAGE_SUCCESS';
  static SAVE_PROFILE_IMAGE_FAILED = 'SAVE_PROFILE_IMAGE_FAILED';

  /**
   * Save New Channel
   */
  static CHANNEL_SAVE = 'CHANNEL_SAVE';
  static CHANNEL_SAVE_SUCCESS = 'CHANNEL_SAVE_SUCCESS';
  static CHANNEL_SAVE_FAILED = 'CHANNEL_SAVE_FAILED';

  /**
   * Update Channel
   */
  static CHANNEL_UPDATE = 'CHANNEL_UPDATE';
  static CHANNEL_UPDATE_SUCCESS = 'CHANNEL_UPDATE_SUCCESS';
  static CHANNEL_UPDATE_FAILED = 'CHANNEL_UPDATE_FAILED';

  /**
   * Load a Profile
   */
  static PROFILE_LOAD = 'PROFILE_LOAD';
  static PROFILE_LOAD_SUCCESS = 'PROFILE_LOAD_SUCCESS';
  static PROFILE_LOAD_FAILED = 'PROFILE_LOAD_FAILED';

  /**
   * Follow a profile
   */
  static PROFILE_FOLLOW = 'PROFILE_FOLLOW';
  static PROFILE_FOLLOW_SUCCESS = 'PROFILE_FOLLOW_SUCCESS';
  static PROFILE_FOLLOW_FAILED = 'PROFILE_FOLLOW_FAILED';

   /**
   * Follow a profile
   */
  static PROFILE_UNFOLLOW = 'PROFILE_UNFOLLOW';
  static PROFILE_UNFOLLOW_SUCCESS = 'PROFILE_UNFOLLOW_SUCCESS';
  static PROFILE_UNFOLLOW_FAILED = 'PROFILE_UNFOLLOW_FAILED';

  /**
   * Follow a Channel
   */
  static CHANNEL_FOLLOW = 'CHANNEL_FOLLOW_FOLLOW';
  static CHANNEL_FOLLOW_SUCCESS = 'CHANNEL_FOLLOW_SUCCESS';
  static CHANNEL_FOLLOW_FAILED = 'CHANNEL_FOLLOW_FAILED';

  /**
   * Deletel a Channel
   */
  static CHANNEL_DELETE = 'CHANNEL_DELETE';
  static CHANNEL_DELETE_SUCCESS = 'CHANNEL_DELETE_SUCCESS';
  static CHANNEL_DELETE_FAILED = 'CHANNEL_DELETE_FAILED';

  /**
   * Post Media to Channel
   */
  static POST_CHANNEL_MEDIA = 'POST_CHANNEL_MEDIA';
  static POST_CHANNEL_MEDIA_SUCCESS = 'POST_CHANNEL_MEDIA_SUCCESS';
  static POST_CHANNEL_MEDIA_FAILED = 'POST_CHANNEL_MEDIA_FAILED';

  /**
   * Who is Current user profile
   */
  static CURRENT_PROFILE_USER = 'CURRENT_PROFILE_USER';
  static CURRENT_PROFILE_USER_SUCCESS = 'CURRENT_PROFILE_USER_SUCCESS';

   /**
   * Who is Current user profile
   */
  static LOAD_POSTS_USER = 'LOAD_POSTS_USER';
  static LOAD_POSTS_USER_SUCCESS = 'LOAD_POSTS_USER_SUCCESS';


  /**
   * User Password update
   */
  static USER_PASSWORD_UPDATE = 'USER_PASSWORD_UPDATE';
  static USER_PASSWORD_UPDATE_SUCCESS = 'USER_PASSWORD_UPDATE_SUCCESS';
  static USER_PASSWORD_UPDATE_FAILED = 'USER_PASSWORD_UPDATE_FAILED';

  // Load user status list
  static LOAD_USER_STATUS = 'LOAD_USER_STATUS';
  static LOAD_USER_STATUS_SUCCESS = 'LOAD_USER_STATUS_SUCCESS';
  static LOAD_USER_STATUS_FAILED = 'LOAD_USER_STATUS_FAILED';

  // Pin channel
  static PIN_CHANNEL = 'PIN_CHANNEL';
  static PIN_CHANNEL_SUCCESS = 'PIN_CHANNEL_SUCCESS';
  static PIN_CHANNEL_FAILED = 'PIN_CHANNEL_FAILED';

  // UnPin channel
  static UNPIN_CHANNEL = 'UNPIN_CHANNEL';
  static UNPIN_CHANNEL_SUCCESS = 'UNPIN_CHANNEL_SUCCESS';
  static UNPIN_CHANNEL_FAILED = 'UNPIN_CHANNEL_FAILED';

  // [TEMP] Load all profiles
  static LOAD_ALL_PROFILES = 'LOAD_ALL_PROFILES';
  static LOAD_ALL_PROFILES_SUCCESS = 'LOAD_ALL_PROFILES_SUCCESS';
  static LOAD_ALL_PROFILES_FAILED = 'LOAD_ALL_PROFILES_FAILED';


  // [TEMP into move other directory] Load directory
  static LOAD_DIRECTORY = 'LOAD_DIRECTORY';
  static LOAD_DIRECTORY_SUCCESS = 'LOAD_DIRECTORY_SUCCESS';
  static LOAD_DIRECTORY_FAILED = 'LOAD_DIRECTORY_FAILED';

  // Get list of block users
  static LOAD_BLOCK_USERS = 'LOAD_BLOCK_USERS';
  static LOAD_BLOCK_USERS_SUCCESS = 'LOAD_BLOCK_USERS_SUCCESS';
  static LOAD_BLOCK_USERS_FAILED = 'LOAD_BLOCK_USERS_FAILED';

  // block user
  static UNBLOCK_USER = 'UNBLOCK_USER';
  static UNBLOCK_USER_SUCCESS = 'UNBLOCK_USER_SUCCESS';
  static UNBLOCK_USER_FAILED = 'UNBLOCK_USER_FAILED';

  // GET DEFAULT NOTIFICATION SETTINGS
  static DEFAULT_NOTIFICATION_SETTINGS = 'DEFAULT_NOTIFICATION_SETTINGS';
  static DEFAULT_NOTIFICATION_SETTINGS_SUCCESS = 'DEFAULT_NOTIFICATION_SETTINGS_SUCCESS';
  static DEFAULT_NOTIFICATION_SETTINGS_FAILED = 'DEFAULT_NOTIFICATION_SETTINGS_FAILED';

  // /**
  //  * Change Profile
  //  */
  // changeProfile(value): Action {
  //   return {
  //     type: ProfileActions.CHANGE_PROFILE,
  //     payload: { value }
  //   };
  // }

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
   * Get logged in users following posts
   * @param value
   */
  getUserFollowingPosts(value): Action {
    return {
      type: ProfileActions.LOAD_USER_FOLLOWING_POSTS,
      payload: { value }
    };
  }

  getUserFollowingPostsSuccess(value): Action {
    return {
      type: ProfileActions.LOAD_USER_FOLLOWING_POSTS_SUCCESS,
      payload: { value }
    };
  }

  getUserFollowingPostsFailed(error: any): Action {
    return {
      type: ProfileActions.LOAD_USER_FOLLOWING_POSTS_FAILED,
      payload: error
    };
  }

  /**
   * Get home page spotfeeds
   * @param value
   */
  getHomePageSpotfeeds(value): Action {
    return {
      type: ProfileActions.LOAD_HOME_PAGE_SPOTFEEDS
    };
  }

  getHomePageSpotfeedsSuccess(value): Action {
    return {
      type: ProfileActions.LOAD_HOME_PAGE_SPOTFEEDS_SUCCESS,
      payload: { value }
    };
  }

  getHomePageSpotfeedsFailed(error: any): Action {
    return {
      type: ProfileActions.LOAD_HOME_PAGE_SPOTFEEDS_FAILED,
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
   * Get logged in user following Channel
   * @param value
   */
  getUserFollowingChannel(value): Action {
    return {
      type: ProfileActions.LOAD_CURRENT_USER_FOLLOWING_CHANNEL,
      payload: { value }
    };
  }

  getUserFollowingChannelSuccess(value): Action {
    return {
      type: ProfileActions.LOAD_CURRENT_USER_FOLLOWING_CHANNEL_SUCCESS,
      payload: { value }
    };
  }

  getUserFollowingChannelFailed(error: any): Action {
    return {
      type: ProfileActions.LOAD_CURRENT_USER_FOLLOWING_CHANNEL_FAILED,
      payload: error
    };
  }

  /**
   * Get logged in users Channel
   * @param value
   */
  getOtherUserChannel(value): Action {
    return {
      type: ProfileActions.LOAD_USER_CHANNEL,
      payload: { value }
    };
  }

  getOtherUserChannelSuccess(value): Action {
    return {
      type: ProfileActions.LOAD_USER_CHANNEL_SUCCESS,
      payload: { value }
    };
  }

  getOtherUserChannelFailed(error: any): Action {
    return {
      type: ProfileActions.LOAD_USER_CHANNEL_FAILED,
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
   * Update User Work
   * @param value
   */
  updateUserWork(value): Action {
    return {
      type: ProfileActions.UPDATE_USER_WORK,
      payload: { value }
    };
  }

  updateUserWorkSuccess(value): Action {
    return {
      type: ProfileActions.UPDATE_USER_WORK_SUCCESS,
      payload: { value }
    };
  }

  updateUserWorkFailed(error: any): Action {
    return {
      type: ProfileActions.UPDATE_USER_WORK_FAILED,
      payload: error
    };
  }

  /**
   * Update User Education
   * @param value
   */
  updateUserEducation(value): Action {
    return {
      type: ProfileActions.UPDATE_USER_EDUCATION,
      payload: { value }
    };
  }

  updateUserEducationSuccess(value): Action {
    return {
      type: ProfileActions.UPDATE_USER_EDUCATION_SUCCESS,
      payload: { value }
    };
  }

  updateUserEducationFailed(error: any): Action {
    return {
      type: ProfileActions.UPDATE_USER_EDUCATION_FAILED,
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

  /**
   * Get spotfeed details
   */
  getSpotfeedDetails(value): Action {
    return {
      type: ProfileActions.GET_SPOTFEED_DETAILS,
      payload: {
        value
      }
    };
  }

  getSpotfeedDetailsSuccess(value): Action {
    return {
      type: ProfileActions.GET_SPOTFEED_DETAILS_SUCCESS,
      payload: {
        value
      }
    };
  }

  getSpotfeedDetailsFailed(error: any): Action {
    return {
      type: ProfileActions.GET_SPOTFEED_DETAILS_FAILED,
      payload: error
    };
  }

    /**
   * Load list of blocked users
   */
    getBlockedUsers(): Action {
      return {
        type: ProfileActions.LOAD_BLOCK_USERS
      };
    }

    getBlockedUsersSuccess(value): Action {
      return {
        type: ProfileActions.LOAD_BLOCK_USERS_SUCCESS,
        payload: { value }
      };
    }

    getBlockedUsersFailed(error: any): Action {
      return {
        type: ProfileActions.LOAD_BLOCK_USERS_FAILED,
        payload: error
      };
    }

    /**
     * Block users
     */
    unblockUser(): Action {
      return {
        type: ProfileActions.UNBLOCK_USER
      };
    }
    unblockUserSuccess(value): Action {
      return {
        type: ProfileActions.UNBLOCK_USER_SUCCESS,
        payload: { value }
      };
    }
    unblockUserFailed(error: any): Action {
      return {
        type: ProfileActions.UNBLOCK_USER_FAILED,
        payload: error
      };
    }

}
