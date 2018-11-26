import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookmarkModel } from 'app/models/bookmark.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { BookmarkActions } from 'app/actions/bookmark.action';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit, OnDestroy {

  routerSub: ISubscription;
  bookmarkSub: ISubscription;
  bookmarkStore$: Observable<BookmarkModel>;
  bookmarkState: any;
  reqParams = {
    bookmarkType: '',
    offset: 0,
    limit: 10
  }
  activeTab: string;
  bookmarkTotalCount = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<BookmarkModel>
  ) {
    this.bookmarkStore$ = this.store.select('bookmarkStore');
    this.bookmarkSub = this.bookmarkStore$.subscribe((state) => {
      this.bookmarkState = state;
      if (this.bookmarkState && this.bookmarkState.bookmarksCount && this.bookmarkTotalCount === 0) {
        const bookCountArr = this.bookmarkState.bookmarksCount;
        for (const key in bookCountArr) {
          if (bookCountArr.hasOwnProperty(key)) {
            this.bookmarkTotalCount += bookCountArr[key];
          }
        }
      }
    });
  }

  ngOnInit() {
    this.routerSub = this.router.events.filter(evt => evt instanceof NavigationEnd)
      .subscribe((event) => {
        this.activeTab = this.route.firstChild.routeConfig.path;
        this.getData();
      });
    const urlArr = location.href.split('/');
    this.activeTab = urlArr[urlArr.length - 1];
    this.getData();
  }

  getData() {
    this.reqParams.offset = 0;
    this.getBookmarks();
    this.getBookmarkCount();
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.bookmarkSub.unsubscribe();
  }

  getBookmarks() {
    this.reqParams.bookmarkType = this.activeTab;
    this.store.dispatch({ type: BookmarkActions.GET_BOOKMARKS, payload: this.reqParams });
  }

  getBookmarkCount() {
    this.store.dispatch({ type: BookmarkActions.GET_BOOKMARKS_COUNT });
  }

  loadMore(e: any) {
    this.reqParams.offset += this.reqParams.limit;
    this.getBookmarks();
  }

}
