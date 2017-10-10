import { ActionReducer, Action } from '@ngrx/store';

import { Notification } from '../models/notification.model';
import { NotificationActions } from '../actions/notification.action';

export const NotificationReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    case NotificationActions.LOAD_NOTIFICATIONS:
      return Object.assign({}, state, {
        success: true
      });

    case NotificationActions.LOAD_NOTIFICATIONS_SUCCESS:
      return Object.assign({}, state, {
        completed: payload,
        success: true
      });

    case NotificationActions.LOAD_NOTIFICATIONS_FAILED:
      return Object.assign({}, state, {
        success: false
      });

    default:
      return state;

  }

}
