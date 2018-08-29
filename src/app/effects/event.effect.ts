import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Rx'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { EventService } from '../services/event.service';
import { EventActions } from '../actions/event.action';

@Injectable()
export class EventEffect {

  /**
   *Get Events Report 
  */
    @Effect()
      getReport$ = this.actions$
      .ofType(EventActions.EVENT_REPORT)
      .map(toPayload)
      .switchMap((payload) => this.eventService.getReports(payload)
      .map(res => ({ type: EventActions.EVENT_REPORT_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: EventActions.EVENT_REPORT_FAILED, payload: res }))
    );

  //Banner search for events
  @Effect()
    bannerSearch$ = this.actions$
    .ofType(EventActions.BANNER_SEARCH)
    .map(toPayload)
    .switchMap((payload) => this.eventService.searchBanner()
      .map(res => ({ type: EventActions.BANNER_SEARCH_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: EventActions.BANNER_SEARCH_FAILED, payload: res }))
    );

  //Edit  for events
  @Effect()
  eventsEdit$ = this.actions$
  .ofType(EventActions.EVENT_EDIT)
  .map(toPayload)
  .switchMap((payload) => this.eventService.eventsEdit(payload)
    .map(res => ({ type: EventActions.EVENT_EDIT_SUCCESS, payload: res }))
    .catch((res) => Observable.of({ type: EventActions.EVENT_EDIT_FAILED, payload: res }))
  );

    //Attendee list
    @Effect()
     attendeeList$ = this.actions$
     .ofType(EventActions.EVENT_ATTENDEE_LOAD)
     .map(toPayload)
     .switchMap((payload) => this.eventService.listOfAttendee(payload)
        .map(res => ({ type: EventActions.EVENT_ATTENDEE_LOAD_SUCCESS, payload: res }))
        .catch((res) => Observable.of({ type: EventActions.EVENT_ATTENDEE_LOAD_FAILED, payload: res }))
      );

  // Get Event Registration
  @Effect()
    eventregistration$ = this.actions$
    .ofType(EventActions.EVENT_REG)
    .map(toPayload)
    .switchMap((payload) => this.eventService.eventReg(payload)
      .map(res => ({ type: EventActions.EVENT_REG_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: EventActions.EVENT_REG_FAILED, payload: res }))
    );

  // Event Delete
  @Effect()
  eventDelete$ = this.actions$
  .ofType(EventActions.EVENT_DELETE)
  .map(toPayload)
  .switchMap((payload) => this.eventService.eventDel(payload)
    .map(res => ({ type: EventActions.EVENT_DELETE_SUCCESS, payload: res }))
    .catch((res) => Observable.of({ type: EventActions.EVENT_DELETE_FAILED, payload: res }))
  );

  // Get Event Details
  @Effect()
    eventDetailload$ = this.actions$
    .ofType(EventActions.EVENT_DETAILS_LOAD)
    .map(toPayload)
    .switchMap((payload) => this.eventService.eventDetail(payload)
      .map(res => ({ type: EventActions.EVENT_DETAILS_LOAD_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: EventActions.EVENT_DETAILS_LOAD_FAILED, payload: res }))
    );

  // Get Industry
  @Effect()
    getAllIndustry$ = this.actions$
    .ofType(EventActions.GET_ALL_INDUSTRY)
    .map(toPayload)
    .switchMap((payload) => this.eventService.getAllIndustry()
      .map(res => ({ type: EventActions.GET_ALL_INDUSTRY_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: EventActions.GET_ALL_INDUSTRY_FAILED, payload: res }))
    );

  // Get Event type
  @Effect()
    getEventType$ = this.actions$
    .ofType(EventActions.GET_EVENT_TYPE)
    .map(toPayload)
    .switchMap((payload) => this.eventService.getEventsType()
      .map(res => ({ type: EventActions.GET_EVENT_TYPE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: EventActions.GET_EVENT_TYPE_FAILED, payload: res }))
    );

  // File Update
  @Effect()
    fileUpload$ = this.actions$
    .ofType(EventActions.FILE_UPLOAD)
    .map(toPayload)
    .switchMap((payload) => this.eventService.fileUpload(payload)
      .map(res => ({ type: EventActions.FILE_UPLOAD_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: EventActions.FILE_UPLOAD_FAILED, payload: res }))
    );

  // Event List
  @Effect()
    eventList$ = this.actions$
    .ofType(EventActions.EVENT_LIST)
    .map(toPayload)
    .switchMap((payload) => this.eventService.eventList(payload)
      .map(res => ({ type: EventActions.EVENT_LIST_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: EventActions.EVENT_LIST_FAILED, payload: res }))
    );

  // Event Attend
  @Effect()
    eventAttend$ = this.actions$
    .ofType(EventActions.EVENT_ATTEND)
    .map(toPayload)
    .switchMap((payload) => this.eventService.attendUpdate(payload)
      .map(res => ({ type: EventActions.EVENT_ATTEND_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: EventActions.EVENT_ATTENDT_FAILED, payload: res }))
    );

  // Event Search data
  @Effect()
    eventSearch$ = this.actions$
    .ofType(EventActions.EVENT_SEARCH)
    .map(toPayload)
    .switchMap((payload) => this.eventService.eventSearchData(payload)
      .map(res => ({ type: EventActions.EVENT_SEARCH_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: EventActions.EVENT_ATTENDT_FAILED, payload: res }))
    );

  // Get Event type
  @Effect()
    eventType$ = this.actions$
    .ofType(EventActions.EVENT_TYPE_LOAD)
    .map(toPayload)
    .switchMap((payload) => this.eventService.getAllEventType()
      .map(res => ({ type: EventActions.EVENT_TYPE_LOAD_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: EventActions.EVENT_TYPE_LOAD_FAILED, payload: res }))
    );

  // dwc contact form submit
  @Effect()
  dwcContact$ = this.actions$
  .ofType(EventActions.DWC_CONTACT_FORM)
  .map(toPayload)
  .switchMap((payload) => this.eventService.dwcContactUs(payload)
    .map(res => ({ type: EventActions.DWC_CONTACT_FORM_SUCCESS, payload: res }))
    .catch((res) => Observable.of({ type: EventActions.DWC_CONTACT_FORM_FAILED, payload: res }))
  );

  // DWC payment Request
  @Effect()
  eventPaymentRequest$ = this.actions$
  .ofType(EventActions.DWC_PAYMENT_REQUEST)
  .map(toPayload)
  .switchMap((payload) => this.eventService.dwcPaymentRequest()
    .map(res => ({ type: EventActions.DWC_PAYMENT_REQUEST_SUCCESS, payload: res }))
    .catch((res) => Observable.of({ type: EventActions.DWC_PAYMENT_REQUEST_FAILED, payload: res }))
  );

  // DWC Registration
  @Effect()
  eventDwcReg$ = this.actions$
    .ofType(EventActions.DWC_EVENT_REG)
    .map(toPayload)
    .switchMap((payload) => this.eventService.dwcReg(payload)
      .map(res => ({ type: EventActions.DWC_EVENT_REG_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: EventActions.DWC_EVENT_REG_FAILED, payload: res }))
    );

  constructor(
    private actions$: Actions,
    private router: Router,
    private eventService: EventService
  ) { }

}
