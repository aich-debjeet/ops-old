import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { HomeService } from '../services/home.service';
import { HomeActions } from '../actions/home.action';

@Injectable()
export class HomeEffect {

  @Effect()
  loadChannels$ = this.actions$
    .ofType(HomeActions.LOAD_CHANNELS)
    .map(toPayload)
    .switchMap((payload) => this.homeService.getChannels()
      .map(res => ({ type: HomeActions.LOAD_CHANNELS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: HomeActions.LOAD_CHANNELS_FAILED, payload: res }))
    );

  constructor(
    private actions$: Actions,
    private homeService: HomeService
  ) { }
}
