import { Handle } from 'ng2-img-cropper/src/model/handle';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ApiService } from '../helpers/api.service';
import { TokenService } from '../helpers/token.service';

@Injectable()
export class OrganizationService {
  private handle: string;
  private headers: any;
  private apiLink: string = environment.API_ENDPOINT;

  constructor(
    private api: ApiService,
    private http: Http
  ) {
      this.handle = this.api.getHandle();
      this.headers = this.api.getHeaders();
    }

    /**
     * Registration of Organization
     */
    regOrganization(body: any) {
        console.log(body);
        return this.api.post('/portal/organization', body);
    }

    delOrganization(handle: any) {
      console.log(handle);
      return this.api.delete('/portal/organization', handle);
    }

    getReceipientDetails (value: string) {
      return this.http.get(this.apiLink + '/portal/searchprofiles/1/' + value + '/0/10', { headers: this.headers })
      .map((data: Response) => data.json());
    }
    getOrganizationMembers(handle: any) {
      console.log('api callin')
      return this.http.get(this.apiLink + '/portal/organization/members/' + handle + '/0/10', { headers: this.headers })
      .map((data: Response) => data.json());
    }

   /**
     * getting default settings of an Organization
     */
    getDefaultSettings(handle: any) {
      console.log('api callin')
      return this.http.get(this.apiLink + '/portal/organization/get/settings/' + handle , { headers: this.headers })
      .map((data: Response) => data.json());
    }

}
