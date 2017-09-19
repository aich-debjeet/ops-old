import { ActionReducer, Action } from '@ngrx/store';
import { initialTag, ProfileModal } from '../models/profile.model';

import { ProfileActions } from '../actions/profile.action';

export interface State {
  user_channel: any,
  user_channels_loaded: boolean,
  user_channels_loading: boolean,
  profileUser: any
};

export const ProfileReducer: ActionReducer<any> = (state = initialTag, {payload, type}: Action) =>  {

  switch (type) {

    case ProfileActions.PROFILE_COVER_UPDATE:
      return Object.assign({}, state, {
        cover_updating: true,
        cover_upload_loading: true
      });

    case ProfileActions.PROFILE_COVER_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        cover_updating: false,
        cover_img_upload_success: true,
        cover_upload_loading: false,
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
        success: true,
        profile_loaded: false
      });

    case ProfileActions.LOAD_CURRENT_USER_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        profileUser: payload,
        profile_loaded: true
      });

    case ProfileActions.LOAD_CURRENT_USER_PROFILE_FAILED:
      return Object.assign({}, state, {
        success: false,
        profile_loaded: false
      });

    /**
     * Load Current User Profile Details
     */
    case ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS:
      return Object.assign({}, state, {
        success: true,
        profile_loaded: false
      });

    case ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        profileDetails: payload,
        success: true,
        profile_loaded: true
      });

    case ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS_FAILED:
      return Object.assign({}, state, {
        success: false,
        profile_loaded: false
      });

      /**
       * Load image to database
       */
      case ProfileActions.LOAD_PROFILE_IMAGE:
        return Object.assign({}, state, {
          profile_img_upload_loading: true,
          success: true
        });

      case ProfileActions.LOAD_PROFILE_IMAGE_SUCCESS:
        return Object.assign({}, state, {
          profileImage: payload,
          image_upload_success: true,
          profile_img_upload_loading: false,
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
        user_posts_loaded: false,
        user_posts: []
      });

    case ProfileActions.LOAD_USER_MEDIA_SUCCESS:

      const posts = payload['SUCCESS'] || [];

      return Object.assign({}, state, {
        mediaEntity: payload,
        user_posts_loaded: true,
        user_posts_loading: false,
        user_posts: posts
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
     * Get home page spotfeeds
     */
    case ProfileActions.LOAD_HOME_PAGE_SPOTFEEDS:
      return Object.assign({}, state, {
        success: true,
        home_spotfeeds_loading: true,
        home_spotfeeds_loaded: false
      });

    case ProfileActions.LOAD_HOME_PAGE_SPOTFEEDS_SUCCESS:
      return Object.assign({}, state, {
        home_spotfeeds: payload,
        success: true,
        home_spotfeeds_loaded: true,
        home_spotfeeds_loading: false
      });

    case ProfileActions.LOAD_HOME_PAGE_SPOTFEEDS_FAILED:
      return Object.assign({}, state, {
        success: false,
        home_spotfeeds_loading: false,
        home_spotfeeds_loaded: false
      });

    /**
     * Get current User channel of profile
     */
    case ProfileActions.LOAD_CURRENT_USER_CHANNEL:
      return Object.assign({}, state, {
        // success: true,
        user_channels_loading: true,
        user_channels_loaded: false
      });

    case ProfileActions.LOAD_CURRENT_USER_CHANNEL_SUCCESS:
      return Object.assign({}, state, {
        user_channel: payload,
        user_channels_loaded: true,
        user_channels_loading: false
      });

    case ProfileActions.LOAD_CURRENT_USER_CHANNEL_FAILED:
      return Object.assign({}, state, {
        user_channels_loading: false,
        user_channels_loaded: false
      });

    /**
     * Get current User channel of profile
     */
    case ProfileActions.LOAD_USER_CHANNEL:
      return Object.assign({}, state, {
        other_channels_loading: true,
        other_channels_loaded: false
      });

    case ProfileActions.LOAD_USER_CHANNEL_SUCCESS:
      return Object.assign({}, state, {
        other_channel: payload,
        other_channels_loading: false,
        other_channels_loaded: true
      });

    case ProfileActions.LOAD_USER_CHANNEL_FAILED:
      return Object.assign({}, state, {
        other_channels_loading: false,
        other_channels_loaded: false
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

    /**
     * Load a Profile
     */
    case ProfileActions.PROFILE_LOAD:
      return Object.assign({}, state, {
        profile_other: [],
        profile_other_loading: true,
      });

    case ProfileActions.PROFILE_LOAD_SUCCESS:
      return Object.assign({}, state, {
        profile_other_loading: false,
        profile_other_loaded: true,
        profile_other: payload,
        profiles: [...state.profiles, payload],
      });

    case ProfileActions.PROFILE_LOAD_FAILED:
      return Object.assign({}, state, {
        profile_other: [],
        profile_other_loading: false,
        profile_other_loaded: false
      });

    /**
     * Follow Profile
     */
    case ProfileActions.PROFILE_FOLLOW:
      return Object.assign({}, state, {
        profile_other_followed: false
      });

    case ProfileActions.PROFILE_FOLLOW_SUCCESS:
      return Object.assign({}, state, {
        profile_other_followed: true
      });

    case ProfileActions.PROFILE_FOLLOW_FAILED:
      return Object.assign({}, state, {
        profile_other_followed: false
      });

    /**
     * Current user Profile
     */
    case ProfileActions.CURRENT_PROFILE_USER:
      return Object.assign({}, state, {
        current_user_profile: payload
      });

    /**
     * Post Media to Channel
     */
    case ProfileActions.POST_CHANNEL_MEDIA:
      return Object.assign({}, state, {
        media_channel_posting: true,
        media_channel_posted: false
      });

    case ProfileActions.POST_CHANNEL_MEDIA_SUCCESS:
      return Object.assign({}, state, {
        media_channel_posting: false,
        media_channel_posted: true
      });

    case ProfileActions.POST_CHANNEL_MEDIA_FAILED:
      return Object.assign({}, state, {
        media_channel_posting: false,
        media_channel_posted: false
      });

    // Get single spotfeed details
    case ProfileActions.GET_SPOTFEED_DETAILS:
      return Object.assign({}, state, {
        success: true,
        spotfeed_loading: false,
      });

    case ProfileActions.GET_SPOTFEED_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        spotfeed_loading: true,
        spotfeed_detail: payload
      });

    case ProfileActions.GET_SPOTFEED_DETAILS_FAILED:
      return Object.assign({}, state, {
        success: false
      });

    default:
      return state;
  }

}

export const currentUserProfile = (state: ProfileModal) => state.completed;
