import { Component, OnInit } from '@angular/core';

import { OpportunityActions } from './../../../../actions/opportunity.action';
import { OpportunityModel } from './../../../../models/opportunity.model';

import { environment } from './../../../../../environments/environment.prod';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-opportunity-search-recommended',
  templateUrl: './opportunity-search-recommended.component.html',
  styleUrls: ['./opportunity-search-recommended.component.scss']
})
export class OpportunitySearchRecommendedComponent implements OnInit {

  opportunityState$: Observable<OpportunityModel>;
  baseUrl: string;

  opportunities: any[];

  constructor(
    private store: Store<OpportunityModel>
  ) {

    this.baseUrl = environment.API_IMAGE;
    this.opportunityState$ = this.store.select('opportunityTags');

  }

  ngOnInit() {

    // observe the store value
    this.opportunityState$.subscribe((state) => {
      // console.log('opportunityState', state);
      if (state && state.search_opportunities_data && state.search_opportunities_data.SUCCESS) {
        this.opportunities = state.search_opportunities_data.SUCCESS;
        console.log('this.opportunities', this.opportunities);
      }
    });

  }

}
