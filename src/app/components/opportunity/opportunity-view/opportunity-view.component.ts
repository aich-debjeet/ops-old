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

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-opportunity-view',
  templateUrl: './opportunity-view.component.html',
  styleUrls: ['./opportunity-view.component.scss']
})
export class OpportunityViewComponent implements OnInit {

  opportunityState$: any;
  opportunityState: any;
  opportunity: any;
  jobId: any;
  userProfile: any;
  userState$: any;
  hasApplied: boolean;

  baseUrl = environment.API_IMAGE;

  constructor(
    private route: ActivatedRoute,
    private store: Store<OpportunityModel>
  ) {
    // opportunity state listener
    this.opportunityState$ = this.store.select('opportunityTags');
    this.opportunityState$.subscribe((state) => {
      this.opportunityState = state;
      // console.log('view opp comp state', state);

      // get opp data
      if (state && state.get_opportunity_data && state.get_opportunity_data.SUCCESS) {
        this.opportunity = state.get_opportunity_data.SUCCESS;
        this.hasApplied = state.get_opportunity_data.SUCCESS.isAppliable;
        console.log('isAppliable', this.hasApplied);
      }

      // check if job application successful
      if (state && state.apply_for_an_opportunity_data  && state.apply_for_an_opportunity_data.SUCCESS) {
        this.hasApplied = true;
      }
    });

    /**
     * check user state
     */
    // this.userState$ = this.store.select('profileTags');
    // this.userState$.subscribe((state) => {
    //   if (state && state.profileUser) {
    //     this.userProfile = state.profileUser;
    //     console.log('this.userProfile', this.userProfile);
    //   }
    // });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      if (params['id']) {
        // search job with id
        this.jobId = params['id'];
        this.store.dispatch({ type: OpportunityActions.GET_OPPORTUNITY, payload: this.jobId });
      }
    });
  }

  /**
   * apply for job
   */
  applyForJob() {
    const reqBody = {
      jobId: this.jobId
    }

    this.store.dispatch({
      type: OpportunityActions.APPLY_FOR_AN_OPPORTUNITY,
      payload: reqBody
    });
  }

}
