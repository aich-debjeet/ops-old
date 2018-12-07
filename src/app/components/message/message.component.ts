import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef, AfterViewChecked } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from './../../../environments/environment';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { MessageModal } from './../../models/message.model';
import { ProfileModal } from './../../models/profile.model';
import { MessageActions } from './../../actions/message.action';
import { PusherService } from './../../services/pusher.service';

import { findIndex as _findIndex } from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { GeneralUtilities } from '../../helpers/general.utils';
import { Subscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnDestroy, AfterViewChecked {

  // @ViewChild('inputMessageText') inputMessageText;
  @ViewChild('chatWindow') private chatWindowContainer: ElementRef;

  imageBaseUrl = environment.API_IMAGE;
  selectedUser: any;
  messangerList = [];
  conversation = [];
  messageText = '';
  messageState$: Observable<MessageModal>;
  // messageState: any;
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
  isTyping = false;
  chatScrollBottom = true;
  convUserHandle: any;
  conversationLoaded = false;
  markedUsers = [];
  markedAll = false;
  noRecordsFound = false;

  profSub: Subscription;
  msgSub: Subscription;
  gUtilsSub: Subscription;
  msgUserSearchSub: Subscription;

  constructor(
    private messageStore: Store<MessageModal>,
    private profileStore: Store<ProfileModal>,
    private pusherService: PusherService,
    private activatedRoute: ActivatedRoute,
    private gUtils: GeneralUtilities,
    private toastr: ToastrService
  ) {
    this.gUtilsSub = this.gUtils.listen().subscribe((e: any) => {
      if (e.component && e.component === 'MessageHomeComponent' && e.action === 'scrollToBottom') {
        this.scrollToBottom();
      }
    })
    this.selectedUser = {};
    this.pagination = {
      pageNumber: 0,
      recordsPerPage: 20
    };

    this.profileState$ = this.profileStore.select('profileTags');
    this.profSub = this.profileState$.subscribe((state) => {
      this.profileState = state;
    });

    this.messageState$ = this.messageStore.select('messageTags');
    this.msgSub = this.messageState$.subscribe((state) => {
      // this.messageState = state;
      if (state) {
        if (state['messanger_list_data']) {
          this.messangerList = state['messanger_list_data'];
          // console.log('this.messangerList', this.messangerList);
          if (!this.conversationLoaded) {
            // console.log('load conversation now');
            if (this.convUserHandle && this.convUserHandle.length > 0) {
              // console.log('load conversation for: ', this.convUserHandle);
              const userIndex = _findIndex(this.messangerList, ['handle', this.convUserHandle]);
              // find the handle into the messanger list to load the conversation
              if (userIndex) {
                // console.log('user found');
                this.selectUser(this.messangerList[userIndex]);
              } else {
                // console.log('user NOT found, loading latest conversation');
                this.selectLatestConversation();
              }
            } else {
              // console.log('load latest conversation');
              this.selectLatestConversation();
            }
            this.conversationLoaded = true;
          } else {
            // console.log('conversation already loaded');
          }
        }
        if (state['load_conversation_data']) {
          this.conversation = state['load_conversation_data'];
          if (this.conversation.length > 0) {
            if (this.conversation[this.conversation.length - 1].isNetworkRequest === false) {
              this.enableTextMessage();
            }
          } else {
            // this.disableTextMessage();
          }
        }
        if (state['loading_conversation'] === false && state['loading_conversation_success'] === true) {
          // check if initial set of the conversation, if yes then scroll to the last message in the conversation
          if (this.enableScrollBottom) {
            this.enableScrollBottom = false;
          }
        }
        if (state['message_searching_user'] === false && state['message_searching_user_success'] === true) {
          this.isSearching = false;
        }
        if (state['loading_conversation'] === true && state['loading_conversation_success'] === false) {
          // show preloader
          this.showPreloader = true;
          this.noRecordsFound = false;
        }
        if (state['loading_conversation'] === false && state['loading_conversation_success'] === true) {
          // hide preloader
          this.showPreloader = false;
          if (this.conversation.length > 0) {
            this.noRecordsFound = false;
          } else {
            this.noRecordsFound = true;
          }
        }
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
    this.convUserHandle = this.activatedRoute.snapshot.queryParams['handle'];
    if (this.pusherService.notificationsChannel) {
      // pusher notifications listener
      this.pusherService.notificationsChannel.bind('Message-Typing', (userDetails) => {
        userDetails = JSON.parse(userDetails);
        if (!this.isTyping && userDetails.handle === this.selectedUser.handle) {
          this.isTyping = true;
          setTimeout(() => {
            this.isTyping = false;
          }, 900);
        }
      });
    }

    // search user input listener
    this.msgUserSearchSub = this.msgUserSearch.valueChanges
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
  ngAfterViewChecked() {
    if (this.conversation.length > 0 && this.chatScrollBottom === true) {
      this.scrollToBottom();
      this.chatScrollBottom = false;
    }
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
    this.showPreloader = true;
    this.conversation = [];
    this.disableTextMessage();
    this.selectedUser = userObj;
    this.chatScrollBottom = true;
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
    if (this.gUtils.checkNestedKey(this.profileState, ['profile_cards', 'active', 'image'])) {
      loggedUsersImage = this.profileState['profile_cards']['active']['image']
    }
    let loggedUsersHandle = '';
    if (this.gUtils.checkNestedKey(this.profileState, ['profile_cards', 'active', 'handle'])) {
      loggedUsersHandle = this.profileState['profile_cards']['active']['handle']
    }

    const message = {
      to: this.selectedUser.handle,
      by: loggedUsersHandle,
      subject: this.messageText,
      content: this.messageText,
      messageType: 'sent',
      isNetworkRequest: false,
      isDeleted: false,
      isRead: true,
      profileImage: loggedUsersImage,
      isSending: true,
      time: Date.now()
    }

    this.messageStore.dispatch({
      type: MessageActions.SEND_MESSAGE,
      payload: message
    });

    this.messageText = '';
    setTimeout(() => {
      this.scrollToBottom();
    }, 20);
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
    if (this.profileState
      && this.profileState['profile_cards']
      && this.profileState['profile_cards']['active']
      && e.keyCode !== 13 // to prevent indication on message sent
    ) {
      // this.messageStore.dispatch({
      //   type: MessageActions.USER_IS_TYPING,
      //   payload: {
      //     loggedInUsersHandle: this.profileState['profile_cards']['active']['handle'],
      //     selectedUsersHandle: this.selectedUser.handle
      //   }
      // });
    }
    // filter emtpy mesage and spaces
    if (!this.messageText.replace(/\s/g, '').length) {
      // string only contained whitespace (ie. spaces, tabs or line breaks)
      return;
    }
    // send message if enter pressed
    if (e.keyCode === 13 && this.messageText !== '') {
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
    const index = _findIndex(this.conversation, ['by', data.by]);
    this.conversation[index].isNetworkRequest = false;

    if (action === 'accept') {
      this.enableTextMessage();
    } else {
      // remove the user from the left side listing
      this.messageStore.dispatch({
        type: MessageActions.NETWORK_REQUEST_DECLINE,
        payload: data
      });
      this.isConversationSelected = false;
    }
  }

  enableTextMessage() {
    this.enableMsgInput = true;
  }

  disableTextMessage() {
    this.enableMsgInput = false;
  }

  deleteMessage(message: any) {
    const delMsg = {
      messageDetails: message,
      messageId: message.id,
      deleteType: 'for_me'
    }
    this.messageStore.dispatch({
      type: MessageActions.DELETE_MESSAGE,
      payload: delMsg
    });
  }

  ngOnDestroy() {
    // unbind pusher listeners
    this.pusherService.messagesChannel.unbind('New-Message');
    this.pusherService.notificationsChannel.unbind('Message-Typing');

    this.msgSub.unsubscribe();
    this.profSub.unsubscribe();
    this.gUtilsSub.unsubscribe();
    this.msgUserSearchSub.unsubscribe();
  }

  actionMarkRead() {

  }

  actionDelete() {
    const reqBody = {
      deleteType: 'clear',
      otherHandle: this.markedUsers
    }
    this.messageStore.dispatch({ type: MessageActions.DELETE_CONVERSATION, payload: reqBody });
    const tempSub = this.messageStore.select('messageTags')
      .take(2)
      .subscribe(resp => {
        if (resp['deletingConversation'] === false && resp['deletedConversation'] === true) {
          this.toastr.success('Conversation deleted successfully', 'Success!');
          this.isConversationSelected = false;
          this.selectLatestConversation();
          tempSub.unsubscribe();
        }
      });
  }

  markUser(event: any, userHandle: string) {
    const idx = this.markedUsers.indexOf(userHandle);
    if (event.target.checked) {
      if (idx === -1) {
        this.markedUsers.push(userHandle);
      }
    } else {
      if (idx !== -1) {
        this.markedUsers.splice(idx, 1)
      }
    }
  }

  markAll(event: any) {
    this.markedUsers = [];
    if (event.target.checked) {
      this.markedAll = true;
      for (let i = 0; i < this.messangerList.length; i++) {
        this.markedUsers.push(this.messangerList[i].handle);
      }
    } else {
      this.markedAll = false;
    }
  }

}
