import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import {Observable} from 'rxjs/Rx'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';

import { ExploreService } from '../services/explore.service';
import { ExploreActions } from '../actions/explore.action';
import { MediaService } from '../services/media.service';

@Injectable()
export class ExploreEffect {

  /**
   * explore media post delete
   */
  @Effect()
  exploreMediaPostDelete$ = this.actions$
    .ofType(ExploreActions.EXPLORE_MEDIA_POST_DELETE)
    .map(toPayload)
    .switchMap((payload) => this.mediaService.mediaPostDelete(payload)
      .map(res => ({ type: ExploreActions.EXPLORE_MEDIA_POST_DELETE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ExploreActions.EXPLORE_MEDIA_POST_DELETE_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Get spotfeeds
   */
  @Effect()
  exploreSpotfeeds$ = this.actions$
    .ofType(ExploreActions.LOAD_SPOTFEEDS)
    .map(toPayload)
    .switchMap((payload) => this.exploreService.getSpotfeeds(payload)
      .map(res => ({ type: ExploreActions.LOAD_SPOTFEEDS_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ExploreActions.LOAD_SPOTFEEDS_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   * Get explore page data
   */
  @Effect()
  getExploreData$ = this.actions$
    .ofType(ExploreActions.GET_EXPLORE_DATA)
    .map(toPayload)
    .switchMap((payload) => this.exploreService.getExploreData(payload)
      .map(res => ({ type: ExploreActions.GET_EXPLORE_DATA_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: ExploreActions.GET_EXPLORE_DATA_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

    constructor(
        private actions$: Actions,
        private exploreService: ExploreService,
        private mediaService: MediaService
    ) { }

}
