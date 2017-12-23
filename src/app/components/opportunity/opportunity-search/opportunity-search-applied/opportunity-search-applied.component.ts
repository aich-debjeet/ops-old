import { Component, OnInit } from '@angular/core';

import { OpportunityActions } from './../../../../actions/opportunity.action';
import { OpportunityModel } from './../../../../models/opportunity.model';
import { Media } from './../../../../models/media.model';

import { environment } from './../../../../../environments/environment.prod';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-opportunity-search-applied',
  templateUrl: './opportunity-search-applied.component.html',
  styleUrls: ['./opportunity-search-applied.component.scss']
})
export class OpportunitySearchAppliedComponent implements OnInit {

  opportunityState$: Observable<OpportunityModel>;
  userState$: Observable<Media>;
  userState: any;
  opportunities: any[];

  /* pagination settings */
  recordsPerPage = 10;
  /* pagination settings */

  constructor(
    private store: Store<OpportunityModel>,
    private mediaStore: Store<Media>
  ) {
    // check for opportunity details
    this.opportunityState$ = this.store.select('opportunityTags');

    // check for user details
    this.userState$ = this.mediaStore.select('profileTags');
  }

  ngOnInit() {

    // observe the opportunity state
    this.opportunityState$.subscribe((state) => {
      if (state && state.search_opportunities_data && state.search_opportunities_data.SUCCESS) {
        this.opportunities = state.search_opportunities_data.SUCCESS;
      }

      // check for the result of applied opportunities
      if (state && state.get_opportunities_data && state.get_opportunities_data.SUCCESS) {
        this.opportunities = state.get_opportunities_data.SUCCESS;
      }
    });

    // observe the user state
    this.userState$.subscribe((state) => {
      this.userState = state;
      if (this.userState && this.userState.profile_navigation_details && this.userState.profile_navigation_details.handle) {
        this.loadappliedOpps();
      }
    });

  }

  /**
   * load applied opportunities
   */
  loadappliedOpps() {
    this.store.dispatch({
      type: OpportunityActions.GET_APPLIED_OPPORTUNITIES,
      payload: this.userState.profile_navigation_details.handle
    });
  }

}
