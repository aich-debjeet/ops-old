import { Component, Directive, OnInit, HostListener, Renderer, ElementRef, HostBinding } from '@angular/core';
import { ModalService } from '../modal/modal.component.service';
import { Store } from '@ngrx/store';

import { ProfileModal, initialTag } from '../../models/profile.model';
import { Notification } from './../../models/notification.model';

// action
import { ProfileActions } from '../../actions/profile.action';
import { NotificationActions } from './../../actions/notification.action';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  providers: [ ModalService ],
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {

  topNav: any;

  baseUrl: string;
  showMenu: boolean;
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  userProfile = initialTag;

  // notitfications array
  notificationsState$: Observable<Notification>;
  notificationIds: any[];
  notifications: any[];

  constructor(
    private store: Store<ProfileModal>,
    private notificationStore: Store<Notification>,
    public modalService: ModalService,
    private el: ElementRef,
    private renderer: Renderer
  ) {

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

    this.topNav = {
      status: { open: false },
      channel: { open: false },
      search: { open: false },
      notification: { open: false },
      message: { open: false },
      profile: { open: false }
    };

    this.baseUrl = environment.API_IMAGE;
    this.tagState$ = this.store.select('profileTags');

    this.tagState$.subscribe((state) => {
      this.userProfile = state;
    });

    this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
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
    this.notificationIds = [notificationId];
    console.log('this.notificationIds', this.notificationIds);
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
      self.dispatchReadNotifications();
    });
  }

  /**
   * Add Media
   */
  addMedia() {
    this.modalService.open('AddMedia');
  }

  /**
   * Create channel
   */
  createChannel() {
    this.modalService.open('CreateChannel');
  }

  /**
   * Create a community
   */
  createCommunity() {
    //
  }

  ngOnInit() {
  }

  toggleNav(name: string) {
    return ;
  }

}

