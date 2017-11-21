import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { ApiService } from '../helpers/api.service';
import { TokenService } from '../helpers/token.service';

@Injectable()
export class OpportunityService {
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
    // console.log('this.headers', this.headers);
  }

  /**
   * Create opportunity
   * @param request body
   */
  createOpportunity(reqBody: any) {
    // console.log('service createOpportunity', reqBody);
    this.updateToken();
    return this.api.post('/portal/job/create', reqBody);
  }

  /**
   * Get opportunities
   * @param request body
   */
  searchOpportunities(params: any) {
    this.updateToken();
    return this.api.get('/portal/job/' + params.query + '/search/' + params.offset + '/' + params.limit);
  }

  /**
   * Get opportunity by id
   * @param id
   */
  getOpportunity(jobId: string) {
    this.updateToken();
    return this.api.get('/portal/job/', jobId);
  }


}