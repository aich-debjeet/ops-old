import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

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

  @Output() onProfileTypeSwitch: EventEmitter<any> = new EventEmitter<any>();
  @Input() profileType: String;

  searchState$: Observable<SearchModel>;
  searchState: any;
  baseUrl: string;
  showPreloader = true;

  people: any[];

  /* scroll */
  canScroll = true;
  scrolling = 0;
  scrollingLoad = 800;
  /* scroll */
  userState$: any;
  userProfile: any;

  constructor(
    private store: Store<SearchModel>,
    private profileStore: Store<SearchModel>
  ) {

    this.baseUrl = environment.API_IMAGE;
    this.searchState$ = this.store.select('searchTags');

    /* ================== current user ========= */
    this.userState$ = this.store.select('profileTags');
    this.userState$.subscribe((state) => {
      this.userProfile = state;
    });
    // this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
    /* ================== current user ========= */
  }

  ngOnInit() {

    // observe the store value
    this.searchState$.subscribe((state) => {
      this.searchState = state;
      // console.log('this.searchState', this.searchState);
      if (state) {
        if (typeof state['search_people_data'] !== 'undefined' && state['search_people_data']['profileResponse']) {
          this.people = state['search_people_data']['profileResponse'];
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
    if (this.userProfile && (this.userProfile['profile_navigation_details']['username']) === username) {
      return true;
    }
    return false;
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

  toggleProfileType() {
    if (this.profileType === 'registered') {
      this.profileType = 'unregistered';
    } else {
      this.profileType = 'registered';
    }
    this.onProfileTypeSwitch.emit(this.profileType);
  }

}
