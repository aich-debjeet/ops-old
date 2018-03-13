import { Component, OnInit } from '@angular/core';

import { SearchActions } from './../../../actions/search.action';
import { SearchModel } from './../../../models/search.model';

import { ProfileActions } from './../../../actions/profile.action';
import { ProfileModal } from './../../../models/profile.model';

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
  showPreloader = true;

  artists: any[];

  /* scroll */
  canScroll = true;
  scrolling = 0;
  scrollingLoad = 800;
  /* scroll */

  constructor(
    private store: Store<SearchModel>,
    private profileStore: Store<SearchModel>
  ) {

    this.baseUrl = environment.API_IMAGE;
    this.searchState$ = this.store.select('searchTags');
  }

  ngOnInit() {

    // observe the store value
    this.searchState$.subscribe((state) => {
      this.searchState = state;
      // console.log('this.searchState', this.searchState);
      if (state) {
        if (typeof state['search_people_data'] !== 'undefined' && state['search_people_data']['profileResponse']) {
          this.artists = state['search_people_data']['profileResponse'];
        }
        // hide preloader
        if (typeof state['searching_people'] !== 'undefined'
          && state['searching_people'] === false
          && typeof state['search_people_success'] !== 'undefined'
          && state['search_people_success'] === true) {
          this.showPreloader = false;
        }
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

  /**
   * While Scrolling trigger next api call
   */
  onScroll(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.canScroll === true && this.scrollingLoad <= this.scrolling) {
      this.showPreloader = true;
      this.canScroll = false;
      this.scrollingLoad += 500;
      // check if it's first request
      if (this.searchState && this.searchState['search_people_data'] && this.searchState['search_people_data']['scrollId']) {
        this.store.dispatch({
          type: SearchActions.SEARCH_PEOPLE,
          payload: {
            isHuman: '1',
            name: { scrollId: this.searchState['search_people_data']['scrollId'] }
          }
        });
      }
      setTimeout(() => {
        this.canScroll = true;
      }, 1000);
    }
  }

  /**
   * Follow an artist
   * @param user obj
   */
  followUser(user: any) {
    this.profileStore.dispatch({ type: ProfileActions.PROFILE_FOLLOW, payload: user.handle });
    user.extra.isFollowing = true;
  }

  /**
   * Unfollow an artist
   * @param user obj
   */
  unfollowUser(user: any) {
    this.profileStore.dispatch({ type: ProfileActions.PROFILE_UNFOLLOW, payload: user.handle });
    user.extra.isFollowing = false;
  }

}
