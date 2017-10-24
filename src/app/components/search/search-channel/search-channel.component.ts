import { Component, OnInit, Input, KeyValueDiffers, DoCheck } from '@angular/core';

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
export class SearchChannelComponent implements OnInit, DoCheck {

  @Input() search: any;
  differ: any;

  searchChannelState$: Observable<SearchModel>;
  baseUrl: string;

  channels: any[];
  isLoading = false;

  constructor(
    private differs: KeyValueDiffers,
    private store: Store<SearchModel>
  ) {

    this.differ = differs.find({}).create(null);

    this.baseUrl = environment.API_IMAGE;
    this.searchChannelState$ = this.store.select('searchTags');

  }

  ngDoCheck() {
    const changes = this.differ.diff(this.search);
    // console.log('changes', changes);
    if (changes) {
      changes.forEachChangedItem(response => {
        console.log('changed ', response.currentValue)
        this.store.dispatch({
          type: SearchActions.SEARCH_CHANNEL,
          payload: response.currentValue
        });
      });
      // changes.forEachAddedItem(r => console.log('added ' + r.currentValue));
      // changes.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
    } else {
      // console.log('NO CHANGE');
    }
  }

  ngOnInit() {

    // observe the store value
    this.searchChannelState$.subscribe((state) => {
      console.log('state', state);
      if (state && state.search_channel) {
        this.channels = state.search_channel;
      }
      if (state && state.searching_channel) {
        // console.log('searching status', state.searching_channel);
        this.isLoading = state.searching_channel;
      }
    });

  }

}
