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
    bookmarkType: 'profile',
    offset: 0,
    limit: 1
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookmarkStore: Store<BookmarkModel>
  ) {
    this.bookmarkStore.dispatch({ type: BookmarkActions.GET_ALL_BOOKMARKS, payload: this.reqParams });
  }

  ngOnInit() {
    this.routerSub = this.router.events.filter(evt => evt instanceof NavigationEnd)
      .subscribe((event) => {
        console.log(event['url']);
        console.log(this.route.firstChild.routeConfig.path);
      });
    console.log('url', this.router.url);
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

}
