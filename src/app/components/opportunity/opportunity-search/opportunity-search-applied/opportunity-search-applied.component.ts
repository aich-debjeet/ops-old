import { Component, OnInit, OnDestroy } from '@angular/core';

import { OpportunityActions } from './../../../../actions/opportunity.action';
import { OpportunityModel } from './../../../../models/opportunity.model';
import { Media } from './../../../../models/media.model';

import { environment } from './../../../../../environments/environment.prod';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { GeneralUtilities } from '../../../../helpers/general.utils';

@Component({
  selector: 'app-opportunity-search-applied',
  templateUrl: './opportunity-search-applied.component.html',
  styleUrls: ['./opportunity-search-applied.component.scss']
})
export class OpportunitySearchAppliedComponent implements OnInit, OnDestroy {

  opportunityState$: Observable<OpportunityModel>;
  private oppsSub: ISubscription;
  userState$: Observable<Media>;
  userState: any;
  opportunities = [];

  /* pagination settings */
  recordsPerPage = 10;
  /* pagination settings */

  constructor(
    private store: Store<OpportunityModel>,
    private mediaStore: Store<Media>,
    private generalUtils: GeneralUtilities
  ) {
    // check for opportunity details
    this.opportunityState$ = this.store.select('opportunityTags');

    // check for user details
    this.userState$ = this.mediaStore.select('profileTags');
  }

  ngOnInit() {

    // observe the opportunity state
    this.oppsSub = this.opportunityState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        if (
          this.generalUtils.checkNestedKey(state, ['search_opportunities_result', 'opportunityResponse'])
          && state['search_opportunities_result']['opportunityResponse'].length > 0
        ) {
          this.opportunities = state['search_opportunities_result']['opportunityResponse'];
        }
      }
    });

    // observe the user state
    // this.userState$.subscribe((state) => {
    //   this.userState = state;
    //   if (this.userState && this.userState.profile_navigation_details && this.userState.profile_navigation_details.handle) {
    //     this.loadappliedOpps();
    //   }
    // });

  }

  ngOnDestroy() {
    this.oppsSub.unsubscribe();
  }

  /**
   * load applied opportunities
   */
  loadappliedOpps() {
    // const createdSearchParams = {
    //   // postedBy: profileHandle,
    //   offset: 0, // initial request
    //   limit: this.recordsPerPage
    // }
    // this.store.dispatch({
    //   type: OpportunityActions.GET_APPLIED_OPPORTUNITIES,
    //   payload: createdSearchParams
    // });
  }

}
