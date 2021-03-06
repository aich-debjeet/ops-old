import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { BookmarkModel } from 'app/models/bookmark.model';
import { Store } from '@ngrx/store';
import { GeneralUtilities } from 'app/helpers/general.utils';
import { ProfileActions } from 'app/actions/profile.action';
import { BookmarkActions } from 'app/actions/bookmark.action';

@Component({
  selector: 'app-bookmark-profile',
  templateUrl: './bookmark-profile.component.html',
  styleUrls: ['./../bookmark.component.scss']
})
export class BookmarkProfileComponent implements OnInit, OnDestroy {

  showPreloader: boolean;
  bookmarkSub: ISubscription;
  bookmarkStore$: Observable<BookmarkModel>;
  // bookmarkState: any;
  bookmarks = [];

  constructor(
    private store: Store<BookmarkModel>,
    private gUtils: GeneralUtilities
  ) {
    this.bookmarkStore$ = this.store.select('bookmarkStore');
    this.bookmarkSub = this.bookmarkStore$.subscribe((state) => {
      // this.bookmarkState = state;
      if (state.bookmarkType && state.bookmarkType === 'profile') {
        if (state.loadingBookmarks === false && state.loadedBookmarks === true) {
          this.showPreloader = false;
          this.bookmarks = state.bookmarks;
        }
        if (state.loadingBookmarks === true && state.loadedBookmarks === false) {
          this.showPreloader = true;
        }
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.bookmarkSub.unsubscribe();
  }

  /**
   * trigger follow/unfollow action
   * @param action type, user
   */
  followAction(action: string, user: any) {
    if (action === 'follow') {
      this.store.dispatch({ type: ProfileActions.PROFILE_FOLLOW, payload: user.handle });
      this.store.dispatch({ type: BookmarkActions.BOOKMARK_UPDATE_PROFILE_FOLLOW, payload: user.handle });
    } else if (action === 'unfollow') {
      this.store.dispatch({ type: ProfileActions.PROFILE_UNFOLLOW, payload: user.handle });
      this.store.dispatch({ type: BookmarkActions.BOOKMARK_UPDATE_PROFILE_UNFOLLOW, payload: user.handle });
    }
  }

  deleteBookmark(data) {
    this.gUtils.filter({
      component: 'BookmarkComponent',
      action: 'deleteBookmark',
      payload: data
    });
  }

}
