import { Component, OnInit } from '@angular/core';

import { SearchActions } from './../../../actions/search.action';
import { SearchModel } from './../../../models/search.model';

import { environment } from './../../../../environments/environment.prod';

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
  searchState: any;
  baseUrl: string;

  artists: any[];
  searchString = '';
  resultCount = '';

  constructor(
    private store: Store<SearchModel>
  ) {

    this.baseUrl = environment.API_IMAGE;
    this.searchState$ = this.store.select('searchTags');
  }

  ngOnInit() {

    // observe the store value
    this.searchState$.subscribe((state) => {
      this.searchState = state;
      if (state && state['search_people_data'] && state['search_people_data']['profileResponse']) {
        this.artists = state['search_people_data']['profileResponse'];
      }
    });

  }

  disableFollowForSelf(username: string) {
    return false;
    // if (this.searchState && (this.searchState['profile_navigation_details']['username']) === username) {
    //   return true;
    // }
    // return false;
  }

  onScroll() {}

}
