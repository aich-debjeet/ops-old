import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { OrganizationService } from '../services/organization.service';
import { OrganizationActions } from '../actions/organization.action';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';



@Injectable()
export class OrganizationEffect {

    /**
     * Registration of Organization
     */
    @Effect()
        createOrganization$ = this._actions$
            .ofType(OrganizationActions.ORGANIZATION_REGISTRATION)
            .map(toPayload)
            .switchMap((payload) => this._orgService.regOrganization(payload)
                .map(res => ({ type: OrganizationActions.ORGANIZATION_REGISTRATION_SUCCESS, payload: res }))
                .catch((res) => Observable.of({ type: OrganizationActions.ORGANIZATION_REGISTRATION_FAILED, payload: res }))
            );

    /**
     * Loading organization
     */
    @Effect()
    loadOrganization$ = this._actions$
        .ofType(OrganizationActions.LOAD_ORGANIZATION)
        .map(toPayload)
        .switchMap((payload) => this._orgService.loadOrganization(payload)
            .map(res => ({ type: OrganizationActions.LOAD_ORGANIZATION_SUCCESS, payload: res }))
            .catch((res) => Observable.of({ type: OrganizationActions.LOAD_ORGANIZATION_FAILED, payload: res }))
        );

   constructor(
    private _actions$: Actions,
    private _orgService: OrganizationService,
  ) {}
}
