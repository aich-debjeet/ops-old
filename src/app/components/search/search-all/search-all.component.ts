import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { SearchActions } from './../../../actions/search.action';
import { SearchModel } from './../../../models/search.model';

import { environment } from './../../../../environments/environment.prod';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.scss']
})
export class SearchAllComponent implements OnInit {

  @Output() tabClicked: EventEmitter<any> = new EventEmitter<any>();

  searchState$: Observable<SearchModel>;
  baseUrl: string;

  posts: any[];
  artists: any[];
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
      // console.log('state', state);
      if (state && state.search_people) {
        this.artists = state.search_people;
      }
      if (state && state.search_channel) {
        this.channels = state.search_channel;
      }
      if (state && state.search_post) {
        this.posts = state.search_post;
      }
    });

  }

  // trigger selected tab
  public selectTab(tabId: string) {
    // console.log('child called', tabId);
    this.tabClicked.emit(tabId);
  }

}
