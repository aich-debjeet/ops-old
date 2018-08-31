import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from '../modal/modal.component.service';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag, UserCard, ProfileCards } from '../../models/profile.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UtcDatePipe } from './../../pipes/utcdate.pipe';
import { ProfileActions } from '../../actions/profile.action';
import { NotificationActions } from './../../actions/notification.action';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { environment } from '../../../environments/environment';
import { uniqBy as _uniqBy } from 'lodash';
import { GeneralUtilities } from '../../helpers/general.utils';
import { PusherService } from '../../services/pusher.service';
import { MessageActions } from '../../actions/message.action';
import { MessageModal } from '../../models/message.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ModalService, UtcDatePipe],
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit, OnDestroy {

  topNav: any;
  imageBaseUrl: string = environment.API_IMAGE;
  profileState$: Observable<ProfileModal>;
  activeProfileState = initialTag;
  profileType: string;
  isProfileSet = false;
  profilerOwnersUsername: string;
  profile_details: any;
  showCreateOrg = false;
  redirectedToCreatedOrg = false;
  notify = false;
  scrolling = 0;
  scrollingLoad = 100;
  page_start = 1;
  private profSub: ISubscription;
  private notifSub: ISubscription;
  private msgSub: ISubscription;

  // userCard: UserCard;
  userCards: ProfileCards;

  /* ========================== notification ========================== */
  notificationsState$: Observable<Notification>;
  notificationIds: any[];
  notifications: any[];
  /* ========================== notification ========================== */

  /* ========================== notification ========================== */
  messagesState$: Observable<MessageModal>;
  messages: any[];
  /* ========================== notification ========================== */

  constructor(
    private store: Store<ProfileModal>,
    private notificationStore: Store<Notification>,
    private msgStore: Store<MessageModal>,
    public modalService: ModalService,
    public generalHelper: GeneralUtilities,
    private router: Router,
    private pusherService: PusherService
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
    this.notificationsState$ = this.notificationStore.select('notificationTags');

    /* Profile state */
    this.profSub = this.profileState$.subscribe((state) => {
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
      } else {
        // if org just cerated switch the profile and redirect to the org profile
        if (!this.redirectedToCreatedOrg) {
          if (state && state['org_registration_success'] && state['org_registration_success'] === true) {
            this.redirectedToCreatedOrg = true;
            this.changeProfile(this.userCards, null);
            this.router.navigateByUrl('/org/page/profile');
            this.store.dispatch({ type: ProfileActions.ORG_REG_SUCCESS_RESET });
          }
        } else {
          // console.log('not yet switching');
        }
      }
    });

    // if logged in user then get details
    if (localStorage.getItem('currentUser') != null) {
      // console.log('logged in user');
      /* profile state */
      this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
    }
    // observe the store value
    this.notifSub = this.notificationsState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        // if(typeof state['recieved_pushed_notifications_success']) {
        // }
        if (typeof state['recieved_notifications'] !== 'undefined') {
          let noti;
          noti = state['recieved_notifications'];
          // console.log(noti)
          this.notifications = _uniqBy(noti, noti.notificationId);
          // console.log(this.notifications)
          this.processNotifications();
        }
        if (typeof state['marking_as_read_response'] !== 'undefined') {
          // upadte notification as marked
          this.updateNotifications();
        }
      }
    });

    this.messagesState$ = this.msgStore.select('messageTags');
    this.msgSub = this.messagesState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        if (typeof state['messanger_list_data'] !== 'undefined') {
          this.messages = state['messanger_list_data'];
        }
      }
    });
  }

  /**
   * Add Media
   */
  addMedia() {
    this.modalService.open('AddMedia');
  }

  notificationPopup() {
    this.loadNotifications();
    if (this.notify) {
      this.notify = false;
    }
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
    // this.loadNotifications();
    this.pusherService.notificationsChannel.bind('Following', (message) => {
      // console.log(message)
      this.notify = true;
      this.notificationStore.dispatch({
        type: NotificationActions.ADD_PUSHER_NOTIFICATIONS,
        payload: JSON.parse(message)
      });
    });
    this.pusherService.notificationsChannel.bind('Media_Spot', (message) => {
      // console.log(message)
      this.notify = true;
      this.notificationStore.dispatch({
        type: NotificationActions.ADD_PUSHER_NOTIFICATIONS,
        payload: JSON.parse(message)
      });
    });
    this.pusherService.notificationsChannel.bind('Blog_Spot', (message) => {
      // console.log(message)
      this.notify = true;
      this.notificationStore.dispatch({
        type: NotificationActions.ADD_PUSHER_NOTIFICATIONS,
        payload: JSON.parse(message)
      });
    });
    this.pusherService.notificationsChannel.bind('Status_Spot', (message) => {
      // console.log(message)
      this.notify = true;
      this.notificationStore.dispatch({
        type: NotificationActions.ADD_PUSHER_NOTIFICATIONS,
        payload: JSON.parse(message)
      });
    });
    this.pusherService.notificationsChannel.bind('Media_Comments', (message) => {
      // console.log(message)
      this.notify = true;
      this.notificationStore.dispatch({
        type: NotificationActions.ADD_PUSHER_NOTIFICATIONS,
        payload: JSON.parse(message)
      });
    });
    this.pusherService.notificationsChannel.bind('Blog_Comments', (message) => {
      // console.log(message)
      this.notify = true;
      this.notificationStore.dispatch({
        type: NotificationActions.ADD_PUSHER_NOTIFICATIONS,
        payload: JSON.parse(message)
      });
    });
    this.pusherService.notificationsChannel.bind('Status_Comments', (message) => {
      // console.log(message)
      this.notify = true;
      this.notificationStore.dispatch({
        type: NotificationActions.ADD_PUSHER_NOTIFICATIONS,
        payload: JSON.parse(message)
      });
    });
    this.pusherService.notificationsChannel.bind('Network_Sent', (message) => {
      // console.log(message)
      this.notify = true;
      this.notificationStore.dispatch({
        type: NotificationActions.ADD_PUSHER_NOTIFICATIONS,
        payload: JSON.parse(message)
      });
    });
    this.pusherService.notificationsChannel.bind('Network_Accepted', (message) => {
      //  console.log(message)
      this.notify = true;
      this.notificationStore.dispatch({
        type: NotificationActions.ADD_PUSHER_NOTIFICATIONS,
        payload: JSON.parse(message)
      });
    });
    document.body.scrollTop = 0;

    const profileType = localStorage.getItem('profileType') || 'profile';

    this.store.select('profileTags')
      .first(profile => profile['profile_navigation_details'].name)
      .subscribe(data => {
        this.isProfileSet = true;
      });
  }

  /**
   * Open respective link
   */
  openLink(notification: any) {
    switch (notification.notificationType) {
      case 'Media_Spot':
        this.router.navigate([{ outlets: { media: ['media', notification.media.mediaId] } }]);
        break;

      case 'Media_Comments':
        this.router.navigate([{ outlets: { media: ['media', notification.media.mediaId] } }]);
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

      case 'Network_Accepted':
        this.router.navigate(['/profile/network']);
        break;
    }
  }

  toggleNav(name: string) {
    return;
  }

  loadNotifications() {
    const data = {
      limit: 10,
      page: 0
    }
    this.notificationStore.dispatch({ type: NotificationActions.GET_NOTIFICATIONS, payload: data });
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

        case 'Following':
          this.notifications[index]['message'] = '@' + notif.username + ' has started following you';
          break;

        case 'Network_Sent':
          this.notifications[index]['message'] = ' sent you a network request';
          break;

        case 'Network_Accepted':
          this.notifications[index]['message'] = ' accepted your network request';
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
   * Marking all notifications as read
   */
  markAllAsRead() {
    this.notificationStore.dispatch({ type: NotificationActions.MARK_AS_ALL_READ });
    this.store.select('notificationTags')
      .first(notification => notification['mark_as_all_read_success'] === true)
      .subscribe(data => {
        this.loadNotifications();
      });
  }

  logoutSubmit() {
    this.router.navigate(['/logout'], { skipLocationChange: true });
  }

  ngOnDestroy() {
    this.profSub.unsubscribe();
    this.notifSub.unsubscribe();
    this.msgSub.unsubscribe();
  }

  messagePopup() {
    this.loadMessages();
  }

  loadMessages() {
    this.msgStore.dispatch({ type: MessageActions.GET_MESSANGER_LIST, payload: null });
  }

}
