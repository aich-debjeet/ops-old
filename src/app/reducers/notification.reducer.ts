import { ActionReducer, Action } from '@ngrx/store';

import { Notification } from '../models/notification.model';
import { NotificationActions } from '../actions/notification.action';

export const NotificationReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    case NotificationActions.LOAD_NOTIFICATIONS:
      return Object.assign({}, state, {
        recieved_notifications_success: false
      });

    case NotificationActions.LOAD_NOTIFICATIONS_SUCCESS:
      return Object.assign({}, state, {
        recieved_notifications: payload,
        recieved_notifications_success: true
      });

    case NotificationActions.LOAD_NOTIFICATIONS_FAILED:
      return Object.assign({}, state, {
        recieved_notifications_success: false
      });

    case NotificationActions.MARK_AS_READ:
      return Object.assign({}, state, {
        mark_as_read_success: false
      });

    case NotificationActions.MARK_AS_READ_SUCCESS:
      return Object.assign({}, state, {
        marking_as_read_response: payload,
        mark_as_read_success: true
      });

    case NotificationActions.MARK_AS_READ_FAILED:
      return Object.assign({}, state, {
        mark_as_read_success: false
      });

    default:
      return state;

  }

}
