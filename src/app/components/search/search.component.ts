import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { SearchActions } from './../../actions/search.action';
import { SearchModel } from './../../models/search.model';

import { environment } from './../../../environments/environment.prod';

// rx
import { Observable } from 'rxjs/Observable';
// import { Subscription } from 'rxjs/Subscription';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @ViewChild('search_query') search_query;

  activeTab = 'tab-all';
  baseUrl: string;
  showSearchPlaceholder = true;
  search = {
    searchQuery: ''
  };
  isSearching = false;
  searchState$: Observable<SearchModel>;
  searchString: string;

  constructor(
    private store: Store<SearchModel>,
    @Inject(DOCUMENT) private document: Document
  ) {

    this.baseUrl = environment.API_IMAGE;

    this.searchState$ = this.store.select('searchTags');

    // observe the store value
    this.searchState$.subscribe((state) => {
      // console.log('searchState', state);
      if (state && state.searching_people === false && state.searching_post === false && state.searching_channel === false) {
        this.isSearching = false;
      }
    });

  }

  searchTrigger(query: string) {
    console.log('new search', query);
    this.search.searchQuery = query;
    this.isSearching = true;

    // search people
    this.store.dispatch({ type: SearchActions.SEARCH_PEOPLE, payload: this.search.searchQuery });

    // search post
    this.store.dispatch({ type: SearchActions.SEARCH_POST, payload: this.search.searchQuery });

    // search channel
    this.store.dispatch({ type: SearchActions.SEARCH_CHANNEL, payload: this.search.searchQuery });
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
    if (this.search_query.nativeElement.value === '') {
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

}
