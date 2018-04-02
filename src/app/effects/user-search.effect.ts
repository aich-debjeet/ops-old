import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { GeneralService } from '../services/api.service';
import { UserSearchActions } from '../actions/user-search.action';

@Injectable()
export class UserSearchEffect {
  @Effect()
  searchedUsers$ = this.actions$
    .ofType(UserSearchActions.USER_SEARCH)
    .map(toPayload)
    .switchMap((payload) => this.apiService.userSearch()
      .map(res => ({ type: UserSearchActions.USER_SEARCH_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: UserSearchActions.USER_SEARCH_FAILED, payload: res }))
    );

  @Effect()
  msgSearchedUsers$ = this.actions$
    .ofType(UserSearchActions.MESSAGE_USER_SEARCH)
    .map(toPayload)
    .switchMap((payload) => this.apiService.messageUserSearch(payload)
      .map(res => ({ type: UserSearchActions.MESSAGE_USER_SEARCH_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: UserSearchActions.MESSAGE_USER_SEARCH_FAILED, payload: res }))
    );

  constructor(
    private actions$: Actions,
    private apiService: GeneralService
  ) {
    //
  }
}
