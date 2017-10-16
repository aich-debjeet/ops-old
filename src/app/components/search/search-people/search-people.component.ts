import { Component, OnInit, Input } from '@angular/core';

import { SearchActions } from './../../../actions/search.action';
import { SearchModel } from './../../../models/search.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search-people',
  templateUrl: './search-people.component.html',
  styleUrls: ['./search-people.component.scss']
})
export class SearchPeopleComponent implements OnInit {

  searchState$: Observable<SearchModel>;

  constructor(
    private store: Store<SearchModel>
  ) {

    this.searchState$ = this.store.select('searchTags');

    // observe the store value
    this.searchState$.subscribe((state) => {
      console.log(state);
      // if (typeof state[''] !== 'undefined') {
      // }
    });

    // this.searchQuery.subscribe((response) => {
    //   console.log('Search response: ', response);
    // });

    // console.log('Search response: ', this.searchQuery);
  }

  ngOnInit() {

    // get all users
    this.store.dispatch({
      type: SearchActions.SEARCH_PEOPLE,
      payload: null
    });

  }

  searchUser() {
    // if (typeof this.searchQuery !== 'undefined' && this.searchQuery.length > 2) {
    //   this.store.dispatch({
    //     type: SearchActions.SEARCH_PEOPLE,
    //     payload: this.searchQuery
    //   });
    // }
  }

}
