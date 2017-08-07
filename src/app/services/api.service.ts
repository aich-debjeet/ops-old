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
  accessToken: string = "Bearer yf_52170ae2-1af2-4f44-9755-925f59156225";

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
            console.log(channelsArr);
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
            console.log(response.json());
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
            console.log(response.json());
        });
  }
  /* ------------------------- pin/unpin channel ------------------------- */

}
