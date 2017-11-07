import { Component, Directive, OnInit, HostListener, Renderer, ElementRef, HostBinding } from '@angular/core';
import { ModalService } from '../modal/modal.component.service';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../models/profile.model';
import { Organization, initialOrganization } from '../../models/organization.model';

// action
import { ProfileActions } from '../../actions/profile.action';
import { OrganizationActions } from '../../actions/organization.action';
import { NotificationActions } from './../../actions/notification.action';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../../environments/environment';

import { _ } from 'lodash';
import { GeneralUtilities } from '../../helpers/general.utils';

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
  orgState$: Observable<Organization>;
  private tagStateSubscription: Subscription;
  userProfile = initialTag;
  orgProfile;
  profileType: string;

  /* ========================== notification ========================== */
  notificationsState$: Observable<Notification>;
  notificationIds: any[];
  notifications: any[];
  /* ========================== notification ========================== */

  constructor(
    private store: Store<ProfileModal>,
    private notificationStore: Store<Notification>,
    public modalService: ModalService,
    private el: ElementRef,
    private renderer: Renderer,
    public generalHelper: GeneralUtilities
  ) {

    this.topNav = {
      status: { open: false },
      channel: { open: false },
      search: { open: false },
      notification: { open: false },
      message: { open: false },
      profile: { open: false }
    };

    // check for account type in localStorage
    if (localStorage.getItem('accountStatus') === null) {
      this.profileType = 'user';
      localStorage.setItem('accountStatus', JSON.stringify({ 'profileType': 'user' }));
    } else {
      const localStore = JSON.parse(localStorage.getItem('accountStatus'));
      if (localStore.profileType === 'org') {
        this.profileType = 'org';
        this.switchToOrg(localStore.handle);
      } else {
        this.profileType = 'user';
      }
    }
    console.log('this.profileType', this.profileType);

    this.baseUrl = environment.API_IMAGE;
    this.tagState$ = this.store.select('profileTags');

    this.tagState$.subscribe((state) => {
      this.userProfile = state;
      // console.log('this.userProfile in Navigation component', this.userProfile);
    });

    this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });

    /* org state */
    this.orgState$ = this.store.select('organizationTags');
    this.orgState$.subscribe((state) => {
      this.orgProfile = state;
      console.log('this.orgProfile', this.orgProfile);
    });
    /* org state */

    /* ========================== notification ========================== */
    // loading notifications
    this.notificationStore.dispatch({
      type: NotificationActions.LOAD_NOTIFICATIONS,
      payload: null
    });

    this.notificationsState$ = this.notificationStore.select('notificationTags');

    // observe the store value
    this.notificationsState$.subscribe((state) => {
      if (typeof state['recieved_notifications'] !== 'undefined') {
        this.notifications = state['recieved_notifications'];
        this.processNotifications();
      }
      if (typeof state['marking_as_read_response'] !== 'undefined') {
        // upadte notification as marked
        this.updateNotifications();
      }
    });
    /* ========================== notification ========================== */

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


  /* =================================== notification =================================== */
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
    this.notificationStore.dispatch({
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
      self.dispatchReadNotifications();
    });
  }
  /* =================================== notification =================================== */

  // switch to the org
  switchToOrg(handle: string) {

    // // checking if org alreay loaded in the state
    // if (typeof this.orgProfile['orgProfile']['orgProfileDetails'] !== 'undefined') {
    //   this.profileType = 'org';
    //   return;
    // }

    this.profileType = 'org';
    let orgHandle = '';

    // check for org handle
    if (handle) {
      orgHandle = handle;
    } else if (this.userProfile.profileUser.organization.organizationHandle) {
      orgHandle = this.userProfile.profileUser.organization.organizationHandle;
    }

    if (orgHandle !== '') {
      // console.log('org handle found', orgHandle);
      this.store.dispatch({ type: OrganizationActions.LOAD_ORGANIZATION, payload: orgHandle });
    }

  }

  switchToUser() {
    this.profileType = 'user';
    localStorage.setItem('accountStatus', JSON.stringify({ 'profileType': 'user' }));
    // this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
  }

}
