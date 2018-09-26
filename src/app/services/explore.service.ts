import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { ApiService } from '../helpers/api.service';
import { TokenService } from '../helpers/token.service';

@Injectable()
export class ExploreService {
    handle: string;
    headers: any;

    constructor(
        private api: ApiService
    ) {
        this.headers = this.api.getHeaders();
        this.handle = this.api.getHandle();
    }

    updateToken() {
        this.headers = this.api.getHeaders();
        this.handle = this.api.getHandle();
    }

    /**
     * Get spotfeeds
     */
    getSpotfeeds(params: any) {
        this.updateToken();
        return this.api.get('/portal/cdn/explore/getFeeds/' + params.offset + '/' + params.limit + '?industryType=' + params.industryType);
    }

    /**
     * Get explore page info
     */
    getExploreData(params: any) {
        return this.api.post('/portal/network/spotfeed/explore', params);
    }

}
