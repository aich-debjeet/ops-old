import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Observable } from 'rxjs/Observable';

import { ApiService } from '../helpers/api.service';
import { TokenService } from '../helpers/token.service';

@Injectable()
export class MessageService {

  private apiLink: string = environment.API_ENDPOINT;

  constructor(
    private tokenService: TokenService,
    private http: Http,
    private api: ApiService
    ) { }

    getUserProfileDetails(value: any) {
        const headers = this.tokenService.getAuthHeader();
        return this.http.get(this.apiLink + '/portal/profile/' + value, { headers: headers })
        .map((response: Response) => response.json())
    }

    getNonUserProfileDetails(handle: any) {
        const headers = this.tokenService.getAuthHeader();
        return this.http.get(this.apiLink + '/portal/profile/' + handle, { headers: headers })
        .map((response: Response) => response.json())
    }

    getReceipientDetails (value: string) {
        const headers = this.tokenService.getAuthHeader();
        return this.http.get(this.apiLink + '/portal/searchprofiles/1/' + value + '/0/10', { headers: headers })
        .map((data: Response) => data.json());
    }

    getMessangerList(params: any) {
        // return this.api.get('/portal/message/combined/sent/received');
        return this.api.get('/portal/message/latestMessage/p/0/10');
    }
}
