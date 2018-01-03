import { Component, Directive, OnInit, HostListener, Renderer, ElementRef, HostBinding } from '@angular/core';
import { ModalService } from '../modal/modal.component.service';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag, UserCard, ProfileCards } from '../../models/profile.model';
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
import { Profile } from 'selenium-webdriver/firefox';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  providers: [ ModalService ],
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {

  topNav: any;
  imageBaseUrl: string  = environment.API_IMAGE;
  profileState$: Observable<ProfileModal>;
  activeProfileState = initialTag;
  profileType: string;
  isProfileSet = false;
  profilerOwnersUsername: string;
  profile_details: any;
  showCreateOrg = false;
  

  // userCard: UserCard;
  userCards: ProfileCards;

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
      profile: { open: false },
    };

    this.profileState$ = this.store.select('profileTags');

    /* Profile state */
    this.profileState$.subscribe((state) => {
      this.activeProfileState = state;
      this.userCards = this.activeProfileState['profile_cards'];
      if (this.userCards
        && this.userCards['other']
        && this.userCards['other']['username']
        && this.userCards['active']
        && this.userCards['active']['username']
        && this.userCards['other']['username'] === this.userCards['active']['username']
      ) {
        this.showCreateOrg = true;
      }
    });

    // if logged in user then get details
    if (localStorage.getItem('currentUser') != null) {
      console.log('logged in user');
      /* profile state */
      this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });

      /** -- NOTIFICATIONS -- **/
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
    } else {
      console.log('guest user');
    }

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

  /**
   * On init
   */
  ngOnInit() {

    const profileType = localStorage.getItem('profileType') || 'profile';

    this.store.select('profileTags')
    .first(profile => profile['profile_navigation_details'].name )
    .subscribe( data => {
      this.isProfileSet = true;
    });

  }

  toggleNav(name: string) {
    return ;
  }

  /**
   * Swap Organization with Profile
   */
  changeProfile(user_cards: any, e: MouseEvent) {
    this.store.dispatch({ type: ProfileActions.CHANGE_PROFILE, payload: user_cards });
    return false;
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
   * @Param: list of notification ids
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

}
