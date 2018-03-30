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
  notifsPageNumber = 0;
  notifsPerPage = 10;
  // notifsOffset = 0;

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
  getNotifications() {
    this.updateToken();
    const pagination = this.paginate();
    return this.api.get('/portal/network/notification/getAllNotification/' + pagination.offset + '/' + pagination.limit);
  }

  /**
   * Mark notification as read
   */
  notificationMarkAsRead(reqBody: any) {
    this.updateToken();
    return this.api.put( '/portal/network/notification/mark/read', reqBody);
  }

  /**
   * Pagination
   * @param page number
   */
  paginate() {
    let notifsOffset: number;
    if (this.notifsPageNumber === 0) {
      notifsOffset = 0;
    } else {
      notifsOffset = (this.notifsPageNumber * this.notifsPerPage) + 1;
    }
    this.notifsPageNumber++;

    const notifsPaginate = {
      offset: notifsOffset,
      limit: this.notifsPerPage
    };

    console.log('notifsPaginate', notifsPaginate);
    return notifsPaginate;
  }

}
