import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ApiService } from '../helpers/api.service';
import { TokenService } from '../helpers/token.service';
import { Http, Headers} from '@angular/http';

declare const Pusher: any;

@Injectable()
export class PusherService {
  pusher: any;
  notificationsChannel: any;
  messagesChannel: any;
  private handle: string;
  private accessToken: any;
  private apiLink: string = environment.API_ENDPOINT;
  userChannels = [];

  constructor(
    private api: ApiService,
    private http: Http,
    private token: TokenService
  ) {
    this.handle = localStorage.getItem('loggedInProfileHandle');
    this.accessToken = this.token.getToken();
      if (this.accessToken) {
        this.pusher = new Pusher(environment.pusher.key, {
          authEndpoint: this.apiLink + '/portal/pusher/auth',
          cluster: environment.pusher.cluster,
          auth: {
            params: {
              param1: this.accessToken
            },
          }
        });
        // for notifications
        this.notificationsChannel = this.pusher.subscribe('private-notification-' + this.handle);
        // for messages
        this.messagesChannel = this.pusher.subscribe('private-message-' + this.handle);
      }
  }

  // create other user channel for sending typing notification
  createUserChannel(user: any) {
    if (this.userChannels && user.handle && this.userChannels[user.handle]) {
      // console.log('channel found');
    } else {
      // console.log('channel NOT found');
      this.userChannels[user.handle] = this.pusher.subscribe('private-notification-' + user.handle);
    }
  }
}
