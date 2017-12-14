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

import { ClaimProfileService } from '../services/claim-profile.service';
import { ClaimProfileActions } from '../actions/claim-profile.action';

@Injectable()
export class ClaimProfileEffect {

   /**
   * Get spotfeeds
   */
  @Effect()
  searchProfile$ = this.actions$
    .ofType(ClaimProfileActions.SEARCH_PROFILE)
    .map(toPayload)
    .switchMap((payload) => this.claimProfileService.searchProfile(payload)
      .map(res => ({ type: ClaimProfileActions.SEARCH_PROFILE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ClaimProfileActions.SEARCH_PROFILE_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

    constructor(
        private actions$: Actions,
        private claimProfileService: ClaimProfileService
    ) { }

}
