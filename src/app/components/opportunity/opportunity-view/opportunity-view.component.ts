import { Component, OnInit, OnDestroy } from '@angular/core';
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

import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';
import { GeneralUtilities } from '../../../helpers/general.utils';

@Component({
  selector: 'app-opportunity-view',
  templateUrl: './opportunity-view.component.html',
  styleUrls: ['./opportunity-view.component.scss']
})
export class OpportunityViewComponent implements OnInit, OnDestroy {

  opportunityState$: any;
  opportunityState: any;
  opportunity: any;
  jobId: any;
  profileState: any;
  profileState$: any;
  hasApplied: boolean;
  routerSub: any;

  baseUrl = environment.API_IMAGE;
  private oppsSub: ISubscription;
  private profileSub: ISubscription;

  constructor(
    private route: ActivatedRoute,
    // private generalUtils: GeneralUtilities,
    private store: Store<OpportunityModel>
  ) {
    // opportunity state listener
    this.opportunityState$ = this.store.select('opportunityTags');
    this.oppsSub = this.opportunityState$.subscribe((state) => {
      this.opportunityState = state;

      // get opp data
      if (state && state.get_opportunity_data) {
        this.opportunity = state.get_opportunity_data;
        this.hasApplied = state.get_opportunity_data.hasApplied;
      }

      // check if job application successful
      if (state && state.apply_for_an_opportunity_data) {
        this.hasApplied = true;
      }
    });

    /**
     * check user state
     */
    this.profileState$ = this.store.select('profileTags');
    this.profileSub = this.profileState$.subscribe((state) => {
      if (state && state.profile_navigation_details) {
        this.profileState = state.profile_navigation_details;
      }
    });
  }

  /**
   * Disable appy for opportunity for self
   */
  disableApplicationForSelf(username: string) {
    if (this.profileState && (this.profileState['username'] === username)) {
      // console.log('DISABLE');
      return true;
    }
    // console.log('ENABLE');
    return false;
  }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      if (params['id']) {
        // search job with id
        this.jobId = params['id'];
        this.store.dispatch({ type: OpportunityActions.GET_OPPORTUNITY, payload: this.jobId });
      }
    });
  }

  ngOnDestroy() {
    this.oppsSub.unsubscribe();
    this.routerSub.unsubscribe();
    this.profileSub.unsubscribe();
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
