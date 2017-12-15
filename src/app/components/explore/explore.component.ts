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
  allSpotfeeds: any;
  baseUrl: string;
  showPreloader = true;
  recordsPerPage = 2;
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
      // console.log('this.userProfile', this.userProfile);

      // get current profiles spotfeeds
      if (state && state.home_spotfeeds && state.home_spotfeeds.SUCCESS) {
        this.profileSpotfeeds = state.home_spotfeeds.SUCCESS;
        // console.log('profile spotfeeds', this.profileSpotfeeds);
      }
    });

    /**
     * check explore state
     */
    this.exploreState$ = this.store.select('exploreTags');
    this.exploreState$.subscribe((state) => {
      this.exploreState = state;
      console.log('this.exploreState', this.exploreState);

      // get all spotfeeds
      if (state && state.explore_spotfeeds && state.explore_spotfeeds) {
        this.allSpotfeeds = state.explore_spotfeeds;
        // console.log('all spotfeeds', this.allSpotfeeds);

        // preparing the pagination reference var
        if (this.pagination && this.pagination.length === 0) {
          for (let i = 0; this.allSpotfeeds.length > i; i++) {
            const refData = {
              industryType: this.allSpotfeeds[i].industryType,
              offset: this.recordsPerPage,
              limit: 0
            };
            this.pagination.push(refData);
            if (i >= (this.allSpotfeeds.length - 1)) {
              console.log(this.pagination);
            }
          }
        }
      }

      // check if loaded
      if (state && state.searching_spotfeeds === false && state.search_complete === true) {
        this.showPreloader = false;
      }
    })

  }

  /**
   * Load more spotfeeds
   */
  dispatchLoadMore(industryType: string) {
    // console.log('load more industry ', industryType);
    const typeIndex = _.findIndex(this.pagination, { 'industryType': industryType });
    this.pagination[typeIndex].limit = this.recordsPerPage;
    this.pagination[typeIndex].offset += this.recordsPerPage;
    console.log('req params', this.pagination[typeIndex]);

    this.store.dispatch({ type: ExploreActions.LOAD_SPOTFEEDS, payload: this.pagination[typeIndex] });
  }

  ngOnInit() {
    // this.carouselOne = {
    //   grid: {xs: 5, sm: 5, md: 5, lg: 5, all: 5},
    //   slide: 5,
    //   load: 5,
    //   speed: 400,
    //   interval: 4000,
    //   point: {
    //     visible: false
    //   },
    //   touch: true,
    //   loop: true,
    //   custom: 'banner'
    // }
  }

  // public myfunc(event: Event) { }

}
