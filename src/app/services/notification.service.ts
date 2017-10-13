import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { ApiService } from '../helpers/api.service';
import { TokenService } from '../helpers/token.service';

@Injectable()
export class NotificationService {
  handle: string;
  headers: any;
  private apiLink: string = environment.API_ENDPOINT;

  constructor(
    private http: Http,
    private router: Router,
    private api: ApiService,
    private tokenService: TokenService) {
      this.headers = this.api.getHeaders();
      this.handle = this.api.getHandle();
    }

  updateToken() {
    this.headers = this.api.getHeaders();
    this.handle = this.api.getHandle();
  }

  /**
   * Get notifications
   * @param req
   */
  getAllNotifications() {
    this.updateToken();
    return this.api.get('/portal/network/notification/getAllNotification/1/50');
  }

  /**
   * Mark notification as read
   */
  notificationMarkAsRead(reqBody: any) {
    this.updateToken();
    return this.api.put( '/portal/network/notification/mark/read', reqBody);
  }

}
