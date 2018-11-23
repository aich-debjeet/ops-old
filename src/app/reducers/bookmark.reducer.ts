import { ActionReducer, Action } from '@ngrx/store';
import { BookmarkModel, initialBookmarkState } from '../models/bookmark.model';

import { BookmarkActions } from '../actions/bookmark.action';


export const BookmarkReducer: ActionReducer<any> = (state = initialBookmarkState, { payload, type }: Action) => {

    switch (type) {

        case BookmarkActions.GET_BOOKMARKS:
            return Object.assign({}, state, {
                loadingBookmarks: true,
                loadedBookmarks: false,
                requestPayload: payload,
                bookmarkType: payload['bookmarkType']
            });

        case BookmarkActions.GET_BOOKMARKS_SUCCESS:
            return Object.assign({}, state, {
                loadingBookmarks: false,
                loadedBookmarks: true,
                bookmarkData: payload['SUCCESS'][0]
            });

        case BookmarkActions.GET_BOOKMARKS_FAILED:
            return Object.assign({}, state, {
                loadingBookmarks: false,
                loadedBookmarks: false
            });

        case BookmarkActions.BOOKMARK:
            return Object.assign({}, state, {
                bookmarking: true,
                bookmarked: false,
                requestPayload: payload
            });

        case BookmarkActions.BOOKMARK_SUCCESS:
            return Object.assign({}, state, {
                bookmarking: false,
                bookmarked: true,
                bookmarkResponse: payload
            });

        case BookmarkActions.BOOKMARK_FAILED:
            return Object.assign({}, state, {
                bookmarking: false,
                bookmarked: false
            });

        default:
            return state;

    }

}
