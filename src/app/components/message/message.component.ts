import { Component, Renderer } from '@angular/core';
import { Store } from '@ngrx/store';

import _ from "lodash";
import { Message } from "../../models/message.model";

// actions
import { MessageActions } from '../../actions/message.action'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  constructor(private store: Store<Message>) {

    this.loadAllMessages();

  }

  selectedView: string = '';
  userHandle: string = '';

  // user action to toogle views
  toggleView(tab: any, userHandle: any) {

    // toggle view
    this.selectedView = tab;

    // trigger actions
    if(this.selectedView == 'readMessage') {

      this.userHandle = userHandle;

      // load user message
      console.log(userHandle);

    }

  }

  loadAllMessages() {

    console.log('triggered loadAllMessages');

    // dispatch load messages
    this.store.dispatch({ type: MessageActions.LOAD_MESSAGES, payload: this.userHandle });

  }

}
