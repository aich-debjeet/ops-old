import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';

// actions
import { ExploreActions } from 'app/actions/explore.action';
import { ProfileActions } from 'app/actions/profile.action';

// store
import { Store } from '@ngrx/store';

// models
import { ExploreModel } from 'app/models/explore.model';

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
  exploreState: any;
  profileSpotfeeds: any[];
  allSpotfeeds: any[];
  baseUrl: string;
  showPreloader = true;

  public carouselOne: NgxCarousel;

  constructor(
    private store: Store<ExploreModel>
  ) {

    this.baseUrl = environment.API_IMAGE;

    // load user specific spotfeeds
    this.store.dispatch({ type: ProfileActions.LOAD_HOME_PAGE_SPOTFEEDS });

    // load category wise spotfeeds
    this.store.dispatch({ type: ExploreActions.LOAD_SPOTFEEDS });

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
      }

      // check if loaded
      if (state && state.searching_spotfeeds === false && state.search_complete === true) {
        this.showPreloader = false;
      }
    })

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

  public myfunc(event: Event) {
     // carouselLoad will trigger this funnction when your load value reaches
     // it is helps to load the data by parts to increase the performance of the app
     // must use feature to all carousel
  }

}
