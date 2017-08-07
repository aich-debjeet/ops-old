import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { ApiService } from '../services/api.service';
import { HomeActions } from '../actions/home.action';

@Injectable()
export class HomeEffect {

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {
    console.log('home effects');
  }

  @Effect()
  loadChannels$ = this.actions$
    .ofType(HomeActions.LOAD_CHANNELS)
    .map(toPayload)
    .switchMap((payload) => this.apiService.getChannels(payload)
      .map(res => ({ type: HomeActions.LOAD_CHANNELS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: HomeActions.LOAD_CHANNELS_FAILED, payload: res }))
    );

}
