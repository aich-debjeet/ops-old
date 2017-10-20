import { Component, OnInit, Input, KeyValueDiffers, DoCheck } from '@angular/core';

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
export class SearchPeopleComponent implements OnInit, DoCheck {

  @Input() search: any;
  differ: any;

  searchState$: Observable<SearchModel>;
  cards: any;

  constructor(
    private differs: KeyValueDiffers,
    private store: Store<SearchModel>
  ) {

    this.differ = differs.find({}).create(null);

    // this.searchState$ = this.store.select('searchTags');

    // // observe the store value
    // this.searchState$.subscribe((state) => {
    //   console.log(state);
    //   // if (typeof state[''] !== 'undefined') {
    //   // }
    // });

  }

  ngDoCheck() {
    const changes = this.differ.diff(this.search);
    console.log('changes', changes);
    if (changes) {
      console.log('changes detected');
      changes.forEachChangedItem(r => console.log('changed ', r.currentValue));
      // changes.forEachAddedItem(r => console.log('added ' + r.currentValue));
      // changes.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
    } else {
      console.log('NO CHANGE');
    }
  }

  ngOnInit() {

    console.log('recieved query', this.search);

    // // get all users
    // this.store.dispatch({
    //   type: SearchActions.SEARCH_PEOPLE,
    //   payload: null
    // });

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
