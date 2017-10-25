import { initialTag } from '../../models/auth.model';
import { of } from 'rxjs/observable/of';
import { Component, Renderer, ViewChild, ElementRef, AfterViewChecked, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageModal, initialMessage} from '../../models/message.model';
// import { UserMessages } from '../../models/user-messages.model';
import { UserSearch } from '../../models/user-search.model';
import { Http, Headers, Response } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SearchNamePipe } from './../../pipes/name.pipe';
import { TokenService } from './../../helpers/token.service';

import { environment } from '../../../environments/environment';

// actions// action
import { ProfileActions } from '../../actions/profile.action';
import { MessageActions } from '../../actions/message.action'
import { UserSearchActions } from '../../actions/user-search.action'

import { ProfileModal } from '../../models/profile.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/from';

import { unionBy as _unionBy } from 'lodash';
import { orderBy as _orderBy } from 'lodash';
import { sortBy as _sortBy } from 'lodash';
import { indexOf as _indexOf } from 'lodash';
import { find as _find } from 'lodash';
import { uniq as _uniq } from 'lodash';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  providers: [ MessageActions ],
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMeBottom') private myScrollContainer: ElementRef;
  msgNav: any;
  selectedView = '';
  userHandle;
  baseUrl: string;
  private apiLink: string = environment.API_ENDPOINT;
  composeMessage = {
    searchUser: '',
    messageToSend: ''
  };
  messageForm: FormGroup;   // formgroup instance
  mForm: FormGroup;         // formgroup instance
  text: string  ;
  searchText: string;
  userO$: Observable<any>;
  currentUserDetails

  messages$: Observable<any>;
  tags = initialMessage;

  selfProfile: any; // users self profile
  listData = []; // temporary variable to store list of handles
  makeIsReadTrue = [];      // contains the list of messages to assign them read value true.
  orderedMessageContacts;   // to present the list of contacts on the left hand side of the message view page
  nonUserProfile;           // to store the entire data of the current selected user
  selectedUser;
  selectedUserHandle;
  selectedUserName;
  mergedMsg = [];      // to contain both sent and received messages of a user
  messagesbytime = []; // to sort messages by time
  recipientsListState: boolean;
  receipientList: any;      // to store the list of receipients

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  constructor(
    fb: FormBuilder,
    private http: Http,
    private messageAction: MessageActions,
    private tokenService: TokenService,
    private messageStore: Store<MessageModal>,
    private profileStore: Store<ProfileModal>
    ) {
    this.baseUrl = environment.API_IMAGE;

    this.msgNav = {
      action: { open: false },
      setting: { open: false },
      name: { open: false}
    };

    this.messageForm = fb.group({
      'message' : [null, Validators.required],
    })
    this.mForm = fb.group({
      'searchUserTerm' : [null, Validators.required],
      'message_term' : [null, Validators.required],
    })
    this.text = '';
    this.recipientsListState = false;
    this.userO$ = profileStore.select('profileTags').take(3);
  }
  ngOnInit() {
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
    this.userO$.subscribe((val) => {
      this.currentUserDetails = val;
      if (typeof this.currentUserDetails.profileUser !== 'undefined') {
      this.userHandle = this.currentUserDetails.profileUser.handle;
      this.initMessaging(this.userHandle);
      }
    });
    this.messages$ = this.messageStore.select('messageTags');
    this.messages$.subscribe((state) => {
      // if state is not empty
      if (state && state.userProfileDetails ) {
        this.selfProfile = state.userProfileDetails;
      }
      if (state && state.nonUserProfileDetails) {
        this.nonUserProfile = state.nonUserProfileDetails;
      }
      if (state && state.receipients) {
        this.receipientList = state.receipients;
      }
    })
  }

  /**
   * This method will get user profile details and also get all the user sent and receive messages
   * @param handle
 */

  initMessaging(handle: string) {
    if (!handle) {
      return false;
    }
    this.messageStore.dispatch({ type: MessageActions.LOAD_USER_PROFILE_DATA, payload: handle });
    setInterval(() => {
      const headers = this.tokenService.getAuthHeader();
      return this.http.get(this.apiLink + '/portal/message/combined/sent/received', { headers: headers })
      .map((data: Response) => data.json())
      .subscribe(response => {
      this.mergedMsg = response;
      this.fetchProfileByHandle(this.mergedMsg)
      });
    }, 10000);
  }

  /**
   *This method will take the merged messages and filter out all the handles of different users to get their user information
   * @param mergedMessages
 */

  fetchProfileByHandle(mergedMessages: any) {
    const headers = this.tokenService.getAuthHeader();
    const data = [];
    if (mergedMessages !== 'undefined') {

      for (let i = 0 ; i < mergedMessages.length; i++) {
         if (!_find(this.listData, (mergedMessages[i].by))) {
          this.listData.push(mergedMessages[i].by)
         }
         if (!_find(this.listData, (mergedMessages[i].to))) {
          this.listData.push(mergedMessages[i].to)
         }
      }

      if (this.listData) {
        this.listData = _uniq(this.listData, 'id');
        const reqBody = { listData: this.listData };
        this.http.post(this.apiLink + '/portal/auth/handleDisplayData', reqBody, { headers: headers })
        .map((response: Response) => response.json())
        .subscribe(response => {
          this.orderProfileMessage(response)
        });
      }
    }
  }

  /**
   *This method will get all the user information according to handles and will filter out the latest message received w.r.t the user and will list out the user with their latest message on the left hand side.
   * @param data
 */

  orderProfileMessage(data: any) {
    if (!data) {
      console.log('no data')
      return false;
    } else {
    const handleDataMap = data;
    const messageContacts = [];
    for (let i = 0; i < this.listData.length; i++) {
      if (handleDataMap[this.listData[i]]) {
        if (this.listData[i] === handleDataMap[this.listData[i]].handle) {
          messageContacts.push( handleDataMap[this.listData[i]])
        }
      }
    }
    /*latest received message will come up*/
    for (let i = 0 ; i < messageContacts.length; i++) {
      if ( messageContacts[i].handle === this.userHandle) {
        /*skipped self profile */
        continue;
      }
      messageContacts[i].isRead = true;
      messageContacts[i].latestmessage = ''
      if ( this.selfProfile.extra.messages.received || this.selfProfile.extra.messages.received !== undefined) {
        let lastReceivedMessageCount;
        for (let j = 0; j < this.selfProfile.extra.messages.received.length; j++) {
          if (messageContacts[i].handle === this.selfProfile.extra.messages.received[j].by) {
            lastReceivedMessageCount = j;
            if (this.selfProfile.extra.messages.received[j].isRead === false) {
              messageContacts[i].isRead = false;
              const isReadList = {
              // message recived by
              handle: this.userHandle,
              // message sender
              sendHandle: messageContacts[i].handle,
              messageId : this.selfProfile.extra.messages.received[j].id,
              isRead : true
            };
            this.makeIsReadTrue.push(isReadList);
            messageContacts[i].latestmessage = this.selfProfile.extra.messages.received[j].content;
            messageContacts[i].latestmessagetime = this.selfProfile.extra.messages.received[j].time;
            messageContacts[i].isLastMessageSentByMe = false;
            } else {
              console.log('message already set isread true..')
            }
          }
        }
        if (!messageContacts[i].latestmessagetime || messageContacts[i].latestmessagetime === '' ) {
          if (lastReceivedMessageCount) {
            messageContacts[i].latestmessage =  this.selfProfile.extra.messages.received[lastReceivedMessageCount].content;
            messageContacts[i].latestmessagetime = this.selfProfile.extra.messages.received[lastReceivedMessageCount].time;
          }
        }
      }
      if (this.selfProfile.extra.messages.sent || this.selfProfile.extra.messages.sent !== undefined) {
        for (let j = 0 ; j < this.selfProfile.extra.messages.sent.length; j++) {
          if (messageContacts[i].handle === this.selfProfile.extra.messages.sent[j].to) {
            if (this.selfProfile.extra.messages.sent[j].time > messageContacts[i].latestmessagetime || messageContacts[i].latestmessagetime === undefined) {
              messageContacts[i].isLastMessageSentByMe = true;
              messageContacts[i].latestmessage = this.selfProfile.extra.messages.sent[j].content;
              messageContacts[i].latestmessagetime = this.selfProfile.extra.messages.sent[j].time;
            }
          }
        }
      }
    }
    this.orderedMessageContacts = _sortBy(messageContacts, function(msg) { return msg.latestmessagetime; }).reverse()
    }
  }

  /**
   *this method is usd to select the view and also to select a particular user to get all its conversation with the logged in user
   * @param tab
   * @param nonUserHandle
 */

  toggleView(tab: any, nonUserHandle: any) {
      // toggle view
    this.selectedView = tab;
    // trigger actions
    if (this.selectedView === 'readMessage') {
      if (nonUserHandle !== this.userHandle) {
        this.messageStore.dispatch({ type: MessageActions.LOAD_NON_USER_PROFILE_DATA, payload: nonUserHandle });
        let indexOfNonUserHandle ;
        for (const i in this.orderedMessageContacts) {
          if (this.orderedMessageContacts[i].handle === nonUserHandle) {
            indexOfNonUserHandle = i;
            break;
          } else {
            console.log('not present')
          }
        }
        this.selectUserData(this.orderedMessageContacts[indexOfNonUserHandle])
      } else {
        console.log(nonUserHandle)
      }
    }
  }

  /**
   *
   *  @param selectUser passing the selected user to mark all its messages read w.r.t the logged in user
 */

  selectUserData(selectUser) {
    const headers = this.tokenService.getAuthHeader();
    selectUser.read = true;
    if (selectUser.isLastMessageSentByMe) {
      selectUser.isLastMessageSentByMe = true;
    }
    this.selectedUser = selectUser.name;
    this.selectedUserHandle = selectUser.handle;
    this.selectedUserName = selectUser.username;
    const list = [];
    // make list of messages to assign them read value true
    for ( let i = 0; i < this.makeIsReadTrue.length; i++) {
      if (this.makeIsReadTrue[i].sendHandle === selectUser.handle) {
        const listOfIsRead = {
          handle: this.userHandle,
          messageId: this.makeIsReadTrue[i].messageId,
          isRead: true
        }
        list.push(listOfIsRead);
      }
    }
    const isReadMessages = {
      list : list
    }
    // make message read
    this.http.put(this.apiLink + '/portal/message/markListRead', isReadMessages, { headers: headers })
    .map((res: Response) => res.json())
    .subscribe(response => {
    this.sortedMessages();
    })
  }

 /**
   *this method will get the conversation between the logged in user and the selected user and will have conversation messages sorted with time
 */

  sortedMessages() {
    if ( this.selectedUserHandle !== this.userHandle) {
      let sortedMessagesByTime = [];
      setInterval(() => {
      const headers = this.tokenService.getAuthHeader();
      this.http.get(this.apiLink + '/portal/message/conversation/' + this.selectedUserHandle, { headers: headers })
      .map((response: Response) => response.json())
      .subscribe(response => {
        sortedMessagesByTime = response;
        this.messagesbytime = _sortBy(sortedMessagesByTime, function(msg) { return msg.time; });
      })
      }, 10000);
    }
  }

  /**
   *
   * @param value add messages to an ongoing conversation between two users
 */

  addMessage(value: any) {
    const headers = this.tokenService.getAuthHeader();
    if (this.messageForm.valid === true) {
      const messageBody = {
        by : this.userHandle,
        to : this.selectedUserHandle,
        subject : value.message,
        content : value.message,
      }
      this.http.post(this.apiLink + '/portal/message', messageBody, { headers: headers })
      .map((response: Response) => response.json())
      .subscribe(response => {
        this.text = '';
        this.manageAddMessages(response);
      })
    }
  }

  /**
   *put the latest conversation on the left hand side with respect to the selected user
  */

  manageAddMessages(response) {
    if (response.SUCCESS.to === this.selectedUserHandle && response.SUCCESS.by === this.userHandle) {
      if (!_find(this.messagesbytime, {id: response.SUCCESS.id})) {
        this.messagesbytime.push(response.SUCCESS);
      }
      for (const i in this.orderedMessageContacts) {
        if (this.orderedMessageContacts[i].handle === this.selectedUserHandle) {
          this.orderedMessageContacts[i].isLastMessageSentByMe = true;
          this.orderedMessageContacts[i].latestmessagetime = response.SUCCESS.time;
          this.orderedMessageContacts[i].latestmessage = response.SUCCESS.content;
        }
      }
      this. orderedMessageContacts = _sortBy(this. orderedMessageContacts, function(msg) { return msg.latestmessagetime; }).reverse()
    }
  }

  /**
   *
   * @param value used to send message to a receipient on custom search using the compose button
  */

  sentMessageToRecipient(value: any ) {
    const headers = this.tokenService.getAuthHeader();
    if ((value.message_term === null || value.message_term === undefined) && (value.searchUserTerm === null || value.searchUserTerm === undefined)) {
      return
    }
    const messageBody = {
      by : this.userHandle,
      to : this.nonUserProfile.handle,
      subject : value.message_term,
      content : value.message_term,
    }
    console.log('this is the current user converstaion to' + this.nonUserProfile.handle + '' + this.nonUserProfile.name)
    this.http.post(this.apiLink + '/portal/message', messageBody, { headers: headers })
    .map((response: Response) => response.json())
    .subscribe(response => {
      this.composeMessage.messageToSend = '';
      this.composeMessage.searchUser = '';
      this.selectedUserHandle = this.nonUserProfile.handle;
      this.selectedUser = this.nonUserProfile.name;
      this.selectedUserName = this.nonUserProfile.extra.username;
      this.messagesbytime.push(response.SUCCESS);
      this.toggleView('readMessage', this.nonUserProfile.handle)
    })
  }

  /**
   *
   * @param handle this method will get the details of the selected user on custom search
  */
  toggleSelectSkill(handle: any) {
    this.recipientsListState = !this.recipientsListState;
    if (handle === undefined || handle === null ) {
      this.composeMessage.searchUser = 'No such receipient';
      this.selectedView = '';
    }

    if (handle !== this.userHandle && handle !== undefined) {
      console.log('this is the chosen handle' + handle);
      const headers = this.tokenService.getAuthHeader();
      this.http.get(this.apiLink + '/portal/profile/' + handle, { headers: headers })
      .map((response: Response) => response.json())
      .subscribe(response => {
        if (response === null || response === undefined) {
          this.composeMessage.searchUser = 'No such receipient';
        } else {
          this.nonUserProfile = response
          this.composeMessage.searchUser = this.nonUserProfile.name;
          console.log('this is the current' + this.nonUserProfile.name + '' + this.nonUserProfile.handle )
        }
      })
    }

    if (handle === this.userHandle) {
      this.selectedView = '';
      return
    }
  }

  /**
   * this method is used to perform the custom search
  */

  onSearch () {
    if (this.composeMessage.searchUser !== null || this.composeMessage.searchUser !== '') {
      this.recipientsListState = true;
      this.messageStore.dispatch({ type: MessageActions.GET_RECEIPIENT, payload: this.composeMessage.searchUser });
    } else {
       this.recipientsListState = !this.recipientsListState;
      // this.composeMessage.searchUser = '';
    }
  }

  hideList() {
    console.log('close');
    this.recipientsListState = false;
  }
}
