import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// actions
import { OpportunityActions } from 'app/actions/opportunity.action';

// store
import { Store } from '@ngrx/store';

// models
import { OpportunityModel } from './../../../models/opportunity.model';

// services
import { LocalStorageService } from './../../../services/local-storage.service';

@Component({
  selector: 'app-opportunity-view',
  templateUrl: './opportunity-view.component.html',
  styleUrls: ['./opportunity-view.component.scss']
})
export class OpportunityViewComponent implements OnInit {

  opportunityState$: any;
  opportunityState: any;
  opportunity: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<OpportunityModel>
  ) {
    // state listener
    this.opportunityState$ = this.store.select('opportunityTags');
    this.opportunityState$.subscribe((state) => {
      this.opportunityState = state;
      console.log('view opp comp state', state);
      if (state && state.get_opportunity_data && state.get_opportunity_data.SUCCESS) {
        this.opportunity = state.get_opportunity_data.SUCCESS;
      }
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      if (params['id']) {
        // search job with id
        const jobId = params['id'];
        this.store.dispatch({ type: OpportunityActions.GET_OPPORTUNITY, payload: jobId });
      }
    });
  }

}
