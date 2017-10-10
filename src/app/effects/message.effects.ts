import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
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
  sentMessages$ = this.actions$
    .ofType(MessageActions.LOAD_SENT_MESSAGES)
    .map(toPayload)
    .switchMap((payload) => this.messageService.getAllSentMessages( payload )    /*'sent'*/
      .map(res => ({ type: MessageActions.LOAD_SENT_MESSAGES_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.LOAD_SENT_MESSAGES_FAILED, payload: res }))
    );

  @Effect()
  receivedMessages$ = this.actions$
    .ofType(MessageActions.LOAD_RECEIVED_MESSAGES)
    .map(toPayload)
    .switchMap((payload) => this.messageService.getAllReceivedMessages( payload )  /*'received' */
      .map(res => ({ type: MessageActions.LOAD_RECEIVED_MESSAGES_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.LOAD_RECEIVED_MESSAGES_FAILED, payload: res }))
    );
    // @Effect()
    // getReceipient$ = this.actions$
    //   .ofType(MessageActions.GET_RECEIPIENT)
    //   .map(toPayload)
    //   .switchMap((payload) => this.messageService.getReceipientDetails( payload )
    //     .map(res => ({ type: MessageActions.GET_RECEIPIENT_SUCCESS, payload: res }))
    //     .catch((res) => Observable.of({ type: MessageActions.GET_RECEIPIENT_FAILED, payload: res }))
    //   );
    @Effect()
    userProfile$ = this.actions$
    .ofType(MessageActions.LOAD_USER_PROFILE_DATA)
    .map(toPayload)
    .switchMap((payload) => this.messageService.getUserProfileDetails(payload)
      .map(res => ({ type: MessageActions.LOAD_USER_PROFILE_DATA_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.LOAD_USER_PROFILE_DATA_FAILED, payload: res }))
    );

    @Effect()
    ProfileHandles$ = this.actions$
    .ofType(MessageActions.LOAD_HANDLE_PROFILE_DATA)
    .map(toPayload)
    .switchMap((payload) => this.messageService.getUserProfileByHandles(payload)
      .map(res => ({ type: MessageActions.LOAD_HANDLE_PROFILE_DATA_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.LOAD_HANDLE_PROFILE_DATA_FAILED, payload: res }))
    );

    @Effect()
    nonUserProfile$ = this.actions$
    .ofType(MessageActions.LOAD_NON_USER_PROFILE_DATA)
    .map(toPayload)
    .switchMap((payload) => this.messageService.getNonUserProfileDetails(payload)
      .map(res => ({ type: MessageActions.LOAD_NON_USER_PROFILE_DATA_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.LOAD_NON_USER_PROFILE_DATA_FAILED, payload: res }))
    );

    @Effect()
    markMessages$ = this.actions$
    .ofType(MessageActions.MARK_MESSAGES_READ)
    .map(toPayload)
    .switchMap((payload) => this.messageService.markMessagesRead(payload)
      .map(res => ({ type: MessageActions.MARK_MESSAGES_READ_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.MARK_MESSAGES_READ_FAILED, payload: res }))
    );
  @Effect()
  sendMessage$ = this.actions$
    .ofType(MessageActions.SEND_MESSAGE)
    .map(toPayload)
    .switchMap((payload) => this.messageService.sendMessage(payload)
      .map(res => ({ type: MessageActions.SEND_MESSAGE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.SEND_MESSAGE_FAILED, payload: res }))
    );

    constructor(
    private actions$: Actions,
    private apiService: GeneralService,
    private messageService: MessageService
  ) {}
}
