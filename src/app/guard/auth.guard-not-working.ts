import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Login, UserTag, initialTag } from '../models/auth.model';
import { Observable } from 'rxjs/Observable';

import { AuthActions } from './../actions/auth.action';
import { AuthService } from './../services/auth.service';

import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<Login>
    ) {
      this.store.dispatch({ type: AuthActions.USER_LOGGED_IN });
    }
    public canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean> | Promise<boolean> | boolean {
        const observable: Observable<boolean> = this.store.select('loginTags');
        return observable.map(val => {
          console.log('AuthActions.USER_LOGGED_IN response');
          console.log(val);
            if (val) {
                return true;
            } else {
                this.router.navigateByUrl('/');
                return false;
            }
        });
    }
}
