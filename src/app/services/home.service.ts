import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';

import { ApiService } from '../helpers/api.service';
import { TokenService } from '../helpers/token.service';

@Injectable()
export class HomeService {private handle: string;
    private apiLink: string = environment.API_ENDPOINT;

    constructor(
      private api: ApiService,
      private tokenService: TokenService,
      private http: Http
      ) { }

    // /**
    //  * Get logged in users channels
    //  */
    // getChannels(handle: string) {
    //     // const headers = this.tokenService.getAuthHeader();
    //     const headers = new Headers({ 'Content-Type': 'application/json'});
    //     headers.append('Authorization', 'Bearer at-a3fa3fc9-8f4a-4e43-890b-1de2ea932ac6');
    //     return this.http.get(this.apiLink + '/portal/network/spotfeed/following/profile/spotfeeds/' + handle, { headers: headers });
    // }

    getChannels() {
        const userHandle = 'W_E160B801_086B_4C6B_A55E_2014EE3C4171YASWANTHMDH_GMAIL_COM';
        return this.api.get('/portal/network/spotfeed/following/profile/spotfeeds/' + userHandle , '');
    }
}
