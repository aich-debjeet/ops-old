import { Injectable } from '@angular/core';

@Injectable()
export class GeneralUtilities {

    constructor() { }

    isEmpty(obj: any) {
        if (obj == null || obj === undefined || obj.length === undefined) {
            // console.log('obj is empty yes. len:' + obj.length, obj);
            return true;
        } else {
            // console.log('obj is empty no. len:' + obj.length, obj);
            return false;
        }
    }

    /**
     * Prepare user profile link using the username
     * @param username string
     */
    getUserProfileUrl(username: string) {
        const link = '/profile/u/' + username + '/user';
        return link;
    }

}
