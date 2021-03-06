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
   * Get autocomplete result
   */
  getAutocompleteList(query: string) {
    return this.api.post('/portal/global/search/autoComplete', { searchText: query });
  }

  /**
   * Get wiki profiles by search query
   * @param search query
   */
  getWikiProfiles(params: any) {
    return this.api.put('/portal/import/search/wikiData', params);
  }

  /**
   * Get search result
   * @param search request params
   */
  getAllSearchResult(params: any) {
    return this.api.post('/portal/global/search', params);
  }

  /**
   * Get people by search query
   * @param search query
   */
  getPeople(params: any) {
    return this.api.put('/portal/searchprofiles', params);
  }

  /**
   * Get posts by search query
   * @param search query
   */
  getPosts(params: any) {
    return this.api.post('/portal/cdn/media/search', params);
  }

  /**
   * Get channels by search query
   * @param search query
   */
  getChannels(params: any) {
    return this.api.post('/portal/network/spotfeed/esearch', params);
  }

}
