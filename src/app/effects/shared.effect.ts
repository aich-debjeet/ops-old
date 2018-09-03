import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { GeneralService } from '../services/api.service';
import { SharedActions } from '../actions/shared.action';
import { SharedService } from '../services/shared.service';

@Injectable()
export class SharedEffect {

  @Effect()
  getReports$ = this.actions$
    .ofType(SharedActions.GET_REPORT_OPTIONS)
    .map(toPayload)
    .switchMap((payload) => this.sharedService.getReport(payload)
      .map(res => ({ type: SharedActions.GET_REPORT_OPTIONS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: SharedActions.GET_REPORT_OPTIONS_FAILED, payload: res }))
    );



  @Effect()
  pinChannel$ = this.actions$
    .ofType(SharedActions.PIN_CHANNEL)
    .map(toPayload)
    .switchMap((payload) => this.apiService.pinChannel(payload)
      .map(res => ({ type: SharedActions.PIN_CHANNEL_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: SharedActions.PIN_CHANNEL_FAILED, payload: res }))
    );

  @Effect()
  unpinChannel$ = this.actions$
    .ofType(SharedActions.UNPIN_CHANNEL)
    .map(toPayload)
    .switchMap((payload) => this.apiService.unpinChannel(payload)
      .map(res => ({ type: SharedActions.UNPIN_CHANNEL_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: SharedActions.UNPIN_CHANNEL_FAILED, payload: res }))
    );

    constructor(
    private actions$: Actions,
    private apiService: GeneralService,
    private sharedService:SharedService
  ) {}
}
