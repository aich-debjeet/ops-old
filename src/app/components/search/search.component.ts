import { Component, OnInit, ViewChild } from '@angular/core';

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
  showSearchPlaceholder = true;
  search = {
    searchQuery: ''
  };
  isSearching = false;
  searchState$: Observable<SearchModel>;

  constructor(
    private store: Store<SearchModel>
  ) {

    this.searchState$ = this.store.select('searchTags');

    // observe the store value
    this.searchState$.subscribe((state) => {
      // console.log('state', state);
      if (state && state.searching_people === false && state.searching_post === false) {
        this.isSearching = false;
      }
    });

  }

  searchTrigger(query: string) {
    // console.log('searching', query);
    this.search.searchQuery = query;
    this.isSearching = true;

    // search people
    this.store.dispatch({ type: SearchActions.SEARCH_PEOPLE, payload: this.search.searchQuery });

    // search post
    this.store.dispatch({ type: SearchActions.SEARCH_POST, payload: this.search.searchQuery });
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

}
