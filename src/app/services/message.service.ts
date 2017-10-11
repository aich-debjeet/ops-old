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
        return this.http.get(this.apiLink + '/portal/searchprofiles/1/' + value + '/0/5')
        .map((data: Response) => data.json());
    }
    getUserProfileDetails(value: any) {
        const headers = this.tokenService.getAuthHeader();
        return this.http.get(this.apiLink + '/portal/profile/' + value, { headers: headers })
        .map((response: Response) => response.json())
    }
    // getUserProfileByHandles(value) {
    //     const headers = this.tokenService.getAuthHeader();
    //     return this.http.get(this.apiLink + '/portal/auth/handleDisplayData' + value, { headers: headers })
    //     .map((response: Response) => response.json())
    // }
    getUserProfileByHandles(handles: any) {
        console.log('In service');
        const reqBody = { listData: handles };
        const headers = this.tokenService.getAuthHeader();
        return this.http.post(this.apiLink + '/portal/auth/handleDisplayData', reqBody, { headers: headers })
            .map((response: Response) => response.json())
    }
    getNonUserProfileDetails(handle: any) {
        const headers = this.tokenService.getAuthHeader();
        return this.http.get(this.apiLink + '/portal/profile/' + handle, { headers: headers })
        .map((response: Response) => response.json())
    }

    getSearchedNonUserProfileDetails(handle: any) {
        const headers = this.tokenService.getAuthHeader();
        return this.http.get(this.apiLink + '/portal/profile/' + handle, { headers: headers })
        .map((response: Response) => response.json())
    }

    markMessagesRead(value: any) {
        const headers = this.tokenService.getAuthHeader();
        return this.http.put(this.apiLink + '/portal/message/markListRead', value, { headers: headers })
        .map((res: Response) => res.json())
    }
    
    sendMessage(value) {
        const headers = this.tokenService.getAuthHeader();
        console.log(value)
        return this.http.post(this.apiLink + '/portal/message', value, { headers: headers })
        .map((response: Response) => response.json())
      }
}
