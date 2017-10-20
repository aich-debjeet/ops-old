import { Component, OnInit } from '@angular/core';

import { SearchActions } from './../../actions/search.action';
import { SearchModel } from './../../models/search.model';

import { environment } from './../../../environments/environment.prod';

// rx
// import { Observable } from 'rxjs/Observable';
// import { Subscription } from 'rxjs/Subscription';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';

// import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  // searchPeopleState$: Observable<SearchModel>;
  // baseUrl: string;

  activeTab = 'tab-all';
  showSearchPlaceholder = true;
  search = {
    searchQuery: ''
  };
  // artists: any[];
  // isLoading = false;

  constructor(
    // private store: Store<SearchModel>
  ) {

    // this.baseUrl = environment.API_IMAGE;
    // this.searchPeopleState$ = this.store.select('searchTags');

  }

  searchTrigger(query: string) {
    console.log('searching', query);
    this.search.searchQuery = query;
  }

  ngOnInit() {

    // // observe the store value
    // this.searchPeopleState$.subscribe((state) => {
    //   console.log('state', state);
    //   if (state && state.hasOwnProperty('search_people')) {
    //     this.artists = state.search_people;
    //   }

    //   if (state && state.hasOwnProperty('searching_people')) {
    //     // console.log('searching status', state.searching_people);
    //     this.isLoading = state.searching_people;
    //   }
    // });

    // this.searchQuery.valueChanges
    //   .debounceTime(200)
    //   .subscribe((value) => {
    //     if (value !== '') {
    //       // console.log('this.searchQuery', value);
    //       this.store.dispatch({
    //         type: SearchActions.SEARCH_PEOPLE,
    //         payload: value
    //       });
    //     }
    //   });

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
    // if (typeof this.searchQuery !== 'undefined') {
    //   this.showSearchPlaceholder = true;
    // }
  }

  /**
   * Select tab
   * @param tab id: string
   */
  selectTab(tabId: string) {
    this.activeTab = tabId;
  }

}
