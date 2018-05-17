import { ActionReducer, Action } from '@ngrx/store';

import { Notification } from '../models/notification.model';
import { NotificationActions } from '../actions/notification.action';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';



export const NotificationReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    case NotificationActions.LOAD_NOTIFICATIONS:
      if (payload.page === 0) {
        return Object.assign({}, state, {
          recieved_notifications: [],
          recieved_notifications_success: false
        });
      }

      return Object.assign({}, state, {
        recieved_notifications_success: false
      });

    case NotificationActions.LOAD_NOTIFICATIONS_SUCCESS:
      let updated_notifications;
      if (state && state.recieved_notifications) {
        updated_notifications = [...state.recieved_notifications, ...payload];
      } else {
        updated_notifications = payload;
      }
      return Object.assign({}, state, {
        recieved_notifications: updated_notifications,
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

    case NotificationActions.MARK_AS_ALL_READ:
      return Object.assign({}, state, {
        mark_as_all_read_success: false
      });

    case NotificationActions.MARK_AS_ALL_READ_SUCCESS:
      return Object.assign({}, state, {
        marking_as_read_response: payload,
        mark_as_all_read_success: true
      });

    case NotificationActions.ADD_PUSHER_NOTIFICATIONS:
      let updated_push_notifications;
      if (state && state.recieved_notifications) {
        const arr = [payload];
        updated_push_notifications = arr.concat(state.recieved_notifications)
        // updated_push_notifications = [...state.recieved_notifications, ...payload];
      } else {
        updated_push_notifications = payload;
      }
      return Object.assign({}, state, {
        recieved_notifications: updated_push_notifications,
        recieved_pushed_notifications_success: true
      });

    default:
      return state;

  }

}
