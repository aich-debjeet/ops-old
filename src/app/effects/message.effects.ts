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
  messages$ = this.actions$
    .ofType(MessageActions.LOAD_MESSAGES)
    .map(toPayload)
    .switchMap((payload) => this.apiService.getLoggedInUsersMessages()
      .map(res => ({ type: MessageActions.LOAD_MESSAGES_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.LOAD_MESSAGES_FAILED, payload: res }))
    );

}
