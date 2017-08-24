import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { MediaService } from '../services/media.service';
import { MediaActions } from '../actions/media.action';

@Injectable()
export class MediaEffect {

  /**
   * Post Status
   */
  @Effect()
  postStatusType$ = this.actions$
    .ofType(MediaActions.STATUS_SAVE)
    .map(toPayload)
    .switchMap((payload) => this.mediaService.postStatus(payload)
      .map(res => ({ type: MediaActions.STATUS_SAVE_SUCCESS, payload: res }))
    );

  constructor(
      private actions$: Actions,
      private mediaService: MediaService
    ) {}
}
