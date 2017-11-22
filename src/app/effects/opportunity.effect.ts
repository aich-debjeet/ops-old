import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { OpportunityActions } from '../actions/opportunity.action';
import { OpportunityService } from '../services/opportunity.service';

@Injectable()
export class OpportunityEffect {

  /**
   * Create opportunity effect
   */
  @Effect()
  createOpportunity$ = this.actions$
    .ofType(OpportunityActions.CREATE_OPPORTUNITY)
    .map(toPayload)
    .switchMap((payload) => this.opportunityService.createOpportunity(payload)
      .map((res) => ({ type: OpportunityActions.CREATE_OPPORTUNITY_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: OpportunityActions.CREATE_OPPORTUNITY_FAILED, payload: res }))
    );

  /**
   * Search opportunities effect
   */
  @Effect()
  searchOpportunities$ = this.actions$
    .ofType(OpportunityActions.SEARCH_OPPORTUNITIES)
    .map(toPayload)
    .switchMap((payload) => this.opportunityService.searchOpportunities(payload)
      .map((res) => ({ type: OpportunityActions.SEARCH_OPPORTUNITIES_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: OpportunityActions.SEARCH_OPPORTUNITIES_FAILED, payload: res }))
    );

  /**
   * Get opportunity by id effect
   */
  @Effect()
  getOpportunity$ = this.actions$
    .ofType(OpportunityActions.GET_OPPORTUNITY)
    .map(toPayload)
    .switchMap((payload) => this.opportunityService.getOpportunity(payload)
      .map((res) => ({ type: OpportunityActions.GET_OPPORTUNITY_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: OpportunityActions.GET_OPPORTUNITY_FAILED, payload: res }))
    );

  /**
   * Apply for the opportunity
   * @param job id
   */
  @Effect()
  applyForAnOpportunity$ = this.actions$
    .ofType(OpportunityActions.APPLY_FOR_AN_OPPORTUNITY)
    .map(toPayload)
    .switchMap((payload) => this.opportunityService.applyForAnOpportunity(payload)
      .map((res) => ({ type: OpportunityActions.APPLY_FOR_AN_OPPORTUNITY_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: OpportunityActions.APPLY_FOR_AN_OPPORTUNITY_FAILED, payload: res }))
    );

  constructor(
      private actions$: Actions,
      private opportunityService: OpportunityService
  ) {}

}
