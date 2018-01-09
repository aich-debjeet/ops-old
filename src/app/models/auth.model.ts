export class Login {
 completed: string[];
 loading = false;
 success = true;
 user_unique = false;
 fp_user_exists?: false;
 fp_user_options?: any;
 fp_user_input?: any;
 fp_userdata_resp?: any;
 page_loading: boolean;
 error_description?: any;
 fp_create_success?: boolean;
 fp_sumit_otp_failed?: boolean;
 fp_userdata_loading_failed: boolean;
 otp_forget_user_success?: boolean;
 login_status_response?: any;
 login_status?: boolean;
}

export class Register {
 completed: string[];
 loading = false;
 success = true;
 user_unique = false;
 page_loading: false;
}

export class AuthModel {
 completed: string[];
 loading = false;
 success = true;
 user_unique = false;
 page_loading: false;
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
  fp_userdata_resp: [],
  fp_sumit_otp_failed: false,
  fp_create_success: false,
  fp_userdata_loading_failed: false,
  page_loading: false
};

export class Follow {
 completed: ArtistFollows[];
 loading = false;
 success = true;
 user_unique = false;
 skills?: String[];
 industries?: String[];
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
  access_Token?: String;
  user_basic_reg_success?: boolean;
  fp_create_success: boolean;
  user_otp_failed: boolean;
  user_otp_success: boolean;
  user_number_cng_success: boolean;
  user_number_cng_failed: boolean;
  claim_user_info_loading: boolean;
  claim_user_info_loadded: boolean;
  claim_user_info: any;
}

export const initialBasicRegTag: BasicRegTag = {
  completed: [],
  loading: false,
  success: true,
  user_unique: false,
  fp_create_success: false,
  user_otp_failed: false,
  user_otp_success: false,
  user_number_cng_success: false,
  user_number_cng_failed: false,
  claim_user_info_loading: false,
  claim_user_info_loadded: false,
  claim_user_info: []
}

export class Dwc {
  dwc_event_reg_success: boolean;
  err_msg: String
}

export const danceWorldTag: Dwc = {
  dwc_event_reg_success: false,
  err_msg: null
}
