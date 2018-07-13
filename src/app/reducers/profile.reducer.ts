import { ActionReducer, Action } from '@ngrx/store';
import { initialTag, ProfileModal, ProfileCards, UserCard} from '../models/profile.model';

import { ProfileActions } from '../actions/profile.action';
import { OrganizationActions } from '../actions/organization.action';
import * as _ from 'lodash';

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

    /**
     * for: portfolio
     */
    case ProfileActions.PORT_REMOVE_MEDIA_FROM_CAT:
      return Object.assign({}, state, {
        port_remove_media_from_cat: true,
        port_remove_media_from_cat_success: false,
        get_port_display_media_result: state['get_port_display_media_result'].filter(i => i.mediaId !== payload.mediaId)
      });

    case ProfileActions.PORT_REMOVE_MEDIA_FROM_CAT_SUCCESS:
      return Object.assign({}, state, {
        port_remove_media_from_cat: false,
        port_remove_media_from_cat_success: true
      });

    case ProfileActions.PORT_REMOVE_MEDIA_FROM_CAT_FAILED:
      return Object.assign({}, state, {
        port_remove_media_from_cat: false,
        port_remove_media_from_cat_success: false
      });

    /**
     * for: portfolio
     */
    case ProfileActions.PORTFOLIO_DELETE_CATEGORY:
      return Object.assign({}, state, {
        portfolio_delete_category: true,
        portfolio_delete_category_success: false,
        get_portfolio_categories_result: state['get_portfolio_categories_result'].filter(i => i.categoryId !== payload)
      });

    case ProfileActions.PORTFOLIO_DELETE_CATEGORY_SUCCESS:
      return Object.assign({}, state, {
        portfolio_delete_category: false,
        portfolio_delete_category_success: true
      });

    case ProfileActions.PORTFOLIO_DELETE_CATEGORY_FAILED:
      return Object.assign({}, state, {
        portfolio_delete_category: false,
        portfolio_delete_category_success: false
      });

    /**
     * for: portfolio
     */
    case ProfileActions.PORTFOLIO_UPDATE_CATEGORY_NAME:
      return Object.assign({}, state, {
        portfolio_update_category_name: true,
        portfolio_update_category_name_success: false,
        portfolio_update_category_name_query: payload
      });

    case ProfileActions.PORTFOLIO_UPDATE_CATEGORY_NAME_SUCCESS:
      return Object.assign({}, state, {
        portfolio_update_category_name: false,
        portfolio_update_category_name_success: true,
        portfolio_update_category_name_result: payload
      });

    case ProfileActions.PORTFOLIO_UPDATE_CATEGORY_NAME_FAILED:
      return Object.assign({}, state, {
        portfolio_update_category_name: false,
        portfolio_update_category_name_success: false
      });

    /**
     * for: portfolio
     */
    case ProfileActions.PORTFOLIO_PUBLISH_ACTION:
      const new_portfolio_user_profile = state['portfolio_user_profile'];
      if (payload === 'publish') {
        new_portfolio_user_profile['extra']['isPublished'] = true;
      } else {
        new_portfolio_user_profile['extra']['isPublished'] = false;
      }
      console.log('payload', payload);
      console.log('new state', new_portfolio_user_profile['extra']['isPublished']);
      return Object.assign({}, state, {
        portfolio_publish_action: true,
        portfolio_publish_action_success: false,
        portfolio_publish_action_query: payload,
        portfolio_user_profile: new_portfolio_user_profile
      });

    case ProfileActions.PORTFOLIO_PUBLISH_ACTION_SUCCESS:
      return Object.assign({}, state, {
        portfolio_publish_action: false,
        portfolio_publish_action_success: true,
        portfolio_publish_action_result: payload
      });

    case ProfileActions.PORTFOLIO_PUBLISH_ACTION_FAILED:
      return Object.assign({}, state, {
        portfolio_publish_action: false,
        portfolio_publish_action_success: false
      });

    /**
     * for: portfolio
     */
    case ProfileActions.GET_PORTFOLIO_DISPLAY_MEDIA:
      return Object.assign({}, state, {
        add_media_to_category: false,
        add_media_to_category_success: false,
        get_port_display_media: true,
        get_port_display_media_success: false,
        get_port_display_media_query: payload
      });

    case ProfileActions.GET_PORTFOLIO_DISPLAY_MEDIA_SUCCESS:
      let new_port_media;
      if (state['get_port_display_media_query']['offset'] === 0) {
        new_port_media = payload.SUCCESS['medias'];
      } else {
        new_port_media = [...state['get_port_display_media_result'], ...payload.SUCCESS['medias']];
      }
      return Object.assign({}, state, {
        get_port_display_media: false,
        get_port_display_media_success: true,
        get_port_display_media_result: new_port_media,
        get_portfolio_categories_result: payload.SUCCESS['categories'],
        // portfolio_is_published: true
      });

    case ProfileActions.GET_PORTFOLIO_DISPLAY_MEDIA_FAILED:
      return Object.assign({}, state, {
        get_port_display_media: false,
        get_port_display_media_success: false,
        // portfolio_is_published: false
      });

    /**
     * for: portfolio
     */
    case ProfileActions.GET_USERS_CHANNELS:
      return Object.assign({}, state, {
        add_media_to_category: false,
        add_media_to_category_success: false,
        get_users_channels: true,
        get_users_channels_success: false,
        get_users_channels_query: payload
      });

    case ProfileActions.GET_USERS_CHANNELS_SUCCESS:
      return Object.assign({}, state, {
        get_users_channels: false,
        get_users_channels_success: true,
        get_users_channels_result: payload
      });

    case ProfileActions.GET_USERS_CHANNELS_FAILED:
      return Object.assign({}, state, {
        get_users_channels: false,
        get_users_channels_success: false
      });

    /**
     * for: portfolio
     */
    case ProfileActions.GET_USER_MEDIA:
      return Object.assign({}, state, {
        add_media_to_category: false,
        add_media_to_category_success: false,
        get_users_media: true,
        get_users_media_success: false,
        get_users_media_query: payload
      });

    case ProfileActions.GET_USER_MEDIA_SUCCESS:
      let new_user_media;
      if (state['get_users_media_query']['offset'] === 0) {
        new_user_media = payload.SUCCESS;
      } else {
        new_user_media = [...state['get_users_media_result'], ...payload.SUCCESS];
      }
      // check if pagination query
      return Object.assign({}, state, {
        get_users_media: false,
        get_users_media_success: true,
        get_users_media_result: new_user_media
      });

    case ProfileActions.GET_USER_MEDIA_FAILED:
      return Object.assign({}, state, {
        get_users_media: false,
        get_users_media_success: false
      });

    /**
     * for: portfolio
     */
    case ProfileActions.GET_PORTFOLIO_CATEGORIES:
      return Object.assign({}, state, {
        add_media_to_category: false,
        add_media_to_category_success: false,
        get_portfolio_categories: true,
        get_portfolio_categories_success: false,
        get_portfolio_categories_params: payload
      });

    case ProfileActions.GET_PORTFOLIO_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        get_portfolio_categories: false,
        get_portfolio_categories_success: true,
        get_portfolio_categories_result: payload.SUCCESS
      });

    case ProfileActions.GET_PORTFOLIO_CATEGORIES_FAILED:
      return Object.assign({}, state, {
        get_portfolio_categories: false,
        get_portfolio_categories_success: false
      });

    /**
     * for: portfolio
     */
    case ProfileActions.ADD_PORTFOLIO_CATEGORY:
      return Object.assign({}, state, {
        add_media_to_category: false,
        add_media_to_category_success: false,
        create_portfolio_category: true,
        create_portfolio_category_success: false,
        create_portfolio_category_params: payload
      });

    case ProfileActions.ADD_PORTFOLIO_CATEGORY_SUCCESS:
      // add new category to the existing list
      return Object.assign({}, state, {
        get_portfolio_categories_result: [...state['get_portfolio_categories_result'], payload['SUCCESS']],
        create_portfolio_category: false,
        create_portfolio_category_success: true,
        create_portfolio_category_result: payload.SUCCESS
      });

    case ProfileActions.ADD_PORTFOLIO_CATEGORY_FAILED:
      return Object.assign({}, state, {
        create_portfolio_category: false,
        create_portfolio_category_success: false
      });

    /**
     * for: portfolio
     */
    case ProfileActions.ADD_MEDIA_TO_CATEGORY:
      return Object.assign({}, state, {
        add_media_to_category: true,
        add_media_to_category_success: false,
        add_media_to_category_query: payload
      });

    case ProfileActions.ADD_MEDIA_TO_CATEGORY_SUCCESS:
      return Object.assign({}, state, {
        add_media_to_category: false,
        add_media_to_category_success: true,
        add_media_to_category_result: payload.SUCCESS
      });

    case ProfileActions.ADD_MEDIA_TO_CATEGORY_FAILED:
      return Object.assign({}, state, {
        add_media_to_category: false,
        add_media_to_category_success: false
      });

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
    if (payload.scrollId === null) {
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
      if (payload.scrollId === null) {
        return Object.assign({}, state, {
          user_channel: [],
          user_channels_loading: true,
          user_channels_loaded: false
        });
      }
      return Object.assign({}, state, {
        user_channels_loading: true,
        user_channels_loaded: false
      });

    case ProfileActions.LOAD_CURRENT_USER_CHANNEL_SUCCESS:
      return Object.assign({}, state, {
        user_channel: state.user_channel.concat(payload['spotFeedResponse']),
        user_channels_loaded: true,
        user_channels_loading: false,
        user_channel_scroll_id: payload['scrollId']
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
    if (payload.scrollId === '') {
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
      if (payload.scrollId) {
        return Object.assign({}, state, {
          other_channels_loading: true,
          other_channels_loaded: false,
        });
      }else {
        return Object.assign({}, state, {
          other_channels_loading: true,
          other_channels_loaded: false,
          other_channel: [],
          profile_channel_total: 0
        });
      }

    case ProfileActions.LOAD_USER_CHANNEL_SUCCESS:
      const channel = payload['spotFeedResponse'];
      return Object.assign({}, state, {
        other_channel: state.other_channel.concat(channel) ,
        other_channels_loading: false,
        other_channels_loaded: true,
        profile_scrolling_channel: payload['scrollId'],
        profile_channel_total: payload['total']
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
        success: true,
        profileUpdateSuccess: false
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
      const y = state.other_channel.map(item => {
        return {
          ...item,
          isFollowing: false
        }
      })
      return Object.assign({}, state, {
        profile_other: {
          ...state.profile_other,
          followersCount: state.profile_other.followersCount - 1,
          extra: {
            ...state.profile_other.extra,
            isFollowing: false
          }
        },
        other_channel: state.other_channel ? y : [],
        user_following_posts: state.user_following_posts.filter(post => post.ownerHandle !== payload.ownerHandle),
        user_following_channel: state.user_following_channel.filter(channels => channels.ownerHandle !== payload.ownerHandle)
      });

    case ProfileActions.PROFILE_FOLLOW_SUCCESS:
      const x = state.other_channel.map(item => {
        return {
          ...item,
          isFollowing: true
        }
      })
      return Object.assign({}, state, {
        profile_other: {
          ...state.profile_other,
          followersCount: state.profile_other.followersCount + 1,
          extra: {
            ...state.profile_other.extra,
            isFollowing: true
          }
        },
        other_channel: state.other_channel ? x : [],
        profile_other_followed: true,
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
        other_channel: [],
        other_channels_loading: true,
        profile_other_loading: true,
      });

    case ProfileActions.PROFILE_LOAD_SUCCESS:
      return Object.assign({}, state, {
        profile_other_loading: false,
        profile_other_loaded: true,
        profile_other: payload,
        profiles: [...state.profiles, payload]
      });

    case ProfileActions.PROFILE_LOAD_FAILED:
      return Object.assign({}, state, {
        profile_other: [],
        profile_other_loading: false,
        // profile_other_loaded: false
      });

    /**
     * Load a portfolio Profile
     */
    case ProfileActions.PORTFOLIO_PROFILE_LOAD:
      return state;

    case ProfileActions.PORTFOLIO_PROFILE_LOAD_SUCCESS:
      return Object.assign({}, state, {
        portfolio_user_profile: payload
      });

    case ProfileActions.PORTFOLIO_PROFILE_LOAD_FAILED:
      return state;

    /**
     * Follow Profile
     */
    case ProfileActions.PROFILE_FOLLOW:
      return Object.assign({}, state, {
        profile_other_followed: false
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
        channel_followed: true,
        user_following_channel: state.user_following_channel.filter(channel => channel.spotfeedId !== payload.id)
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
       * load profile people to follow
       */
    case ProfileActions.LOAD_ALL_PROFILES_PROF:
      return Object.assign({}, state, {
        user_profiles_all_loaded_prof: false
      });
    case ProfileActions.LOAD_ALL_PROFILES_PROF_SUCCESS:
      const respProf = payload.profileResponse;
      const profile_list_prof = state.user_profiles_all_prof.concat(respProf)
      return Object.assign({}, state, {
        user_profiles_all_loaded_prof: true,
        user_profiles_all_prof: profile_list_prof,
        people_follow_scroll_id_prof: payload.scrollId
      });

    case ProfileActions.LOAD_ALL_PROFILES_PROF_FAILED:
      return Object.assign({}, state, {
        user_profiles_all_loaded_prof: false
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
       * get network sent requests
       */
    case ProfileActions.SENT_REQUEST_LIST:
      return Object.assign({}, state, {
        network_sent_requests: [],
        get_req: false,
      });

    case ProfileActions.SENT_REQUEST_LIST_SUCCESS:
      return Object.assign({}, state, {
        network_sent_requests: payload,
        get_req: true,
      });

    case ProfileActions.SENT_REQUEST_LIST_FAILED:
      return Object.assign({}, state, {
        network_sent_requests: [],
        get_req: false,
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
    return Object.assign({}, state, {
      network_sent_request_success: payload,
      network_request_success: true
      // network_sent_request_fail: [],
    });

  case ProfileActions.SENT_NETWORK_REQUEST_FAILED:
    return Object.assign({}, state, {
      // network_sent_request_success: [],
      network_sent_request_fail: payload._body,
      network_request_success: false
    });

   /**
     * Get Pending request list
     */
  case ProfileActions.GET_PENDING_REQUEST_LIST:
    return Object.assign({}, state, {
      pending_request_list: [],
      list_loaded: false,
    });

  case ProfileActions.GET_PENDING_REQUEST_LIST_SUCCESS:
    return Object.assign({}, state, {
      pending_request_list: payload,
      list_loaded: true,
    });

  case ProfileActions.GET_PENDING_REQUEST_LIST_FAILED:
    return Object.assign({}, state, {
      pending_request_list: [],
      list_loaded: false,
    });

   /**
     * Get Connection list
     */
  case ProfileActions.GET_ACTIVE_CONNECTIONS_LIST:
  return Object.assign({}, state, {
    active_connection_list: [],
    connection_loaded: false,
  });

  case ProfileActions.GET_ACTIVE_CONNECTIONS_LIST_SUCCESS:
    return Object.assign({}, state, {
      active_connection_list: payload,
      connection_loaded: true,
    });

  case ProfileActions.GET_ACTIVE_CONNECTIONS_LIST_FAILED:
    return Object.assign({}, state, {
      active_connection_list: [],
      connection_loaded: false,
    });

    /**
     * Accept network request
     */
  case ProfileActions.ACCEPT_NETWORK_REQUEST:
    return Object.assign({}, state, {
      accepted_request: false,
      accepted_network_request: [],
      accept_request_payload: payload

    });

  case ProfileActions.ACCEPT_NETWORK_REQUEST_SUCCESS:
    return Object.assign({}, state, {
      accepted_request: true,
      accepted_network_request: payload,
      pending_request_list: state.pending_request_list.filter(request => request.owner.handle !== state.accept_request_payload.receiver_id)
    });

  case ProfileActions.ACCEPT_NETWORK_REQUEST_FAILED:
    return Object.assign({}, state, {
      accepted_request: false,
      accepted_network_request:[]
    });

    /**
     * decline network request
     */
  case ProfileActions.DECLINE_NETWORK_REQUEST:
    return Object.assign({}, state, {
      declined_request: false,
      declined_network_request: [],
      declined_request_payload: payload,
    });

  case ProfileActions.DECLINE_NETWORK_REQUEST_SUCCESS:
    return Object.assign({}, state, {
      declined_request: false,
      declined_network_request: [],
      pending_request_list: state.pending_request_list.filter(request => request.owner.handle !== state.declined_request_payload.receiver_id)
    });

  case ProfileActions.DECLINE_NETWORK_REQUEST_FAILED:
    return Object.assign({}, state, {
      declined_request: false,
      declined_network_request: [],
    });

     /**
     * cancel sent network request
     */
  case ProfileActions.CANCEL_NETWORK_REQUEST:
    return Object.assign({}, state, {
      cancel_network_request: false,
      cancel_sent_request:[],
      cancel_sent_request_data: payload
    });

  case ProfileActions.CANCEL_NETWORK_REQUEST_SUCCESS:
    return Object.assign({}, state, {
      cancel_network_request: true,
      cancel_sent_request: payload,
      network_sent_requests: state.network_sent_requests.filter(request => request.owner.handle !== state.cancel_sent_request_data.receiver_id)
    });

  case ProfileActions.COMMUNITY_MEDIA_POST:
    return Object.assign({}, state, {
      community_media_success: false
    });

  case ProfileActions.COMMUNITY_MEDIA_POST_SUCCESS:
    return Object.assign({}, state, {
      community_media_success: true
    });

  case ProfileActions.CANCEL_NETWORK_REQUEST_FAILED:
    return Object.assign({}, state, {
      cancel_network_request: false,
      cancel_sent_request: []
    });

  case ProfileActions.USER_PASSWORD_UPDATE_SUCCESS:
    return Object.assign({}, state, {
      pass_success : payload,
    });

  case ProfileActions.COMMENT_MORE_SUCCESS:
    const home_post_comment = state.user_following_posts.find(t => t.id === payload[0].postId);
    const home_list_comment_index = state.user_following_posts.indexOf(home_post_comment);

    const profile_post_comment = state.user_following_posts.find(t => t.id === payload[0].postId);
    const profile_list_comment_index = state.user_following_posts.indexOf(profile_post_comment);

      return Object.assign({}, state, {
          user_following_posts: [
              ...state.user_following_posts.slice(0, home_list_comment_index),
              Object.assign({}, home_post_comment, {
                commentsList: payload
              }),
              ...state.user_following_posts.slice(home_list_comment_index + 1)
          ]
      });

    case ProfileActions.COMMENT_POST_DELETE:
      const home_post_delete = state.user_following_posts.find(t => t.id === payload.parent);
      const home_list_delete_index = state.user_following_posts.indexOf(home_post_delete);

      const profile_post_delete_List = state.user_posts.find(t => t.id === payload.parent);
      const profile_list_delete_index = state.user_posts.indexOf(profile_post_delete_List);

      if (home_post_delete) {
        return Object.assign({}, state, {
            user_following_posts: [
                ...state.user_following_posts.slice(0, home_list_delete_index),
                Object.assign({}, home_post_delete, {commentsList: home_post_delete.commentsList.filter(comment => comment.commentsId !== payload.id) }),
                ...state.user_following_posts.slice(home_list_delete_index + 1)
            ],
        });
      }
      if (profile_post_delete_List) {
        return Object.assign({}, state, {
          user_posts: [
            ...state.user_following_posts.slice(0, profile_list_delete_index),
            Object.assign({}, profile_post_delete_List, {commentsList: profile_post_delete_List.commentsList.filter(comment => comment.commentsId !== payload.id) }),
            ...state.user_following_posts.slice(profile_list_delete_index + 1)
          ],
        });
      }
      return state;

  case ProfileActions.COMMENT_POST_LIST:
    const home_post_List = state.user_following_posts.find(t => t.id === payload.postId);
    const home_list_index = state.user_following_posts.indexOf(home_post_List);

    const profile_post_List = state.user_posts.find(t => t.id === payload.postId);
    const profile_list_index = state.user_posts.indexOf(profile_post_List);

    if (home_post_List) {
      return Object.assign({}, state, {
        user_following_posts: [
          ...state.user_following_posts.slice(0, home_list_index),
          Object.assign({}, home_post_List, {
            commentsList: [
            payload,
            ...home_post_List.commentsList
            ],
          }),
          ...state.user_following_posts.slice(home_list_index + 1)
        ]
      });
    }
    if (profile_post_List) {
      return Object.assign({}, state, {
        user_posts: [
          ...state.user_posts.slice(0, profile_list_index),
          Object.assign({}, profile_post_List, {
            commentsList: [
            payload,
            ...profile_post_List.commentsList
            ],
          }),
          ...state.user_posts.slice(profile_list_index + 1)
        ]

      });
    }
    return state;

  case ProfileActions.COMMENT_COUNT_INCREMENT:
    const home_post = state.user_following_posts.find(t => t.id === payload);
    const home_index = state.user_following_posts.indexOf(home_post);
    const home_count = home_post ? home_post.commentsCount + 1 : 0;

    const profile_post = state.user_posts.find(t => t.id === payload);
    const profile_index = state.user_posts.indexOf(profile_post);
    const profile_count = profile_post ? profile_post.commentsCount + 1 : 0;

      return Object.assign({}, state, {
        user_following_posts: [
          ...state.user_following_posts.slice(0, home_index),
          Object.assign({}, home_post, {commentsCount: home_count }),
          ...state.user_following_posts.slice(home_index + 1)
        ],
        user_posts: [
          ...state.user_posts.slice(0, profile_index),
          Object.assign({}, profile_post, {commentsCount: profile_count }),
          ...state.user_posts.slice(profile_index + 1)
        ],

      })

    case ProfileActions.COMMENT_COUNT_DECREMENT:
      const home_post_de = state.user_following_posts.find(t => t.id === payload);
      const home_index_de = state.user_following_posts.indexOf(home_post_de);
      const home_count_de = home_post_de  ? home_post_de.commentsCount - 1 : 0;

      const profile_post_de = state.user_posts.find(t => t.id === payload);
      const profile_index_de = state.user_posts.indexOf(profile_post_de);
      const profile_count_de = profile_post_de ? profile_post_de.commentsCount - 1 : 0;
        return Object.assign({}, state, {
            user_following_posts: [
                ...state.user_following_posts.slice(0, home_index_de),
                Object.assign({}, home_post_de , {commentsCount: home_count_de }),
                ...state.user_following_posts.slice(home_index_de + 1)
            ],
            user_posts: [
              ...state.user_posts.slice(0, profile_index_de),
              Object.assign({}, profile_post_de, {commentsCount: profile_count_de }),
              ...state.user_posts.slice(profile_index_de + 1)
            ],

        })

        case ProfileActions.PROFILE_REPORT:
        return Object.assign({}, state, {
          reports: []
        });
        case ProfileActions.PROFILE_REPORT_SUCCESS:
        return Object.assign({}, state, {
          reports: payload.Success.questions
        });
        case ProfileActions.PROFILE_REPORT_FAILED:
        return Object.assign({}, state, {
          reports: []
        });
    // }

    // return Object.assign({}, state, {

    // })

    default:
      return state;
  }

}

export const currentUserProfile = (state: ProfileModal) => state.completed;

export function currenCurrntUser(state: State) {
  return state.current_user_profile;
}
