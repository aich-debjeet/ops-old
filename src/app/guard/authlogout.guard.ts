import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Login, UserTag, initialTag } from '../models/auth.model';
import { Observable } from 'rxjs/Observable';

import { AuthActions } from './../actions/auth.action';
import { AuthService } from './../services/auth.service';

@Injectable()
export class AuthlogoutGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.isLoggedIn().map(e => {
            if (e) {
                this.router.navigate(['/home']);
                return false;
            }
        }).catch(() => {
            return Observable.of(true);
        });
    }

}
