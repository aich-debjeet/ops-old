import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TokenService } from './token.service';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';



@Injectable()
export class ApiService {
  private apiLink: string = environment.API_ENDPOINT;
  constructor(
    private tokenService: TokenService,
    private http: Http,
    private router: Router) {
  }

  /**
   * Logged in user token headers
   */
  getHeaders() {
    return this.tokenService.getAuthHeader();
  }

  /**
   * Logged in user token headers
   */
  getFileHeaders() {
    return this.tokenService.getPlainHeader();
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
  buildDetailPath(endpoint: string, id: string) {
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
    const path = this.buildDetailPath(endpoint, id);
    const head = this.getHeaders();
    return this.http.get(this.apiLink + path, { headers: head })
      .map((data: Response) => data.json());
  }

  /**
   * POST Function
   */
  post(path: string, body: any) {
    const head = this.getHeaders();
    return this.http.post(this.apiLink + path, body, { headers: head })
      .map((data: Response) => data.json());
  }

  /**
   * POST Function
   */
  postFile(path: string, body: any) {
    const head = this.getFileHeaders();
    return this.http.post(this.apiLink + path, body, { headers: head })
      .map((data: Response) => data.json());
  }

  /**
   * GET Function
   */
  put(endpoint: string, body: any) {
    const head = this.getHeaders();
    return this.http.put(this.apiLink + endpoint, body, { headers: head })
      .map((data) => data.json());
  }

  /**
   * DELETE
   */
  delete(endpoint: string, id: string, ignorePath: boolean = false) {
    const path = this.buildDetailPath(endpoint, id);
    const fullPath = ignorePath ? path : endpoint + id;
    const head = this.getHeaders();
    return this.http.delete(this.apiLink + fullPath, { headers: head })
      .map((data: Response) => data.json());
  }

    /**
   * Delete Function
   */
  del(endpoint: string) {
    const head = this.getHeaders();
    return this.http.delete(this.apiLink + endpoint, { headers: head })
      .map((data) => data.json());
  }

  delete2(endpoint: string, reqBody: any) {
    const head = this.getHeaders();
    const delOptions = new RequestOptions({ headers: head, body: reqBody });
    return this.http.delete(this.apiLink + endpoint, delOptions)
      .map((data) => data.json());
  }
}
