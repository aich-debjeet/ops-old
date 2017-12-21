import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { ApiService } from '../helpers/api.service';
import { TokenService } from '../helpers/token.service';

@Injectable()
export class SearchService {
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
   * Get people by search query
   * @param search query
   */
  getPeople(params: any) {
    this.updateToken();
    return this.api.get('/portal/searchprofiles/1/' + params.query + '/' + params.offset + '/' + params.limit);
  }

  /**
   * Get posts by search query
   * @param search query
   */
  getPosts(params: any) {
    this.updateToken();
    return this.api.get('/portal/cdn/media/postByText/' + params.query + '/' + params.offset + '/' + params.limit);
  }

  /**
   * Get channels by search query
   * @param search query
   */
  getChannels(params: any) {
    this.updateToken();
    return this.api.get('/portal/network/spotfeed/searchByText/' + params.query + '/' + params.offset + '/' + params.limit);
  }

}
