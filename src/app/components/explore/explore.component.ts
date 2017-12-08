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
  recordsPerPage = 10;
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
      if (state && state.spotfeeds && state.spotfeeds.SUCCESS) {
        this.allSpotfeeds = state.spotfeeds.SUCCESS;
        console.log('all spotfeeds', this.allSpotfeeds);

        // preparing the pagination reference var
        if (this.pagination && this.pagination.length === 0) {
          // console.log('set pagination');
          this.allSpotfeeds.forEach((value, index) => {
            const refData = {
              limit: 0,
              type: value.industry,
              offset: this.recordsPerPage
            };
            this.pagination.push(refData);
          });
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
    console.log();
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
