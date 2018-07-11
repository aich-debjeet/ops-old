import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { ApiService } from '../helpers/api.service';
import { TokenService } from '../helpers/token.service';

@Injectable()
export class MediaService {
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
   * Post multiple media
   * @param req
   */
  postMedia(req: any) {
    const path = '/portal/cdn/media/upload/multiple?handle=' + this.api.getHandle();
    return this.api.post(path, req);
  }

  /**
   * Post Status
   * @param req
   */
  postStatus(req: any) {
    return this.api.post('/portal/network/feed', req);
  }

  /**
   * Get channel detail
   * @param mediaId Channel ID
   */
  getSingleChannel(mediaId: string) {
    return this.api.get('/portal/network/spotfeed/id/', mediaId);
  }

  /**
   * Get Meida Deatils
   * @param mediaId Channel ID
   */
  getMediaDeatails(mediaId: string) {
    return this.api.get('/portal/cdn/media/mediaDetails/', mediaId);
  }

  /**
   * Get Meida Deatils
   * @param mediaId Channel ID
   */
  getMediaNext(body: string) {
    return this.api.post('/portal/network/spotfeed/carousel', body);
  }

  /**
   * Media comment fetch
   * @param mediaId Channel ID
   */
  fetchMediaComment(payload: any) {
    return this.api.get(`/portal/cdn/comment/${payload.media_id}/${payload.commentType}`);
  }

  /**
   * Post Comment
   * @param body
   */
  postComment(body: any) {
    return this.api.post( '/portal/cdn/comment/' + body.parent, body);
  }

  /**
   * Update Comment
   * @param body
   */
  updateComment(body: any) {
    return this.api.put( '/portal/cdn/comment/' + body.parent, body);
  }

  /**
   * Delete Comment
   * @param body
   */
  deleteComment(body: any) {
    return this.api.del( `/portal/cdn/comment/${body.parent}/${body.id}/${body.commentType}`);
  }

  /**
   * Spot a Media
   * @param mediaId Channel ID
   */
  spotMedia(payload: any) {
    return this.api.get(`/portal/cdn/media/spot/${payload.id}/${payload.mediaType}`);
  }

  /**
   * Reverse Spot a Media
   * @param mediaId Channel ID
   */
  unSpotMedia(payload: any) {
    return this.api.get(`/portal/cdn/media/unSpot/${payload.id}/${payload.mediaType}`);
  }

  /**
   * Media post delete
   */
  mediaPostDelete(id: string) {
    return this.api.del( `/portal/cdn/media/delete/${id}`);

  }
  /**
   * media edit
   */
  mediaEdit(payload: any) {
    return this.api.put( '/portal/cdn/media/update', payload);
  }

  /**
   * Pagination Helper
   */
  pagination(page: number = 1, perPage: number = 20) {
    return page === 1 ? 0 : page * perPage;
  }

  /**
   * Get User media
   */
  getUserMedia(handle: string, page: number = 1) {
    const params = handle + this.pagination(page);
    return this.api.get('/portal/cdn/media/otherProfile/', params);
  }

  /**
   * Load my status
   * @param body
   */
  getMyMedia(body: any) {
    return this.api.put( '/portal/cdn/myMedia', body);
  }
  /**
   * get reports
   */
  getReports(type: string){
    return this.api.get('/portal/report/questions/getByType/' + type)
  }

}
