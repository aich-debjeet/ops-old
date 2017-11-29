import { Component, OnInit } from '@angular/core';

import { OpportunityActions } from './../../../../actions/opportunity.action';
import { OpportunityModel } from './../../../../models/opportunity.model';
import { Media } from './../../../../models/media.model';

import { environment } from './../../../../../environments/environment.prod';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-opportunity-search-created',
  templateUrl: './opportunity-search-created.component.html',
  styleUrls: ['./opportunity-search-created.component.scss']
})
export class OpportunitySearchCreatedComponent implements OnInit {

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
      // console.log('opportunityState', state);
      if (state && state.search_opportunities_data && state.search_opportunities_data.SUCCESS) {
        this.opportunities = state.search_opportunities_data.SUCCESS;
        // console.log('this.opportunities', this.opportunities);
      }

      // check for the result of created opportunities
      if (state && state.get_opportunities_data && state.get_opportunities_data.SUCCESS) {
        this.opportunities = state.get_opportunities_data.SUCCESS;
        // console.log('this.opportunities', this.opportunities);
      }
    });

    // observe the user state
    this.userState$.subscribe((state) => {
      this.userState = state;
      // console.log('this.userState', this.userState);
      // check for user skills
      if (this.userState && this.userState['profileUser'] && this.userState['profileUser']['handle'] && this.userState['profileUser']['handle'].length > 0) {
        this.loadCreatedOpps(this.userState['profileUser']['handle']);
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
    // console.log('dispatch created opportunities');
    this.store.dispatch({
      type: OpportunityActions.GET_OPPORTUNITIES,
      payload: createdSearchParams
    });
  }

}
