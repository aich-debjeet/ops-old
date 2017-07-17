import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RegisterService {

  user: User;
  //API_LINK = 'http://localhost:9000/api/1.0/portal';
  API_LINK = 'http://devservices.greenroom6.com:9000/api/1.0/portal';

  constructor(
    private _http: Http
  ) { }

  saveUser(user: User) {
    this.user = user;

    //return this._http.post(this.API_LINK + '/auth/user', this.user)
    // return this._http.post('http://localhost:9000/api/1.0/portal/auth/user', this.user)
    // .map(data => data.json())
    // .toPromise();

    return '{"status": "success"}';
  }

}


class User {
  name: String;
  username: String;
  gender: String;
  dob: String;
  email: String;
  number: String;
  password: String;
  confirmPassword: String;
}
