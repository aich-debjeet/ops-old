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
   * explore media post delete
   */
  @Effect()
  exploreMediaPostDelete$ = this.actions$
    .ofType(BookmarkActions.GET_ALL_BOOKMARKS)
    .map(toPayload)
    .switchMap((payload) => this.bookmarkService.getAllBookmarks(payload)
      .map(res => ({ type: BookmarkActions.GET_ALL_BOOKMARKS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: BookmarkActions.GET_ALL_BOOKMARKS_FAILED, payload: res }))
    );

  constructor(
    private actions$: Actions,
    private bookmarkService: BookmarkService
  ) { }

}
