import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { ApiService } from '../helpers/api.service';

@Injectable()
export class ClaimProfileService {

    constructor(
        private http: Http,
        private api: ApiService
    ) { }

    /**
     * Search profile
     */
    searchProfile(searchProfileName: string) {
        return this.api.get('/portal/profile/validate/claim/profile/' + searchProfileName);
    }

}
