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
  bookmarkState$: Observable<BookmarkModel>;
  reqParams = {
    bookmarkType: '',
    offset: 0,
    limit: 0
  }
  activeTab: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookmarkStore: Store<BookmarkModel>
  ) {
  }

  ngOnInit() {
    this.routerSub = this.router.events.filter(evt => evt instanceof NavigationEnd)
      .subscribe((event) => {
        // console.log(event['url']);
        // console.log(this.route.firstChild.routeConfig.path);
        this.activeTab = this.route.firstChild.routeConfig.path;
        this.getBookmarks();
      });
    const urlArr = location.href.split('/')
    this.activeTab = urlArr[urlArr.length - 1];
    this.getBookmarks();
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

  getBookmarks() {
    this.reqParams.bookmarkType = this.activeTab;
    this.reqParams.offset = 0;
    this.reqParams.limit = 10;
    this.bookmarkStore.dispatch({ type: BookmarkActions.GET_BOOKMARKS, payload: this.reqParams });
  }

}
