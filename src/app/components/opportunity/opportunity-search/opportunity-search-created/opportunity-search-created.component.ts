import { Component, OnInit, OnDestroy } from '@angular/core';

import { OpportunityActions } from './../../../../actions/opportunity.action';
import { OpportunityModel } from './../../../../models/opportunity.model';
import { Media } from './../../../../models/media.model';

import { environment } from './../../../../../environments/environment.prod';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-opportunity-search-created',
  templateUrl: './opportunity-search-created.component.html',
  styleUrls: ['./opportunity-search-created.component.scss']
})
export class OpportunitySearchCreatedComponent implements OnInit, OnDestroy {

  opportunityState$: Observable<OpportunityModel>;
  userState$: Observable<Media>;
  userState: any;
  opportunities: any[];
  private subscription: ISubscription;

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
    this.subscription = this.opportunityState$.subscribe((state) => {
      if (state && state.search_opportunities_data && state.search_opportunities_data.SUCCESS) {
        this.opportunities = state.search_opportunities_data.SUCCESS;
      }

      // check for the result of created opportunities
      if (state && state.get_opportunities_data && state.get_opportunities_data.SUCCESS) {
        this.opportunities = state.get_opportunities_data.SUCCESS;
      }
    });

    // observe the user state
    this.userState$.subscribe((state) => {
      this.userState = state;
      // check for user skills
      if (this.userState && this.userState['profile_navigation_details'] && this.userState['profile_navigation_details']['handle'] && this.userState['profile_navigation_details']['handle'].length > 0) {
        this.loadCreatedOpps(this.userState['profile_navigation_details']['handle']);
      }
    });

  }

  /**
   * load created opportunities
   */
  loadCreatedOpps(profileHandle: any) {
    const createdSearchParams = {
      postedBy: profileHandle,
      offset: 0, // initial request
      limit: this.recordsPerPage
    }
    this.store.dispatch({
      type: OpportunityActions.GET_OPPORTUNITIES,
      payload: createdSearchParams
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
