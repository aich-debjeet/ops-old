import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MessageModal } from '../../models/message.model';
import { ProfileModal } from '../../models/profile.model';
import { MessageActions } from '../../actions/message.action';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewInit {

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
  disableChatWindowScroll = false;

  profileState$: Observable<ProfileModal>;
  profileState: any;

  constructor(
    private messageStore: Store<MessageModal>,
    private profileStore: Store<ProfileModal>
  ) {
    this.selectedUser = {};
    // this.selectedUser = {
    //   username: 'abhijeet'
    // };

    this.profileState$ = this.profileStore.select('profileTags');
    this.profileState$.subscribe((state) => {
      this.profileState = state;
    });

    this.messageState$ = this.messageStore.select('messageTags');
    this.messageState$.subscribe((state) => {
      this.messageState = state;
      // console.log('this.messageState', this.messageState);

      if (this.messageState && this.messageState['get_messanger_list_data']) {
        this.messangerList = this.messageState['get_messanger_list_data'];
      }

      if (this.messageState && this.messageState['load_conversation_data']) {
        this.conversation = this.messageState['load_conversation_data'];
        // console.log('this.conversation', this.conversation);
      }

       if (this.messageState
        && this.messageState['loading_conversation'] === false
        && this.messageState['loading_conversation_success'] === true
      ) {
        // hide preloader
        this.showPreloader = false;
        // fetch logged in user messages
        // this.messageStore.dispatch({
        //   type: MessageActions.GET_MESSANGER_LIST,
        //   payload: null
        // });
        // console.log('update list');
      }

      if (this.messageState
        && this.messageState['loading_conversation'] === true
        && this.messageState['loading_conversation_success'] === false
      ) {
        // show preloader
        this.showPreloader = true;
      }
    });

    // fetch logged in user messages
    this.messageStore.dispatch({
      type: MessageActions.GET_MESSANGER_LIST,
      payload: null
    });
  }

  ngOnInit() { }

  ngAfterViewInit() {
    // this.inputMessageText.valueChanges
    // .debounceTime(1000)
    // .subscribe(() => {
    //   console.log('make a reuqet', this.messageText);
    // });
    this.scrollToBottom();
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

    this.selectedUser = userObj;
    this.conversation = [];

    this.messageStore.dispatch({
      type: MessageActions.LOAD_CONVERSATION,
      payload: userObj.handle
    });
  }

  sendMessage() {
    console.log('profile state', this.profileState);

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

    console.log('message obj', message);

    this.messageStore.dispatch({
      type: MessageActions.SEND_MESSAGE,
      payload: message
    });

    this.messageText = '';
  }

  scrollToBottom() {
    if (this.chatWindowContainer && this.chatWindowContainer !== undefined) {
      this.chatWindowContainer.nativeElement.scrollTop = this.chatWindowContainer.nativeElement.scrollHeight;
    }
  }

  onChatWindowScroll() {
    const element = this.chatWindowContainer.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    if (this.disableChatWindowScroll && atBottom) {
      this.disableChatWindowScroll = false;
    } else {
      this.disableChatWindowScroll = true;
    }
  }

}
