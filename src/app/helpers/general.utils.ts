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

    /**
     * Search hashatgs
     * @Param: string
     * @Return: string array
     */
    public findHashtags(searchText) {
        const regexp = /\B\#\w\w+\b/g
        const result = searchText.match(regexp);
        if (result) {
            return result;
        } else {
            return false;
        }
    }

    /**
     * @param: array and the length to trim
     */
    public getArrayWithLimitedLength(arr, len) {
        // console.log('before', arr);
        const newArr = arr.slice(0, len);
        // console.log('after', newArr);
        return newArr;
    }

}
