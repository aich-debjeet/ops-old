import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';

import { UserSearchActions } from '../../actions/user-search.action';
import { UserSearchModel } from '../../models/user-search.model';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewInit {
  imageBaseUrl = environment.API_IMAGE;
  searchUserStr: string;
  emptyState: boolean;
  selectedUser: any;
  userSearchState$: Observable<UserSearchModel>;
  userSearchState: any;

  @ViewChild('searchInput') searchInput;

  constructor(
    private userSearchStore: Store<UserSearchModel>
  ) {
    this.emptyState = false;
    this.searchUserStr = '';
    this.selectedUser = {};
    // this.selectedUser = {
    //   username: 'abhijeet'
    // };

    this.userSearchState$ = this.userSearchStore.select('userSearchTags');
    this.userSearchState$.subscribe((state) => {
      this.userSearchState = state;
      console.log('this.userSearchState', this.userSearchState);
    });
  }

  ngOnInit() { }

  ngAfterViewInit() {
    /**
     * Observing the search input change
     */
    this.searchInput.valueChanges
      .debounceTime(500)
      .subscribe(() => {
        // save search input ref in global var
        this.searchUserStr = this.searchInput.value;
        if (this.searchUserStr.length > 0) {
          // trigger search get request
          this.userSearchStore.dispatch({
            type: UserSearchActions.MESSAGE_USER_SEARCH,
            payload: {
              isHuman: '11',
              status: [],
              offset: 0,
              limit: 20,
              searchText: this.searchUserStr
            }
          });
        }
      });
  }

  composeNewMessage() {
    this.emptyState = false;
  }

  isUserSelected() {
    if (this.selectedUser && JSON.stringify(this.selectedUser) === '{}') {
      return false;
    }
    return true;
  }
}
