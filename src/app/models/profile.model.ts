
export class ProfileModal {
  completed: string[];
  loading: false;
  success: true;
  profile_navigation_details?: any;
  profile_cards?: any;
  editWork?: string[];
  profile_details?: any;
  profileUpdateSuccess?: boolean
  editWorksuccess?: boolean;
  channelEntity?: any;
  loadedProfile?: any;
  activeProfile?: ProfileCard;
  profile_loaded: boolean;
  profile_other?: any;
  profile_other_loading: boolean;
  profile_other_loaded?: boolean;
  other_channel: any;
  other_channels_loading: boolean;
  other_channels_loaded: boolean;
  user_channel: any;
  user_channels_loading: boolean;
  user_channels_loaded: boolean;
  user_channel_scroll_id: any;
  user_following_channel: any;
  user_following_channels_loading: boolean;
  user_following_channels_loaded: boolean;
  user_directory_scroll_id: any;
  dir_list_loading: boolean;
  dir_list_loaded: boolean;
  dir_list: any;
  people_follow_scroll_id: any;
  user_following_post_scroll_id: any;
  user_posts: any;
  user_posts_loading: boolean;
  user_posts_loaded: boolean;
  user_following_posts: any;
  user_following_posts_loading: boolean;
  user_following_posts_loaded: boolean;
  media_channel_posting: boolean;
  media_channel_posted: boolean;
  channel_saved: boolean;
  channel_updated: boolean;
  profiles: any;
  current_user_profile?: any;
  userQuickAccess?: any;
  profile_img_upload_loading: boolean;
  cover_upload_loading: boolean;
  cover_img_upload_success: boolean;
  profile_user_info?: any;

  user_profiles_all_loaded: boolean;
  user_profiles_all?: any;
  blockedUsers: string[];
  default_notification?: any;
  adult_Content?: boolean;
  settings?: any;
  preferences?: any;

  searching_following_profiles?: boolean;
  searching_follower_profiles?: boolean;
  searching_following_profiles_success?: boolean;
  searching_follower_profiles_success?: boolean;
  searching_following_params?: string;
  searching_follower_params?: string;
  following_profiles?: any;
  follower_profiles?: any;
  channel_pin_success: boolean;
  channel_pin_failed: boolean;
  channel_unpin_success: boolean;

  network_sent_request_success: string[];
}

export class ProfileForm {
  name: string
}

export const initialTag: ProfileModal = {
  completed: [],
  loading:  false,
  success: true,
  profile_details: [],
  profile_navigation_details: [],
  profile_cards: [],
  channelEntity: false,
  profile_loaded: false,
  userQuickAccess: [],
  // Profile Other
  profile_other: [],
  profile_other_loading: false,
  profile_other_loaded: false,
  // Other User Channels
  other_channel: [],
  other_channels_loading: false,
  other_channels_loaded: false,
  // User Channels
  user_channel: [],
  user_channels_loading: false,
  user_channels_loaded: false,
  // User following channels
  user_channel_scroll_id: '',
  user_following_channel: [],
  user_following_channels_loading: false,
  user_following_channels_loaded: false,
  // User Posts
  user_posts: [],
  user_posts_loading: false,
  user_posts_loaded: false,
  user_following_post_scroll_id: '',
  // User foolowing Posts
  user_following_posts: [],
  user_following_posts_loading: false,
  user_following_posts_loaded: false,
  // Post Media to Channel
  media_channel_posting: false,
  media_channel_posted: false,
  channel_saved: false,
  channel_updated: false,
  profiles: [],
  people_follow_scroll_id: '',

  // directory
  user_directory_scroll_id: '',
  dir_list_loading: false,
  dir_list_loaded: false,
  dir_list: [],

  // Profile & Cover
  cover_upload_loading: false,
  profile_img_upload_loading: false,
  cover_img_upload_success: false,

  // All Profiles
  user_profiles_all_loaded: false,
  user_profiles_all: [],
  // list of block users
  blockedUsers: [],
  channel_pin_success: false,
  channel_unpin_success: false,
  channel_pin_failed: false,

  network_sent_request_success: [],
};

export class ProfileCard {
  name: string;
  image: {
    profile: string;
    cover: string;
  };
  userHandle: string;
  userBio: any;
  userSkill: any;
  userDetails: any; // All Other Datas
  followingCount: number;
  follwerCount: number;
  extra: any;
  isFollowing: boolean;
}

export class Spotfeed {
  spotfeed_detail?: any[];
  spotfeed_loading: false;
}


export class UserCard {
  name: string;
  image: string;
  username: string;
  handle: string;
  isOrg: boolean;
  page_path: string;
}

export class ProfileCards {
  active: UserCard;
  other: UserCard;
}
