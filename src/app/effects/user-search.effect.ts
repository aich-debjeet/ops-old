import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { ApiService } from '../services/api.service';
import { UserSearchActions } from '../actions/user-search.action';

@Injectable()
export class UserSearchEffect {

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {
    console.log('message effects');
  }

  @Effect()
  sentMessages$ = this.actions$
    .ofType(UserSearchActions.USER_SEARCH)
    .map(toPayload)
    .switchMap((payload) => this.apiService.userSearch()
      .map(res => ({ type: UserSearchActions.USER_SEARCH_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: UserSearchActions.USER_SEARCH_FAILED, payload: res }))
    );

}
