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

export class SearchCards{}

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

// interface AuthConfig {
//   CLIENT_ID: string;
//   CLIENT_DOMAIN: string;
//   AUDIENCE: string;
//   REDIRECT: string;
//   SCOPE: string;
// }

// export const AUTH_CONFIG: AuthConfig = {
//   CLIENT_ID: 'YOUR-AUTH0-CLIENT-ID',
//   CLIENT_DOMAIN: 'YOUR-AUTH0-DOMAIN.auth0.com',
//   AUDIENCE: 'YOUR-AUTH0-API-IDENTIFIER',
//   REDIRECT: 'http://localhost:4200/callback',
//   SCOPE: 'openid'
// };
