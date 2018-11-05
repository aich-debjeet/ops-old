import { Injectable } from '@angular/core';
import { ApiService } from '../helpers/api.service';

@Injectable()
export class HomeService {

    constructor(
        private api: ApiService
    ) { }

    getChannels() {
        const userHandle = 'W_E160B801_086B_4C6B_A55E_2014EE3C4171YASWANTHMDH_GMAIL_COM';
        return this.api.get('/portal/network/spotfeed/following/profile/spotfeeds/' + userHandle, '');
    }
}
