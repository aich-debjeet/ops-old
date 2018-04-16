import { ActionReducer, Action } from '@ngrx/store';
import { initialTag, ProfileModal, ProfileCards, UserCard} from '../models/profile.model';

import { ProfileActions } from '../actions/profile.action';
import { OrganizationActions } from '../actions/organization.action';

export interface State {
  user_channel: any,
  user_channels_loaded: boolean,
  user_channels_loading: boolean,
  current_user_profile: any,
  profile_navigation_details: any
};

/**
 * Convert Profile to UserCard
 */
function genUserCard(profile: any, isOrg: boolean = true) {
  if (!isOrg && profile['isOrganization'] === true) {
    const org  = profile['organization'];
    const oCard: UserCard = {
      name: org.organizationName,
      image: org.organizationImage,
      username: org.organizationUserName,
      handle: org.organizationHandle,
      isOrg: true,
      page_path: '/org/page',
    }
    return oCard;
  } else {
    const uCard: UserCard = {
      name: profile.name,
      image: profile.profileImage,
      username: profile.username,
      handle: profile.handle,
      isOrg: false,
      page_path: '/profile',
    }
    return uCard;
  }
}

/**
 * Get active profile type state
 * @param profile_type Profile type; profile or organizaiton
 */
function getActiveProfile(profile_details: any, profile_type: string = 'profile') {
  // Profile data is empty, try to get in from component state, or else fail miserably
  let active, inactive, profile, organization;
  profile = genUserCard(profile_details);
  organization = genUserCard(profile_details, false)

  // Unless organization default active is profile
  switch (profile_type) {
    case 'organization':
      active = organization;
      inactive = profile;
      break;
    default:
      active = profile;
      inactive = organization;
  }

  // Construct a Struct
  const userCardsList: ProfileCards = {
    active: active,
    other: inactive
  }

  return userCardsList;
}

export const ProfileReducer: ActionReducer<any> = (state = initialTag, {payload, type}: Action) =>  {

  switch (type) {

    /* loading followings/followers */
    case ProfileActions.GET_FOLLOWING_PROFILES:
      return Object.assign({}, state, {
        searching_following_profiles: true,
        searching_following_profiles_success: false,
        searching_following_params: payload,
        following_profiles: []
      });

    case ProfileActions.GET_FOLLOWING_PROFILES_SUCCESS:
      return Object.assign({}, state, {
        searching_following_profiles: false,
        searching_following_profiles_success: true,
        following_profiles: payload
      });

    case ProfileActions.GET_FOLLOWING_PROFILES_FAILED:
      return Object.assign({}, state, {
        searching_following_profiles: false,
        searching_following_profiles_success: false
      });

    case ProfileActions.GET_FOLLOWER_PROFILES:
      return Object.assign({}, state, {
        searching_follower_profiles: true,
        searching_follower_profiles_success: false,
        searching_follower_params: payload,
        follower_profiles: []
      });

    case ProfileActions.GET_FOLLOWER_PROFILES_SUCCESS:
      return Object.assign({}, state, {
        searching_follower_profiles: false,
        searching_follower_profiles_success: true,
        follower_profiles: payload
      });

    case ProfileActions.GET_FOLLOWER_PROFILES_FAILED:
      return Object.assign({}, state, {
        searching_follower_profiles: false,
        searching_follower_profiles_success: false
      });
    /* loading followings/followers */

    /* reset org created success value to false */
    case ProfileActions.ORG_REG_SUCCESS_RESET:
      // console.log('ORG_REG_SUCCESS_RESET');
      return Object.assign({}, state, {
        org_registration_success: false
      });

    case ProfileActions.PROFILE_COVER_UPDATE:
      return Object.assign({}, state, {
        cover_updating: true,
        cover_img_upload_success: false,
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
        profile_loaded: false,
        current_user_profile_loading: false
      });

    case ProfileActions.LOAD_CURRENT_USER_PROFILE_SUCCESS:
      let cards;

      // Get state from localstorage
      const pType = localStorage.getItem('profileType') || 'profile';
      cards = getActiveProfile(payload, pType);

      return Object.assign({}, state, {
        profile_navigation_details: payload,
        profile_loaded: true,
        current_user_profile_loading: true,
        profile_cards: cards
      });

    case ProfileActions.LOAD_CURRENT_USER_PROFILE_FAILED:
      return Object.assign({}, state, {
        success: false,
        profile_loaded: false,
        current_user_profile_loading: false
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
        profile_details: payload,
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
      return Object.assign({}, state, {
        userQuickAccess: [],
        success: true
      });

    case ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS_SUCCESS:
      return Object.assign({}, state, {
        userQuickAccess: payload,
        success: true
      });

    case ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS_FAILED:
      return Object.assign({}, state, {
        success: false
      });


    /**
     * Get User Media Post
     */
    case ProfileActions.LOAD_USER_MEDIA:
      if (payload.page_start === 0) {
        return Object.assign({}, state, {
          user_posts_loading: true,
          user_posts_loaded: false,
          user_posts: []
        });
      }
      return Object.assign({}, state, {
        user_posts_loading: true,
        user_posts_loaded: false
      });


    case ProfileActions.LOAD_USER_MEDIA_SUCCESS:
      const posts = payload['SUCCESS'] || [];
      const new_post = state.user_posts.concat(posts)
      return Object.assign({}, state, {
        mediaEntity: payload,
        user_posts_loaded: true,
        user_posts_loading: false,
        user_posts: new_post
      });

    case ProfileActions.LOAD_USER_MEDIA_FAILED:

    return Object.assign({}, state, {
        user_posts_loaded: false,
        user_posts_loading: false
      });

     /**
     * Get User following Media Post
     */
    case ProfileActions.LOAD_USER_FOLLOWING_POSTS:
    if (payload.page_start === 0) {
      return Object.assign({}, state, {
        user_following_posts_loading: true,
        user_following_posts_loaded: false,
        user_following_posts: []
      });
    }
    return Object.assign({}, state, {
      user_following_posts_loading: true,
      user_following_posts_loaded: false
    });


  case ProfileActions.LOAD_USER_FOLLOWING_POSTS_SUCCESS:
  // console.log(payload)
    const followingPosts = payload.mediaResponse;
    const following_new_post = state.user_following_posts.concat(followingPosts)
    return Object.assign({}, state, {
      mediaEntity: payload,
      user_following_posts_loaded: true,
      user_following_posts_loading: false,
      user_following_posts: following_new_post,
      user_following_post_scroll_id: payload.scrollId
    });

  case ProfileActions.LOAD_USER_FOLLOWING_POSTS_FAILED:

  return Object.assign({}, state, {
    user_following_posts_loaded: false,
      user_following_posts_loading: false
    });

    /**
     * Get current User channel of profile
     */
  case ProfileActions.CHANNEL_SAVE:
    return Object.assign({}, state, {
      channel_saved: false,
      user_channels_loaded: false,
      channel_create_success: false
    });

  case ProfileActions.CHANNEL_SAVE_SUCCESS:
    return Object.assign({}, state, {
      channel_created_details: payload['SUCCESS'],
      channel_saved: true,
      channel_create_success: true
    });

  case ProfileActions.CHANNEL_SAVE_FAILED:
    return Object.assign({}, state, {
      channel_saved: false
    });

  /**
   * User channel update
   */
  case ProfileActions.CHANNEL_UPDATE:
    return Object.assign({}, state, {
      channel_updated: false
    });

  case ProfileActions.CHANNEL_UPDATE_SUCCESS:
    return Object.assign({}, state, {
      channel_updated: true
    });

  case ProfileActions.CHANNEL_UPDATE_FAILED:
    return Object.assign({}, state, {
      channel_updated: false
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
     * Get current user following channel
     */
    case ProfileActions.LOAD_CURRENT_USER_FOLLOWING_CHANNEL:
    if (payload.page_start === 0) {
      return Object.assign({}, state, {
        user_following_channels_loading: true,
        user_following_channels_loaded: false,
        user_following_channel: []
      });
    }
      return Object.assign({}, state, {
        // success: true,
        user_following_channels_loading: true,
        user_following_channels_loaded: false
      });

    case ProfileActions.LOAD_CURRENT_USER_FOLLOWING_CHANNEL_SUCCESS:
    const followingChannel = payload['spotFeedResponse'];
    const following_new_channel = state.user_following_channel.concat(followingChannel)
      return Object.assign({}, state, {
        user_channel_scroll_id: payload['scrollId'],
        user_following_channel: following_new_channel,
        user_following_channels_loaded: true,
        user_following_channels_loading: false
      });

    case ProfileActions.LOAD_CURRENT_USER_FOLLOWING_CHANNEL_FAILED:
      return Object.assign({}, state, {
        user_following_channels_loading: false,
        user_following_channels_loaded: false
      });

    /**
     * Get current User channel of profile
     */
    case ProfileActions.LOAD_USER_CHANNEL:
      return Object.assign({}, state, {
        other_channels_loading: true,
        other_channels_loaded: false,
        other_channel: []
      });

    case ProfileActions.LOAD_USER_CHANNEL_SUCCESS:
      return Object.assign({}, state, {
        other_channel: payload['spotFeedResponse'],
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
     * Profile Follow
     */
    case ProfileActions.PROFILE_UNFOLLOW_SUCCESS:
      const v = state.profile_other
      if (v && v.extra && v.extra.isFollowing) {
        v.extra.isFollowing = false
      }
      if (v && v.followersCount) {
        v.followersCount = state.profile_other.followersCount - 1
      }

      return Object.assign({}, state, {
        profile_other: v
      });

    case ProfileActions.PROFILE_FOLLOW_SUCCESS:
      const x = state.profile_other
      if (x && x.extra && x.extra.isFollowing) {
        x.extra.isFollowing = true
      }
      if (x && x.followersCount) {
        x.followersCount = state.profile_other.followersCount + 1
      }

      return Object.assign({}, state, {
        profile_other: x
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
        // profile_other_loaded: false
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
     * Follow Profile
     */
    case ProfileActions.CHANNEL_FOLLOW:
      return Object.assign({}, state, {
        channel_followed: false
      });

    case ProfileActions.CHANNEL_FOLLOW_SUCCESS:
      return Object.assign({}, state, {
        channel_followed: true
      });

    case ProfileActions.CHANNEL_FOLLOW_FAILED:
      return Object.assign({}, state, {
        channel_followed: false
      });

    /**
     * Current user Profile
     */
    case ProfileActions.CURRENT_PROFILE_USER:
      return Object.assign({}, state, {
        current_user_profile: payload,
        profile_user_info : payload
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
      if (payload.page_start === 0) {
        return Object.assign({}, state, {
          success: true,
          spotfeed_loading: false,
          spotfeed_request_params: payload,
          spotfeed_detail: []
        });
      } else {
        return Object.assign({}, state, {
          success: true,
          spotfeed_loading: false,
          spotfeed_request_params: payload
        });
      }

    case ProfileActions.GET_SPOTFEED_DETAILS_SUCCESS:
      const new_spotfeed = payload['SUCCESS'] || [];
      if (state.spotfeed_request_params.page_start === 0) {
        // appending the new spotfeeds and profile to the existing records in the state
        return Object.assign({}, state, {
          spotfeed_loading: false,
          spotfeed_detail: new_spotfeed
        });
      } else {
        // appending the new spotfeeds and profile to the existing records in the state
        state.spotfeed_detail.spotfeedMedia = [...state.spotfeed_detail.spotfeedMedia, ...new_spotfeed.spotfeedMedia];
        state.spotfeed_detail.spotfeedProfiles = [...state.spotfeed_detail.spotfeedProfiles, ...new_spotfeed.spotfeedProfiles];
        // appending the new spotfeeds and profile to the existing records in the state
        return Object.assign({}, state, {
          spotfeed_loading: false,
          spotfeed_detail: state.spotfeed_detail
        });
      }

    case ProfileActions.GET_SPOTFEED_DETAILS_FAILED:
      return Object.assign({}, state, {
        success: false
      });

      // Get single spotfeed details
    case ProfileActions.CHANNEL_DELETE:
      return Object.assign({}, state, {
        channel_delete_success: false,
      });

    case ProfileActions.CHANNEL_DELETE_SUCCESS:
      return Object.assign({}, state, {
        channel_delete_success: true,
      });

    case ProfileActions.CHANNEL_DELETE_FAILED:
      return Object.assign({}, state, {
        channel_delete_success: false,
      });

    /**
     * Current user status list load
     */
    case ProfileActions.LOAD_USER_STATUS:
      return Object.assign({}, state, {
      });

    case ProfileActions.LOAD_USER_STATUS_SUCCESS:
      return Object.assign({}, state, {
        user_status_list: payload
      });

    case ProfileActions.LOAD_USER_STATUS_FAILED:
      return Object.assign({}, state, {

      });

    /**
     * Pin channel
     */
    case ProfileActions.PIN_CHANNEL_SUCCESS:
      return Object.assign({}, state, {
        channel_pin_success: true
      });

    case ProfileActions.PIN_CHANNEL_FAILED:
      return Object.assign({}, state, {
        channel_pin_failed: true
      });

    /**
     * Unpin channel
     */
    case ProfileActions.UNPIN_CHANNEL_SUCCESS:
      return Object.assign({}, state, {
        channel_unpin_success: true
      });

    case ProfileActions.UNPIN_CHANNEL_FAILED:
      return Object.assign({}, state, {
        channel_unpin_failed: true
      });

      /**
       * [TEMP] Load all profiles
       */
    case ProfileActions.LOAD_ALL_PROFILES:
      return Object.assign({}, state, {
        user_profiles_all_loaded: false
      });
    case ProfileActions.LOAD_ALL_PROFILES_SUCCESS:
      // console.log(payload)
      const resp = payload.profileResponse;
      const profile_list = state.user_profiles_all.concat(resp)
      return Object.assign({}, state, {
        user_profiles_all_loaded: true,
        user_profiles_all: profile_list,
        people_follow_scroll_id: payload.scrollId
      });

    case ProfileActions.LOAD_ALL_PROFILES_FAILED:
      return Object.assign({}, state, {
        user_profiles_all_loaded: false
      });

    /**
     * [TEMP] Load All directory
     */
    case ProfileActions.LOAD_DIRECTORY:
      if (payload.offset === 0) {
        return Object.assign({}, state, {
          dir_list: [],
          dir_list_loaded: false,
        });
      }
      return Object.assign({}, state, {
        dir_list_loading: true,
        dir_list_loaded: false,
      });

    case ProfileActions.LOAD_DIRECTORY_SUCCESS:
      const list = payload['profileResponse'];
      const dir_lists = state.dir_list.concat(list)
      return Object.assign({}, state, {
        user_directory_scroll_id: payload['scrollId'],
        dir_list_loading: false,
        dir_list_loaded: true,
        dir_list: dir_lists,
      });

    /**
     *  Get List of Block Users
     */
    case ProfileActions.LOAD_BLOCK_USERS:
      return Object.assign({}, state, {
        blockedUsers: []
      });

    case ProfileActions.LOAD_BLOCK_USERS_SUCCESS:
      return Object.assign({}, state, {
        blockedUsers: payload
      });
    case ProfileActions.LOAD_BLOCK_USERS_FAILED:
      return Object.assign({}, state, {
      });

    /**
     *  UnBlock Users
     */
    case ProfileActions.UNBLOCK_USER:
      return Object.assign({}, state, {
      });

    case ProfileActions.UNBLOCK_USER_SUCCESS:
      return Object.assign({}, state, {
      });
    case ProfileActions.UNBLOCK_USER_FAILED:
      return Object.assign({}, state, {
      });

    /**
     *  Get default notification
     */
    case ProfileActions.DEFAULT_NOTIFICATION_SETTINGS:
    return Object.assign({}, state, {
      default_notification: []
    });
    case ProfileActions.DEFAULT_NOTIFICATION_SETTINGS_SUCCESS:
    // console.log(payload)
    return Object.assign({}, state, {
      default_notification: payload.settings.notificationSettings,
      adult_Content: payload.settings.allowARC,
      privateAccount: payload.settings.privateAccount,
      preferences: payload.settings.homePagePreferences.preferences
    });

    case ProfileActions.DEFAULT_NOTIFICATION_SETTINGS_FAILED:
    return Object.assign({}, state, {
    });


    /* Create Org */
    case OrganizationActions.ORGANIZATION_REGISTRATION:
      return Object.assign({}, state, {
        status_saved: false
      });
    case OrganizationActions.ORGANIZATION_REGISTRATION_SUCCESS:
      return Object.assign({}, state, {
        org_registration_success: true
      });
    case OrganizationActions.ORGANIZATION_REGISTRATION_FAILED:
      return Object.assign({}, state, {
        org_registration_failed: true
      });
    /* Create Org */

    /* Load Org */
    case OrganizationActions.LOAD_ORGANIZATION:
      return Object.assign({}, state, {
        status: 'laoding',
        orgHandle: payload,
      });
    case OrganizationActions.LOAD_ORGANIZATION_SUCCESS:
      return Object.assign({}, state, {
        status: 'loaded',
        profile_details: payload,
      });
    case OrganizationActions.LOAD_ORGANIZATION_FAILED:
      return Object.assign({}, state, {
        status: 'failed'
      });
    /* Load Org */

    /**
     * Load image to database
     */
    case OrganizationActions.IMAGE_UPLOAD_SERVER:
      return Object.assign({}, state, {
        profile_img_upload_loading: true,
        image_upload_starting: true,
        image_upload_success: false,
        success: true
      });
    case OrganizationActions.IMAGE_UPLOAD_SERVER_SUCCESS:
      return Object.assign({}, state, {
        profileImage: payload['SUCCESS'],
        image_upload_success: true,
        image_upload_starting: false,
        profile_img_upload_loading: false,
        success: true
      });
    case OrganizationActions.IMAGE_UPLOAD_SERVER_FAILED:
      return Object.assign({}, state, {
        image_upload_starting: false,
        success: false
      });

    /**
     * Org Profile Update
     */
    case OrganizationActions.ORG_PROFILE_UPDATE:
      return Object.assign({}, state, {
        org_profile_update_success: false,
        org_profile_update_req_body: payload
      });
    case OrganizationActions.ORG_PROFILE_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        org_profile_update_success: true
      });
    case OrganizationActions.ORG_PROFILE_UPDATE_FAILED:
      return Object.assign({}, state, {
        org_profile_update_failed: true
      });

    /**
     * Get Org Profile Deatils
     */
    case OrganizationActions.ORG_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        profile_navigation_details: payload
      });

    /**
     * Get Org Profile Deatils
     */
    case OrganizationActions.ORG_PROFILE_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        profile_details: payload,
        profile_organization: payload
      });

    case OrganizationActions.ORGANIZATION_DELETE:
      return Object.assign({}, state, {
        status_saved: false
      });
    case OrganizationActions.ORGANIZATION_DELETE_SUCCESS:
      return Object.assign({}, state, {
        org_deletion_success: true
      });
    case OrganizationActions.ORGANIZATION_DELETE_FAILED:
      return Object.assign({}, state, {
        org_deletion_failed: true
      });

    case OrganizationActions.GET_RECEIPIENT:
      return Object.assign({}, state, {
        receipients: [],
        receipients_loaded: false
      });
    case OrganizationActions.GET_RECEIPIENT_SUCCESS:
      return Object.assign({}, state, {
        receipients: payload,
        receipients_loaded: true
      });
    case OrganizationActions.GET_RECEIPIENT_FAILED:
      return Object.assign({}, state, {
        success: false,
        receipients_loaded: false
      });

    case OrganizationActions.GET_MEMBERS:
      return Object.assign({}, state, {
        members_loading: false
      });
    case OrganizationActions.GET_MEMBERS_SUCCESS:
      return Object.assign({}, state, {
        members_loading: true,
        organizationMembers: payload
      });
    case OrganizationActions.GET_MEMBERS_FAILED:
      return Object.assign({}, state, {
        members_loading: false
      });

    /**
    * get default settings of an organization
    */
    case OrganizationActions.GET_ORGANIZATION_BY_HANDLE:
    return Object.assign({}, state, {
        defaultSettings: []

    });
    case OrganizationActions.GET_ORGANIZATION_BY_HANDLE_SUCCESS:
    return Object.assign({}, state, {
        defaultSettings: payload.extras.settings
    });

    case OrganizationActions.GET_ORGANIZATION_BY_HANDLE_FAILED:
    return Object.assign({}, state, {
        success: false
    });

    /**
    * Get current Org channels
    */
    case OrganizationActions.LOAD_ORG_CHANNELS:
    return Object.assign({}, state, {
        org_channels_loading: true,
        org_channels_loaded: false,
        org_channels: []
    });

    case OrganizationActions.LOAD_ORG_CHANNELS_SUCCESS:
    return Object.assign({}, state, {
        org_channels: payload,
        org_channels_loading: false,
        org_channels_loaded: true
    });

    case OrganizationActions.LOAD_ORG_CHANNELS_FAILED:
      return Object.assign({}, state, {
        org_channels_loading: false,
        org_channels_loaded: false
      });


    case ProfileActions.CHANGE_PROFILE:
      /**
       * @TODO
       * Make sure it is pure function
       */
      let profileType = 'profile';
      if (payload.other.isOrg === true) {
        profileType = 'organization';
        localStorage.setItem('profileHandle', state.profile_navigation_details['organization']['organizationHandle']);
        localStorage.setItem('profileUsername', state.profile_navigation_details['organization']['organizationUserName']);
      } else {
        localStorage.setItem('profileHandle', state.profile_navigation_details.handle);
        localStorage.setItem('profileUsername', state.profile_navigation_details.username);
      }

      localStorage.setItem('profileType', profileType);
      const profileData =  getActiveProfile(state.profile_navigation_details, profileType )

      return Object.assign({}, state, {
        profile_cards: profileData
      });

    /**
     * Member invitation to join org
     */
    case OrganizationActions.INVITE_MEMBER:
    return Object.assign({}, state, {
        sending_invite: true,
        invite_sent: false,
        org_invite_req_data: payload
    });

    case OrganizationActions.INVITE_MEMBER_SUCCESS:
    return Object.assign({}, state, {
        sending_invite: false,
        invite_sent: true
    });

    case OrganizationActions.INVITE_MEMBER_FAILED:
    return Object.assign({}, state, {
        sending_invite: false,
        invite_sent: false
    });

    /**
     * Load an imported profile
     */
    case ProfileActions.GET_IMPORTED_PROFILE:
      return Object.assign({}, state, {
        profile_other: [],
        profile_other_loading: true,
      });

    case ProfileActions.GET_IMPORTED_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        profile_other_loading: false,
        profile_other_loaded: true,
        profile_other: payload.SUCCESS.user
      });

    case ProfileActions.GET_IMPORTED_PROFILE_FAILED:
      return Object.assign({}, state, {
        profile_other: [],
        profile_other_loading: false
      });

    /**
     * Sent network request
     */
    case ProfileActions.SENT_NETWORK_REQUEST:
    return Object.assign({}, state, {
      network_sent_request_success: [],
      network_sent_request_fail: [],
      network_request_success: null
    });

  case ProfileActions.SENT_NETWORK_REQUEST_SUCCESS:
  console.log(payload)
    return Object.assign({}, state, {
      network_sent_request_success: payload,
      network_request_success: true
      // network_sent_request_fail: [],
    });

  case ProfileActions.SENT_NETWORK_REQUEST_FAILED:
    console.log(payload._body)
    return Object.assign({}, state, {
      // network_sent_request_success: [],
      network_sent_request_fail: payload._body,
      network_request_success: false
    });

    default:
      return state;
  }

}

export const currentUserProfile = (state: ProfileModal) => state.completed;

export function currenCurrntUser(state: State) {
  return state.current_user_profile;
}
