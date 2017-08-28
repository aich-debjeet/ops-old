import { ActionReducer, Action } from '@ngrx/store';
import { initialTag, ProfileModal } from '../models/profile.model';

import { ProfileActions } from '../actions/profile.action';


export const ProfileReducer: ActionReducer<any> = (state = initialTag, {payload, type}: Action) =>  {

  switch (type) {
    /**
     * Load Current User Profile
     */
    case ProfileActions.LOAD_CURRENT_USER_PROFILE:
      return Object.assign({}, state, {
        success: true
      });

    case ProfileActions.LOAD_CURRENT_USER_PROFILE_SUCCESS:
      console.log(payload);
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
      console.log('deatail');
      console.log(payload);
      return Object.assign({}, state, {
        profileDetails: payload,
        success: true
      });

    case ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS_FAILED:
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
      console.log('user media load');
      console.log(payload);
      return Object.assign({}, state, {
        user_posts_loading: true,
        user_posts_loaded: false
      });

    case ProfileActions.LOAD_USER_MEDIA_SUCCESS:
      console.log('user media load sucess');
      console.log(payload);
      return Object.assign({}, state, {
        mediaEntity: payload,
        user_posts_loaded: true,
        user_posts_loading: false,
        user_posts: payload
      });

    case ProfileActions.LOAD_USER_MEDIA_FAILED:
      console.log('user media failed');
      return Object.assign({}, state, {
        user_posts_loaded: false,
        user_posts_loading: false
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


    default:
      return state;

  }

}


export const currentUserProfile = (state: ProfileModal) => state.completed;
