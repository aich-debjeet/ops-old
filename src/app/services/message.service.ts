import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { TokenService } from '../helpers/token.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessageService {

  private apiLink: string = environment.API_ENDPOINT;

  constructor(
    private tokenService: TokenService,
    private http: Http
    ) { }

    getAllSentMessages(value) {
        const headers = this.tokenService.getAuthHeader();
        console.log(value + ' is the handle ');
        return this.http.get(this.apiLink + '/portal/message/sent/' + value, { headers: headers })
        .map((data: Response) => data.json());
    }
    getAllReceivedMessages(value) {
        const headers = this.tokenService.getAuthHeader();
        console.log(value + ' is the handle ');
        console.log('getting all receivd messages')
        return this.http.get(this.apiLink + '/portal/message/received/' + value, { headers: headers })
        .map((data: Response) => data.json());

    }
    getReceipientDetails (value: string) {
        return this.http.get(this.apiLink + '/portal/searchprofiles/1/' + value + '/0/10')
        .map((data: Response) => data.json());
    }
    getUserProfileDetails(value: any) {
        const headers = this.tokenService.getAuthHeader();
        return this.http.get(this.apiLink + '/portal/profile/' + value, { headers: headers })
        .map((response: Response) => response.json())
    }
    getUserProfileByHandles(value) {
        const headers = this.tokenService.getAuthHeader();
        return this.http.get(this.apiLink + '/portal/auth/handleDisplayData' + value, { headers: headers })
        .map((response: Response) => response.json())
    }

}
