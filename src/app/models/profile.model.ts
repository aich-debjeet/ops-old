
export class ProfileModal {
  completed: string[];
  loading: false;
  success: true;
  profileUser?: string[];
  editWork?: string[];
  profileDetails?: string[];
  profileUpdateSuccess?: boolean
  editWorksuccess?: boolean
}

export class ProfileForm {
  name: string
}

// export class WorkFormEdit {
//   company: string;
//   position: string;
//   from: string;
//   to: string;
//   currentWork: string;
//   publicWork: string;
// }


export const initialTag: ProfileModal = {
  completed: [],
  loading:  false,
  success: true,
  profileUser: []
};
