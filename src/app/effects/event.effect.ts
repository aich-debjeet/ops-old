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

  @Effect()
    eventregistration$ = this.actions$
    .ofType(EventActions.EVENT_REG)
    .map(toPayload)
    .switchMap((payload) => this.eventService.eventReg(payload)
      .map(res => ({ type: EventActions.EVENT_REG_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: EventActions.EVENT_REG_FAILED, payload: res }))
    );

  @Effect()
    eventDetailload$ = this.actions$
    .ofType(EventActions.EVENT_DETAILS_LOAD)
    .map(toPayload)
    .switchMap((payload) => this.eventService.eventDetail(payload)
      .map(res => ({ type: EventActions.EVENT_DETAILS_LOAD_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: EventActions.EVENT_DETAILS_LOAD_FAILED, payload: res }))
    );

  @Effect()
    getAllIndustry$ = this.actions$
    .ofType(EventActions.GET_ALL_INDUSTRY)
    .map(toPayload)
    .switchMap((payload) => this.eventService.getAllIndustry()
      .map(res => ({ type: EventActions.GET_ALL_INDUSTRY_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: EventActions.GET_ALL_INDUSTRY_FAILED, payload: res }))
    );

  @Effect()
    fileUpload$ = this.actions$
    .ofType(EventActions.FILE_UPLOAD)
    .map(toPayload)
    .switchMap((payload) => this.eventService.fileUpload(payload)
      .map(res => ({ type: EventActions.FILE_UPLOAD_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: EventActions.FILE_UPLOAD_FAILED, payload: res }))
    );

  @Effect()
    eventList$ = this.actions$
    .ofType(EventActions.EVENT_LIST)
    .map(toPayload)
    .switchMap((payload) => this.eventService.eventList(payload)
      .map(res => ({ type: EventActions.EVENT_LIST_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: EventActions.EVENT_LIST_FAILED, payload: res }))
    );

  constructor(
    private actions$: Actions,
    private router: Router,
    private eventService: EventService
  ) { }

}
