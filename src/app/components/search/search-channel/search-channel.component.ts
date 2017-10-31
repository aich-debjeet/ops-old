import { Component, OnInit } from '@angular/core';

import { SearchActions } from './../../../actions/search.action';
import { SearchModel } from './../../../models/search.model';

import { environment } from './../../../../environments/environment.prod';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search-channel',
  templateUrl: './search-channel.component.html',
  styleUrls: ['./search-channel.component.scss']
})
export class SearchChannelComponent implements OnInit {

  searchState$: Observable<SearchModel>;
  baseUrl: string;

  channels: any[];

  constructor(
    private store: Store<SearchModel>
  ) {

    this.baseUrl = environment.API_IMAGE;
    this.searchState$ = this.store.select('searchTags');

  }

  ngOnInit() {

    // observe the store value
    this.searchState$.subscribe((state) => {
      // console.log('searchState', state);
      if (state && state.search_channel) {
        this.channels = state.search_channel;
      }
    });

  }

}
