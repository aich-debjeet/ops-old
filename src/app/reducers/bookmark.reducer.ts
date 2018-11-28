import { ActionReducer, Action } from '@ngrx/store';
import { BookmarkModel, initialBookmarkState } from '../models/bookmark.model';
import { BookmarkActions } from '../actions/bookmark.action';

import { GeneralUtilities } from '../helpers/general.utils';

const gUtils = new GeneralUtilities;

export const BookmarkReducer: ActionReducer<any> = (state = initialBookmarkState, { payload, type }: Action) => {

    switch (type) {

        case BookmarkActions.BOOKMARK_UPDATE_PROFILE_FOLLOW:
            const profFlIdx = state.bookmarks.map(bookmark => bookmark.handle).indexOf(payload);
            if (profFlIdx >= 0) {
                const flBookmarks = state.bookmarks;
                flBookmarks[profFlIdx].isFollowing = true;
                return Object.assign({}, state, {
                    bookmarks: flBookmarks
                });
            }
            return state;

        case BookmarkActions.BOOKMARK_UPDATE_PROFILE_UNFOLLOW:
            const profUfIdx = state.bookmarks.map(bookmark => bookmark.handle).indexOf(payload);
            if (profUfIdx >= 0) {
                const ufBookmarks = state.bookmarks;
                ufBookmarks[profUfIdx].isFollowing = false;
                return Object.assign({}, state, {
                    bookmarks: ufBookmarks
                });
            }
            return state;

        case BookmarkActions.DELETE_BOOKMARK:
            return Object.assign({}, state, {
                deletingBookmark: true,
                deletedBookmark: false,
                deleteBookmarkReqParams: payload
            });

        case BookmarkActions.DELETE_BOOKMARK_SUCCESS:
            return Object.assign({}, state, {
                deletingBookmark: false,
                deletedBookmark: true,
                bookmarks: gUtils.removeRecordFromState(state.deleteBookmarkReqParams, state.bookmarks)
            });

        case BookmarkActions.DELETE_BOOKMARK_FAILED:
            return Object.assign({}, state, {
                deletingBookmark: false,
                deletedBookmark: false
            });

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
