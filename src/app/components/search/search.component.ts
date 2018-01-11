import { Component, OnInit, ViewChild, Inject, HostListener, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { SearchActions } from './../../actions/search.action';
import { ProfileActions } from './../../actions/profile.action';

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
export class SearchComponent implements AfterViewInit {

  @ViewChild('searchInput') searchInput;
  @ViewChild('searchQueryElement') searchQueryElement;

  activeTab = 'tab-all';
  baseUrl: string;
  showSearchPlaceholder = true;
  isSearching = false;
  searchState$: Observable<SearchModel>;
  searchState: any;
  searchString: string;

  lastScrollTop = 0;
  canScroll = true;

  recordsPerPage = 10;
  showPreloader = false;

  constructor(
    private store: Store<SearchModel>,
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
      if (state && state.searching_people === false && state.searching_post === false && state.searching_channel === false) {
        this.isSearching = false;
        this.showPreloader = false;
      }
    });

  }

  ngAfterViewInit() {

    /**
     * Observing the search input change
     */
    // this.searchInput.valueChanges
    // .debounceTime(500)
    // .subscribe(() => {

    //   this.searchString = this.searchInput.value;

    //   // search if string is available
    //   if (this.searchString && this.searchString.length > 0) {
    //     this.isSearching = true;

    //     const searchParams = {
    //       query: this.searchString,
    //       offset: 0,
    //       limit: this.recordsPerPage
    //     }

    //     // search people
    //     this.store.dispatch({ type: SearchActions.SEARCH_PEOPLE, payload: searchParams });

    //     // search post
    //     this.store.dispatch({ type: SearchActions.SEARCH_POST, payload: searchParams });

    //     // search channel
    //     this.store.dispatch({ type: SearchActions.SEARCH_CHANNEL, payload: searchParams });
    //   }

    // });

  }

  /**
   * Search input on focus
   */
  searchOnFocus() {
    this.showSearchPlaceholder = false;
  }

  /**
   * Search input on blur
   */
  searchOnBlur() {
    if (this.searchQueryElement.nativeElement.value === '') {
      this.showSearchPlaceholder = true;
    }
  }

  /**
   * Select tab
   * @param tab id: string
   */
  selectTab(tabId: string) {
    this.activeTab = tabId;
  }

  // switchTab(tabId: string) {
  //   this.document.body.scrollTop = 0;
  //   // window.scrollTo(0, 0);
  //   this.selectTab(tabId);
  // }

  /**
   * Scroll event listener
   */
  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    const scrolledValue = window.pageYOffset;
    let scrollDirection = '';
    if (scrolledValue > this.lastScrollTop) {
      scrollDirection = 'down';
    } else {
      scrollDirection = 'up';
    }
    this.lastScrollTop = scrolledValue;

    if (this.canScroll && (window.innerHeight + window.scrollY) >= document.body.offsetHeight && scrollDirection === 'down') {
      // reached the bottom of the page
      this.canScroll = false;
      setTimeout(() => {
        this.canScroll = true;
      }, 1000);
      this.dispatchLoadMore();
    }
  }

  /**
   * Load more results for active tab
   */
  dispatchLoadMore() {
    if (this.searchQueryElement.nativeElement.value && this.searchQueryElement.nativeElement.value.length > 0 && this.activeTab !== 'tab-all') {
      this.showPreloader = true;
    } else {
      return;
    }

    if (this.activeTab === 'tab-people') {
      const searchParams = {
        query: this.searchQueryElement.nativeElement.value,
        offset: this.searchState.search_people_params.offset + this.recordsPerPage,
        limit: this.recordsPerPage
      }
      // search people
      this.store.dispatch({ type: SearchActions.SEARCH_PEOPLE, payload: searchParams });
    }

    if (this.activeTab === 'tab-post') {
      const searchParams = {
        query: this.searchQueryElement.nativeElement.value,
        offset: this.searchState.search_post_params.offset + this.recordsPerPage,
        limit: this.recordsPerPage
      }
      // search post
      this.store.dispatch({ type: SearchActions.SEARCH_POST, payload: searchParams });
    }

    if (this.activeTab === 'tab-channel') {
      const searchParams = {
        query: this.searchQueryElement.nativeElement.value,
        offset: this.searchState.search_channel_params.offset + this.recordsPerPage,
        limit: this.recordsPerPage
      }
      // search channel
      this.store.dispatch({ type: SearchActions.SEARCH_CHANNEL, payload: searchParams });
    }

  }

  onTabClick(tabId: any) {
    window.scrollTo(0, 0);
    // this.scrollToTop(100);
    this.selectTab(tabId);
  }

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
