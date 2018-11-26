import { ActionReducer, Action } from '@ngrx/store';
import { BookmarkModel, initialBookmarkState } from '../models/bookmark.model';
import { BookmarkActions } from '../actions/bookmark.action';

import { GeneralUtilities } from '../helpers/general.utils';

const gUtils = new GeneralUtilities;

export const BookmarkReducer: ActionReducer<any> = (state = initialBookmarkState, { payload, type }: Action) => {

    switch (type) {

        case BookmarkActions.GET_BOOKMARKS_COUNT:
            return Object.assign({}, state, {
                loadingBookmarksCount: true,
                loadedBookmarksCount: false
            });

        case BookmarkActions.GET_BOOKMARKS_COUNT_SUCCESS:
            return Object.assign({}, state, {
                loadingBookmarksCount: false,
                loadedBookmarksCount: true,
                bookmarksCount: payload['SUCCESS']
            });

        case BookmarkActions.GET_BOOKMARKS_COUNT_FAILED:
            return Object.assign({}, state, {
                loadingBookmarksCount: false,
                loadedBookmarksCount: false
            });

        case BookmarkActions.GET_BOOKMARKS:
            return Object.assign({}, state, {
                loadingBookmarks: true,
                loadedBookmarks: false,
                requestPayload: payload,
                bookmarkType: payload['bookmarkType']
            });

        case BookmarkActions.GET_BOOKMARKS_SUCCESS:
            const newBookmarks = gUtils.sortBookmarks(state.bookmarkType, payload);
            if (state.requestPayload && state.requestPayload.offset === 0) {
                return Object.assign({}, state, {
                    loadingBookmarks: false,
                    loadedBookmarks: true,
                    bookmarks: newBookmarks
                });
            } else {
                return Object.assign({}, state, {
                    loadingBookmarks: false,
                    loadedBookmarks: true,
                    bookmarks: state.bookmarks.concat(newBookmarks)
                });
            }

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
