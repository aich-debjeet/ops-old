import { Component, OnInit, OnDestroy } from '@angular/core';
import { NguCarousel } from '@ngu/carousel';
import { ExploreActions } from '../../actions/explore.action';
import { ExploreModel } from '../../models/explore.model';
import { Store } from '@ngrx/store';
import { ISubscription } from 'rxjs/Subscription';
import { GeneralUtilities } from '../../helpers/general.utils';

import { findIndex as _findIndex } from 'lodash';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, OnDestroy {
  exploreSlider: NguCarousel;
  spotfeeds: any[];
  expSub: ISubscription;
  searchType = 'post';
  recordsPerPage = 20;
  isSearching = false;
  showPreloader = false;

  allPosts: any[];
  allProfiles: any[];
  allChannels: any[];

  exploreState$: any;
  exploreState: any;
  spotfeedLoaded = false;
  baseUrl = environment.API_IMAGE;
  selectedSpotfeed: any;
  spotfeedType = '';

  constructor(
    private exploreStore: Store<ExploreModel>,
    private gUtils: GeneralUtilities
  ) {
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
        if (!this.spotfeedLoaded && this.spotfeedType.length === 0 && this.gUtils.checkNestedKey(state, ['exploreData', 'spotfeedResponsesList'])) {
          this.spotfeeds = state['exploreData']['spotfeedResponsesList'];
          this.spotfeedLoaded = true;
          this.spotfeedResetSelection();
        }
      }
    });
  }

  spotfeedResetSelection() {
    for (let i = 0; i < this.spotfeeds.length; i++) {
      this.spotfeeds[i].isSelected = false;
    }
  }

  ngOnInit() {
    this.triggerSearch();
    this.exploreSlider = {
      grid: { xs: 2, sm: 3, md: 6, lg: 6, all: 0 },
      slide: 5,
      speed: 400,
      interval: 4000,
      point: {
        visible: false
      },
      load: 5,
      touch: true,
      loop: false,
      custom: 'banner'
    }
  }

  /**
   * change the search type
   */
  switchSearchType(sType: string) {
    this.searchType = sType;
    this.triggerSearch();
  }

  ngOnDestroy() {
    this.expSub.unsubscribe();
  }

  loadMore(e: any) {
    // check if search type is available
    if (this.searchType.length > 0) {
      let scrollId = '';
      if (this.gUtils.checkNestedKey(this.exploreState, ['exploreData', 'scrollId'])) {
        scrollId = this.exploreState['exploreData']['scrollId'];
      }
      const exploreParams = {
        scrollId: scrollId,
        limit: this.recordsPerPage,
        entityType: this.searchType
      }
      this.isSearching = true;
      this.showPreloader = true;
      this.exploreStore.dispatch({ type: ExploreActions.GET_EXPLORE_DATA, payload: exploreParams });
    }
  }

  /**
   * toggle spotfeed search selection
   */
  // toggleSpotfeedFilter(spotfeed: any) {
  //   const spIndx = _findIndex(this.spotfeeds, { industry: spotfeed.industry });
  //   if (spIndx) {
  //     if (this.spotfeeds[spIndx].isSelected === true) {
  //       this.spotfeeds[spIndx].isSelected =  false;
  //     } else {
  //       this.spotfeeds[spIndx].isSelected = true;
  //     }
  //   }
  // }

  /**
   * select spotfeed for search
   * @param spotfeed details
   */
  selectSpotfeedFilter(spotfeed: any) {
    const spIndx = _findIndex(this.spotfeeds, { industry: spotfeed.industry });
    if (spIndx) {
      this.spotfeedResetSelection();
      this.spotfeeds[spIndx].isSelected = true;
      this.selectedSpotfeed = this.spotfeeds[spIndx];
    }
    this.triggerSearch();
  }

  triggerSearch() {
    const exploreParams = {
      limit: this.recordsPerPage,
      scrollId: '',
      entityType: this.searchType
    }
    if (this.selectedSpotfeed && this.selectedSpotfeed.industry) {
      exploreParams['spotfeed'] = this.selectedSpotfeed.industry;
    }
    this.isSearching = true;
    this.showPreloader = true;
    this.exploreStore.dispatch({ type: ExploreActions.GET_EXPLORE_DATA, payload: exploreParams });
  }

}
