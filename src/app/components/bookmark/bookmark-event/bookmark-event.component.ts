import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { BookmarkModel } from 'app/models/bookmark.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-bookmark-event',
  templateUrl: './bookmark-event.component.html',
  styleUrls: ['./../bookmark.component.scss']
})
export class BookmarkEventComponent implements OnInit, OnDestroy {

  showPreloader: boolean;
  bookmarkSub: ISubscription;
  bookmarkStore$: Observable<BookmarkModel>;
  bookmarkState: any;
  bookmarks = [];

  constructor(
    private store: Store<BookmarkModel>
  ) {
    this.bookmarkStore$ = this.store.select('bookmarkStore');
    this.bookmarkSub = this.bookmarkStore$.subscribe((state) => {
      this.bookmarkState = state;
      if (state.bookmarkType && state.bookmarkType === 'event') {
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

}
