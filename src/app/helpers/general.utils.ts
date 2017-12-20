import { Injectable } from '@angular/core';

@Injectable()
export class GeneralUtilities {

    constructor() { }

    isEmpty(obj: any) {
        if (obj == null || obj === undefined || obj.length === undefined) {
            return true;
        } else {
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
        const newArr = arr.slice(0, len);
        return newArr;
    }

}
