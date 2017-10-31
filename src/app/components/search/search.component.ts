import { Component, OnInit, ViewChild, Inject, HostListener, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { SearchActions } from './../../actions/search.action';
import { SearchModel } from './../../models/search.model';

import { environment } from './../../../environments/environment.prod';

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
export class SearchComponent implements AfterViewInit {

  @ViewChild('searchInput') searchInput;
  @ViewChild('searchQueryElement') searchQueryElement;

  activeTab = 'tab-all';
  baseUrl: string;
  showSearchPlaceholder = true;
  isSearching = false;
  searchState$: Observable<SearchModel>;

  lastScrollTop = 0;
  canScroll = true;

  recordsPerPage = 10;

  constructor(
    private store: Store<SearchModel>,
    @Inject(DOCUMENT) private document: Document
  ) {

    this.baseUrl = environment.API_IMAGE;

    this.searchState$ = this.store.select('searchTags');

    // observe the store value
    this.searchState$.subscribe((state) => {
      console.log('searchState', state);
      if (state && state.searching_people === false && state.searching_post === false && state.searching_channel === false) {
        this.isSearching = false;
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

      const searchString = this.searchInput.value;
      console.log('searching: ', searchString);

      // search if string is available
      if (searchString && searchString.length > 0) {
        console.log('new search', searchString);
        this.isSearching = true;

        const searchParams = {
          query: searchString,
          offset: 0,
          limit: this.recordsPerPage
        }

        // search people
        this.store.dispatch({ type: SearchActions.SEARCH_PEOPLE, payload: searchParams });

        // search post
        this.store.dispatch({ type: SearchActions.SEARCH_POST, payload: searchParams });

        // search channel
        this.store.dispatch({ type: SearchActions.SEARCH_CHANNEL, payload: searchParams });
      }

    });

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
    // console.log('scrolling', $event);
    const scrolledValue = window.pageYOffset;
    let scrollDirection = '';
    if (scrolledValue > this.lastScrollTop) {
      scrollDirection = 'down';
    } else {
      scrollDirection = 'up';
    }
    this.lastScrollTop = scrolledValue;
    // console.log('scrolling direction', scrollDirection);

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
   * Load more search result
   */
  dispatchLoadMore() {
    console.log('load more: ' + this.activeTab);
  }

}
