import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { MessageService } from '../services/message.service';
import { MessageActions } from '../actions/message.action';

@Injectable()
export class MessageEffect {

  @Effect()
  deleteConversation$ = this.actions$
    .ofType(MessageActions.DELETE_CONVERSATION)
    .map(toPayload)
    .switchMap((payload) => this.messageService.deleteConversation(payload)
      .map(res => ({ type: MessageActions.DELETE_CONVERSATION_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.DELETE_CONVERSATION_FAILED, payload: res }))
    );

  @Effect()
  getReceipient$ = this.actions$
    .ofType(MessageActions.GET_RECEIPIENT)
    .map(toPayload)
    .switchMap((payload) => this.messageService.getReceipientDetails(payload)
      .map(res => ({ type: MessageActions.GET_RECEIPIENT_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.GET_RECEIPIENT_FAILED, payload: res }))
    );

  @Effect()
  getMessangerList$ = this.actions$
    .ofType(MessageActions.GET_MESSANGER_LIST)
    .map(toPayload)
    .switchMap((payload) => this.messageService.getMessangerList(payload)
      .map(res => ({ type: MessageActions.GET_MESSANGER_LIST_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.GET_MESSANGER_LIST_FAILED, payload: res }))
    );

  @Effect()
  loadConversation$ = this.actions$
    .ofType(MessageActions.LOAD_CONVERSATION)
    .map(toPayload)
    .switchMap((payload) => this.messageService.loadConversation(payload)
      .map(res => ({ type: MessageActions.LOAD_CONVERSATION_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.LOAD_CONVERSATION_FAILED, payload: res }))
    );

  @Effect()
  sendMessage$ = this.actions$
    .ofType(MessageActions.SEND_MESSAGE)
    .map(toPayload)
    .switchMap((payload) => this.messageService.sendMessage(payload)
      .map(res => ({ type: MessageActions.SEND_MESSAGE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.SEND_MESSAGE_FAILED, payload: res }))
    );

  @Effect()
  messageSearchUser$ = this.actions$
    .ofType(MessageActions.MESSAGE_SEARCH_USER)
    .map(toPayload)
    .switchMap((payload) => this.messageService.messageSearchUser(payload)
      .map(res => ({ type: MessageActions.MESSAGE_SEARCH_USER_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.MESSAGE_SEARCH_USER_FAILED, payload: res }))
    );

  @Effect()
  networkRequest$ = this.actions$
    .ofType(MessageActions.NETWORK_REQUEST_ACTION)
    .map(toPayload)
    .switchMap((payload) => this.messageService.networkRequestAction(payload)
      .map(res => ({ type: MessageActions.NETWORK_REQUEST_ACTION_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.NETWORK_REQUEST_ACTION_FAILED, payload: res }))
    );

  @Effect()
  userTyping$ = this.actions$
    .ofType(MessageActions.USER_IS_TYPING)
    .map(toPayload)
    .switchMap((payload) => this.messageService.userTypingAction(payload)
      .map(res => ({ type: MessageActions.USER_IS_TYPING_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.USER_IS_TYPING_FAILED, payload: res }))
    );

  @Effect()
  deleteMessage$ = this.actions$
    .ofType(MessageActions.DELETE_MESSAGE)
    .map(toPayload)
    .switchMap((payload) => this.messageService.deleteMessage(payload)
      .map(res => ({ type: MessageActions.DELETE_MESSAGE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: MessageActions.DELETE_MESSAGE_FAILED, payload: res }))
    );

  constructor(
    private actions$: Actions,
    private messageService: MessageService
  ) { }
}
