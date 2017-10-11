import { initialTag } from '../../models/auth.model';
import { of } from 'rxjs/observable/of';
import { Component, Renderer , OnInit} from '@angular/core';
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

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  providers: [ MessageActions ],
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
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
  
  userProfile$: Observable<MessageModal>;
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
  receipientList = [];      // to store the list of receipients
  counter = 0;
  
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
    // this.sentMessages$.subscribe((state) => {
    //   this.message = state;
    //   this.receipientList = this.message.receipients;
    //   // console.log(this.message.receipients)
    //   // console.log(this.receipientList)
    //   // console.log(state)
    //   // this.mergedMessages = _unionBy(this.message.receivedAll, this.message.sentAll, 'id');
    //   // console.log('REC', this.message.receivedAll)
    //   // if ( this.mergedMessages !== undefined || this.mergedMessages.length !== 0 ) {
    //   //   this.getByHandleList (this.mergedMessages);
    //   });
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
    this.userProfile$ = this.messageStore.select('userProfileTags');
    this.userProfile$.subscribe((state) => {
      // if state is not empty
      if (state && state.userProfileDetails) {
          // console.log('STATE', state);
        this.selfProfile = state.userProfileDetails;
        // console.log('USER', this.selfProfile);
      }
      if (state && state.receivedAll) {
        // console.log('STATE RECEIVED', state.receivedAll)
      }
      if (state && state.sentAll) {
        // console.log('STAte sent', state.sentAll)
      }
      if (state && state.mergedMessages) {
        this.counter++;
        // console.log('count: ' + this.counter)
          // console.log('MERGED', state.mergedMessages)
        if (this.counter === 3) {
          this.mergedMsg = state.mergedMessages;
        this.fetchProfileByHandle(state.mergedMessages)
        }
      }
      if (state && state.profileHandles) {
        console.log('now it called', state.profileHandles)
          this.orderProfileMessage(state.profileHandles);
      }
      if (state && state.nonUserProfileDetails) {
        this.nonUserProfile = state.nonUserProfileDetails
        console.log(this.nonUserProfile)
      }
      if (state && state.conversationDetails) {
        this.sortedMessagesByTime = state.conversationDetails
      }
      if (state.receipients_loaded === true) {
        this.receipientList = state.receipients
      }
    })
  }
  initMessaging(handle: string) {
    if (!handle) {
      return false;
    }
      this.messageStore.dispatch({ type: MessageActions.LOAD_USER_PROFILE_DATA, payload: handle });
      this.messageStore.dispatch({ type: MessageActions.LOAD_SENT_MESSAGES, payload: handle });
      this.messageStore.dispatch({type: MessageActions.LOAD_RECEIVED_MESSAGES, payload: handle});
  }
  fetchProfileByHandle(mergedMessages: any) {
    // console.log(mergedMessages)
    if (mergedMessages !== 'undefined') {
      // console.log(mergedMessages.length)
      for (let i = 0 ; i < mergedMessages.length; i++) {
        if (_indexOf(this.listData, mergedMessages[i].by) === -1) {
          this.listData.push(mergedMessages[i].by)
        }
        if (_indexOf(this.listData, mergedMessages[i].to) === -1) {
          this.listData.push(mergedMessages[i].by)
        }
      }
      // const reqBody = JSON.stringify({
      //   listData: this.listData
      // });
      if (this.listData) {
        // console.log('handles list before: ', this.listData);
        this.listData = this.listData.filter( this.onlyUnique );
        // console.log('handles list after: ', this.listData);
        this.messageStore.dispatch({type: MessageActions.LOAD_HANDLE_PROFILE_DATA, payload: this.listData});
      }
    }
  }
  orderProfileMessage(data) {
      console.log(data)
      const handleDataMap = data;
      const messageContacts = [];
      for (let i = 0; i < this.listData.length; i++) {
        if (handleDataMap[this.listData[i]]) {
          if (this.listData[i] === handleDataMap[this.listData[i]].handle) {
            messageContacts.push( handleDataMap[this.listData[i]])
          }
        }
      }
      console.log(messageContacts);
          /*latest received message will come up*/
          for (let i = 0 ; i < messageContacts.length; i++) {
          if ( messageContacts[i].handle === this.userHandle) {
            // console.log('skiiping self profile')
            /*skipped self profile */
            continue;
          }
          console.log(this.selfProfile)
          messageContacts[i].isRead = true;
          messageContacts[i].latestmessage = ''
          if ( this.selfProfile.extra.messages.received || this.selfProfile.extra.messages.received !== undefined) {
            let lastReceivedMessageCount;
            for (let j = 0; j < this.selfProfile.extra.messages.received.length; j++) {
              if (messageContacts[i].handle === this.selfProfile.extra.messages.received[j].by) {
                lastReceivedMessageCount = j;
                if (this.selfProfile.extra.messages.received[j].isRead === false) {
                  // console.log('its under me')
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
            // console.log('now its here')
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
        console.log(this.orderedMessageContacts)
  }
  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  toggleView(tab: any, nonUserHandle: any) {
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
        //    console.log(this.nonUserProfile)
        //    this.selectedUser = this.nonUserProfile.name;
        // })
        let indexOfNonUserHandle ;
        for (const i in this.orderedMessageContacts) {
          if (this.orderedMessageContacts[i].handle === nonUserHandle) {
            // console.log(this.orderedMessageContacts[i])
            indexOfNonUserHandle = i;
            break;
          }
        }
        this.selectUserData(this.orderedMessageContacts[indexOfNonUserHandle])
      // })
      }
      // load user message
      // console.log(nonUserHandle);
    }
  }
  selectUserData(selectUser) {
    console.log(selectUser);
    selectUser.read = true;
    // console.log(selectUser.isLastMessageSentByMe)
    if (selectUser.isLastMessageSentByMe) {
      selectUser.isLastMessageSentByMe = true;
    }
    this.selectedUser = selectUser.name;
    this.selectedUserHandle = selectUser.handle;
    this.selectedUserName = selectUser.username;
    // this.sendMessageTab = false;
    const list = [];
    const userMessages = [];
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
    this.messageStore.dispatch({ type: MessageActions.MARK_MESSAGES_READ, payload: isReadMessages });

    this.userProfile$ = this.messageStore.select('userProfileTags');
    this.userProfile$.subscribe((state) => {
      if (state.markRead === true) {
        for ( let i = 0 ; i < this.mergedMsg.length; i++) {
              if (this.mergedMsg[i].to === selectUser.handle || this.mergedMsg[i].by === selectUser.handle) {
                userMessages.push(this.mergedMsg[i]);
              }
              if (i === (this.mergedMsg.length - 1)) {
                console.log('last msg', userMessages[i]);
                this.messagesbytime = _sortBy(userMessages, function(msg) { return msg.time; });
                this.messageStore.dispatch({ type: MessageActions.SORT_MESSAGES_BY_TIME, payload: this.messagesbytime });
              }
          }
      }
    })
  }

  addMessage(value: any) {
    if (this.messageForm.valid === true) {
      const messageBody = {
        by : this.userHandle,
        to : this.selectedUserHandle,
        subject : value.message,
        content : value.message,
        time: new Date().toISOString(),
      }
      this.messageStore.dispatch({ type: MessageActions.SEND_MESSAGE, payload: messageBody });
      // this.http.post(this.apiLink + '/portal/message', messageBody, { headers: headers })
      // .map((response: Response) => response.json())
      // .subscribe(response => {
      //   this.text = '';
      //   // console.log(response)
      //     // const subscribe = timer.subscribe( val => {
      //   this.mergedMessages.push(response.SUCCESS);
      //   this.messagesbytime.push(response.SUCCESS);
      //   // console.log(this.messagesbytime)
      //   this.profile.extra.messages.sent.push(response.SUCCESS);
      //   for (let i in this.orderedMessageContacts) {
      //     if (this.orderedMessageContacts[i].handle === this.selectedUserHandle) {
      //       this.orderedMessageContacts[i].isLastMessageSentByMe = true;
      //       this.orderedMessageContacts[i].latestmessagetime = response.SUCCESS.time;
      //       this.orderedMessageContacts[i].latestmessage = response.SUCCESS.content;
      //     }
      //   }
      //   this. orderedMessageContacts = _sortBy(this. orderedMessageContacts, function(msg) { return msg.latestmessagetime; }).reverse()
      // });
   }
  }
  toggleSelectSkill(handle: any) {
    this.recipientsListState = !this.recipientsListState;
    if (handle === undefined || handle === null ) {
      // console.log('no such receipient exist')
      this.composeMessage.searchUser = 'No such receipient';
      this.selectedView = '';
    }

    if (handle !== this.userHandle && handle !== undefined) {
      this.http.get(this.apiLink + '/portal/profile/' + handle, { headers: headers })
      .map((response: Response) => response.json())
      .subscribe(response => {
        if (response === null || response === undefined) {
          // console.log('no such receipient exist')
          this.composeMessage.searchUser = 'No such receipient';
        } else {
          this.nonUserProfile = response
          // console.log(this.nonUserProfile)
          this.composeMessage.searchUser = this.nonUserProfile.name;
          // console.log(this.nonUserProfile.handle + 'is not equal to' + this.userHandle)
        }
      })
    }

    if (handle === this.userHandle) {
      // console.log('cannot sent to ur own profile')
      this.selectedView = '';
      return
    }
  }
  onSearch () {
    this.recipientsListState = true;
    // console.log(this.composeMessage.searchUser);
    if (this.composeMessage.searchUser !== null || this.composeMessage.searchUser !== ' ') {
      this.messageStore.dispatch({ type: MessageActions.GET_RECEIPIENT, payload: this.composeMessage.searchUser });
    }
  }
}
