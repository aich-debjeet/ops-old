import { Component, Directive, OnInit, HostListener, Renderer, ElementRef, HostBinding } from '@angular/core';
import { ModalService } from '../modal/modal.component.service';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../models/profile.model';
import { Organization } from '../../models/organization.model';

import { LocalStorageService } from './../../services/local-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  profileState$: Observable<ProfileModal>;
  activeProfileState = initialTag;
  profileType: string;
  isProfileSet = false;
  profilerOwnersUsername: string;

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
    public generalHelper: GeneralUtilities,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {

    this.topNav = {
      status: { open: false },
      channel: { open: false },
      search: { open: false },
      notification: { open: false },
      message: { open: false },
      profile: { open: false }
    };

    this.baseUrl = environment.API_IMAGE;
    this.profileState$ = this.store.select('profileTags');

    /* profile state */
    this.profileState$.subscribe((state) => {
      this.activeProfileState = state;
      // console.log('profile state', state);

      if (!this.isProfileSet && state && state.profile_navigation_details && state.profile_navigation_details.profileImage) {
        this.isProfileSet = true;
        // check for account type in localStorage
        if (localStorage.getItem('active_profile') === null) {
          this.profileType = 'user';
          this.setProfileToUser();
        } else {
          const localStore = JSON.parse(localStorageService.theAccountStatus);
          if (localStore.profileType === 'org') {
            this.profileType = 'org';
          } else {
            this.profileType = 'user';
            this.setProfileToUser();
          }
        }
      }
      console.log('this.profileType', this.profileType);

    });
    /* profile state */

    this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });

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

  setProfileToOrg() {
    let orgHandle, orgUsername;
    if (this.activeProfileState && this.activeProfileState['profile_navigation_details']['organization']['organizationUserName']) {
      orgUsername = this.activeProfileState['profile_navigation_details']['organization']['organizationUserName'];
      orgHandle = this.activeProfileState['profile_navigation_details']['organization']['organizationHandle'];
    }
    this.profileType = 'org';
    this.localStorageService.theAccountStatus = JSON.stringify({
      profileType: 'org',
      handle: orgHandle,
      username: orgUsername,
      ownersUsername: this.activeProfileState['profile_navigation_details']['username']
    });
    this.profilerOwnersUsername = this.activeProfileState['profile_navigation_details']['username'];
    this.store.dispatch({ type: OrganizationActions.ORG_PROFILE, payload: orgUsername });
    // this.store.dispatch({ type: OrganizationActions.ORG_PROFILE_DETAILS, payload: orgUsername });
    // this.router.navigate(['org/page']);
  }

  setProfileToUser() {
    let userHandle, usersUsername;
    if (this.activeProfileState && this.activeProfileState['profile_navigation_details'] && this.activeProfileState['profile_navigation_details']['username'] && this.activeProfileState['profile_navigation_details']['handle']) {
      usersUsername = this.activeProfileState['profile_navigation_details']['username'];
      userHandle = this.activeProfileState['profile_navigation_details']['handle'];
    }
    this.profileType = 'user';
    this.localStorageService.theAccountStatus = JSON.stringify({
      profileType: 'user',
      handle: userHandle,
      username: usersUsername
    });
    this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
    // this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });
    // this.router.navigate(['profile/user']);
  }

}
