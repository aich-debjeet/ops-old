import { Component, OnInit, ViewChild, Inject, HostListener, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { SearchActions } from './../../actions/search.action';
import { ProfileActions } from './../../actions/profile.action';
import { MediaActions } from '../../actions/media.action';

import { Media, initialMedia  } from '../../models/media.model';
import { SearchModel } from './../../models/search.model';
import { ProfileModal, initialTag } from '../../models/profile.model';

import { environment } from './../../../environments/environment.prod';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

import { Store } from '@ngrx/store';
import { setTimeout } from 'core-js/library/web/timers';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') searchInput;
  @ViewChild('searchQueryElement') searchQueryElement;

  activeTab = 'tab-all';
  baseUrl: string;
  showSearchPlaceholder = true;
  isSearching = false;
  searchState$: Observable<SearchModel>;
  searchState: any;
  searchString = '';
  beforeSearch: boolean;

  lastScrollTop = 0;
  canScroll = true;

  recordsPerPage = 10;
  showPreloader = false;

  resultCount = 0;
  searchType = 'all';

  /* result store */
  channels: any[];
  artists: any[];
  posts: any[];
  /* result store */

  constructor(
    private store: Store<SearchModel>,
    private mediaStore: Store<Media>,
    private profileStore: Store<ProfileModal>,
    @Inject(DOCUMENT) private document: Document
  ) {

    /* ================== load current user ========= */
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
    /* ================== load current user ========= */

    this.baseUrl = environment.API_IMAGE;

    this.searchState$ = this.store.select('searchTags');

    // observe the store value
    this.searchState$.subscribe((state) => {
      this.searchState = state;
      // console.log(this.searchState);
      if (state && state.searching_all === false) {
          this.isSearching = false;
          this.beforeSearch = false;
          this.showPreloader = false;
      }
      
      // load artists
      if (state && state['search_all_data'] && state['search_all_data']['profiles']) {
        this.artists = state['search_all_data']['profiles'];
      }
      
      // load posts
      if (state && state['search_all_data'] && state['search_all_data']['posts']) {
        this.posts = state['search_all_data']['posts'];
      }

      // load channels
      if (state && state['search_all_data'] && state['search_all_data']['channels']) {
        this.channels = state['search_all_data']['channels'];
      }

      if (state
        && state['search_all_data']
        && state['search_all_data']['totalMediaResults'] !== undefined
        && state['search_all_data']['totalChannelResults'] !== undefined
        && state['search_all_data']['totalProfileResults'] !== undefined) {
        this.resultCount = state['search_all_data']['totalChannelResults'] + state['search_all_data']['totalMediaResults'] + state['search_all_data']['totalProfileResults'];
        // console.log(state['search_all_data']['totalChannelResults'] + state['search_all_data']['totalMediaResults'] + state['search_all_data']['totalProfileResults']);
      }
      // if (state && state.searching_people === false && state.searching_post === false && state.searching_channel === false) {
      //   this.isSearching = false;
      //   this.beforeSearch = false;
      //   this.showPreloader = false;
      // }
    });

  }

  ngOnInit() {
    this.beforeSearch = true;
  }

  ngAfterViewInit() {

    /**
     * Observing the search input change
     */
    this.searchInput.valueChanges
    .debounceTime(500)
    .subscribe(() => {

      this.searchString = this.searchInput.value;

      // search if string is available
      if (this.searchString && this.searchString.length > 0) {
        this.isSearching = true;

        const searchParams = {
          searchText: this.searchString,
          from: 0,
          limit: this.recordsPerPage
        }

        // search all
        this.store.dispatch({ type: SearchActions.SEARCH_ALL, payload: searchParams });
      }

    });

  }

  // Media Popup
  mediaOpenPopup(id) {
    this.mediaStore.dispatch({ type: MediaActions.MEDIA_DETAILS, payload: id });
    this.mediaStore.dispatch({ type: MediaActions.MEDIA_COMMENT_FETCH, payload: id });
  }

  seeAll(sType: string) {
    this.searchType = sType;
    console.log('this.searchType', this.searchType);
  }

  /**
   * Scroll event listener
   */
  // @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
  //   const scrolledValue = window.pageYOffset;
  //   let scrollDirection = '';
  //   if (scrolledValue > this.lastScrollTop) {
  //     scrollDirection = 'down';
  //   } else {
  //     scrollDirection = 'up';
  //   }
  //   this.lastScrollTop = scrolledValue;

  //   if (this.canScroll && (window.innerHeight + window.scrollY) >= document.body.offsetHeight && scrollDirection === 'down') {
  //     // reached the bottom of the page
  //     this.canScroll = false;
  //     setTimeout(() => {
  //       this.canScroll = true;
  //     }, 1000);
  //     this.dispatchLoadMore();
  //   }
  // }

  /**
   * Load more results for active tab
   */
  // dispatchLoadMore() {
  //   if (this.searchQueryElement.nativeElement.value && this.searchQueryElement.nativeElement.value.length > 0 && this.activeTab !== 'tab-all') {
  //     this.showPreloader = true;
  //   } else {
  //     return;
  //   }

  //   if (this.activeTab === 'tab-people') {
  //     const searchParams = {
  //       query: this.searchQueryElement.nativeElement.value,
  //       offset: this.searchState.search_people_params.offset + this.recordsPerPage,
  //       limit: this.recordsPerPage
  //     }
  //     // search people
  //     this.store.dispatch({ type: SearchActions.SEARCH_PEOPLE, payload: searchParams });
  //   }

  //   if (this.activeTab === 'tab-post') {
  //     const searchParams = {
  //       query: this.searchQueryElement.nativeElement.value,
  //       offset: this.searchState.search_post_params.offset + this.recordsPerPage,
  //       limit: this.recordsPerPage
  //     }
  //     // search post
  //     this.store.dispatch({ type: SearchActions.SEARCH_POST, payload: searchParams });
  //   }

  //   if (this.activeTab === 'tab-channel') {
  //     const searchParams = {
  //       query: this.searchQueryElement.nativeElement.value,
  //       offset: this.searchState.search_channel_params.offset + this.recordsPerPage,
  //       limit: this.recordsPerPage
  //     }
  //     // search channel
  //     this.store.dispatch({ type: SearchActions.SEARCH_CHANNEL, payload: searchParams });
  //   }

  // }

  // scrollToTop(scrollDuration) {
  //   const scrollStep = -window.scrollY / (scrollDuration / 15),
  //   scrollInterval = setInterval(function() {
  //   if (window.scrollY !== 0) {
  //     window.scrollBy( 0, scrollStep);
  //   } else {
  //     clearInterval(scrollInterval);
  //   }
  //   }, 15);
  // }

}
