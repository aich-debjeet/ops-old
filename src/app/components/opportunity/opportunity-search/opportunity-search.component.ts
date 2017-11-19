import { Component, OnInit } from '@angular/core';

// actions
import { OpportunityActions } from 'app/actions/opportunity.action';

// store
import { Store } from '@ngrx/store';

// models
import { OpportunityModel } from './../../../models/opportunity.model';

// services
import { LocalStorageService } from './../../../services/local-storage.service';

@Component({
  selector: 'app-opportunity-search',
  templateUrl: './opportunity-search.component.html',
  styleUrls: ['./opportunity-search.component.scss']
})
export class OpportunitySearchComponent implements OnInit {

  opportunityState$: any;
  opportunityState: any;

  constructor(
    private store: Store<OpportunityModel>
  ) {
    // state listener
    this.opportunityState$ = this.store.select('opportunityTags');
    this.opportunityState$.subscribe((state) => {
      this.opportunityState = state;
      console.log('state', state);
    });
  }

  ngOnInit() {
  }

}
