import { Component, OnInit, OnDestroy } from '@angular/core';

import { OpportunityModel } from './../../../../models/opportunity.model';
import { Media } from './../../../../models/media.model';

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

  }

  ngOnDestroy() {
    this.oppsSub.unsubscribe();
  }

}
