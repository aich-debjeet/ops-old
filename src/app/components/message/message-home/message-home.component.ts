import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, AfterContentInit, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from './../../../../environments/environment';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MessageModal } from './../../../models/message.model';
import { ProfileModal } from './../../../models/profile.model';
import { MessageActions } from './../../../actions/message.action';
import { PusherService } from './../../../services/pusher.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-message-home',
  templateUrl: './message-home.component.html',
  styleUrls: ['./message-home.component.scss']
})
export class MessageHomeComponent implements OnInit, AfterContentInit {

  // @ViewChild('inputMessageText') inputMessageText;
  @ViewChild('chatWindow') private chatWindowContainer: ElementRef;

  imageBaseUrl = environment.API_IMAGE;
  selectedUser: any;
  messangerList = [];
  conversation = [];
  messageText = '';
  messageState$: Observable<MessageModal>;
  messageState: any;
  showPreloader = false;
  profileState$: Observable<ProfileModal>;
  profileState: any;
  pagination: any;
  disableScroll = false;
  isConversationSelected = false;
  enableScrollBottom = true;
  msgUserSearch = new FormControl();
  isSearching = false;
  enableMsgInput = false;

  constructor(
    private messageStore: Store<MessageModal>,
    private profileStore: Store<ProfileModal>,
    private pusherService: PusherService
  ) {
    this.selectedUser = {};
    this.pagination = {
      pageNumber: 0,
      recordsPerPage: 20
    };

    this.profileState$ = this.profileStore.select('profileTags');
    this.profileState$.subscribe((state) => {
      this.profileState = state;
    });

    this.messageState$ = this.messageStore.select('messageTags');
    this.messageState$.subscribe((state) => {
      this.messageState = state;
      // console.log('this.messageState', this.messageState);

      if (this.messageState && this.messageState['messanger_list_data']) {
        this.messangerList = this.messageState['messanger_list_data'];

        this.selectLatestConversation();
      }

      if (this.messageState && this.messageState['load_conversation_data']) {
        this.conversation = this.messageState['load_conversation_data'];
        console.log('this.conversation', this.conversation);
        if (this.conversation.length > 0) {
          this.enableTextMessage();
        }
      }

      if (this.messageState
        && this.messageState['loading_conversation'] === false
        && this.messageState['loading_conversation_success'] === true
      ) {
        // hide preloader
        // this.showPreloader = false;

        // check if initial set of the conversation, if yes then scroll to the last mesage in the conversation
        if (this.enableScrollBottom) {
          // setTimeout(() => { this.scrollToBottom(); }, 200);
          this.enableScrollBottom = false;
        }
      }

      if (this.messageState
        && this.messageState['message_searching_user'] === false
        && this.messageState['message_searching_user_success'] === true
      ) {
        this.isSearching = false;
      }

      if (this.messageState
        && this.messageState['loading_conversation'] === true
        && this.messageState['loading_conversation_success'] === false
      ) {
        // show preloader
        // this.showPreloader = true;
      }
    });

    // fetch logged in user messanger list
    this.messageStore.dispatch({
      type: MessageActions.GET_MESSANGER_LIST,
      payload: null
    });
  }

  /**
   * initialize listeners on view available
   */
  ngOnInit() {

    // pusher message listener
    this.pusherService.messagesChannel.bind('New-Message', (data) => {
      const message = JSON.parse(data);
      console.log('New-Message', message);

      // check if it's a network request
      if (message && message['isNetworkRequest'] && message['isNetworkRequest'] === true) {
        console.log('Network Request');

        // append creat and append the new object to the user listing
        // prepafing listing object
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
        // setTimeout(() => {
        //   this.selectLatestConversation();
        // }, 200);
      } else {
        console.log('NOT a Network Request');
        this.messageStore.dispatch({
          type: MessageActions.ADD_PUSHER_MESSAGE,
          payload: message
        });
      }
    });

    // pusher notifications listener
    this.pusherService.notificationsChannel.bind('Message-Typing', (user) => {
      console.log(user);
    });

    // search user input listener
    this.msgUserSearch.valueChanges
    .debounceTime(500)
    .subscribe(() => {
      // console.log('search: ', this.msgUserSearch.value);
      if (this.msgUserSearch.value.length === 0) {
        this.isSearching = true;
        // fetch logged in user messanger list
        this.messageStore.dispatch({
          type: MessageActions.GET_MESSANGER_LIST,
          payload: null
        });
      } else {
        this.isSearching = true;
        // fetch messanger lsit as per query
        this.messageStore.dispatch({
          type: MessageActions.MESSAGE_SEARCH_USER,
          payload: this.msgUserSearch.value
        });
      }
    });
  }

  /**
   * choose latest conversation from the user listing
   */
  selectLatestConversation() {
    if (!this.isConversationSelected && this.messangerList[0] !== undefined) {
      this.selectUser(this.messangerList[0]);
      this.isConversationSelected = true;
    }
  }

  /**
   * scroll bottom the chat window on sending the new message
   */
  ngAfterContentInit() {
    // this.scrollToBottom();
  }

  /**
   * Check if user is selected or not
   */
  isUserSelected() {
    if (this.selectedUser && JSON.stringify(this.selectedUser) === '{}') {
      return false;
    }
    return true;
  }

  /**
   * trigger dispatch to load conversation with the user asked
   */
  selectUser(userObj: any) {
    this.disableTextMessage();
    this.selectedUser = userObj;
    this.conversation = [];

    // create user channel to emit typing indication
    this.pusherService.createUserChannel(userObj);

    // load selected users conversation
    this.messageStore.dispatch({ type: MessageActions.RESET_CONVERSATION_STATE });

    // reset pagination
    this.pagination = {
      pageNumber: 0,
      recordsPerPage: 20
    };

    // initial pagination on use selection
    const pagination = this.paginateConversation();

    // load selected users conversation
    this.messageStore.dispatch({
      type: MessageActions.LOAD_CONVERSATION,
      payload: {
        handle: userObj.handle,
        pagination: pagination,
        lastMessage: { id: '' }
      }
    });
  }

  deselectUser() {
    this.selectedUser = {};
    this.conversation = [];
  }

  /**
   * action send message
   */
  sendMessage() {
    let loggedUsersImage = 'avatars/user-avatar-male.png';
    if (this.profileState
      && this.profileState['profile_cards']
      && this.profileState['profile_cards']['active']
      && this.profileState['profile_cards']['active']['image']
    ) {
      loggedUsersImage = this.profileState['profile_cards']['active']['image']
    }

    let loggedUsersHandle = '';
    if (this.profileState
      && this.profileState['profile_cards']
      && this.profileState['profile_cards']['active']
      && this.profileState['profile_cards']['active']['handle']
    ) {
      loggedUsersHandle = this.profileState['profile_cards']['active']['handle']
    }

    const message = {
      to: this.selectedUser.handle,
      by: loggedUsersHandle,
      subject: this.messageText,
      content: this.messageText,
      messageType: 'sent',
      profileImage: loggedUsersImage,
      time: Date.now()
    }

    this.messageStore.dispatch({
      type: MessageActions.SEND_MESSAGE,
      payload: message
    });

    this.messageText = '';
  }

  /**
   * scroll to the bottom of chat window
   */
  scrollToBottom() {
    // console.log('scrollToBottom');
    if (this.chatWindowContainer && this.chatWindowContainer !== undefined) {
      this.chatWindowContainer.nativeElement.scrollTop = this.chatWindowContainer.nativeElement.scrollHeight;
    }
  }

  /**
   * scroll lsitner to check if user reached top then trigger lod more messages
   */
  onChatWindowScroll() {
    const element = this.chatWindowContainer.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    const atTop = element.scrollTop === 0;
    if (atTop) {
      this.disableScroll = true;
      setTimeout(() => {
        this.disableScroll = false;
      }, 2000);

      const pagination = this.paginateConversation();
      // load prev messages
      this.messageStore.dispatch({
        type: MessageActions.LOAD_CONVERSATION,
        payload: {
          handle: this.selectedUser.handle,
          pagination: pagination,
          lastMessage: {
            id: this.conversation[0].id
          }
        }
      });
    }
  }

  /**
   * pagination
   */
  paginateConversation() {
    let convOffset: number;
    if (this.pagination.pageNumber === 0) {
      convOffset = 0;
    } else {
      convOffset = (this.pagination.pageNumber * this.pagination.recordsPerPage);
    }
    this.pagination.pageNumber++;

    const convPaginate = {
      offset: convOffset,
      limit: this.pagination.recordsPerPage
    };
    return convPaginate;
  }

  onScrollDown() {
    // console.log('scrolling down');
  }

  onScrollUp() {
    // console.log('scrolling up');
    if (!this.disableScroll && this.conversation.length > 0) {
      this.disableScroll = true;
      setTimeout(() => {
        this.disableScroll = false;
      }, 2000);
      const pagination = this.paginateConversation();
      // load prev messages
      this.messageStore.dispatch({
        type: MessageActions.LOAD_CONVERSATION,
        payload: {
          handle: this.selectedUser.handle,
          pagination: pagination,
          lastMessage: {
            id: this.conversation[0].id
          }
        }
      });
    }
  }

  userIsTyping(e: any) {
    // console.log('user typing', e.keyCode);
    // if (this.profileState
    //   && this.profileState['profile_cards']
    //   && this.profileState['profile_cards']['active']
    // ) {
    //   // console.log('user', this.profileState['profile_cards']['active']);
    //   // this.pusherService.userChannels[this.selectedUser.handle].trigger('Message-Typing', this.profileState['profile_cards']['active']);
    //   const otherUser = this.pusherService.userChannels[this.selectedUser.handle];
    //   if (otherUser) {
    //     otherUser.trigger('Message-Typing', this.profileState['profile_cards']['active'])
    //   }
    // }

    // send message if enter pressed
    if (e.keyCode === 13) {
      this.sendMessage();
    }
  }

  /**
   * action to take for network request
   */
  networkReqAction(action: string, data: any) {
    const reqParams = {
      receiver_id: data.by,
      status: action
    };
    this.messageStore.dispatch({
      type: MessageActions.NETWORK_REQUEST_ACTION,
      payload: reqParams
    });

    // find the index for changin the newtwork flag
    const index = _.findIndex(this.conversation, ['by', data.by]);
    this.conversation[index].isNetworkRequest = false;

    if (action === 'accept') {
      this.enableTextMessage();
    } else {
      // remove the user from the left side listing
      this.messangerList = _.remove(this.messangerList, (obj) => obj.by === data.by);
      this.deselectUser();
    }
  }

  enableTextMessage() {
    // console.log('enableTextMessage');
    this.enableMsgInput = true;
  }

  disableTextMessage() {
    // console.log('disableTextMessage');
    this.enableMsgInput = false;
  }

}
