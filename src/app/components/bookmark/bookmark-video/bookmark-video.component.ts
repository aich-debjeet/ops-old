import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookmarkModel } from 'app/models/bookmark.model';
import { ISubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { GeneralUtilities } from 'app/helpers/general.utils';

@Component({
  selector: 'app-bookmark-video',
  templateUrl: './bookmark-video.component.html',
  styleUrls: ['./../bookmark.component.scss']
})
export class BookmarkVideoComponent implements OnInit, OnDestroy {

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
      if (state.bookmarkType && state.bookmarkType === 'video') {
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
