import { Component, OnInit, OnDestroy, ViewChild, Inject, HostListener, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { SearchActions } from './../../actions/search.action';
import { ProfileActions } from './../../actions/profile.action';
import { MediaActions } from '../../actions/media.action';

import { Media, initialMedia  } from '../../models/media.model';
import { SearchModel } from './../../models/search.model';
import { ProfileModal, initialTag } from '../../models/profile.model';

import { environment } from './../../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {

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
  routeSub: any;

  lastScrollTop = 0;
  canScroll = true;

  recordsPerPage = 10;
  showPreloader = false;

  resultCount = 0;
  searchType = 'all';

  /* global result store */
  all_channels: any[];
  all_artists: any[];
  all_posts: any[];
  /* global result store */

  /* scroll */
  page_start = 0;
  page_end = 20;
  scrolling = 0;
  scrollingLoad = 100;
  /* scroll */

  channels: any[];
  artists: any[];
  posts: any[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
      if (state && (state.searching_all === false || state.searching_people === false || state.searching_post === false || state.searching_channel === false)) {
          this.isSearching = false;
          this.beforeSearch = false;
          this.showPreloader = false;
      }

      // load global artists
      if (state && state['search_all_data'] && state['search_all_data']['profiles']) {
        this.all_artists = state['search_all_data']['profiles'];
      }
      if (state && state['search_people_data'] && state['search_people_data']['profileResponse']) {
        this.artists = state['search_people_data']['profileResponse'];
      }

      // load global posts
      if (state && state['search_all_data'] && state['search_all_data']['posts']) {
        this.all_posts = state['search_all_data']['posts'];
      }
      if (state && state['search_post_data'] && state['search_post_data']['mediaResponse']) {
        this.posts = state['search_post_data']['mediaResponse'];
      }

      // load global channels
      if (state && state['search_all_data'] && state['search_all_data']['channels']) {
        this.all_channels = state['search_all_data']['channels'];
      }
      if (state && state['search_channel_data'] && state['search_channel_data']['spotFeedResponse']) {
        this.channels = state['search_channel_data']['spotFeedResponse'];
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

    this.routeSub = this.route.queryParams
      .subscribe(params => {
        // console.log(params);

        // check if params available
        if (params && params.q && params.q.length > 0) {

          // giving back the search value
          this.searchString = params.q;

          // scroll to top on view switch
          // this.scrollToTop(200);

          // check if search is global
          if ((params.type && params.type === 'all') || !params.type) {
            const searchAllParams = {
              searchText: this.searchString,
              from: 0,
              limit: this.recordsPerPage
            }
            // search all
            this.isSearching = true;
            this.store.dispatch({ type: SearchActions.SEARCH_ALL, payload: searchAllParams });
          }

          // check if search type is available
          if (params.type && params.type.length > 0) {

            // giving back the search type
            this.searchType = params.type;

            // making a dispatch depending on the search type
            if (this.searchType === 'people') {
              const searchPeopleParams = {
                isHuman: '1',
                status: [],
                offset: 0,
                limit: 50,
                searchText: this.searchString
              }
              this.isSearching = true;
              this.store.dispatch({ type: SearchActions.SEARCH_PEOPLE, payload: searchPeopleParams });
            }

            if (this.searchType === 'channel') {
              const searchChannelParams = {
                offset: 0,
                limit: 50,
                searchText: this.searchString
              }
              this.isSearching = true;
              this.store.dispatch({ type: SearchActions.SEARCH_CHANNEL, payload: searchChannelParams });
            }

            if (this.searchType === 'post') {
              const searchPostParams = {
                offset: 0,
                limit: 50,
                searchText: this.searchString
              }
              this.isSearching = true;
              this.store.dispatch({ type: SearchActions.SEARCH_POST, payload: searchPostParams });
            }

          }

        }

      });
  }

  ngAfterViewInit() {

    /**
     * Observing the search input change
     */
    this.searchInput.valueChanges
    .debounceTime(500)
    .subscribe(() => {

      this.searchString = this.searchInput.value;
      // console.log('this.searchString', this.searchString);
      if (this.searchString.length === 0) { return; }
      this.router.navigate(['/search'], { queryParams: { q: this.searchString, type: this.searchType } });

    });

  }

  // Media Popup
  mediaOpenPopup(id) {
    this.mediaStore.dispatch({ type: MediaActions.MEDIA_DETAILS, payload: id });
    this.mediaStore.dispatch({ type: MediaActions.MEDIA_COMMENT_FETCH, payload: id });
  }

  // see all results with the selected type
  seeAll(sType: string) {
    this.searchType = sType;
    // console.log('this.searchType', this.searchType);
    this.router.navigate(['/search'], { queryParams: { q: this.searchString, type: this.searchType } });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  /**
   * While Scrolling trigger next api call
   */
  onScroll(e) {
    this.scrolling = e.currentScrollPosition;
    console.log('scrolling', this.scrolling);
    console.log('scrollingLoad', this.scrollingLoad);
    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 1500
      this.page_start = this.page_end + 1;
      this.page_end += 15;
      console.log('LOAD MORE');
    }
  }

  // /**
  //  * Scroll event listener
  //  */
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
  //     // this.dispatchLoadMore();
  //     console.log('reached bottom scroll more');
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

}
