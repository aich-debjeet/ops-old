import { ActionReducer, Action } from '@ngrx/store';
import { Bookmark, initialBookmarkState } from '../models/bookmark.model';

import { BookmarkActions } from '../actions/bookmark.action';


export const BookmarkReducer: ActionReducer<any> = (state = initialBookmarkState, { payload, type }: Action) => {

    switch (type) {

        case BookmarkActions.GET_ALL_BOOKMARKS:
            return Object.assign({}, state, {
                loadingBookmarks: true,
                loadedBookmarks: false,
                requestPayload: payload
            });

        case BookmarkActions.GET_ALL_BOOKMARKS_SUCCESS:
            return Object.assign({}, state, {
                loadingBookmarks: false,
                loadedBookmarks: true,
                bookmarks: payload
            });

        case BookmarkActions.GET_ALL_BOOKMARKS_SUCCESS:
            return Object.assign({}, state, {
                loadingBookmarks: false,
                loadedBookmarks: true,
                bookmarks: payload
            });

        default:
            return state;

    }

}
