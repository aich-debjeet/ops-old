import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Rx'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { ExploreService } from '../services/explore.service';
import { ExploreActions } from '../actions/explore.action';

@Injectable()
export class ExploreEffect {

   /**
   * Get spotfeeds
   */
  @Effect()
  exploreSpotfeeds$ = this.actions$
    .ofType(ExploreActions.LOAD_SPOTFEEDS)
    .map(toPayload)
    .switchMap((payload) => this.exploreService.getSpotfeeds()
      .map(res => ({ type: ExploreActions.LOAD_SPOTFEEDS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ExploreActions.LOAD_SPOTFEEDS_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

    constructor(
        private actions$: Actions,
        private exploreService: ExploreService
    ) { }

}
