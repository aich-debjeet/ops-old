import { ActionReducer, Action } from '@ngrx/store';
import { initialTag, ProfileModal } from '../models/profile.model';

import { ProfileActions } from '../actions/profile.action';


export const ProfileReducer: ActionReducer<any> = (state = initialTag, {payload, type}: Action) =>  {

  switch (type) {

    case ProfileActions.PROFILE_COVER_UPDATE:
      return Object.assign({}, state, {
        cover_updating: true
      });

    case ProfileActions.PROFILE_COVER_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        cover_updating: false,
        cover_updated: true,
      });

    case ProfileActions.PROFILE_COVER_UPDATE_FAILED:
      return Object.assign({}, state, {
        cover_updating: false,
        cover_updated: false,
      });
    /**
     * Load Current User Profile
     */
    case ProfileActions.LOAD_CURRENT_USER_PROFILE:
      return Object.assign({}, state, {
        success: true
      });

    case ProfileActions.LOAD_CURRENT_USER_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        profileUser: payload,
        success: true
      });

    case ProfileActions.LOAD_CURRENT_USER_PROFILE_FAILED:
      return Object.assign({}, state, {
        success: false
      });

    /**
     * Load Current User Profile Details
     */
    case ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS:
      return Object.assign({}, state, {
        success: true
      });

    case ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        profileDetails: payload,
        success: true
      });

    case ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS_FAILED:
      return Object.assign({}, state, {
        success: false
      });

      /**
       * Load image to database
       */
      case ProfileActions.LOAD_PROFILE_IMAGE:
        return Object.assign({}, state, {
          success: true
        });

      case ProfileActions.LOAD_PROFILE_IMAGE_SUCCESS:
        console.log('image uploading')
        console.log(payload);
        return Object.assign({}, state, {
          profileImage: payload,
          success: true
        });

      case ProfileActions.LOAD_PROFILE_IMAGE_FAILED:
        return Object.assign({}, state, {
          success: false
        });

      /**
       * Save image to ProfileUI
       */
      case ProfileActions.SAVE_PROFILE_IMAGE:
        return Object.assign({}, state, {
          success: true
        });

      case ProfileActions.SAVE_PROFILE_IMAGE_SUCCESS:
        return Object.assign({}, state, {
          profileImage: payload,
          success: true
        });

      case ProfileActions.SAVE_PROFILE_IMAGE_FAILED:
        return Object.assign({}, state, {
          success: false
        });


    /**
     * Load Current User Profile
     */
    case ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS:
      // console.log('current user Quick Access');
      return Object.assign({}, state, {
        success: true
      });

    case ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS_SUCCESS:
      // console.log('current user Quick Access success');
      // console.log(payload);
      return Object.assign({}, state, {
        userQuickAccess: payload,
        success: true
      });

    case ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS_FAILED:
      // console.log('current user Quick Access failed');
      return Object.assign({}, state, {
        success: false
      });


    /**
     * Get User Media Post
     */
    case ProfileActions.LOAD_USER_MEDIA:
      return Object.assign({}, state, {
        user_posts_loading: true,
        user_posts_loaded: false
      });

    case ProfileActions.LOAD_USER_MEDIA_SUCCESS:
      return Object.assign({}, state, {
        mediaEntity: payload,
        user_posts_loaded: true,
        user_posts_loading: false,
        user_posts: payload
      });

    case ProfileActions.LOAD_USER_MEDIA_FAILED:

    return Object.assign({}, state, {
        user_posts_loaded: false,
        user_posts_loading: false
      });

    /**
     * Get current User channel of profile
     */
  case ProfileActions.CHANNEL_SAVE:
    return Object.assign({}, state, {
      channel_saved: false,
      user_channels_loaded: false
    });

  case ProfileActions.CHANNEL_SAVE_SUCCESS:
    return Object.assign({}, state, {
      channel_saved: true
    });

  case ProfileActions.CHANNEL_SAVE_FAILED:
    return Object.assign({}, state, {
      channel_saved: false
    });

    /**
     * Get current User channel of profile
     */
    case ProfileActions.LOAD_CURRENT_USER_CHANNEL:
      return Object.assign({}, state, {
        success: true,
        user_channels_loading: true,
        user_channels_loaded: false
      });

    case ProfileActions.LOAD_CURRENT_USER_CHANNEL_SUCCESS:
    console.log(payload);
      return Object.assign({}, state, {
        channelEntity: payload,
        success: true,
        user_channels_loaded: true,
        user_channels_loading: false
      });

    case ProfileActions.LOAD_CURRENT_USER_CHANNEL_FAILED:
      return Object.assign({}, state, {
        success: false,
        user_channels_loading: false,
        user_channels_loaded: false
      });

    /**
     * Get user Profile update
     */
    case ProfileActions.LOAD_PROFILE_UPDATE:
      return Object.assign({}, state, {
        success: true
      });

    case ProfileActions.LOAD_PROFILE_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        profileUpdate: payload,
        profileUpdateSuccess: true
      });

    case ProfileActions.LOAD_PROFILE_UPDATE_FAILED:
      return Object.assign({}, state, {
        profileUpdateSuccess: false
      });


    /**
     * Add User Profile
     */
    case ProfileActions.ADD_USER_WORK:
      return Object.assign({}, state, {
        success: true
      });

    case ProfileActions.ADD_USER_WORK_SUCCESS:
      return Object.assign({}, state, {
        userProfileAdd: payload,
        success: true
      });

    case ProfileActions.ADD_USER_WORK_FAILED:
      return Object.assign({}, state, {
        success: false
      });

    /**
     * Edit User Profile
     */
    case ProfileActions.EDIT_USER_WORK:
      return Object.assign({}, state, {
        success: true
      });

    case ProfileActions.EDIT_USER_WORK_SUCCESS:
      return Object.assign({}, state, {
        userProfileEdit: payload,
        success: true
      });

    case ProfileActions.EDIT_USER_WORK_FAILED:
      return Object.assign({}, state, {
        success: false
      });

    /**
     * Get current work and award
     */
    case ProfileActions.GET_USER_WORK:
      return Object.assign({}, state, {
        success: true
      });

    case ProfileActions.GET_USER_WORK_SUCCESS:
      return Object.assign({}, state, {
        editWork: payload,
        editWorksuccess: true
      });

    case ProfileActions.GET_USER_WORK_FAILED:
      return Object.assign({}, state, {
        success: false
      });

    /**
     * Delete User Profile
     */
    case ProfileActions.DELETE_USER_WORK:
      return Object.assign({}, state, {
        success: true
      });

    case ProfileActions.DELETE_USER_WORK_SUCCESS:
      return Object.assign({}, state, {
        userProfileDelete: payload,
        success: true
      });

    case ProfileActions.DELETE_USER_WORK_FAILED:
      return Object.assign({}, state, {
        success: false
      });

    default:
      return state;

  }

}


export const currentUserProfile = (state: ProfileModal) => state.completed;
