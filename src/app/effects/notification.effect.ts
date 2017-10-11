import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { NotificationActions } from '../actions/notification.action';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class NotificationEffect {

  @Effect()
  notifications$ = this.actions$
    .ofType(NotificationActions.LOAD_NOTIFICATIONS)
    .map(toPayload)
    .switchMap((payload) => this.apiService.getAllNotifications()
      .map(res => ({ type: NotificationActions.LOAD_NOTIFICATIONS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: NotificationActions.LOAD_NOTIFICATIONS_FAILED, payload: res }))
    );

  @Effect()
  notificationRead$ = this.actions$
    .ofType(NotificationActions.MARK_AS_READ)
    .map(toPayload)
    .switchMap((payload) => this.apiService.notificationMarkAsRead(payload)
      .map(res => ({ type: NotificationActions.MARK_AS_READ_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: NotificationActions.MARK_AS_READ_FAILED, payload: res }))
    );

  constructor(
      private actions$: Actions,
      private apiService: NotificationService
  ) {}
}
