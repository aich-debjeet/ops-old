import { Component, OnInit } from '@angular/core';

import { SearchActions } from './../../../actions/search.action';
import { SearchModel } from './../../../models/search.model';
import { MediaActions } from '../../../actions/media.action';

import { Media, initialMedia  } from '../../../models/media.model';

import { environment } from './../../../../environments/environment.prod';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.scss']
})
export class SearchPostComponent implements OnInit {

  searchState$: Observable<SearchModel>;
  searchState: any;
  baseUrl: string;

  posts: any[];

  /* scroll */
  canScroll = true;
  scrolling = 0;
  scrollingLoad = 800;
  /* scroll */

  constructor(
    private _store: Store<Media>,
    private store: Store<SearchModel>
  ) {

    this.baseUrl = environment.API_IMAGE;
    this.searchState$ = this.store.select('searchTags');

  }

  ngOnInit() {

    // observe the store value
    this.searchState$.subscribe((state) => {
      this.searchState = state;
      if (state && state['search_post_data'] && state['search_post_data']['mediaResponse']) {
        this.posts = state['search_post_data']['mediaResponse'];
      }
    });

  }

  // Media Popup
  mediaOpenPopup(id) {
    this._store.dispatch({ type: MediaActions.MEDIA_DETAILS, payload: id});
    this._store.dispatch({ type: MediaActions.MEDIA_COMMENT_FETCH, payload: id});
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
      if (this.searchState && this.searchState['search_post_data'] && this.searchState['search_post_data']['scrollId']) {
        this.store.dispatch({
          type: SearchActions.SEARCH_POST,
          payload: { scrollId: this.searchState['search_post_data']['scrollId'] }
        });
      }
      setTimeout(() => {
        this.canScroll = true;
      }, 1000);
    }
  }

}
