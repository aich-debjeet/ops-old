export class Login {
 completed: string[];
 loading = false;
 success = true;
 user_unique= false;

}

export class Register {
 completed: string[];
 loading = false;
 success = true;
 user_unique = false
}

export class RegisterProfile {
 completed: string[];
 loading = false;
 success = true;
 user_unique: false
}

export class UserTag {
  success: boolean
}

export const initialTag: Login = {
  completed: [],
  loading:  false,
  success: true,
  user_unique: false
};

export class RegValue {
  mainTitle: string;
  description: string;
  loginLink: Boolean;
}


