import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiService } from '../helpers/api.service';
import { TokenService } from '../helpers/token.service';

@Injectable()
export class GeneralService {

  private apiLink: string = environment.API_ENDPOINT;
  accessToken: string;
  userHandle: string;
  headers: any;

  constructor(
    private http: Http,
    private router: Router,
    private api: ApiService,
    private tokenService: TokenService
  ) {
    this.headers = this.api.getHeaders();
  }

  /* ------------------------- message comp user search ------------------------- */
  messageUserSearch(searchParams: any) {
    return this.api.put('/portal/searchprofiles', searchParams);
  }
  /* ------------------------- message comp user search ------------------------- */

  /* ------------------------- load channels ------------------------- */
  getChannels(req: any) {
    const headers = new Headers();
    const reqOptions = new RequestOptions({ headers: headers });

    headers.append('Authorization', this.accessToken);
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.apiLink}/portal/network/spotfeed/search`, req, reqOptions)
        .map((response: Response) => {
            const channelsArr = response.json();
        });
  }
  /* ------------------------- load channels ------------------------- */

  /* ------------------------- pin/unpin channel ------------------------- */
  pinChannel(req: any) {
    const headers = new Headers();
    const reqOptions = new RequestOptions({ headers: headers });
    const reqBody = JSON.stringify({
      spotfeedId: req.spotfeedHandle,
      profileHandle: req.profileHandle
    });

    headers.append('Authorization', this.accessToken);
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.apiLink}/portal/network/spotfeed/pinspotfeed/pin`, reqBody, reqOptions)
        .map((response: Response) => {
        });
  }

  unpinChannel(req: any) {
    const headers = new Headers();
    const reqOptions = new RequestOptions({ headers: headers });
    const reqBody = JSON.stringify({
      spotfeedId: req.spotfeedHandle,
      profileHandle: req.profileHandle
    });

    headers.append('Authorization', this.accessToken);
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.apiLink}/portal/network/spotfeed/unpinspotfeed/unpin`, reqBody, reqOptions)
        .map((response: Response) => {
        });
  }
  /* ------------------------- pin/unpin channel ------------------------- */


  /* ------------------------- get logged in users profile ------------------------- */

  /* ------------------------- get logged in users media ------------------------- */
  getLoggedInUsersMedia(req: any) {
    const headers = new Headers();
    const reqOptions = new RequestOptions({ headers: headers });
    const reqBody = JSON.stringify(req);

    headers.append('Authorization', this.accessToken);
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.apiLink}/portal/cdn/media/filter`, reqBody, reqOptions)
        .map((data: Response) => data.json());
  }
  /* ------------------------- get logged in users media ------------------------- */

  /* ------------------------- get logged in users messages ------------------------- */
  getAllMessages(param: string) {
    const headers = new Headers();
    const reqOptions = new RequestOptions({ headers: headers });

    headers.append('Authorization', this.accessToken);
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.apiLink}/portal/message/` + param + '/' + this.userHandle, reqOptions)
        .map((data: Response) => { data = data.json() });
  }
  /* ------------------------- get logged in users messages ------------------------- */

  /* ------------------------- user search ------------------------- */
  userSearch() {
    const headers = new Headers();
    const reqOptions = new RequestOptions({ headers: headers });
    const reqBody = JSON.stringify({
      isHuman: '1',
      limit: 10,
      offset: 0
    });

    headers.append('Authorization', this.accessToken);
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.apiLink}/portal/searchprofiles`, reqBody, reqOptions)
        .map((data: Response) => { data = data.json() });

  }
  /* ------------------------- user search ------------------------- */

  /* ------------------------- send message ------------------------- */
  sendMessage(req: any) {
    const headers = new Headers();
    const reqOptions = new RequestOptions({ headers: headers });

    headers.append('Authorization', this.accessToken);
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.apiLink}/portal/message`, req, reqOptions)
        .map((data: Response) => { data = data.json() });
  }
  /* ------------------------- send message ------------------------- */

  // fbGetUserdata(activationCode: string) {
  //   return this.http.get(`${this.apiLink}/portal/message/`+param+'/'+this.userHandle, reqOptions)
  //   .map((data: Response) => { data = data.json() });
  // }

}
