import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { ApiService } from '../services/api.service';
import { MessageActions } from '../actions/message.action';

@Injectable()
export class MessageEffect {

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {
    console.log('message effects');
  }

  @Effect()
  sentMessages$ = this.actions$
    .ofType(MessageActions.LOAD_SENT_MESSAGES)
    .map(toPayload)
    .switchMap((payload) => this.apiService.getAllMessages('sent')
      .map(res => ({ type: MessageActions.LOAD_SENT_MESSAGES_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.LOAD_SENT_MESSAGES_FAILED, payload: res }))
    );

  @Effect()
  receivedMessages$ = this.actions$
    .ofType(MessageActions.LOAD_RECEIVED_MESSAGES)
    .map(toPayload)
    .switchMap((payload) => this.apiService.getAllMessages('received')
      .map(res => ({ type: MessageActions.LOAD_RECEIVED_MESSAGES_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.LOAD_RECEIVED_MESSAGES_FAILED, payload: res }))
    );

}
