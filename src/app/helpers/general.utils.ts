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

    /**
     * File Change Binder
     * @param  $event
     */
    fileChangeListener($event) {
        if ($event.target.files.length > 0) {
            const randm = Math.random().toString(36).slice(2);
            const fileName = 'prof_' + randm + '.' + 'jpg';
            const file = $event.target.files[0];
            const data = new FormData();
            data.append('file', file, fileName );
            // Display the key/value pairs
            // Upload files
            return data;
        }
        return null;
    }

    /**
     * Returns true if key is not a key in object or object[key] has
     * value undefined. If key is a dot-delimited string of key names,
     * object and its sub-objects are checked recursively.
     */
    isUndefinedKey(object, key) {

        const keyChain = Array.isArray(key) ? key : key.split('.'),
            objectHasKey = keyChain[0] in object,
            keyHasValue = typeof object[keyChain[0]] !== 'undefined';

        if (objectHasKey && keyHasValue) {
            if (keyChain.length > 1) {
                return this.isUndefinedKey(object[keyChain[0]], keyChain.slice(1));
            }
            return false;
        } else {
            return true;
        }
    }

}
