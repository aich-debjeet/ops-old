import { Component, OnInit } from '@angular/core';

import { SearchActions } from './../../../actions/search.action';
import { SearchModel } from './../../../models/search.model';

import { environment } from './../../../../environments/environment.prod';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search-channel',
  templateUrl: './search-channel.component.html',
  styleUrls: ['./search-channel.component.scss']
})
export class SearchChannelComponent implements OnInit {

  searchState$: Observable<SearchModel>;
  searchState: any;
  baseUrl: string;

  channels: any[];

  /* scroll */
  canScroll = true;
  scrolling = 0;
  scrollingLoad = 800;
  /* scroll */

  constructor(
    private store: Store<SearchModel>
  ) {

    this.baseUrl = environment.API_IMAGE;
    this.searchState$ = this.store.select('searchTags');

  }

  ngOnInit() {

    // observe the store value
    this.searchState$.subscribe((state) => {
      this.searchState = state;
      if (state && state['search_channel_data'] && state['search_channel_data']['spotFeedResponse']) {
        this.channels = state['search_channel_data']['spotFeedResponse'];
      }
    });

  }

  /**
   * While Scrolling trigger next api call
   */
  onScroll(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.canScroll === true && this.scrollingLoad <= this.scrolling) {
      this.canScroll = false;
      this.scrollingLoad += 500;
      // check if it's first request
      if (this.searchState && this.searchState['search_channel_data'] && this.searchState['search_channel_data']['scrollId']) {
        this.store.dispatch({
          type: SearchActions.SEARCH_CHANNEL,
          payload: { scrollId: this.searchState['search_channel_data']['scrollId'] }
        });
      }
      setTimeout(() => {
        this.canScroll = true;
      }, 1000);
    }
  }

}
