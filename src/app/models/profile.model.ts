
export class ProfileModal {
  completed: string[];
  loading: false;
  success: true;
  profileUser?: string[];
  editWork?: string[];
  profileDetails?: string[];
  profileUpdateSuccess?: boolean
  editWorksuccess?: boolean;
  channelEntity?: any;
}

export class ProfileForm {
  name: string
}

export const initialTag: ProfileModal = {
  completed: [],
  loading:  false,
  success: true,
  profileUser: [],
  channelEntity: false
};
