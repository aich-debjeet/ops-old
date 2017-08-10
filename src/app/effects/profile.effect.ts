import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { ApiService } from '../services/api.service';
import { ProfileActions } from '../actions/profile.action';

@Injectable()
export class ProfileEffect {

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) { }

  @Effect()
  loadUserProfile$ = this.actions$
    .ofType(ProfileActions.LOAD_USER_PROFILE)
    .map(toPayload)
    .switchMap((payload) => this.apiService.getLoggedInProfile()
      .map(res => ({ type: ProfileActions.LOAD_USER_PROFILE_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.LOAD_USER_PROFILE_FAILED, payload: res }))
    );

  @Effect()
  loadUserMedia$ = this.actions$
    .ofType(ProfileActions.LOAD_USER_MEDIA)
    .map(toPayload)
    .switchMap((payload) => this.apiService.getLoggedInUsersMedia(payload)
      .map(res => ({ type: ProfileActions.LOAD_USER_MEDIA_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: ProfileActions.LOAD_USER_MEDIA_FAILED, payload: res }))
    );

}
