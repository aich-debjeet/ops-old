import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NguCarousel } from '@ngu/carousel';
import { ActivatedRoute, Router } from '@angular/router';
import { ExploreActions } from '../../actions/explore.action';
import { ExploreModel } from '../../models/explore.model';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { GeneralUtilities } from '../../helpers/general.utils';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, OnDestroy {
  exploreSlider: NguCarousel;
  spotfeeds: any[];
  routeSub: ISubscription;
  expSub: ISubscription;
  searchType = 'post';
  recordsPerPage = 10;
  isSearching = false;
  showPreloader = false;

  allPosts: any[];
  allProfiles: any[];
  allChannels: any[];

  exploreState$: any;
  exploreState: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private exploreStore: Store<ExploreModel>,
    private gUtils: GeneralUtilities
  ) {
    this.spotfeeds = [1, 2, 3];
    // state listener
    this.exploreState$ = this.exploreStore.select('exploreTags');
    this.expSub = this.exploreState$.subscribe((state) => {
      if (state) {
        this.exploreState = state;
        // check for the http request response status
        if (
          this.gUtils.checkNestedKey(state, ['getExploreData']) && state['getExploreData'] === false
          && this.gUtils.checkNestedKey(state, ['getExploreDataSuccess']) && state['getExploreDataSuccess'] === true
        ) {
          this.isSearching = false;
          this.showPreloader = false;
        }
        // console.log('this.exploreState', this.exploreState);
        if (this.gUtils.checkNestedKey(state, ['exploreData', 'mediaResponse'])) {
          this.allPosts = state['exploreData']['mediaResponse'];
        }
        if (this.gUtils.checkNestedKey(state, ['exploreData', 'channelResponse'])) {
          this.allChannels = state['exploreData']['channelResponse'];
        }
        if (this.gUtils.checkNestedKey(state, ['exploreData', 'profileResponse'])) {
          this.allProfiles = state['exploreData']['profileResponse'];
        }
      }
    });
  }

  ngOnInit() {
    this.exploreSlider = {
      grid: {xs: 2, sm: 3, md: 5, lg: 5, all: 0},
      slide: 5,
      speed: 400,
      interval: 4000,
      point: {
        visible: false
      },
      load: 5,
      touch: true,
      loop: true,
      custom: 'banner'
    }

    this.routeSub = this.route.queryParams
      .subscribe(params => {
        // check if search type is available
        if (params.type && params.type.length > 0) {
          // giving back the search type
          this.searchType = params.type;
        }
        // check if search type is available
        if (this.searchType.length > 0) {
          const exploreParams = {
            limit: this.recordsPerPage,
            scrollId: '',
            entityType: this.searchType,
          }
          this.isSearching = true;
          this.showPreloader = true;
          this.exploreStore.dispatch({ type: ExploreActions.GET_EXPLORE_DATA, payload: exploreParams });
        }
      });
  }

  /**
   * change the search type
   */
  switchSearchType(sType: string) {
    this.searchType = sType;
    this.exploreSearchGetRequest({ type: this.searchType });
  }

  // trigger explore search action
  exploreSearchGetRequest(queryParams: any) {
    this.router.navigate(['/explore'], {
      queryParams: queryParams
    });
    return false;
  }

  ngOnDestroy() {
    this.expSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

  loadMore(e: any) {
    // check if search type is available
    if (this.searchType.length > 0) {
      let scrollId = '';
      if (this.gUtils.checkNestedKey(this.exploreState, ['exploreData', 'scrollId'])) {
        scrollId = this.exploreState['exploreData']['scrollId'];
      }
      const exploreParams = {
        limit: this.recordsPerPage,
        scrollId: scrollId,
        entityType: this.searchType,
      }
      this.isSearching = true;
      this.showPreloader = true;
      this.exploreStore.dispatch({ type: ExploreActions.GET_EXPLORE_DATA, payload: exploreParams });
    }
  }

}
