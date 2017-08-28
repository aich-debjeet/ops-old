
export class ProfileModal {
  completed: string[];
  loading: false;
  success: true;
  profileUser?: string[];
  profileDetails?: string[];
  profileUpdateSuccess?: boolean
}

export class ProfileForm {
  name: string
}


export const initialTag: ProfileModal = {
  completed: [],
  loading:  false,
  success: true,
  profileUser: []
};
