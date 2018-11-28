import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { remove as _remove } from 'lodash';

@Injectable()
export class GeneralUtilities {

    // remote action event listner service
    private _listners = new Subject<any>();
    listen(): Observable<any> {
        return this._listners.asObservable();
    }
    filter(filterBy: any) {
        this._listners.next(filterBy);
    }

    constructor() { }

    removeRecordFromState(reqParams: any, bookmarks: any) {
        if (reqParams['type'] === 'image' || reqParams['type'] === 'video' || reqParams['type'] === 'audio') {
            return _remove(bookmarks, (b) => !(b.postType === reqParams['type'] && b.postId === reqParams['id']));
        }
        if (reqParams['type'] === 'opportunity' || reqParams['type'] === 'event') {
            return _remove(bookmarks, (b) => !(b.id === reqParams['id']));
        }
        return bookmarks;
    }

    sortBookmarks(type: string, resp: any) {
        if (type === 'image' || type === 'video' || type === 'audio') {
            return resp['SUCCESS'][0]['bookmarkedPosts'];
        } else if (type === 'all') {
            const data = resp['SUCCESS'];
            const bookmarks = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i] && data[i]['bookmarkedPosts'] && data[i]['bookmarkedPosts'][0]) {
                    bookmarks.push(data[i]['bookmarkedPosts'][0]);
                }
                if (data[i] && data[i]['bookmarkedEvents'] && data[i]['bookmarkedEvents'][0]) {
                    data[i]['bookmarkedEvents'][0]['type'] = 'event';
                    bookmarks.push(data[i]['bookmarkedEvents'][0]);
                }
                if (data[i] && data[i]['bookmarkedJobs'] && data[i]['bookmarkedJobs'][0]) {
                    data[i]['bookmarkedJobs'][0]['type'] = 'opportunity';
                    bookmarks.push(data[i]['bookmarkedJobs'][0]);
                }
                if (data[i] && data[i]['bookmarkedProfiles'] && data[i]['bookmarkedProfiles'][0]) {
                    data[i]['bookmarkedProfiles'][0]['type'] = 'profile';
                    bookmarks.push(data[i]['bookmarkedProfiles'][0]);
                }
                if (i >= (data.length - 1)) {
                    return bookmarks;
                }
            }
        } else if (type === 'opportunity') {
            return resp['SUCCESS'][0]['bookmarkedJobs'];
        } else if (type === 'event') {
            return resp['SUCCESS'][0]['bookmarkedEvents'];
        } else if (type === 'profile') {
            return resp['SUCCESS'][0]['bookmarkedProfiles'];
        }
        return [];
    }

    /**
     * get current time
     */
    getCurrentTime() {
        return new Date(Date.now()).toISOString();
    }

    /**
     * check if given string is a json or not
     * @param string
     */
    isJson(str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return false;
        }
    }

    /**
     * Date put to reverse formate
     */
    reverseDate(string) {
        return string.split('-').reverse().join('-');
    }

    capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    isEmpty(obj: any) {
        if (obj == null || obj === undefined || obj.length === undefined) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param obj: to check the key
     * @param args: array of location to the nested key to check ['parentNode', 'childNode']
     */
    checkNestedKey(obj, args) {
        for (let i = 0; i < args.length; i++) {
            if (!obj || !obj.hasOwnProperty(args[i])) {
                return false;
            }
            obj = obj[args[i]];
        }
        return true;
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

    attachMultipleFiles($event) {
        const allFiles = $event.target.files;
        if (allFiles.length > 0) {
            const data = new FormData();
            for (let i = 0; i < allFiles.length; i++) {
                const randm = Math.random().toString(36).slice(2);
                const fileName = 'opp_' + randm + '.' + 'jpg';
                const file = allFiles[i];
                data.append('file[]', file, fileName );
                if (i >= (allFiles.length - 1)) {
                    return data;
                }
            }
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

    /**
     * 
     * @param dob Date validation
     */
    isValidDob(dob:any){
        // console.log(dob);
        const dateArr =  dob.split('-');
        const day = dateArr[0];
        const month = dateArr[1];
        const year = dateArr[2];
        const date =moment().year();
        const minLimit = date -100;
        // console.log(minLimit)
        // console.log(date);
      // check for valid day number
      if (parseInt(day, 10) > 31 || parseInt(day,10) < 1) {
         return {
            invalid : true,
            msg: 'Invalid Date of Birth'
        }
      }

        // check for valid month number
        if (parseInt(month, 10) > 12 || parseInt(month, 10) < 1) {
        return {
            invalid : true,
            msg: 'Invalid Date of Birth'
            }
        }

        // check if year is not greater that current
        if (new Date().getUTCFullYear() < year || year < minLimit) {
        return {
            invalid : true,
            msg: 'Invalid Date of Birth'
            }
        }

        const birtDay = moment(dob,"DD-MM-YYYY");
        let age=moment().diff(birtDay, 'years');        
        if (age <= 13) {
        return {  
            invalid : true,
                msg: 'You should be above 13'
            }
        }
        if (age >= 100) {
            return {
                invalid : true,
                msg: 'You should be below 100'
            }
        }
        return ;
    }

}
