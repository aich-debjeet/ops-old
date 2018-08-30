import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchActions } from '../../../actions/search.action';
import { environment } from 'environments/environment';
import { SearchModel } from '../../../models/search.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.scss']
})
export class SearchEventComponent implements OnInit, OnDestroy {

  searchState$: Observable<SearchModel>;
  searchState: any;
  baseUrl: string;
  showPreloader = true;

  events: any[];

  /* scroll */
  canScroll = true;
  scrolling = 0;
  scrollingLoad = 500;
  /* scroll */

  searchSub: ISubscription;

  constructor(
    private store: Store<SearchModel>
  ) {

    this.baseUrl = environment.API_IMAGE;
    this.searchState$ = this.store.select('searchTags');

  }

  ngOnInit() {

    // observe the store value
    this.searchSub = this.searchState$.subscribe((state) => {
      this.searchState = state;
      if (state) {
        if (typeof state['search_event_data'] !== 'undefined' && state['search_event_data']['eventResponse']) {
          this.events = state['search_event_data']['eventResponse'];
        }
        // hide preloader
        if (typeof state['searching_event'] !== 'undefined'
          && state['searching_event'] === false
          && typeof state['search_event_success'] !== 'undefined'
          && state['search_event_success'] === true) {
          this.showPreloader = false;
        }
      }
    });

  }

  /**
   * While Scrolling trigger next api call
   */
  onScroll(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.canScroll === true && this.scrollingLoad <= this.scrolling) {
      this.showPreloader = true;
      this.canScroll = false;
      this.scrollingLoad += 400;
      // check if it's first request
      if (this.searchState && this.searchState['search_event_data'] && this.searchState['search_event_data']['scrollId']) {
        this.store.dispatch({
          type: SearchActions.SEARCH_EVENT,
          payload: { scrollId: this.searchState['search_event_data']['scrollId'] }
        });
      }
      setTimeout(() => {
        this.canScroll = true;
      }, 1000);
    }
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
  }

}
