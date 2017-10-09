import { initialTag } from '../../models/auth.model';
import { of } from 'rxjs/observable/of';
import { Component, Renderer , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { MessageModal, initialMessage} from '../../models/message.model';
import { UserMessages } from '../../models/user-messages.model';
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

import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
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

selfProfile: any;
listData = []; // temporary variable to store list of handles
makeIsReadTrue = [];      // contains the list of messages to assign them read value true.
orderedMessageContacts;   // to present the list of contacts on the left hand side of the message view page

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
  // this.recipientsListState = false;
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
      this.fetchProfileByHandle(state.mergedMessages)
     }
    }
    if (state && state.profileHandles) {
      console.log('now it called', state.profileHandles)
       this.orderProfileMessage(state.profileHandles);
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
        messageContacts[i].isRead = false;
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

}
