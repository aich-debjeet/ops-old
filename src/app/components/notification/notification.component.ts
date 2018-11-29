import { Component, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

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
export class NotificationComponent implements OnInit, OnDestroy {

  notificationsState$: Observable<Notification>;
  private subscription: ISubscription;
  formattedNotifications: any[];
  notificationIds: any[];
  notifications: any[];
  baseUrl: string;
  alreadyReadAll = true;
  canScroll = true;
  lastScrollTop = 0;
  showPreloader: boolean;
  scrolling = 0;
  scrollingLoad = 251;
  page = 0;
  notificationType: string;

  constructor(
    private store: Store<Notification>,
    private router: Router
  ) {

    // image path
    this.baseUrl = environment.API_IMAGE;

    // notification sotre
    this.notificationsState$ = this.store.select('notificationTags');

    // observe the store value
    this.subscription = this.notificationsState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        if (typeof state['recieved_notifications'] !== 'undefined') {
          this.notifications = state['recieved_notifications'];
          // check is unread notification exits else mark all notifications as read
          this.processNotifications();
        }
        if (state && state['requesting_notifications'] === true) {
          this.showPreloader = false;
        }
      } else {
        // if notifications state undefined init with initial list of notifications
        const reqBody = {
          limit: 10,
          page: 0
        }
        this.store.dispatch({ type: NotificationActions.GET_NOTIFICATIONS, payload: reqBody });
      }
    });
  }

  // message maker
  processNotifications() {
    if (this.notifications.length > 0) {
      for (let i = 0; i < this.notifications.length; i++) {
        switch (this.notifications[i].notificationType) {
          case 'Following':
            this.notifications[i].message = ' has started following you';
            break;
          case 'Media_Spot':
            this.notifications[i].message = ' has spotted your post';
            break;
          case 'Media_Comments':
            this.notifications[i].message = ' has commented on your post';
            break;
          case 'Status_Spot':
            this.notifications[i].message = ' has spotted your status';
            break;
          case 'Status_Comments':
            this.notifications[i].message = ' has commented on your status';
            break;
          case 'Network_Sent':
            this.notifications[i].message = ' has sent you a network request';
            break;
          case 'Network_Accepted':
            this.notifications[i].message = ' has accepted your network request';
            break;
        }
      }
    }
  }


  /**
   * Open respective link
   */
  openLink(notification: any) {
    switch (notification.notificationType) {
      case 'Media_Spot':
        this.router.navigate([{ outlets: { media : ['media', notification.media.mediaId] } } ]);
        break;
      case 'Media_Comments':
        this.router.navigate([{ outlets: { media : ['media', notification.media.mediaId] } } ]);
        break;
      case 'Status_Spot':
        this.router.navigate(['/user/status/list']);
        break;
      case 'Status_Comments':
        this.router.navigate(['/user/status/list']);
        break;
      case 'Network_Sent':
        this.router.navigate(['/profile/network']);
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
   * Marking all notifications as read
   */
  markAllAsRead() {
    this.store.dispatch({ type: NotificationActions.MARK_AS_ALL_READ });

    this.store.select('notificationTags')
    .first(notification => notification['mark_as_all_read_success'] === true )
    .subscribe( data => {
      this.scrolling = 0;
      this.scrollingLoad = 251;
      this.page = 0;
      const pagination = {
        limit: 10,
        page: 0
      }
      this.store.dispatch({ type: NotificationActions.GET_NOTIFICATIONS, payload: pagination });
    });
  }

  ngOnInit() {
    this.notificationType = 'all';
   }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onScroll(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 500
      this.page += 10
      const data = {
        limit: 10,
        page: this.page
      }
      this.store.dispatch({ type: NotificationActions.GET_NOTIFICATIONS, payload: data });
    }
  }

  switchtabs(tab: string){
    this.notificationType = tab;
  }

}
