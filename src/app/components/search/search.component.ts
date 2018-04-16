import { Component, OnInit, OnDestroy, ViewChild, Inject, HostListener, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { SearchActions } from './../../actions/search.action';
import { ProfileActions } from './../../actions/profile.action';
import { MediaActions } from '../../actions/media.action';

import { Media, initialMedia  } from '../../models/media.model';
import { SearchModel } from './../../models/search.model';
import { ProfileModal, initialTag } from '../../models/profile.model';

import { environment } from './../../../environments/environment.prod';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

// helper functions
import { ScrollHelper } from '../../helpers/scroll.helper';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';

import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { GeneralUtilities } from '../../helpers/general.utils';

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
  selectedProfileFilters: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mediaStore: Store<Media>,
    private store: Store<SearchModel>,
    private scrollHelper: ScrollHelper,
    private generalHelper: GeneralUtilities,
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
      // console.log(this.searchState);

      // filtermap for reference
      if (this.searchState
        && this.searchState['search_all_params']
        && this.searchState['search_all_params']['filtersMap']
        && this.searchState['search_all_params']['filtersMap']['profile']
      ) {
        const prof = this.searchState['search_all_params']['filtersMap']['profile'];
        for (let i = 0; i < prof.length; i++) {
          // const key = prof['key'].toUppercase();
          this.selectedProfileFilters['profile'][prof[i]['key']] = prof[i]['value'];
        }
        // console.log('selectedProfileFilters', this.selectedProfileFilters);
      }

      // search filters local for reference
      if (state && state['search_filters']) {
        this.searchFilters = state['search_filters'];
        // console.log(this.searchFilters);
      }

      // check for the http request response status
      if (state && (state.searching_all === false || state.searching_people === false || state.searching_post === false || state.searching_channel === false)) {
          this.isSearching = false;
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

      // check if active search is people and update the count
      if (state && state['search_people_data'] && state['search_people_data']['total'] && this.searchType === 'people') {
        this.resultCount = state['search_people_data']['total'];
      }
      // check if active search is post and update the count
      if (state && state['search_post_data'] && state['search_post_data']['total'] && this.searchType === 'post') {
        this.resultCount = state['search_post_data']['total'];
      }
      // check if active search is channel and update the count
      if (state && state['search_channel_data'] && state['search_channel_data']['total'] && this.searchType === 'channel') {
        this.resultCount = state['search_channel_data']['total'];
      }
    });

  }

  // reset global filters
  resetFilters() {
    this.globalFilter = { profile: [], channel: [], post: [] };
    this.selectedProfileFilters = {
      profile: {
        PROFESSION: '',
        SKILLS: '',
        CITY: '',
      },
      channel: [],
      post: [],
    };
  }

  // profile filter action
  profileFilterSelection(filterValue: any, parentNode: string) {
    if (filterValue.length > 0) {
      const profFilterOpt = { key: parentNode, value: filterValue };
      // check if object already available in the global filters
      if (!_.find(this.globalFilter.profile, profFilterOpt)) {
        this.globalFilter.profile.push(profFilterOpt);
      }
      // console.log('this.globalFilter.profile', this.globalFilter.profile);
    } else {
      // remove info from global filter
      this.globalFilter.profile = _.remove(this.globalFilter.profile, function(obj) {
        return !(obj.key === parentNode && obj.value === filterValue);
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

  // post filter action
  postFilterAction(e: any, parentNode: string) {
    if (e.target.checked && e.target.checked === true) {
      const postFilterOpt = { key: parentNode, value: e.target.value };
      // check if object already available in the global filters
      if (!_.find(this.globalFilter.post, postFilterOpt)) {
        this.globalFilter.post.push(postFilterOpt);
      }
      // console.log('this.globalFilter.post', this.globalFilter.post);
    } else {
      // remove info from global filter
      this.globalFilter.post = _.remove(this.globalFilter.post, function(obj) {
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

  // channel filter action
  channelFilterAction(e: any, parentNode: string) {
    if (e.target.checked && e.target.checked === true) {
      const channelFilterOpt = { key: parentNode, value: e.target.value };
      // check if object already available in the global filters
      if (!_.find(this.globalFilter.channel, channelFilterOpt)) {
        this.globalFilter.channel.push(channelFilterOpt);
      }
      // console.log('this.globalFilter.channel', this.globalFilter.channel);
    } else {
      // remove info from global filter
      this.globalFilter.channel = _.remove(this.globalFilter.channel, function(obj) {
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
    // console.log(parentNode);
    if (e.target.checked && e.target.checked === true) {
      // console.log('checked value: ', e.target.value);
    } else {
      // console.log('unchecked value: ', e.target.value);
    }
  }

  ngOnInit() {
    // set scroll to top
    this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    })

    this.routeSub = this.route.queryParams
      .subscribe(params => {
        // check if params available
        if (params && params.q && params.q.length > 0) {

          // giving back the search value
          this.searchString = params.q;

          // scroll to top on view switch
          // this.scrollToTop(200);

          if (params.filters) {
            // console.log('filters', JSON.parse(decodeURIComponent(params.filters)));
          }

          // check if search is global
          if ((params.type && params.type === 'all') || !params.type) {
            const searchAllParams = {
              searchText: this.searchString,
              from: 0,
              limit: this.recordsPerPage,
              filtersMap: this.globalFilter
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

      if (this.searchString.length === 0) {
        // trigger search get request
        this.searchGetRequest({});
      }

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
    this.router.navigate(['/search'], {
      queryParams: queryParams
    });
    return false;
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
    this.searchGetRequest({ q: this.searchString, type: this.searchType });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  /**
   * @param filterValue name of the filter to check
   * @param filterType name of the parent filter
   */
  checkIfSelected(filterValue: string, filterType: string) {
    if (this.searchState['search_all_params']['filtersMap']
    && this.searchState['search_all_params']['filtersMap']['post']
    && this.searchState['search_all_params']['filtersMap']['post'].length > 0) {
      const fList = this.searchState['search_all_params']['filtersMap']['post'];
      // console.log('filterValue', filterValue);
      // console.log('fList', fList);
      if (_.find(fList, { 'value': filterValue })) {
        return true;
      } else {
        return false;
      }
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
