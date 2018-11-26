import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { BookmarkService } from '../services/bookmark.service';
import { BookmarkActions } from '../actions/bookmark.action';

@Injectable()
export class BookmarkEffect {

  /**
   * get all bookmarks count
   */
  @Effect()
  getBookmarksCount$ = this.actions$
    .ofType(BookmarkActions.GET_BOOKMARKS_COUNT)
    .map(toPayload)
    .switchMap(() => this.bookmarkService.getBookmarksCount()
      .map(res => ({ type: BookmarkActions.GET_BOOKMARKS_COUNT_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: BookmarkActions.GET_BOOKMARKS_COUNT_FAILED, payload: res }))
    );

  /**
   * get all bookmarks
   */
  @Effect()
  getBookmarks$ = this.actions$
    .ofType(BookmarkActions.GET_BOOKMARKS)
    .map(toPayload)
    .switchMap((payload) => this.bookmarkService.getBookmarks(payload)
      .map(res => ({ type: BookmarkActions.GET_BOOKMARKS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: BookmarkActions.GET_BOOKMARKS_FAILED, payload: res }))
    );

  /**
   * bookmark
   */
  @Effect()
  bookmark$ = this.actions$
    .ofType(BookmarkActions.BOOKMARK)
    .map(toPayload)
    .switchMap((payload) => this.bookmarkService.bookmark(payload)
      .map(res => ({ type: BookmarkActions.BOOKMARK_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: BookmarkActions.BOOKMARK_FAILED, payload: res }))
    );

  constructor(
    private actions$: Actions,
    private bookmarkService: BookmarkService
  ) { }

}
