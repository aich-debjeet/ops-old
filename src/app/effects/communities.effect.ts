import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
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

    constructor(
    private actions$: Actions,
    private communitiesService: CommunitiesService,
  ) {}
}
