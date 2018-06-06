import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { ApiService } from '../helpers/api.service';
import { TokenService } from '../helpers/token.service';

@Injectable()
export class CommunitiesService {
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

  /**
   * Get people by search query
   * @param search query
   */
  getPeople(params: any) {
    return this.api.put('/portal/searchprofiles', params);
  }

  /**
   * Get channels by search query
   * @param search query
   */
  createCommnuity(params: any) {
    return this.api.post('/portal/community', params);
  }

  listCommnuity(params: any) {
    return this.api.put('/portal/community/filter/specificSearch' , params);
  }

  joinCommunity(params: any) {
    return this.api.post(`/portal/community/joinCommunity/join`, params);
  }

  detailCommunity(id: any) {
    return this.api.get('/portal/community/' + id , '');
  }

  invitePeopleCommunity(id: any) {
    return this.api.get('/portal/community/peopleToInvite/0/10/' + id , '');
  }

  relatedCommunity(id: any) {
    return this.api.get('/portal/community/related/0/5/' + id , '');
  }

  unjoinCommunity(params: any) {
    return this.api.put('/portal/community/exitCommunity' , params);
  }

  getPostCommunity(id: any) {
    return this.api.get(`/portal/community/post/${id}/0/10`, '');
  }

  invitePeopleToCommunity(params: any) {
    return this.api.post(`/portal/community/addMembers/${params.id}`, params.data);
  }

  deleteCommunity(id: any) {
    return this.api.delete(`/portal/community/delete/${id}`, '');
  }

  updateCommunity(data: any) {
    return this.api.put(`/portal/community/update/community/${data.id}`, data.body);
  }

  memberListCommunity(para: any) {
    return this.api.get(`/portal/community/members/${para.id}/0/10`, '');
  }


}
