import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


import { AuthService } from '../services/auth.service';
import { AuthActions } from '../actions/auth.action';

@Injectable()
export class LoginEffect {
  constructor(
    private actions$: Actions,
    private loginService: AuthService
  ) {}
  @Effect()
  loadGallery$ = this.actions$
    .ofType(AuthActions.USER_LOGIN)
    .map(toPayload)
    .switchMap((payload) => this.loginService.login(payload)
      .map(res => ({ type: AuthActions.USER_LOGIN_SUCCESS, payload: res }))
      .catch((res) => Observable.of({ type: AuthActions.USER_LOGIN_FAILED, payload: res }))
    );

}
