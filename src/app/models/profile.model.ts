
export class ProfileModal {
  completed: string[];
  loading: false;
  success: true;
  profileUser?: any;
  editWork?: string[];
  profileDetails?: any;
  profileUpdateSuccess?: boolean
  editWorksuccess?: boolean;
  channelEntity?: any;
  loadedProfile?: any;
  activeProfile?: ProfileCard;
  profile_loaded: boolean;
  profile_other?: any;
  profile_other_loading: boolean;
  profile_other_loaded: boolean;
  other_channel: any;
  other_channels_loading: boolean;
  other_channels_loaded: boolean;
  user_channel: any;
  user_channels_loading: boolean;
  user_channels_loaded: boolean;
  user_posts: any;
  user_posts_loading: boolean;
  user_posts_loaded: boolean;
  media_channel_posting: boolean;
  media_channel_posted: boolean;
  channel_saved: boolean;
  profiles: any;
  current_user_profile?: any;
}

export class ProfileForm {
  name: string
}

export const initialTag: ProfileModal = {
  completed: [],
  loading:  false,
  success: true,
  profileDetails: [],
  profileUser: [],
  channelEntity: false,
  profile_loaded: false,
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
  // User Posts
  user_posts: [],
  user_posts_loading: false,
  user_posts_loaded: false,
  // Post Media to Channel
  media_channel_posting: false,
  media_channel_posted: false,
  channel_saved: false,
  profiles: []
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
  spotCount: number;
}
