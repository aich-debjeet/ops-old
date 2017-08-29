import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { TokenService } from '../helpers/token.service';


@Injectable()
export class ProfileService {

  private apiLink: string = environment.API_ENDPOINT;

  constructor(
    private tokenService: TokenService,
    private http: Http
    ) { }

  /**
   * Current LoggedIn User Profile.
   */
  getLoggedInProfile() {
    const headers = this.tokenService.getAuthHeader();
    return this.http.get(`${this.apiLink}/portal/network/spotfeed/profile/withCounts/loggedInProfile`, { headers: headers })
        .map((data: Response) => data.json());
  }

  /**
   * Current LoggedIn User Profile.
   */
  getLoggedInProfileDetails() {
    const headers = this.tokenService.getAuthHeader();
    return this.http.get(`${this.apiLink}/portal/loggedInProfile`, { headers: headers })
        .map((data: Response) => data.json());
  }

  /**
   * Current LoggedIn Quick Access.
   */
  getLoggedInQuickAccess() {
    const headers = this.tokenService.getAuthHeader();
    return this.http.get(`${this.apiLink}/portal/fetch/profile/quickAccess/loggedIn`, { headers: headers })
        .map((data: Response) => data.json());
  }

  /**
   * Current LoggedIn Quick Access.
   */
  getLoggedInMedia(value) {
    const headers = this.tokenService.getAuthHeader();
    return this.http.get(`${this.apiLink}/portal/cdn/media/mediaResponse/0/10`, { headers: headers })
        .map((data: Response) => data.json());
  }

  /**
   * Current LoggedIn Channel profile.
   */
  getLoggedInChannel(value) {
    const headers = this.tokenService.getAuthHeader();

    const body = {
      'offset': 0,
      'limit': 10,
      'superType': 'channel'
    }

    return this.http.post(this.apiLink + '/portal/network/spotfeed/search', body, { headers: headers })
      .map((data: Response) => data.json());
  }

  /**
   * Current LoggedIn Channel profile.
   */
  userProfileUpdate(body) {
    const headers = this.tokenService.getAuthHeader();

    return this.http.put(this.apiLink + '/portal/profile/updateProfile', body, { headers: headers })
      .map((data) => data.json());
  }

  /**
   * Add User Work
   */
  addUserWork(body) {
    const headers = this.tokenService.getAuthHeader();
    return this.http.post(this.apiLink + '/portal/profile/add/workandAwards', body, { headers: headers })
      .map((data: Response) => data.json());
  }

  /**
   * Update User Work
   */
  updateUserWork(body) {
    const headers = this.tokenService.getAuthHeader();
    return this.http.put(this.apiLink + '/portal/profile/update/workandAwards', body, { headers: headers })
      .map((data: Response) => data.json());
  }

  /**
   * Update User Education
   */
  updateUserEducation(body) {
    const headers = this.tokenService.getAuthHeader();
    return this.http.put(this.apiLink + '/portal/profile/update/qualification/course', body, { headers: headers })
      .map((data: Response) => data.json());
  }

  /**
   * Get Current Work and Award
   */
  getCurrentWork(id) {
    const headers = this.tokenService.getAuthHeader();
    return this.http.get(this.apiLink + '/portal/profile/get/workandAwards/' + id, { headers: headers })
      .map((data: Response) => data.json());
  }

  /**
   * Delete User Work
   */
  deleteUserWork(id) {
    const headers = this.tokenService.getAuthHeader();
    // tslint:disable-next-line:max-line-length
    return this.http.delete(this.apiLink + '/portal/profile/delete/workandAwards/' + id, { headers: headers })
      .map((data: Response) => data.json());
  }

  /**
   * Add User Education
   */
  addUserEducation(body) {
    const headers = this.tokenService.getAuthHeader();
    return this.http.post(this.apiLink + '/portal/profile/add/qualification/course', body, { headers: headers })
      .map((data: Response) => data.json());
  }

  /**
   * Delete User Education
   */
  deleteUserEducation(id) {
    const headers = this.tokenService.getAuthHeader();
    // tslint:disable-next-line:max-line-length
    return this.http.delete(this.apiLink + '/portal/profile/delete/qualification/course/' + id, { headers: headers })
      .map((data: Response) => data.json());
  }

  // /**
  //  * Edit User Work
  //  */
  // editUserWork(body) {
  //   const headers = this.tokenService.getAuthHeader();
  //   return this.http.put(this.apiLink + '/portal/profile/update/workandAwards', body, { headers: headers })
  //     .map((data: Response) => data.json());
  // }

  // /**
  //  * Delete User Work
  //  */
  // deleteUserWork(id) {
  //   const headers = this.tokenService.getAuthHeader();
  //   // tslint:disable-next-line:max-line-length
  //   return this.http.delete(this.apiLink + '/portal/profile/delete/workandAwards/' + id, { headers: headers })
  //     .map((data: Response) => data.json());
  // }

}
