import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiService {

  private apiLink: string = environment.API_ENDPOINT;

  // temp access token
  accessToken: string = "Bearer rf_6941df37-273d-47ee-a79f-48f9024b524b";

  constructor(private http: Http, private router: Router) { }

  /* ------------------------- load channels ------------------------- */
  getChannels(req: any) {
    let headers = new Headers();
    let reqOptions = new RequestOptions({ headers: headers });

    headers.append('Authorization', this.accessToken);
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.apiLink}/portal/network/spotfeed/search`, req, reqOptions)
        .map((response: Response) => {
            const channelsArr = response.json();
            //console.log(channelsArr);
        });
  }
  /* ------------------------- load channels ------------------------- */

  /* ------------------------- pin/unpin channel ------------------------- */
  pinChannel(req: any) {
    let headers = new Headers();
    let reqOptions = new RequestOptions({ headers: headers });
    let reqBody = JSON.stringify({
      "spotfeedId": req.spotfeedHandle,
      "profileHandle": req.profileHandle
    });

    headers.append('Authorization', this.accessToken);
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.apiLink}/portal/network/spotfeed/pinspotfeed/pin`, reqBody, reqOptions)
        .map((response: Response) => {
            //console.log(response.json());
        });
  }

  unpinChannel(req: any) {
    let headers = new Headers();
    let reqOptions = new RequestOptions({ headers: headers });
    let reqBody = JSON.stringify({
      "spotfeedId": req.spotfeedHandle,
      "profileHandle": req.profileHandle
    });

    headers.append('Authorization', this.accessToken);
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.apiLink}/portal/network/spotfeed/unpinspotfeed/unpin`, reqBody, reqOptions)
        .map((response: Response) => {
            //console.log(response.json());
        });
  }
  /* ------------------------- pin/unpin channel ------------------------- */

  /* ------------------------- get logged in users profile ------------------------- */
  getLoggedInProfile() {
    let headers = new Headers();
    let reqOptions = new RequestOptions({ headers: headers });

    headers.append('Authorization', this.accessToken);
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.apiLink}/portal/loggedInProfile`, reqOptions)
        .map((data: Response) => data.json());
  }
  /* ------------------------- get logged in users profile ------------------------- */

  /* ------------------------- get logged in users media ------------------------- */
  getLoggedInUsersMedia(req: any) {
    let headers = new Headers();
    let reqOptions = new RequestOptions({ headers: headers });
    let reqBody = JSON.stringify(req);

    console.log('api req params: '+reqBody);

    headers.append('Authorization', this.accessToken);
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.apiLink}/portal/cdn/media/filter`, reqBody, reqOptions)
        .map((data: Response) => data.json());
  }
  /* ------------------------- get logged in users media ------------------------- */

  /* ------------------------- get logged in users messages ------------------------- */
  getLoggedInUsersMessages() {
    let headers = new Headers();
    let reqOptions = new RequestOptions({ headers: headers });
    let userHandle = 'J_F388662D_00A2_4BF7_BE66_AB389628AC73GREESHMAPRIYA86_GMAIL_COM';

    headers.append('Authorization', this.accessToken);
    headers.append('Content-Type', 'application/json');

    return this.http.get(`${this.apiLink}/portal/message/sent/`+userHandle, reqOptions)
        .map((data: Response) => {
          data = data.json();
          console.log(data);
        });
  }
  /* ------------------------- get logged in users messages ------------------------- */

}
