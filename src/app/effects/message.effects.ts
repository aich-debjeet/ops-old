import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { MessageService } from '../services/message.service';
import { GeneralService } from '../services/api.service';
import { MessageActions } from '../actions/message.action';

@Injectable()
export class MessageEffect {

  @Effect()
    userProfile$ = this.actions$
    .ofType(MessageActions.LOAD_USER_PROFILE_DATA)
    .map(toPayload)
    // .switchMap((payload) => Observable
    //   .timer(0 , 5000)
      .switchMap((payload) => this.messageService.getUserProfileDetails(payload)
        .map(res => ({ type: MessageActions.LOAD_USER_PROFILE_DATA_SUCCESS, payload: res }))
        .catch((res) => Observable.of({ type: MessageActions.LOAD_USER_PROFILE_DATA_FAILED, payload: res }))
      );
    // );

  @Effect()
    nonUserProfile$ = this.actions$
    .ofType(MessageActions.LOAD_NON_USER_PROFILE_DATA)
    .map(toPayload)
    .switchMap((payload) => this.messageService.getNonUserProfileDetails(payload)
      .map(res => ({ type: MessageActions.LOAD_NON_USER_PROFILE_DATA_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.LOAD_NON_USER_PROFILE_DATA_FAILED, payload: res }))
    );

    @Effect()
    nonUserProfile2$ = this.actions$
    .ofType(MessageActions.LOAD_NON_USER_PROFILE2_DATA)
    .map(toPayload)
    .switchMap((payload) => this.messageService.getNonUserProfileDetails(payload)
      .map(res => ({ type: MessageActions.LOAD_NON_USER_PROFILE2_DATA_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.LOAD_NON_USER_PROFILE2_DATA_FAILED, payload: res }))
    );

  @Effect()
    getReceipient$ = this.actions$
      .ofType(MessageActions.GET_RECEIPIENT)
      .map(toPayload)
      .switchMap((payload) => this.messageService.getReceipientDetails( payload )
        .map(res => ({ type: MessageActions.GET_RECEIPIENT_SUCCESS, payload: res }))
        .catch((res) => Observable.of({ type: MessageActions.GET_RECEIPIENT_FAILED, payload: res }))
      );

  @Effect()
    getMessangerList$ = this.actions$
      .ofType(MessageActions.GET_MESSANGER_LIST)
      .map(toPayload)
      .switchMap((payload) => this.messageService.getMessangerList(payload)
        .map(res => ({ type: MessageActions.GET_MESSANGER_LIST_SUCCESS, payload: res }))
        .catch((res) => Observable.of({ type: MessageActions.GET_MESSANGER_LIST_FAILED, payload: res }))
      );

  constructor(
  private actions$: Actions,
  private apiService: GeneralService,
  private messageService: MessageService
  ) {}
}
