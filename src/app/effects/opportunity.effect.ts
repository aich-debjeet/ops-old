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
   * delete opportunity by id
   */
  @Effect()
  deleteOpportunity$ = this.actions$
    .ofType(OpportunityActions.DELETE_OPPORTUNITY)
    .map(toPayload)
    .switchMap((payload) => this.opportunityService.deleteOpportunity(payload)
      .map((res) => ({ type: OpportunityActions.DELETE_OPPORTUNITY_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: OpportunityActions.DELETE_OPPORTUNITY_FAILED, payload: res }))
    );

  /**
   * Apply for the opportunity
   * @params job id
   */
  @Effect()
  applyForAnOpportunity$ = this.actions$
    .ofType(OpportunityActions.APPLY_FOR_AN_OPPORTUNITY)
    .map(toPayload)
    .switchMap((payload) => this.opportunityService.applyForAnOpportunity(payload)
      .map((res) => ({ type: OpportunityActions.APPLY_FOR_AN_OPPORTUNITY_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: OpportunityActions.APPLY_FOR_AN_OPPORTUNITY_FAILED, payload: res }))
    );

  /**
   *Get Opportunity Report 
  */
 @Effect()
  getReport$ = this.actions$
  .ofType(OpportunityActions.OPPORTUNITY_REPORT)
  .map(toPayload)
  .switchMap((payload) => this.opportunityService.getReports(payload)
  .map(res => ({ type: OpportunityActions.OPPORTUNITY_REPORT_SUCCESS, payload: res }))
  .catch((res) => Observable.of({ type: OpportunityActions.OPPORTUNITY_REPORT_FAILED, payload: res }))
  );

  // /**
  //  * Get opportunity type count
  //  */
  // // @Effect()
  // // getOpportunityTypeCount$ = this.actions$
  // //   .ofType(OpportunityActions.GET_OPPORTUNITY_TYPE_COUNT)
  // //   .map(toPayload)
  // //   .switchMap((payload) => this.opportunityService.getOpportunityTypeCount()
  // //     .map((res) => ({ type: OpportunityActions.GET_OPPORTUNITY_TYPE_COUNT_SUCCESS, payload: res }))
  // //     .catch((res) => Observable.of({ type: OpportunityActions.GET_OPPORTUNITY_TYPE_COUNT_FAILED, payload: res }))
  // //   );

  // /**
  //  * Get opportunities by filter i.e. recommended
  //  */
  // @Effect()
  // getOpportunities$ = this.actions$
  //   .ofType(OpportunityActions.GET_OPPORTUNITIES)
  //   .map(toPayload)
  //   .switchMap((payload) => this.opportunityService.getOpportunities(payload)
  //     .map((res) => ({ type: OpportunityActions.GET_OPPORTUNITIES_SUCCESS, payload: res }))
  //     .catch((res) => Observable.of({ type: OpportunityActions.GET_OPPORTUNITIES_FAILED, payload: res }))
  //   );

  // /**
  //  * Get opportunities by filter i.e. recommended
  //  */
  // @Effect()
  // getAppliedOpportunities$ = this.actions$
  //   .ofType(OpportunityActions.GET_APPLIED_OPPORTUNITIES)
  //   .map(toPayload)
  //   .switchMap((payload) => this.opportunityService.getAppliedOpportunities(payload)
  //     .map((res) => ({ type: OpportunityActions.GET_APPLIED_OPPORTUNITIES_SUCCESS, payload: res }))
  //     .catch((res) => Observable.of({ type: OpportunityActions.GET_APPLIED_OPPORTUNITIES_FAILED, payload: res }))
  //   );

  // File Upload
  @Effect()
    fileUpload$ = this.actions$
    .ofType(OpportunityActions.FILE_UPLOAD)
    .map(toPayload)
    .switchMap((payload) => this.opportunityService.fileUpload(payload)
      .map(res => ({ type: OpportunityActions.FILE_UPLOAD_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: OpportunityActions.FILE_UPLOAD_FAILED, payload: res }))
    );

  constructor(
    private actions$: Actions,
    private opportunityService: OpportunityService
  ) {}

}
