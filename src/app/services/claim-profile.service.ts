import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { ApiService } from '../helpers/api.service';
import { TokenService } from '../helpers/token.service';

@Injectable()
export class ClaimProfileService {
    handle: string;
    headers: any;
    private apiLink: string = environment.API_ENDPOINT;

    constructor(
        private http: Http,
        private router: Router,
        private api: ApiService,
        private tokenService: TokenService
    ) {
        this.headers = this.api.getHeaders();
        this.handle = this.api.getHandle();
    }

    updateToken() {
        this.headers = this.api.getHeaders();
        this.handle = this.api.getHandle();
    }

    /**
     * Search profile
     */
    searchProfile(searchKey: string) {
        this.updateToken();
        return this.api.get('/api/1.0/portal/profile/validate/claim/profile/' + searchKey);
    }

}
