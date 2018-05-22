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
  }

  /**
   * Create opportunity
   * @param request body
   */
  createOpportunity(reqBody: any) {
    this.updateToken();
    return this.api.post('/portal/opportunity/create', reqBody);
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

  /**
   * Apply for an opportunity
   * @param job id
   */
  applyForAnOpportunity(reqBody: any) {
    this.updateToken();
    return this.api.post('/portal/job/apply', reqBody);
  }

  /**
   * Get opportunity type count
   */
  getOpportunityTypeCount() {
    this.updateToken();
    return this.api.get('/portal/job/allType/counts');
  }

  /**
   * Get opportunities by filters like recommended, created opps
   */
  getOpportunities(reqParams: any) {
     console.log('payload', reqParams)
    this.updateToken();
    // return this.api.put('/portal/job', reqParams);
    return this.api.get('/portal/opportunity/created/user/' + reqParams.offset + '/'+ reqParams.limit);
  }


  /**
   * Get applied opportunities
   */
  getAppliedOpportunities(reqParams: any) {
    this.updateToken();
    return this.api.get('/portal/opportunity/applied/jobs/user/' + reqParams.offset + '/'+ reqParams.limit );
  }

  /**
   * File Uploader
   */
  fileUpload(formValue: any) {
    return this.uploadImage(formValue, formValue.handle);
  }

  /**
   * Upload Image to CDN
   * @TODO: check why it is failing on for single file end point
   */
  uploadImage(value: any, handle: string = '') {
    return this.api.postFile('/portal/cdn/media/upload/multiple?handle=' + handle, value.image);
  }

}
