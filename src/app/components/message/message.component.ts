import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MessageModal } from '../../models/message.model';
import { MessageActions } from '../../actions/message.action';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  imageBaseUrl = environment.API_IMAGE;
  selectedUser: any;
  messangerList = [];
  conversation = [];

  messageState$: Observable<MessageModal>;
  messageState: any;
  showPreloader = false;

  constructor(
    private messageStore: Store<MessageModal>
  ) {
    this.selectedUser = {};
    // this.selectedUser = {
    //   username: 'abhijeet'
    // };

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
        this.showPreloader = false;
      }
    });

    // fetch logged in user messages
    this.messageStore.dispatch({
      type: MessageActions.GET_MESSANGER_LIST,
      payload: null
    });
  }

  ngOnInit() { }

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

    // show preloader
    this.showPreloader = true;

    this.messageStore.dispatch({
      type: MessageActions.LOAD_CONVERSATION,
      payload: userObj.handle
    });
  }
}
