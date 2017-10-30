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
  postsPageNumber = -1;
  peoplePageNumber = -1;
  channelPageNumber = -1;

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
    this.peoplePageNumber ++;
    const pagination = this.paginate(this.peoplePageNumber);
    return this.api.get('/portal/searchprofiles/1/' + query + '/' + pagination.offset + '/' + pagination.limit);
  }

  /**
   * Get posts by search query
   * @param search query
   */
  getPosts(query: string) {
    this.updateToken();
    this.postsPageNumber ++;
    const pagination = this.paginate(this.postsPageNumber);
    return this.api.get('/portal/cdn/media/postByText/' + query + '/' + pagination.offset + '/' + pagination.limit);
  }

  /**
   * Get channels by search query
   * @param search query
   */
  getChannels(query: string) {
    this.updateToken();
    this.channelPageNumber ++;
    const pagination = this.paginate(this.channelPageNumber);
    return this.api.get('/portal/network/spotfeed/searchByText/' + query + '/' + pagination.offset + '/' + pagination.limit);
  }

  /**
   * Pagination
   * @param page number
   */
  paginate(page: number) {
    let beginItem: number;
    let endItem: number;
    let itemsPerPage = 20;
    if (page === 0 ) {
        beginItem = 0;
    } else {
        beginItem = (page - 1) * itemsPerPage;
    } return {
        offset: beginItem, limit: itemsPerPage
    }
  }

}
