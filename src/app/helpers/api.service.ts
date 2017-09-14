import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';

@Injectable()
export class ApiService {
  private handle: string;
  private headers: any;
  private apiLink: string = environment.API_ENDPOINT;
  constructor(
    private tokenService: TokenService,
    private http: Http,
    private router: Router) {
      this.handle = this.tokenService.getHandle();
      this.headers = this.tokenService.getAuthHeader();
  }

  /**
   * Logged in user token headers
   */
  getHeaders() {
    return this.tokenService.getAuthHeader();
  }

  /**
   * Logged in user handle
   */
  getHandle() {
    return this.tokenService.getHandle();
  }
  /**
   * Build ID path, conditionally
   * @param endpoint API endpoint
   * @param id item id
   */
  buidDetailPath(endpoint: string, id: string) {
    let path = endpoint;
    if (id && id !== '') {
      path = endpoint + id
    }
    return this.cleanURL(path);
  }
  /**
   * Remove last backslash if present
   * @param urlString
   */
  cleanURL(urlString: string) {
    return urlString.replace(/\/$/, '');
  }

  /**
   * PUT Function
   */
  get(endpoint: string, id?: string) {
    const path = this.buidDetailPath(endpoint, id);
    return this.http.get(this.apiLink + path, { headers: this.headers })
      .map((data: Response) => data.json());
  }

  /**
   * POST Function
   */
  post(path: string, body: any) {
    return this.http.post(this.apiLink + path, body, { headers: this.headers })
      .map((data: Response) => data.json());
  }

  /**
   * GET Function
   */
  put(endpoint: string, body: any) {
    return this.http.put(this.apiLink + endpoint, body, { headers: this.headers })
      .map((data) => data.json());
  }

  /**
   * DELETE
   */
  delete(endpoint: string, id: string) {
    const path = this.buidDetailPath(endpoint, id);
    return this.http.delete(this.apiLink + endpoint + path, { headers: this.headers })
      .map((data: Response) => data.json());
  }
}
