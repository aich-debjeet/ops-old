import { Component, OnInit } from '@angular/core';
// import { NgxCarousel } from 'ngx-carousel';

// actions
import { ExploreActions } from 'app/actions/explore.action';
import { ProfileActions } from 'app/actions/profile.action';

// store
import { Store } from '@ngrx/store';

// models
import { ExploreModel, initialExploreTag } from 'app/models/explore.model';

// pipes
import { TruncatePipe } from 'app/pipes/truncate.pipe';

// services

// rx
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment.prod';

import * as _ from 'lodash';
import { allSettled } from 'q';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
  providers: [ TruncatePipe ]
})
export class ExploreComponent implements OnInit {

  userState$: Observable<any>;
  userProfile: any;
  exploreState$: Observable<any>;
  exploreState = initialExploreTag;
  profileSpotfeeds: any;
  mergedSpotfeeds: any;
  baseUrl: string;
  showPreloader = true;
  recordsPerPage = 8;
  pagination = [];

  // public carouselOne: NgxCarousel;

  constructor(
    private store: Store<ExploreModel>
  ) {

    this.baseUrl = environment.API_IMAGE;

    // load user specific spotfeeds
    this.store.dispatch({ type: ProfileActions.LOAD_HOME_PAGE_SPOTFEEDS });

    // load category wise spotfeeds
    const params = {
      industryType: '',
      offset: 0,
      limit: this.recordsPerPage
    };
    this.store.dispatch({ type: ExploreActions.LOAD_SPOTFEEDS, payload: params });

    /**
     * check user state
     */
    this.userState$ = this.store.select('profileTags');
    this.userState$.subscribe((state) => {
      this.userProfile = state;

      // get current profiles spotfeeds
      if (state && state.home_spotfeeds && state.home_spotfeeds.SUCCESS) {
        this.profileSpotfeeds = state.home_spotfeeds.SUCCESS;
      }
    });

    /**
     * check explore state
     */
    this.exploreState$ = this.store.select('exploreTags');
    this.exploreState$.subscribe((state) => {
      this.exploreState = state;

      // get all spotfeeds
      if (state && state.explore_spotfeeds && state.explore_spotfeeds) {

        // merge all categories here
        this.mergedSpotfeeds = this.mergeAllSpotfeeds(state.explore_spotfeeds);
      }

      // check if loaded
      if (state && state.searching_spotfeeds === false && state.search_complete === true) {
        this.showPreloader = false;
      }
    })

  }

  /**
   * mergin all spotfeeds
   */
  mergeAllSpotfeeds(categorisedSpotfeeds) {
    let allSpotFeeds = [];
    for (let i = 0; i < categorisedSpotfeeds.length; i++) {
      allSpotFeeds = allSpotFeeds.concat(categorisedSpotfeeds[i].feeds);

      if (i >= (categorisedSpotfeeds.length - 1)) {
        // console.log('last');
        return allSpotFeeds;
      }
    }
  }

  /**
   * Load more spotfeeds
   */
  dispatchLoadMore(industryType: string) {
    const typeIndex = _.findIndex(this.pagination, { 'industryType': industryType });
    this.pagination[typeIndex].limit = this.recordsPerPage;
    this.pagination[typeIndex].offset += this.recordsPerPage;

    this.store.dispatch({ type: ExploreActions.LOAD_SPOTFEEDS, payload: this.pagination[typeIndex] });
  }

  ngOnInit() {
  }


}
