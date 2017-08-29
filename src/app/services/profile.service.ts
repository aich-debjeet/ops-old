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
      'superType': 'channel',
      'owner': value
    }

    return this.http.post(this.apiLink + '/portal/network/spotfeed/search', body, { headers: headers })
      .map((data: Response) => data.json());
  }

  /**
   * Create a channel
   */
  createChannel(req) {
    const headers = this.tokenService.getAuthHeader();
    return this.http.post(`http://devservices.greenroom6.com:9000/api/1.0/portal/network/spotfeed`, req, { headers: headers })
      .map((data: Response) => data.json());
  }
  /**
   * Apparently here
   */

}
