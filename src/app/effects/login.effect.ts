import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

//rxj
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';


import { LoginService } from '../services/login.service';
import { LoginActions } from '../actions/login.action';

@Injectable()
export class LoginEffect {

  constructor(private actions$: Actions, private loginService: LoginService) { }

  @Effect()
  loadGallery$ = this.actions$
      .ofType(LoginActions.USER_LOGIN)
      .map(toPayload)
      .switchMap((payload) => this.loginService.login(payload)
        .map(res => ({ type: LoginActions.USER_LOGIN_SUCCESS, payload: res }))
        .catch((res) => Observable.of({ type: LoginActions.USER_LOGIN_FAILED, payload: res }))
      );

}
