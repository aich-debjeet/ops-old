import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { SearchActions } from '../actions/search.action';
import { SearchService } from '../services/search.service';

@Injectable()
export class SearchEffect {

  @Effect()
  userSearch$ = this.actions$
    .ofType(SearchActions.SEARCH_PEOPLE)
    .map(toPayload)
    .switchMap((payload) => this.apiService.getPeople(payload)
      .map(res => ({ type: SearchActions.SEARCH_PEOPLE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: SearchActions.SEARCH_PEOPLE_FAILED, payload: res }))
    );

  constructor(
      private actions$: Actions,
      private apiService: SearchService
  ) {}
}
