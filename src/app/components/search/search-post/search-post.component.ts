import { Component, OnInit, Input, KeyValueDiffers, DoCheck } from '@angular/core';

import { SearchActions } from './../../../actions/search.action';
import { SearchModel } from './../../../models/search.model';

import { environment } from './../../../../environments/environment.prod';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search-post',
  templateUrl: './search-post.component.html',
  styleUrls: ['./search-post.component.scss']
})
export class SearchPostComponent implements OnInit, DoCheck {

  @Input() search: any;
  differ: any;

  searchPostState$: Observable<SearchModel>;
  baseUrl: string;

  posts: any[];
  isLoading = false;

  constructor(
    private differs: KeyValueDiffers,
    private store: Store<SearchModel>
  ) {

    this.differ = differs.find({}).create(null);

    this.baseUrl = environment.API_IMAGE;
    this.searchPostState$ = this.store.select('searchTags');

  }

  ngDoCheck() {
    const changes = this.differ.diff(this.search);
    // console.log('changes', changes);
    if (changes) {
      changes.forEachChangedItem(response => {
        console.log('changed ', response.currentValue)
        this.store.dispatch({
          type: SearchActions.SEARCH_POST,
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
    this.searchPostState$.subscribe((state) => {
      console.log('searchPostState', state);
      if (state && state.hasOwnProperty('search_post')) {
        this.posts = state.search_post;
      }
      if (state && state.hasOwnProperty('searching_post')) {
        // console.log('searching status', state.searching_post);
        this.isLoading = state.searching_post;
      }
    });

  }

}
