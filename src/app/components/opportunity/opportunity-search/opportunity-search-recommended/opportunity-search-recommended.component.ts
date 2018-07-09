import { Component, OnInit, OnDestroy } from '@angular/core';

import { OpportunityActions } from './../../../../actions/opportunity.action';
import { OpportunityModel } from './../../../../models/opportunity.model';

// rx
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { GeneralUtilities } from '../../../../helpers/general.utils';

@Component({
  selector: 'app-opportunity-search-recommended',
  templateUrl: './opportunity-search-recommended.component.html',
  styleUrls: ['./opportunity-search-recommended.component.scss']
})
export class OpportunitySearchRecommendedComponent implements OnInit, OnDestroy {

  opportunityState$: Observable<OpportunityModel>;
  opportunityState: any;
  opportunities = [];
  private oppsSub: ISubscription;

  /* scroll */
  canScroll = true;
  scrolling = 0;
  scrollingLoad = 800;
  /* scroll */

  constructor(
    private store: Store<OpportunityModel>,
    private generalUtils: GeneralUtilities
  ) {
    // check for opportunity details
    this.opportunityState$ = this.store.select('opportunityTags');
  }

  ngOnInit() {

    // observe the opportunity state
    this.oppsSub = this.opportunityState$.subscribe((state) => {
      this.opportunityState = state;
      if (typeof state !== 'undefined') {
        if (
          this.generalUtils.checkNestedKey(state, ['search_opportunities_result', 'opportunityResponse'])
          && state['search_opportunities_result']['opportunityResponse'].length > 0
        ) {
          this.opportunities = state['search_opportunities_result']['opportunityResponse'];
        }
      }
    });

  }

  ngOnDestroy() {
    this.oppsSub.unsubscribe();
  }

}
