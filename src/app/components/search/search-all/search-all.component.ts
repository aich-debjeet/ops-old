import { Component, OnInit, Input, KeyValueDiffers, DoCheck } from '@angular/core';

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

  @Input() search: any;
  differ: any;

  searchAllState$: Observable<SearchModel>;
  baseUrl: string;

  posts: any[];
  artists: any[];
  channels: any[];

  constructor(
    private differs: KeyValueDiffers,
    private store: Store<SearchModel>
  ) {

    this.differ = differs.find({}).create(null);

    this.baseUrl = environment.API_IMAGE;
    this.searchAllState$ = this.store.select('searchTags');

  }

  ngOnInit() {

    // observe the store value
    this.searchAllState$.subscribe((state) => {
      console.log('state', state);
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

}
