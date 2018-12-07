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
  notifyNotif = false;
  notifyMsg = false;
  scrolling = 0;
  scrollingLoad = 100;
  page_start = 1;
  private profSub: ISubscription;
  private notifSub: ISubscription;
  private msgSub: ISubscription;

  // userCard: UserCard;
  userCards: ProfileCards;

  notificationsState$: Observable<Notification>;
  notifState: any;
  notificationIds: any[];
  notifications: any[];

  messagesState$: Observable<MessageModal>;
  msgState: any;
  messages: any[];

  loadedNotifsInitialSet = false;

  constructor(
    private store: Store<ProfileModal>,
    private notificationStore: Store<Notification>,
    private messageStore: Store<MessageModal>,
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
      /* profile state */
      this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
    }
    // observe the store value
    this.notifSub = this.notificationsState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        this.notifState = state;
        if (typeof state['recieved_notifications'] !== 'undefined') {
          const noti = state['recieved_notifications'];
          this.notifications = _uniqBy(noti, noti.notificationId);
          this.processNotifications();
        }
        if (typeof state['marking_as_read_response'] !== 'undefined') {
          // upadte notification as marked
          this.updateNotifications();
        }
      }
    });

    this.messagesState$ = this.messageStore.select('messageTags');
    this.msgSub = this.messagesState$.subscribe((state) => {
      this.msgState = state;
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
    this.notifyNotif = false;
    if (!this.loadedNotifsInitialSet) {
      this.loadedNotifsInitialSet = true;
      this.loadNotifsInitialSet();
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
   * add new notification to the state
   */
  addNewNotif(data) {
    this.notifyNotif = true;
    this.notificationStore.dispatch({
      type: NotificationActions.ADD_PUSHER_NOTIFICATION,
      payload: JSON.parse(data)
    });
  }

  /**
   * On init
   */
  ngOnInit() {
    // check if this.pusherService available
    if (this.pusherService) {

      // check if notif channel exist
      if (this.pusherService.notificationsChannel) {
        this.pusherService.notificationsChannel.bind('Following', (data) => {
          this.addNewNotif(data);
        });
        this.pusherService.notificationsChannel.bind('Media_Spot', (data) => {
          this.addNewNotif(data);
        });
        this.pusherService.notificationsChannel.bind('Blog_Spot', (data) => {
          this.addNewNotif(data);
        });
        this.pusherService.notificationsChannel.bind('Status_Spot', (data) => {
          this.addNewNotif(data);
        });
        this.pusherService.notificationsChannel.bind('Blog_Comments', (data) => {
          this.addNewNotif(data);
        });
        this.pusherService.notificationsChannel.bind('Status_Comments', (data) => {
          this.addNewNotif(data);
        });
        this.pusherService.notificationsChannel.bind('Network_Sent', (data) => {
          this.addNewNotif(data);
        });
        this.pusherService.notificationsChannel.bind('Network_Accepted', (data) => {
          this.addNewNotif(data);
        });
      }

      // check if message channels exist
      if (this.pusherService.messagesChannel) {
        // pusher message listener
        this.pusherService.messagesChannel.bind('New-Message', (data) => {
          // show blue tick as a notification for new message
          this.notifyMsg = true;
          const message = JSON.parse(data);
          // check if it's a network request
          if (message && message['isNetworkRequest'] && message['isNetworkRequest'] === true) {
            // append the new object to the user listing
            const newListObj = {
              handle: message.by,
              isBlocked: false,
              isRead: message.isRead,
              latestMessage: message.content,
              messageType: 'received',
              name: message.name,
              profileImage: message.profileImage,
              time: message.time,
              username: message.username
            };
            this.messageStore.dispatch({
              type: MessageActions.PREPEND_ELEMENT_TO_USER_LIST,
              payload: newListObj
            });
          } else {
            this.messageStore.dispatch({
              type: MessageActions.ADD_PUSHER_MESSAGE,
              payload: message
            });
          }
          setTimeout(() => {
            this.generalHelper.filter({
              component: 'MessageHomeComponent',
              action: 'scrollToBottom'
            });
          }, 20);
        });
      }

    }

    document.body.scrollTop = 0;
    const profileType = localStorage.getItem('profileType') || 'profile';
    this.store.select('profileTags')
      .first(profile => profile['profile_navigation_details'].handle)
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

  /**
   * redirect to message to load the conversation
   * @param message
   */
  openConversation(msg: any) {
    this.router.navigate(['/message'], { queryParams: { handle: msg.handle }});
  }

  toggleNav(name: string) {
    return;
  }

  loadNotifsInitialSet() {
    console.log('loadNotifsInitialSet');
    const data = {
      notificationType: 'all',
      limit: 10,
      offset: 0
    }
    this.notificationStore.dispatch({ type: NotificationActions.GET_NOTIFICATIONS_BY_TYPE, payload: data });
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
    if (this.notifications.length > 0) {
      for (let i = 0; i < this.notifications.length; i++) {
        switch (this.notifications[i].notificationType) {
          case 'Following':
            this.notifications[i].message =  ' has started following you';
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
        this.loadNotifsInitialSet();
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
    this.notifyMsg = false;
    if (!this.messages) {
      this.loadMessages();
    }
  }

  loadMessages() {
    this.messageStore.dispatch({ type: MessageActions.GET_MESSANGER_LIST, payload: null });
  }

}
