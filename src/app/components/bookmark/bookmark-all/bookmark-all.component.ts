import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { BookmarkModel } from 'app/models/bookmark.model';
import { Store } from '@ngrx/store';
import { GeneralUtilities } from 'app/helpers/general.utils';

@Component({
  selector: 'app-bookmark-all',
  templateUrl: './bookmark-all.component.html',
  styleUrls: ['./../bookmark.component.scss']
})
export class BookmarkAllComponent implements OnInit, OnDestroy {

  showPreloader: boolean;
  bookmarkSub: ISubscription;
  bookmarkStore$: Observable<BookmarkModel>;
  bookmarkState: any;
  bookmarks = [];

  constructor(
    private store: Store<BookmarkModel>,
    private gUtils: GeneralUtilities
  ) {
    this.bookmarkStore$ = this.store.select('bookmarkStore');
    this.bookmarkSub = this.bookmarkStore$.subscribe((state) => {
      this.bookmarkState = state;
      if (state.bookmarkType && state.bookmarkType === 'all') {
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

  deleteBookmark(data) {
    this.gUtils.filter({
      component: 'BookmarkComponent',
      action: 'deleteBookmark',
      payload: data
    });
  }

}
