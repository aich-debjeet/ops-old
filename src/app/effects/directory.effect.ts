import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';
import { DirectoryActions } from '../actions/directory.action';
import { DirectoryService } from '../services/directory.service';

@Injectable()
export class DirectoryEffect {

  /**
   *  Load my Directory
   */
  @Effect()
  loadDirectory$ = this.actions$
    .ofType(DirectoryActions.LOAD_DIRECTORY)
    .map(toPayload)
    .switchMap((payload) => this.directoryService.loadDirectory(payload)
      .map(res => ({ type: DirectoryActions.LOAD_DIRECTORY_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: DirectoryActions.LOAD_DIRECTORY_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

  /**
   *  Load profile
   */
  @Effect()
  getProfile$ = this.actions$
    .ofType(DirectoryActions.GET_PROFILE)
    .map(toPayload)
    .switchMap((payload) => this.directoryService.getProfile(payload)
      .map(res => ({ type: DirectoryActions.GET_PROFILE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({
        type: DirectoryActions.GET_PROFILE_FAILED,
        payload: { errorStatus: res.status }
      }))
    );

    constructor(
        private actions$: Actions,
        private directoryService: DirectoryService
    ) { }

}
