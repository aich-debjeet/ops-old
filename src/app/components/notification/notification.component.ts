import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// action
import { NotificationActions } from './../../actions/notification.action';
import { Notification } from './../../models/notification.model';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notificationsState$: Observable<Notification>;
  formattedNotifications: any[];
  notificationIds: any[];
  notifications: any[];
  baseUrl: string;

  constructor(
    private store: Store<Notification>
  ) {

    // image path
    this.baseUrl = environment.API_IMAGE;

    // loading notifications
    this.store.dispatch({
      type: NotificationActions.LOAD_NOTIFICATIONS,
      payload: null
    });

    this.notificationsState$ = this.store.select('notificationTags');

    // observe the store value
    this.notificationsState$.subscribe((state) => {
      // console.log(state);
      if (typeof state['recieved_notifications'] !== 'undefined') {
        this.notifications = state['recieved_notifications'];
        this.processNotifications();
      }
      if (typeof state['marking_as_read_response'] !== 'undefined') {
        // upadte notification as marked
        // console.log('read: ' + this.notificationIds);
        this.updateNotifications();
      }
    });
  }

  /**
   * Updating notification read in UI
   */
  updateNotifications() {
    for (let readNotifIndex = 0; readNotifIndex < this.notificationIds.length; readNotifIndex++) {
      const readNotif = this.notificationIds[readNotifIndex];
      // console.log('readNotif', readNotif);
      // console.log('this.notifications', this.notifications);
      for (let notifIndex = 0; notifIndex < this.notifications.length; notifIndex++) {
        if (this.notifications[notifIndex].notificationId === this.notificationIds[readNotifIndex]) {
          // console.log('mark read: ', this.notifications[notifIndex].notificationId);
          this.notifications[notifIndex].isRead = true;
        }
      }
    }
  }

  // message maker
  processNotifications() {

    this.notifications.forEach((notif, index) => {

      switch (notif.notificationType) {

        case 'Media_Spot':
          this.notifications[index]['message'] = notif.name + ' and ' + notif.spotCount + ' others spotted your post';
          break;

        case 'Media_Comments':
          this.notifications[index]['message'] = notif.name + ' and ' + notif.commentsCount + ' others commented on your post';
          break;

        case 'Status_Spot':
          this.notifications[index]['message'] = notif.name + ' and ' + notif.spotCount + ' others spotted your status';
          break;

        case 'Status_Comments':
          this.notifications[index]['message'] = notif.name + ' and ' + notif.commentsCount + ' others commented on your status';
          break;

      }
    });

  }

  /**
   * Marking notification as read
   * @Param: notification id
   */
  markAsRead(notificationId: string) {
    // console.log(notificationId);
    this.notificationIds = [notificationId];
    this.dispatchReadNotifications([notificationId]);
  }

  /**
   * Dispatch read notification
   * @Parmas: list of notification ids
   */
  dispatchReadNotifications(notifList) {
    this.store.dispatch({
      type: NotificationActions.MARK_AS_READ,
      payload: {
        notificationList: notifList
      }
    });
  }

  /**
   * Get all ids of all notifications
   */
  getAllNotificationIds(callback) {
    const data = [];
    this.notifications.forEach((notif, index) => {
      if (notif.isRead === false) {
        data.push(notif.notificationId);
      }
      if (index === (this.notifications.length - 1)) {
        this.notificationIds = data;
        // console.log('collection this.notificationIds', this.notificationIds);
        callback();
      }
    });
  }

  /**
   * Marking all notifications as read
   */
  markAllAsRead() {
    const self = this;
    this.getAllNotificationIds(function() {
      // console.log('mark all read', self.notificationIds);
      self.dispatchReadNotifications(self.notificationIds);
    });

  }

  ngOnInit() {

    // on page load mark all notifications as read
    setTimeout(() => {
      this.markAllAsRead();
    }, 1000);
  }

}
