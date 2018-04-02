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

  messageState$: Observable<MessageModal>;
  messageState: any;

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
      console.log('this.messageState', this.messageState);
    });

    // fetch logged in user messages
    this.messageStore.dispatch({
      type: MessageActions.GET_LOGGED_USERS_MESSAGES,
      payload: null
    });
  }

  ngOnInit() { }

  isUserSelected() {
    if (this.selectedUser && JSON.stringify(this.selectedUser) === '{}') {
      return false;
    }
    return true;
  }
}
