import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { TokenService } from '../helpers/token.service';

@Injectable()
export class MediaService {

  private apiLink: string = environment.API_ENDPOINT;
  constructor(
    private http: Http,
    private router: Router,
    private tokenService: TokenService) {}

  /**
   * Post multiple media
   * @param req
   */
  postMedia(req: any) {
    // Headers
    const headers = this.tokenService.getAuthHeader();
    const handle = '?handle=G_432743CB_0155_42A2_AC1F_6148C750B3D9MUNEEF_AURUT_COM';

    return this.http.post(`${this.apiLink}/portal/cdn/media/upload/multiple` + handle, req, { headers: headers } )
      .map((data) => data.json());
  }

  /**
   * Post Status
   * @param req
   */
  postStatus(req: any) {
    // Headers
    const headers = this.tokenService.getAuthHeader();

    return this.http.post(`${this.apiLink}/portal/network/feed`, req, { headers: headers } )
      .map((data) => data.json());
  }
}
