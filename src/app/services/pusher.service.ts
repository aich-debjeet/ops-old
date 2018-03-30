import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../helpers/api.service';
import { TokenService } from '../helpers/token.service';
import { Http, Headers} from '@angular/http';

declare const Pusher: any;

@Injectable()
export class PusherService {
  pusher: any;
  messagesChannel: any;
  private handle: string;
  private headers: any;
  private accessToken: any;
  private apiLink: string = environment.API_ENDPOINT;

  constructor(
    private api: ApiService,
    private http: Http,
    private token: TokenService
  ) {
    this.handle = localStorage.getItem('loggedInProfileHandle');
    this.headers = this.api.getHeaders(); 
    this.accessToken = this.token.getToken();
    this.pusher = new Pusher(environment.pusher.key, {
      authEndpoint: this.apiLink + '/portal/pusher/auth',
      cluster: 'ap2',
      auth: { 
        params: { 
          param1: this.accessToken
        },
      }
    });

    this.messagesChannel = this.pusher.subscribe('private-notification-'+ this.handle);
  }

}
