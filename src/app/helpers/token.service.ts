import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class TokenService {
  constructor(private router: Router) { }

  /**
   * Check if the router is for other profile or current profile
   * @param router
   */
  profileType(router: any) {
    let activeUser, isCurrentUser = false;
    const path = router.currentUrlTree.root.children.primary
    if (path.segments.length > 2) {
      activeUser = path.segments[2].path;
      isCurrentUser = false;
    } else {
      isCurrentUser = true;
    }

    return {
      activeUser: activeUser,
      isCurrentUser: isCurrentUser
    }
  }
  /**
   * Get Handle
   */
  getHandle() {
    const currentUserToken = localStorage.getItem('currentUserID');
    if (currentUserToken == null) {
      return '';
    } else {
      return currentUserToken;
    }
  }
  /**
   * Get Token from LocalStorage
   */
  getToken() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let token;
    // check if currentUser is not available
    if (currentUser === null || currentUser.access_token === null) {
      const aToken = localStorage.getItem('access_token');
      if (aToken === null) { return false; }
      token = aToken;
    } else {
      token = currentUser.access_token;
      if (!token) {
        const aToken = localStorage.getItem('access_token');
        if (aToken === null) { return false; }
        token = aToken;
      }
    }
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

  /**
   * Build Autherization Header based on token
   */
  getPlainHeader() {
    const token = this.getToken();
    const headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    return headers;
  }

}
