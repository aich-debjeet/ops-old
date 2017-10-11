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
  notifications: any[];
  baseUrl: string;
  msgTypes = [
    'Media_Spot',
    'Media_Comments',
    'Status_Spot',
    'Status_Comments'
  ];

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
      if (typeof state['completed'] !== 'undefined') {
        this.notifications = state['completed'];
        this.processNotifications();
      }
      console.log('this.notifications', this.notifications);
    });
  }

  // message maker
  processNotifications() {

    this.notifications.forEach((notif, index) => {
      console.log();

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

      if (index === (this.notifications.length - 1)) {
        console.log('last', this.notifications[index]);
        // return this.notifications;
      }
    });

  }

  /**
   * Marking notification as read
   * @Param: notification id
   */
  markAsRead(notificationId: string) {
    console.log(notificationId);
  }

  ngOnInit() { }

}
