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

// helper functions
import { ScrollHelper } from '../../helpers/scroll.helper';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

import { Store } from '@ngrx/store';
import * as _ from 'lodash';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('searchInput') searchInput;

  baseUrl: string;
  isSearching = false;
  searchState$: Observable<SearchModel>;
  searchState: any;
  searchString = '';
  beforeSearch: boolean;
  routeSub: any;

  searchFilters: any;

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

  channels: any[];
  artists: any[];
  posts: any[];
  globalFilter: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mediaStore: Store<Media>,
    private store: Store<SearchModel>,
    private scrollHelper: ScrollHelper,
    private profileStore: Store<ProfileModal>,
    @Inject(DOCUMENT) private document: Document
  ) {

    // init global filters
    this.resetFilters();

    /* ================== load current user ========= */
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
    /* ================== load current user ========= */

    this.baseUrl = environment.API_IMAGE;

    this.searchState$ = this.store.select('searchTags');

    // observe the store value
    this.searchState$.subscribe((state) => {
      this.searchState = state;
      console.log(this.searchState);
      if (state && state['search_filters']) {
        this.searchFilters = state['search_filters'];
        console.log(this.searchFilters);
      }
      if (state && (state.searching_all === false || state.searching_people === false || state.searching_post === false || state.searching_channel === false)) {
          this.isSearching = false;
          this.beforeSearch = false;
          this.showPreloader = false;
      }

      // load global artists
      if (state && state['search_all_data'] && state['search_all_data']['profiles']) {
        this.all_artists = state['search_all_data']['profiles'];
      }

      // load global posts
      if (state && state['search_all_data'] && state['search_all_data']['posts']) {
        this.all_posts = state['search_all_data']['posts'];
      }

      // load global channels
      if (state && state['search_all_data'] && state['search_all_data']['channels']) {
        this.all_channels = state['search_all_data']['channels'];
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

  // reset global filters
  resetFilters() {
    this.globalFilter = { profile: [], channel: [], post: [] };
  }

  // profile filter action
  profileFilterAction(e: any, parentNode: string) {
    if (e.target.checked && e.target.checked === true) {
      // append info the global filter
      this.globalFilter.profile.push({ key: parentNode, value: e.target.value });
    } else {
      // remove info from global filter
      this.globalFilter.profile = _.remove(this.globalFilter.profile, function(obj) {
        return !(obj.key === parentNode && obj.value === e.target.value);
      });
    }
    // console.log('global filters status: ', this.globalFilter);
    // preparing get query params for the search get request
    const params = {
      q: this.searchString,
      type: this.searchType,
      filters: encodeURIComponent(JSON.stringify(this.globalFilter))
    };

    // trigger search get request
    this.searchGetRequest(params);
  }

  // update filter on checking on the filter elements
  updateFilter(e: any, parentNode: string) {
    console.log(parentNode);
    if (e.target.checked && e.target.checked === true) {
      console.log('checked value: ', e.target.value);
    } else {
      console.log('unchecked value: ', e.target.value);
    }
  }

  ngOnInit() {
    this.beforeSearch = true;

    this.routeSub = this.route.queryParams
      .subscribe(params => {
        // check if params available
        if (params && params.q && params.q.length > 0) {

          // giving back the search value
          this.searchString = params.q;

          // scroll to top on view switch
          // this.scrollToTop(200);

          if (params.filters) {
            console.log('filters', JSON.parse(decodeURIComponent(params.filters)));
          }

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
                limit: 10,
                searchText: this.searchString
              }
              this.isSearching = true;
              this.store.dispatch({ type: SearchActions.SEARCH_PEOPLE, payload: searchPeopleParams });
            }

            if (this.searchType === 'channel') {
              const searchChannelParams = {
                offset: 0,
                limit: 10,
                searchText: this.searchString
              }
              this.isSearching = true;
              this.store.dispatch({ type: SearchActions.SEARCH_CHANNEL, payload: searchChannelParams });
            }

            if (this.searchType === 'post') {
              const searchPostParams = {
                offset: 0,
                limit: 10,
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

      // save search input ref in global var
      this.searchString = this.searchInput.value;

      // preparing get query params for the search get request
      const params = {
        q: this.searchString,
        type: this.searchType
      };

      // trigger search get request
      this.searchGetRequest(params);

    });

  }

  // trigger search action
  searchGetRequest(queryParams: any) {
    if (queryParams.q && queryParams.q.length === 0) { return; }
    this.router.navigate(['/search'], {
      queryParams: queryParams
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
    this.scrollHelper.scrollTop();
    this.router.navigate(['/search'], { queryParams: { q: this.searchString, type: this.searchType } });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
