import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiService {

  private apiLink: string = environment.API_ENDPOINT;

  constructor(private http: Http, private router: Router) { }

  getChannels(req: any) {

    // let headers = new Headers();
    // this.createAuthorizationHeader(headers);

    let headers = new Headers();
    let requestOptions = new RequestOptions({ headers: headers });

    headers.append('Authorization', 'Bearer vn_cf916013-6c6e-4475-be0d-329e644adc09');
    headers.append('Content-Type', 'application/json');

    return this.http.post(`${this.apiLink}/portal/network/spotfeed/search`, req, requestOptions)
        .map((response: Response) => {
            const channelsArr = response.json();
            console.log(channelsArr);
        });
  }

}
