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
  getPeople(query: string) {
    this.updateToken();
    return this.api.get('/portal/searchprofiles/1/' + query + '/0/4');
  }

  /**
   * Get posts by search query
   * @param search query
   */
  getPosts(query: string) {
    this.updateToken();
    return this.api.get('/portal/cdn/media/postByText/' + query + '/0/4');
  }

  /**
   * Get channels by search query
   * @param search query
   */
  getChannels(query: string) {
    this.updateToken();
    return this.api.get('/portal/network/spotfeed/searchByText/' + query + '/0/4');
  }

}
