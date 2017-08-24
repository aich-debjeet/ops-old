import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class TokenService {

  constructor(private router: Router) { }
  /**
   * Get Token from LocalStorage
   */
  getToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // redirect user to the login page if access_token is not available
    if (currentUser === null || currentUser.access_token === null) {
      this.router.navigate(['login']);
      return false;
    }

    const token = currentUser.access_token; // your token
    return token;
  }

  /**
   * Build Autherization Header based on token
   */
  getAuthHeader() {
    const token = this.getToken();
    const headers = new Headers({ 'Content-Type': 'application/json'});
    headers.append('Authorization', 'Bearer ' + token);
    return headers;
  }

}
