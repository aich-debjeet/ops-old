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
        success: true
      });

    case ProfileActions.LOAD_USER_MEDIA_SUCCESS:
      console.log('user media load sucess');
      console.log(payload);
      return Object.assign({}, state, {
        mediaEntity: payload,
        success: true
      });

    case ProfileActions.LOAD_USER_MEDIA_FAILED:
      console.log('user media failed');
      return Object.assign({}, state, {
        success: false
      });

    /**
     * Get current User channel of profile
     */
    case ProfileActions.LOAD_CURRENT_USER_CHANNEL:
      console.log('current user channel start');
      console.log(payload);
      return Object.assign({}, state, {
        success: true
      });

    case ProfileActions.LOAD_CURRENT_USER_CHANNEL_SUCCESS:
      console.log('current user channel sucess');
      console.log(payload);
      return Object.assign({}, state, {
        channelEntity: payload,
        success: true
      });

    case ProfileActions.LOAD_CURRENT_USER_CHANNEL_FAILED:
      console.log('current user channel failed');
      return Object.assign({}, state, {
        success: false
      });


    default:
      return state;

  }

}


export const currentUserProfile = (state: ProfileModal) => state.completed;
