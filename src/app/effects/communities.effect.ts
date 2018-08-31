import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { CommunitiesService } from '../services/communities.service';
import { CommunitiesActions } from '../actions/communities.action';

@Injectable()
export class CommunitiesEffect {

  @Effect()
  createCommunity$ = this.actions$
    .ofType(CommunitiesActions.COMMUNITY_CREATE)
    .map(toPayload)
    .switchMap((payload) => this.communitiesService.createCommnuity(payload)
      .map(res => ({ type:  CommunitiesActions.COMMUNITY_CREATE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: CommunitiesActions.COMMUNITY_CREATE_FAILED, payload: res }))
    );

  @Effect()
  listCommunity$ = this.actions$
    .ofType(CommunitiesActions.COMMUNITY_LIST)
    .map(toPayload)
    .switchMap((payload) => this.communitiesService.listCommnuity(payload)
      .map(res => ({ type:  CommunitiesActions.COMMUNITY_LIST_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: CommunitiesActions.COMMUNITY_LIST_FAILED, payload: res }))
    );

  @Effect()
  joinCommunity$ = this.actions$
    .ofType(CommunitiesActions.COMMUNITY_JOIN)
    .map(toPayload)
    .switchMap((payload) => this.communitiesService.joinCommunity(payload)
      .map(res => ({ type:  CommunitiesActions.COMMUNITY_JOIN_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: CommunitiesActions.COMMUNITY_JOIN_FAILED, payload: res }))
    );

  @Effect()
  detailCommunity$ = this.actions$
    .ofType(CommunitiesActions.COMMUNITY_DETAILS)
    .map(toPayload)
    .switchMap((payload) => this.communitiesService.detailCommunity(payload)
      .map(res => ({ type:  CommunitiesActions.COMMUNITY_DETAILS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: CommunitiesActions.COMMUNITY_DETAILS_FAILED, payload: res }))
    );

  @Effect()
  peopleInviteCommunity$ = this.actions$
    .ofType(CommunitiesActions.COMMUNITY_INVITE_PEOPLE_LIST)
    .map(toPayload)
    .switchMap((payload) => this.communitiesService.invitePeopleCommunity(payload)
      .map(res => ({ type:  CommunitiesActions.COMMUNITY_INVITE_PEOPLE_LIST_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: CommunitiesActions.COMMUNITY_INVITE_PEOPLE_LIST_FAILED, payload: res }))
    );

  @Effect()
  relatedCommunity$ = this.actions$
    .ofType(CommunitiesActions.COMMUNITY_RELATED)
    .map(toPayload)
    .switchMap((payload) => this.communitiesService.relatedCommunity(payload)
      .map(res => ({ type:  CommunitiesActions.COMMUNITY_RELATED_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: CommunitiesActions.COMMUNITY_RELATED_FAILED, payload: res }))
    );

  @Effect()
  unjoinCommunity$ = this.actions$
    .ofType(CommunitiesActions.COMMUNITY_UNJOIN)
    .map(toPayload)
    .switchMap((payload) => this.communitiesService.unjoinCommunity(payload)
      .map(res => ({ type:  CommunitiesActions.COMMUNITY_UNJOIN_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: CommunitiesActions.COMMUNITY_UNJOIN_FAILED, payload: res }))
    );

  @Effect()
  getPostCommunity$ = this.actions$
    .ofType(CommunitiesActions.COMMUNITY_POST_GET)
    .map(toPayload)
    .switchMap((payload) => this.communitiesService.getPostCommunity(payload)
      .map(res => ({ type:  CommunitiesActions.COMMUNITY_POST_GET_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: CommunitiesActions.COMMUNITY_POST_GET_FAILED, payload: res }))
    );

  @Effect()
  invitePeopleCommunity$ = this.actions$
    .ofType(CommunitiesActions.COMMUNITY_INVITE_PEOPLE)
    .map(toPayload)
    .switchMap((payload) => this.communitiesService.invitePeopleToCommunity(payload)
      .map(res => ({ type:  CommunitiesActions.COMMUNITY_INVITE_PEOPLE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: CommunitiesActions.COMMUNITY_INVITE_PEOPLE_FAILED, payload: res }))
    );

  @Effect()
  deleteCommunity$ = this.actions$
    .ofType(CommunitiesActions.COMMUNITY_DELETE)
    .map(toPayload)
    .switchMap((payload) => this.communitiesService.deleteCommunity(payload)
      .map(res => ({ type: CommunitiesActions.COMMUNITY_DELETE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: CommunitiesActions.COMMUNITY_DELETE_FAILED, payload: res }))
    );

  @Effect()
  updateCommunity$ = this.actions$
    .ofType(CommunitiesActions.COMMUNITY_UPDATE)
    .map(toPayload)
    .switchMap((payload) => this.communitiesService.updateCommunity(payload)
      .map(res => ({ type: CommunitiesActions.COMMUNITY_UPDATE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: CommunitiesActions.COMMUNITY_UPDATE_FAILED, payload: res }))
    );

  @Effect()
  communityMemberList$ = this.actions$
    .ofType(CommunitiesActions.COMMUNITY_MEMBER_LIST)
    .map(toPayload)
    .switchMap((payload) => this.communitiesService.memberListCommunity(payload)
      .map(res => ({ type: CommunitiesActions.COMMUNITY_MEMBER_LIST_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: CommunitiesActions.COMMUNITY_MEMBER_LIST_FAILED, payload: res }))
    );

  @Effect()
  communityAdminChange$ = this.actions$
    .ofType(CommunitiesActions.COMMUNITY_ADMIN_CHANGE)
    .map(toPayload)
    .switchMap((payload) => this.communitiesService.changeAdminRole(payload)
      .map(res => ({ type: CommunitiesActions.COMMUNITY_ADMIN_CHANGE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: CommunitiesActions.COMMUNITY_ADMIN_CHANGE_FAILED, payload: res }))
    );


    constructor(
    private actions$: Actions,
    private communitiesService: CommunitiesService,
  ) {}
}
