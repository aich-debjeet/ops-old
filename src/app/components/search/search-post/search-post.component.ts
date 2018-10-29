import { Component, OnInit, OnDestroy } from '@angular/core';

import { SearchActions } from './../../../actions/search.action';
import { SearchModel } from './../../../models/search.model';
import { MediaActions } from '../../../actions/media.action';

import { Media, initialMedia  } from '../../../models/media.model';

import { environment } from './../../../../environments/environment.prod';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.scss']
})
export class SearchPostComponent implements OnInit, OnDestroy {

  searchState$: Observable<SearchModel>;
  searchState: any;
  baseUrl: string;
  showPreloader = true;

  posts: any[];

  /* scroll */
  canScroll = true;
  scrolling = 0;
  scrollingLoad = 800;
  /* scroll */

  searchSub: ISubscription;

  constructor(
    private mediaStore: Store<Media>,
    private toastr: ToastrService,
    private searchStore: Store<SearchModel>
  ) {

    this.baseUrl = environment.API_IMAGE;
    this.searchState$ = this.searchStore.select('searchTags');

  }

  ngOnInit() {

    // observe the store value
    this.searchSub = this.searchState$.subscribe((state) => {
      this.searchState = state;
      if (state) {
        if (typeof state['search_post_data'] !== 'undefined' && state['search_post_data']['mediaResponse']) {
          this.posts = state['search_post_data']['mediaResponse'];
        }
        // hide preloader
        if (typeof state['searching_post'] !== 'undefined'
          && state['searching_post'] === false
          && typeof state['search_post_success'] !== 'undefined'
          && state['search_post_success'] === true) {
          this.showPreloader = false;
        }
      }
    });

  }

  // Media Popup
  mediaOpenPopup(id) {
    this.mediaStore.dispatch({ type: MediaActions.MEDIA_DETAILS, payload: id});
    this.mediaStore.dispatch({ type: MediaActions.MEDIA_COMMENT_FETCH, payload: id});
  }

  /**
   * While Scrolling trigger next api call
   */
  onScroll(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.canScroll === true && this.scrollingLoad <= this.scrolling) {
      this.showPreloader = true;
      this.canScroll = false;
      this.scrollingLoad += 500;
      // check if it's first request
      if (this.searchState && this.searchState['search_post_data'] && this.searchState['search_post_data']['scrollId']) {
        this.searchStore.dispatch({
          type: SearchActions.SEARCH_POST,
          payload: { scrollId: this.searchState['search_post_data']['scrollId'] }
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

  deletePost(media) {
    const id = media['id'];
    this.searchStore.dispatch({ type: SearchActions.SEARCH_MEDIA_POST_DELETE, payload: id });
    this.searchStore.select('searchTags')
      .first(state => state['searchDeletedMediaPost'] === true)
      .subscribe(data => {
        this.toastr.success('Media deleted successfully', 'Success!', {
          timeOut: 3000
        });
      });
  }

}
