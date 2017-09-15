
export class ProfileModal {
  completed: string[];
  loading: false;
  success: true;
  profileUser?: string[];
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
  home_spotfeeds: any;
  home_spotfeeds_loading: boolean;
  home_spotfeeds_loaded: boolean;
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
  profile_other: [],
  profile_other_loading: false,
  profile_other_loaded: false,
  other_channel: [],
  other_channels_loading: false,
  other_channels_loaded: false,
  user_channel: [],
  user_channels_loading: false,
  user_channels_loaded: false,
  home_spotfeeds: [],
  home_spotfeeds_loading: false,
  home_spotfeeds_loaded: false,
};

export class ProfileCard {
  name: string;
  image: {
    profile: string;
    cover: string;
  };
  userHandle: string;
  userBio: any;
  userDetails: any; // All Other Datas
  followingCount: number;
  follwerCount: number;
  spotCount: number;
}

export class Spotfeed {
  spotfeed_detail?: any[];
  spotfeed_loading: false;
}
