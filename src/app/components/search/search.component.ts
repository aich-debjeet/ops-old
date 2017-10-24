import { Component, OnInit } from '@angular/core';

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

  activeTab = 'tab-post';
  showSearchPlaceholder = true;
  search = {
    searchQuery: ''
  };
  isLoading = false;
  searchState$: Observable<SearchModel>;

  constructor(
    private store: Store<SearchModel>
  ) {

    this.searchState$ = this.store.select('searchTags');

    // observe the store value
    this.searchState$.subscribe((state) => {
      console.log('state', state);
      if (state && state.searching_people === false && state.searching_post === false) {
        this.isLoading = false;
      }
    });

  }

  searchTrigger(query: string) {
    // console.log('searching', query);
    this.search.searchQuery = query;
    this.isLoading = true;

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
    if (typeof this.search.searchQuery !== 'undefined') {
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
