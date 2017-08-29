export class Login {
 completed: string[];
 loading = false;
 success = true;
 user_unique = false;
 fp_user_exists?: false;
 fp_user_options?: any;
 fp_user_input?: any;
 fp_userdata_resp?: any;
}

export class Register {
 completed: string[];
 loading = false;
 success = true;
 user_unique = false
}

export class AuthModel {
 completed: string[];
 loading = false;
 success = true;
 user_unique = false
}

export class SearchCards {}

export class RegisterProfile {
 completed: string[];
 loading = false;
 success = true;
 user_unique: false
}

export interface RightBlockTag {
  mainTitle: string;
  secondHead: string;
  description: string;
  loginLink: Boolean;
  button_text: string;
  button_link: string;
  page: boolean;
  img: string;
}

export class UserCheckTag {
  completed: string[];
  loading = false;
  success = true;
}

export class UserTag {
  success: boolean
}

export const initialTag: Login = {
  completed: [],
  loading:  false,
  success: true,
  user_unique: false,
  fp_user_exists: false,
  fp_userdata_resp: []
};

export class Follow {
 completed: ArtistFollows[];
 loading = false;
 success = true;
 user_unique = false;
 skills?: String[];
}
export class ArtistFollows {
  isFollowing: boolean;
}

export const artistFollowTag: Follow = {
  completed: [
    // isFollowing: true,
  ],
  loading:  false,
  success: true,
  user_unique: false
};

export class RegValue {
  mainTitle: string;
  description: string;
  loginLink: Boolean;
  button_text: string;
  button_link: string;
}

export class ArtistFollow {
  name: string;
  coverImage: string;
  is_follow: boolean;
}

export const initialArtistFollow: ArtistFollow = {
  name: null,
  coverImage: null,
  is_follow: true,
}

export class RegCode {
  Code: number;
}

export class BasicRegTag {
  completed: RegCode[];
  loading = false;
  success = true;
  user_unique= false;
}

export const initialBasicRegTag: BasicRegTag = {
  completed: [],
  loading: false,
  success: true,
  user_unique: false,
}
