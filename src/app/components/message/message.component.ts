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

// import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
// import 'rxjs/add/operator/takeWhile';

import { unionBy as _unionBy } from 'lodash';
import { orderBy as _orderBy } from 'lodash';
import { sortBy as _sortBy } from 'lodash';
import { indexOf as _indexOf } from 'lodash';
import { find as _find } from 'lodash';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  providers: [ MessageActions ],
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMeBottom') private myScrollContainer: ElementRef;
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
  currentProfile = initialMessage;
  
  selfProfile: any; // users self profile
  listData = []; // temporary variable to store list of handles
  makeIsReadTrue = [];      // contains the list of messages to assign them read value true.
  orderedMessageContacts;   // to present the list of contacts on the left hand side of the message view page
  nonUserProfile;           // to store the entire data of the current selected user
  selectedUser;
  selectedUserHandle;
  selectedUserName;
  mergedMsg = [];
  messagesbytime = [];
  sortedMessagesByTime = [];
  recipientsListState: boolean;
  receipientList: any;      // to store the list of receipients
  counter = 0;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
      try {
          // console.log('scrolling');
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
    this.messageForm = fb.group({
      'message' : [null, Validators.required],
    })
    this.mForm = fb.group({
      'searchUserTerm' : [null, Validators.required],
      'message_term' : [null, Validators.required],
    })
    this.text = '';
    this.recipientsListState = false;
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.token = currentUser.access_token;
    this.userO$ = profileStore.select('profileTags').take(3);
  }
  ngOnInit() {
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
    this.userO$.subscribe((val) => {
      this.currentUserDetails = val;
      // console.log('SUB', this.currentUserDetails);
      if (typeof this.currentUserDetails.profileUser !== 'undefined') {
        // console.log('SUB__HANDLE', this.currentUserDetails.profileUser);
        this.userHandle = this.currentUserDetails.profileUser.handle;
        this.initMessaging(this.userHandle);
      }
    });
    this.messages$ = this.messageStore.select('messageTags').take(5);
    this.messages$.subscribe((state) => {
      console.log(state);
      // if state is not empty
      if (state && state.userProfileDetails ) {
          // console.log('STATE', state);
        this.selfProfile = state.userProfileDetails;
        // console.log('USER', this.selfProfile);
      }
      // if (state && state.mergedMessages) {
      //   this.mergedMsg = state.mergedMessages;
      //    console.log('state.mergedMessages', this.mergedMsg)
      //   this.fetchProfileByHandle(state.mergedMessages)
      // }
      // if (state && state.profileHandles !== 'undefined' ) {
      //   console.log('its under profile handles')
      //   console.log('state.profileHandles', state.profileHandles)
      //   this.orderProfileMessage(state.profileHandles);
      // }
      if (state && state.nonUserProfileDetails) {
        this.nonUserProfile = state.nonUserProfileDetails;
        console.log('state.nonUserProfileDetails', state.nonUserProfileDetails);
      }
      if (state && state.conversationDetails) {
        // this.counter2++;
        // if (this.counter2 === 1) {
          console.log('sorted msgs')
        this.sortedMessagesByTime = state.conversationDetails;
        this.messagesbytime = _sortBy(this.sortedMessagesByTime, function(msg) { return msg.time; });
      }
      if (state && state.receipients) {
        console.log('getting receipients')
        this.receipientList = state.receipients
      }
      // if (state && state.markRead) {
      //    console.log('mark read')
      //    this.sortedMessages()
      // }
      // if (state && state.sendMessageResponse ) {
      //    console.log(state.sendMessageResponse)
      //   this.manageAddMessages(state.sendMessageResponse)
      // }
    })
  }
  initMessaging(handle: string) {
    if (!handle) {
      return false;
    }
      this.messageStore.dispatch({ type: MessageActions.LOAD_USER_PROFILE_DATA, payload: handle });
     // this.messageStore.dispatch({type: MessageActions.LOAD_COMBINED_MESSAGES});
     setInterval(() => {
     const headers = this.tokenService.getAuthHeader();
     console.log('getting combined messages');
     return this.http.get(this.apiLink + '/portal/message/combined/sent/received', { headers: headers })
     .map((data: Response) => data.json())
     .subscribe(response => {
      this.mergedMsg = response;
      console.log('state.mergedMessages', this.mergedMsg)
     this.fetchProfileByHandle(this.mergedMsg)
     });
    }, 10000);
  }
  fetchProfileByHandle(mergedMessages: any) {
    console.log('its under fetch profiles by handle')
    const headers = this.tokenService.getAuthHeader();
    if (mergedMessages !== 'undefined') {
      // // console.log(mergedMessages.length)
      for (let i = 0 ; i < mergedMessages.length; i++) {
        if (_indexOf(this.listData, mergedMessages[i].by) === -1) {
          this.listData.push(mergedMessages[i].by)
        }
        if (_indexOf(this.listData, mergedMessages[i].to) === -1) {
          this.listData.push(mergedMessages[i].by)
        }
      }
      if (this.listData) {
        // // console.log('handles list before: ', this.listData);
        this.listData = this.listData.filter( this.onlyUnique );
        const reqBody = { listData: this.listData };
        // // console.log('handles list after: ', this.listData);
        // this.messageStore.dispatch({type: MessageActions.LOAD_HANDLE_PROFILE_DATA, payload: this.listData});
        this.http.post(this.apiLink + '/portal/auth/handleDisplayData', reqBody, { headers: headers })
        .map((response: Response) => response.json())
        .subscribe(response => {
          //  console.log( response )
          this.orderProfileMessage(response)
        });
      }
    }
  }
  orderProfileMessage(data: any) {
    if (!data) {
      console.log('hi')
      return false;
    } else {
      //  console.log(data)
      const handleDataMap = data;
      // console.log(handleDataMap)
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
          // // console.log(this.selfProfile)
          messageContacts[i].isRead = true;
          messageContacts[i].latestmessage = ''
          if ( this.selfProfile.extra.messages.received || this.selfProfile.extra.messages.received !== undefined) {
            let lastReceivedMessageCount;
            for (let j = 0; j < this.selfProfile.extra.messages.received.length; j++) {
              if (messageContacts[i].handle === this.selfProfile.extra.messages.received[j].by) {
                lastReceivedMessageCount = j;
                if (this.selfProfile.extra.messages.received[j].isRead === false) {
                   console.log('its under me')
                  messageContacts[i].isRead = false;
                  const isReadList = {
                    // message recived by
                    handle: this.userHandle,
                    // message sender
                    sendHandle: messageContacts[i].handle,
                    messageId : this.selfProfile.extra.messages.received[j].id,
                    isRead : true
                  };
                   // console.log(isReadList);
                  this.makeIsReadTrue.push(isReadList);
                  messageContacts[i].latestmessage = this.selfProfile.extra.messages.received[j].content;
                  messageContacts[i].latestmessagetime = this.selfProfile.extra.messages.received[j].time;
                  messageContacts[i].isLastMessageSentByMe = false;
                   // console.log(this.makeIsReadTrue)
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
            // // console.log('now its here')
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
           // console.log(messageContacts[i])
        }
        this.orderedMessageContacts = _sortBy(messageContacts, function(msg) { return msg.latestmessagetime; }).reverse()
         // console.log(this.orderedMessageContacts)
  }
}
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  toggleView(tab: any, nonUserHandle: any) {
    console.log(nonUserHandle)
      // toggle view
    this.selectedView = tab;
    // trigger actions
    if (this.selectedView === 'readMessage') {
      // const nonUserHandle = userHandle
         console.log(nonUserHandle)
      if (nonUserHandle !== this.userHandle) {
        this.messageStore.dispatch({ type: MessageActions.LOAD_NON_USER_PROFILE_DATA, payload: nonUserHandle });
        // this.http.get(this.apiLink + '/portal/profile/' + nonUserHandle, { headers: headers })
        // .map((response: Response) => response.json())
        // .subscribe(response => {
        //   this.nonUserProfile = response
        //    // console.log(this.nonUserProfile)
        //    this.selectedUser = this.nonUserProfile.name;
        // })
        let indexOfNonUserHandle ;
        for (const i in this.orderedMessageContacts) {
          if (this.orderedMessageContacts[i].handle === nonUserHandle) {
             console.log(this.orderedMessageContacts[i])
            indexOfNonUserHandle = i;
            break;
          } else  {
            console.log('not present')
          }
        }
        this.selectUserData(this.orderedMessageContacts[indexOfNonUserHandle])
      } else {
        console.log(nonUserHandle)
      }

    }
  }
  selectUserData(selectUser) {
     console.log(selectUser);
     const headers = this.tokenService.getAuthHeader();
    selectUser.read = true;
    if (selectUser.isLastMessageSentByMe) {
      selectUser.isLastMessageSentByMe = true;
    }
    this.selectedUser = selectUser.name;
    this.selectedUserHandle = selectUser.handle;
    this.selectedUserName = selectUser.username;
    // console.log(this.selectedUser)
    const list = [];
    // const userMessages = [];
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
    // this.messageStore.dispatch({ type: MessageActions.MARK_MESSAGES_READ, payload: isReadMessages });
    this.http.put(this.apiLink + '/portal/message/markListRead', isReadMessages, { headers: headers })
    .map((res: Response) => res.json())
    .subscribe(response => {
    // console.log(response)
    this.sortedMessages();
    })
  }

  sortedMessages() {
    if ( this.selectedUserHandle !== this.userHandle) {
    // const headers = this.tokenService.getAuthHeader();
    // this.messageStore.dispatch({ type: MessageActions.SORT_MESSAGES_BY_TIME, payload: this.selectedUserHandle });
    // const userMessages = [];
    // for ( let i = 0 ; i < this.mergedMsg.length; i++) {
    //   if (this.mergedMsg[i].to === this.selectedUserHandle || (this.mergedMsg[i].by === this.selectedUserHandle)) {
    //     userMessages.push(this.mergedMsg[i]);
    //     // console.log(userMessages)
    //   } else {
    //     // console.log(this.selectedUserHandle + ' doesent exist in ' + 'merged msg')
    //   }
    // }
    //     this.messagesbytime = _sortBy(userMessages, function(msg) { return msg.time; });
    //      console.log(this.messagesbytime)
        // console.log(this.mergedMsg)
       // this.messageStore.dispatch({ type: MessageActions.SORT_MESSAGES_BY_TIME, payload: this.messagesbytime });
       setInterval(() => {
        const headers = this.tokenService.getAuthHeader();
        this.http.get(this.apiLink + '/portal/message/conversation/' + this.selectedUserHandle, { headers: headers })
       .map((response: Response) => response.json())
       .subscribe(response => {
        this.sortedMessagesByTime = response;
        this.messagesbytime = _sortBy(this.sortedMessagesByTime, function(msg) { return msg.time; });
       })
      }, 5000);
      }
  }

  addMessage(value: any) {
    const headers = this.tokenService.getAuthHeader();
    if (this.messageForm.valid === true) {
      const messageBody = {
        by : this.userHandle,
        to : this.selectedUserHandle,
        subject : value.message,
        content : value.message,
        time: new Date().toISOString(),
      }
      // this.messageStore.dispatch({ type: MessageActions.SEND_MESSAGE, payload: messageBody });
      // this.text = '';
      this.http.post(this.apiLink + '/portal/message', messageBody, { headers: headers })
      .map((response: Response) => response.json())
      .subscribe(response => {
        this.text = '';
        this.manageAddMessages(response);
    })
   }
  }
  manageAddMessages(response) {
    // this.messagesbytime.push(response.SUCCESS)
    if (response.SUCCESS.to === this.selectedUserHandle && response.SUCCESS.by === this.userHandle) {
      if (!_find(this.messagesbytime, {id: response.SUCCESS.id})) {
        this.messagesbytime.push(response.SUCCESS);
      }
      // // console.log(this.messagesbytime)
      // this.messagesbytime = _sortBy(this.messagesbytime, function(msg) { return msg.time; });
    //  this.messagesbytime.push(response.SUCCESS)
     // this.mergedMsg.push(response.SUCCESS)
    // // console.log(this.messagesbytime)
      for (let i in this.orderedMessageContacts) {
          if (this.orderedMessageContacts[i].handle === this.selectedUserHandle) {
            this.orderedMessageContacts[i].isLastMessageSentByMe = true;
            this.orderedMessageContacts[i].latestmessagetime = response.SUCCESS.time;
            this.orderedMessageContacts[i].latestmessage = response.SUCCESS.content;
          }
        }
        this. orderedMessageContacts = _sortBy(this. orderedMessageContacts, function(msg) { return msg.latestmessagetime; }).reverse()
    }
  }

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
    // this.messageStore.dispatch({ type: MessageActions.SEND_MESSAGE, payload: messageBody });
    // this.composeMessage.messageToSend = '';
    //     this.composeMessage.searchUser = '';
    //     this.selectedUserHandle = this.nonUserProfile.handle;
    //     this.selectedUser = this.nonUserProfile.name;
    //     this.selectedUserName = this.nonUserProfile.extra.username;
    //     this.toggleView('readMessage', this.nonUserProfile.handle)
    this.http.post(this.apiLink + '/portal/message', messageBody, { headers: headers })
    .map((response: Response) => response.json())
    .subscribe(response => {
      console.log(response)
      this.composeMessage.messageToSend = '';
      this.composeMessage.searchUser = '';
      this.selectedUserHandle = this.nonUserProfile.handle;
      this.selectedUser = this.nonUserProfile.name;
      this.selectedUserName = this.nonUserProfile.extra.username;
       this.mergedMsg.push(response.SUCCESS);
      this.messagesbytime.push(response.SUCCESS);
     // this.profile.extra.messages.sent.push(response.SUCCESS);
      // console.log(this.messagesbytime)
       this.fetchProfileByHandle(this.mergedMsg)
      this.toggleView('readMessage', this.nonUserProfile.handle)
    // })
  })
  }

  toggleSelectSkill(handle: any) {
    this.recipientsListState = !this.recipientsListState;
    if (handle === undefined || handle === null ) {
      // // console.log('no such receipient exist')
      this.composeMessage.searchUser = 'No such receipient';
      this.selectedView = '';
    }

    if (handle !== this.userHandle && handle !== undefined) {
      const headers = this.tokenService.getAuthHeader();
      // this.messageStore.dispatch({ type: MessageActions.LOAD_SEARCHED_NON_USER_PROFILE_DATA, payload: handle });
      this.http.get(this.apiLink + '/portal/profile/' + handle, { headers: headers })
      .map((response: Response) => response.json())
      .subscribe(response => {
        if (response === null || response === undefined) {
          // // console.log('no such receipient exist')
          this.composeMessage.searchUser = 'No such receipient';
        } else {
          this.nonUserProfile = response
          // // console.log(this.nonUserProfile)
          this.composeMessage.searchUser = this.nonUserProfile.name;
          // // console.log(this.nonUserProfile.handle + 'is not equal to' + this.userHandle)
        }
      })
      // if (this.nonUserProfile !== null) {
      //   if (handle === this.nonUserProfile.handle) {
      //     this.composeMessage.searchUser = this.nonUserProfile.name;
      //   }
      // } else {
      //  this.composeMessage.searchUser = 'No such receipient';
      // }
    }

    if (handle === this.userHandle) {
      // // console.log('cannot sent to ur own profile')
      this.selectedView = '';
      return
    }
  }
  onSearch () {
    this.recipientsListState = true;
     console.log(this.composeMessage.searchUser);
    if (this.composeMessage.searchUser !== null || this.composeMessage.searchUser !== ' ') {
     //  this.messageStore.dispatch({ type: MessageActions.GET_RECEIPIENT, payload: this.composeMessage.searchUser });
     this.http.get(this.apiLink + '/portal/searchprofiles/1/' + this.composeMessage.searchUser + '/0/5')
     .map((data: Response) => data.json())
     .subscribe(response => {
       this.receipientList = response
     });
    }
  }
}
