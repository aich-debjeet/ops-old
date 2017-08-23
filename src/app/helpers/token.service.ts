import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class TokenService {

  constructor() { }
  /**
   * Get Token from LocalStorage
   */
  getToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
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
