import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// action
import { NotificationActions } from './../../actions/notification.action';
import { Notification } from './../../models/notification.model';
import { environment } from './../../../environments/environment';

import * as _ from 'lodash';

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
  alreadyReadAll = true;
  canScroll = true;
  lastScrollTop = 0;
  showPreloader: boolean;

  constructor(
    private store: Store<Notification>,
    private router: Router
  ) {

    // image path
    this.baseUrl = environment.API_IMAGE;

    this.dispatchLoadNotifications();

    // notification sotre
    this.notificationsState$ = this.store.select('notificationTags');

    // observe the store value
    this.notificationsState$.subscribe((state) => {
      if (typeof state['recieved_notifications'] !== 'undefined') {
        this.notifications = state['recieved_notifications'];

        // check is unread notification exits else mark all notifications as read
        setTimeout(() => {
          // check if unread notification is available
          const allNotifsRead = _.every(this.notifications, ['isRead', true]);
          if (allNotifsRead) {
            this.alreadyReadAll = true;
          } else {
            this.alreadyReadAll = false;
            this.markAllAsRead();
          }
        }, 1000);

        this.processNotifications();
      }
      if (typeof state['marking_as_read_response'] !== 'undefined') {
        // upadte notification as marked
        this.updateNotifications();
      }
      if (state && state['recieved_notifications_success'] === true) {
        this.showPreloader = false;
      }
    });
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    const scrolledValue = window.pageYOffset;
    let scrollDirection = '';
    if (scrolledValue > this.lastScrollTop) {
      scrollDirection = 'down';
    } else {
      scrollDirection = 'up';
    }
    this.lastScrollTop = scrolledValue;

    if (this.canScroll && (window.innerHeight + window.scrollY) >= document.body.offsetHeight && scrollDirection === 'down') {
      // reached the bottom of the page
      this.canScroll = false;
      setTimeout(() => {
        this.canScroll = true;
      }, 1000);
      this.dispatchLoadNotifications();
    }
  }

  /**
   * Redux dispatch to load notifications
   */
  dispatchLoadNotifications() {
    // showing preloader
    this.showPreloader = true;
    // loading notifications
    this.store.dispatch({
      type: NotificationActions.LOAD_NOTIFICATIONS,
      payload: null
    });
  }

  /**
   * Updating notification read in UI
   */
  updateNotifications() {
    if (typeof this.notifications !== 'undefined'
      && typeof this.notificationIds !== 'undefined'
      && this.notifications.length > 0) {
        for (let readNotifIndex = 0; readNotifIndex < this.notificationIds.length; readNotifIndex++) {
          const readNotif = this.notificationIds[readNotifIndex];
          for (let notifIndex = 0; notifIndex < this.notifications.length; notifIndex++) {
            if (this.notifications[notifIndex].notificationId === this.notificationIds[readNotifIndex]) {
              this.notifications[notifIndex].isRead = true;
            }
          }
        }
    }
  }

  // message maker
  processNotifications() {

    this.notifications.forEach((notif, index) => {

      switch (notif.notificationType) {

        case 'Media_Spot':
          this.notifications[index]['message'] = ' and ' + notif.spotCount + ' others spotted your post';
          break;

        case 'Media_Comments':
          this.notifications[index]['message'] = ' and ' + notif.commentsCount + ' others commented on your post';
          break;

        case 'Status_Spot':
          this.notifications[index]['message'] = ' and ' + notif.spotCount + ' others spotted your status';
          break;

        case 'Status_Comments':
          this.notifications[index]['message'] = ' and ' + notif.commentsCount + ' others commented on your status';
          break;

      }
    });

  }

  /**
   * Open respective link
   */
  openLink(notifIndex: any, notificationId: string) {
    const notifDetails = this.notifications[notifIndex];
    // redirecting to the respective link
    switch (notifDetails.notificationType) {

      case 'Media_Spot':
        this.router.navigate(['/user/status/list']);
        break;

      case 'Media_Comments':
        this.router.navigate(['/user/status/list']);
        break;

      case 'Status_Spot':
        this.router.navigate(['/user/status/list']);
        break;

      case 'Status_Comments':
        this.router.navigate(['/user/status/list']);
        break;

    }

  }

  /**
   * Marking notification as read
   * @Param: notification id
   */
  markAsRead(notificationId: string) {
    this.notificationIds = [notificationId];
    this.dispatchReadNotifications();
  }

  /**
   * Dispatch read notification
   * @Parmas: list of notification ids
   */
  dispatchReadNotifications() {
    this.store.dispatch({
      type: NotificationActions.MARK_AS_READ,
      payload: {
        notificationList: this.notificationIds
      }
    });
  }

  /**
   * Get all ids of all notifications
   */
  getAllNotificationIds(callback) {
    const data = [];
    if (typeof this.notifications !== 'undefined') {
      this.notifications.forEach((notif, index) => {
        if (notif.isRead === false) {
          data.push(notif.notificationId);
        }
        if (index === (this.notifications.length - 1)) {
          this.notificationIds = data;
          callback();
        }
      });
    }
  }

  /**
   * Marking all notifications as read
   */
  markAllAsRead() {
    const self = this;
    this.getAllNotificationIds(function() {
      self.dispatchReadNotifications();
    });
  }

  ngOnInit() { }

}
