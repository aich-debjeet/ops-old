import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SearchModel } from '../../../models/search.model';
import { Store } from '@ngrx/store';
import { environment } from 'environments/environment';
import { SearchActions } from '../../../actions/search.action';

@Component({
  selector: 'app-search-opportunity',
  templateUrl: './search-opportunity.component.html',
  styleUrls: ['./search-opportunity.component.scss']
})
export class SearchOpportunityComponent implements OnInit {

  searchState$: Observable<SearchModel>;
  searchState: any;
  baseUrl: string;
  showPreloader = true;

  opportunities: any[];

  /* scroll */
  canScroll = true;
  scrolling = 0;
  scrollingLoad = 500;
  /* scroll */

  constructor(
    private store: Store<SearchModel>
  ) {

    this.baseUrl = environment.API_IMAGE;
    this.searchState$ = this.store.select('searchTags');

  }

  ngOnInit() {

    // observe the store value
    this.searchState$.subscribe((state) => {
      this.searchState = state;
      if (state) {
        if (typeof state['search_opportunity_data'] !== 'undefined' && state['search_opportunity_data']['opportunityResponse']) {
          this.opportunities = state['search_opportunity_data']['opportunityResponse'];
        }
        // hide preloader
        if (typeof state['searching_opportunity'] !== 'undefined'
          && state['searching_opportunity'] === false
          && typeof state['search_opportunity_success'] !== 'undefined'
          && state['search_opportunity_success'] === true) {
          this.showPreloader = false;
        }
      }
    });

  }

  /**
   * While Scrolling trigger next api call
   */
  onScroll(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.canScroll === true && this.scrollingLoad <= this.scrolling) {
      this.showPreloader = true;
      this.canScroll = false;
      this.scrollingLoad += 400;
      // check if it's first request
      if (this.searchState && this.searchState['search_opportunity_data'] && this.searchState['search_opportunity_data']['scrollId']) {
        this.store.dispatch({
          type: SearchActions.SEARCH_OPPORTUNITY,
          payload: { scrollId: this.searchState['search_opportunity_data']['scrollId'] }
        });
      }
      setTimeout(() => {
        this.canScroll = true;
      }, 1000);
    }
  }

}
