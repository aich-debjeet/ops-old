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
import { GeneralUtilities } from '../../../../helpers/general.utils';

@Component({
  selector: 'app-opportunity-search-recommended',
  templateUrl: './opportunity-search-recommended.component.html',
  styleUrls: ['./opportunity-search-recommended.component.scss']
})
export class OpportunitySearchRecommendedComponent implements OnInit, OnDestroy {

  opportunityState$: Observable<OpportunityModel>;
  opportunities = [];
  private oppsSub: ISubscription;

  constructor(
    private store: Store<OpportunityModel>,
    private mediaStore: Store<Media>,
    private generalUtils: GeneralUtilities
  ) {
    // check for opportunity details
    this.opportunityState$ = this.store.select('opportunityTags');
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
