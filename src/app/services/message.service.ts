import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from './../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
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

    deleteConversation(reqBody: any) {
        return this.api.put('/portal/message/v-2/deleteMessage', reqBody);
    }

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

    getReceipientDetails(value: string) {
        const headers = this.tokenService.getAuthHeader();
        return this.http.get(this.apiLink + '/portal/searchprofiles/1/' + value + '/0/10', { headers: headers })
            .map((data: Response) => data.json());
    }

    getMessangerList(params: any) {
        return this.api.get('/portal/message/v-2/latestMessage/0/30');
    }

    loadConversation(data: any) {
        return this.api.get('/portal/message/v-2/conversation/' + data.handle + '/' + data.pagination.offset + '/' + data.pagination.limit + '?prev=' + data.lastMessage.id);
    }

    sendMessage(message: any) {
        return this.api.post('/portal/message/v-2/add', message);
    }

    messageSearchUser(searchQuery: string) {
        return this.api.get('/portal/message/v-2/search/0/10?searchString=' + searchQuery);
    }

    networkRequestAction(params: any) {
        return this.api.put('/portal/network/connection/response', params);
    }

    userTypingAction(data: any) {
        return this.api.get('/portal/message/v-2/trigger/typing/' + data.loggedInUsersHandle + '/' + data.selectedUsersHandle);
    }

    deleteMessage(message: any) {
        return this.api.put('/portal/message/v-2/deleteMessage', message);
    }
}
