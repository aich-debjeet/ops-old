import { ActionReducer, Action } from '@ngrx/store';
import { Notification } from '../models/notification.model';
import { NotificationActions } from '../actions/notification.action';
import { uniqBy as _uniqBy } from 'lodash';

export const NotificationReducer: ActionReducer<any> = (state, {payload, type}: Action) =>  {

  switch (type) {

    // case NotificationActions.GET_NOTIFICATIONS:
    //   return Object.assign({}, state, {
    //     requesting_notifications: true,
    //     notifications_pagination: payload,
    //     requesting_notifications_success: false
    //   });

    // case NotificationActions.GET_NOTIFICATIONS_SUCCESS:
    //   let updated_notifications;
    //   if (state['recieved_notifications'] && state['recieved_notifications'].length > 0) {
    //     updated_notifications = [...state.recieved_notifications, ...payload];
    //     updated_notifications = _uniqBy(updated_notifications, 'notificationId');
    //   } else {
    //     updated_notifications = payload;
    //   }
    //   return Object.assign({}, state, {
    //     recieved_notifications: updated_notifications,
    //     requesting_notifications: false,
    //     requesting_notifications_success: true
    //   });

    // case NotificationActions.GET_NOTIFICATIONS_FAILED:
    //   return Object.assign({}, state, {
    //     requesting_notifications: false,
    //     requesting_notifications_success: false
    //   });

      case NotificationActions.GET_NOTIFICATIONS_BY_TYPE:
      if(payload.offset === 0){
        return Object.assign({}, state, {
          requesting_notifications: true,
          notifications_pagination: payload,
          requesting_notifications_success: false,
          recieved_notifications:[]
        });
      } else {
        return Object.assign({}, state, {
          requesting_notifications: true,
          notifications_pagination: payload,
          requesting_notifications_success: false,
        });
      }

    case NotificationActions.GET_NOTIFICATIONS_BY_TYPE_SUCCESS:
      let updated_notifications;
      if (state['recieved_notifications'] && state['recieved_notifications'].length > 0) {
        updated_notifications = [...state.recieved_notifications, ...payload.SUCCESS];
        updated_notifications = _uniqBy(updated_notifications, 'notificationId');
      } else {
        updated_notifications = payload.SUCCESS;
      }
      return Object.assign({}, state, {
        recieved_notifications: updated_notifications,
        requesting_notifications: false,
        requesting_notifications_success: true,
        notification_count: payload.notificationCount
      });

    case NotificationActions.GET_NOTIFICATIONS_BY_TYPE_FAILED:
      return Object.assign({}, state, {
        requesting_notifications: false,
        requesting_notifications_success: false
      });

    case NotificationActions.MARK_AS_READ:
    console.log(payload)
    let found =(state['recieved_notifications']).some(r=> payload.notificationList.indexOf(r.notificationId) >= 0)
    console.log(found)
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

    case NotificationActions.MARK_AS_DELETE:
      return Object.assign({}, state, {
        noti_delete: false,
        noti_delete_id: payload
      });
    case NotificationActions.MARK_AS_DELETE_SUCCESS:
      return Object.assign({}, state, {
        noti_delete: true,
        recieved_notifications: state.recieved_notifications.filter(function(el){
          return !state.noti_delete_id.notificationList.includes( el.notificationId );
        })
      });
    case NotificationActions.MARK_AS_DELETE_FAILED:
      return Object.assign({}, state, {
        noti_delete: false,
      });

    case NotificationActions.ADD_PUSHER_NOTIFICATION:
      let updated_push_notifications;
      if (state && state['recieved_notifications'].length > 0) {
        const arr = [payload];
        updated_push_notifications = arr.concat(state.recieved_notifications)
      } else {
        updated_push_notifications = [payload];
      }
      return Object.assign({}, state, {
        recieved_notifications: updated_push_notifications,
        recieved_pushed_notifications_success: true
      });

    case NotificationActions.GET_ACTIVITIES_FOR_THE_USER:
      if(payload.offset === 0){
        return Object.assign({}, state, {
          recived_activities: false,
          requesting_activities:true,
          activity_list:[]
        });
      } else {
        return Object.assign({}, state, {
          recived_activities: false,
          requesting_activities:true,
        });
      }

    case NotificationActions.GET_ACTIVITIES_FOR_THE_USER_SUCCESS:
      let list =[]
      if(state['activity_list'].length > 0){
        list = [...state['activity_list'], ...payload];
      } else {
        list = payload;
      }
      return Object.assign({}, state, {
        activity_list: list,
        recived_activities: true,
        requesting_activities:false,
      });

    case NotificationActions.GET_ACTIVITIES_FOR_THE_USER_FAILED:
      return Object.assign({}, state, {
        recived_activities: false,
        requesting_activities:false,
      });

    default:
      return state;

  }

}
