import { Component, OnInit } from '@angular/core';

import { SearchActions } from './../../../actions/search.action';
import { ProfileActions } from './../../../actions/profile.action';
import { SearchModel } from './../../../models/search.model';

import { environment } from './../../../../environments/environment.prod';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { ProfileModal } from '../../../models/profile.model';

@Component({
  selector: 'app-search-channel',
  templateUrl: './search-channel.component.html',
  styleUrls: ['./search-channel.component.scss']
})
export class SearchChannelComponent implements OnInit {

  searchState$: Observable<SearchModel>;
  searchState: any;
  baseUrl: string;
  showPreloader = true;

  channels: any[];

  /* scroll */
  canScroll = true;
  scrolling = 0;
  scrollingLoad = 500;
  /* scroll */

  constructor(
    private profileStore: Store<ProfileModal>,
    private store: Store<SearchModel>
  ) {

    this.baseUrl = environment.API_IMAGE;
    this.searchState$ = this.store.select('searchTags');

  }

  ngOnInit() {

    // observe the store value
    this.searchState$.subscribe((state) => {
      this.searchState = state;
      if (state) {
        if (typeof state['search_channel_data'] !== 'undefined' && state['search_channel_data']['spotFeedResponse']) {
          this.channels = state['search_channel_data']['spotFeedResponse'];
        }
        // hide preloader
        if (typeof state['searching_channel'] !== 'undefined'
          && state['searching_channel'] === false
          && typeof state['search_channel_success'] !== 'undefined'
          && state['search_channel_success'] === true) {
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

  /**
   * Follow this channel
   */
  followChannel(e: any) {
    const req = {
      channelId: e.channel.spotfeedId,
      state: e.state
    };
    this.profileStore.dispatch({ type: ProfileActions.CHANNEL_FOLLOW, payload: req });
  }

}
