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
    @Effect()
        deleteOrganization$ = this._actions$
            .ofType(OrganizationActions.ORGANIZATION_DELETE)
            .map(toPayload)
            .switchMap((payload) => this._orgService.delOrganization(payload)
                .map(res => ({ type: OrganizationActions.ORGANIZATION_DELETE_SUCCESS, payload: res }))
                .catch((res) => Observable.of({ type: OrganizationActions.ORGANIZATION_DELETE_FAILED, payload: res }))
            );

    @Effect()
        getReceipient$ = this._actions$
              .ofType(OrganizationActions.GET_RECEIPIENT)
              .map(toPayload)
              .switchMap((payload) => this._orgService.getReceipientDetails( payload )
                .map(res => ({ type: OrganizationActions.GET_RECEIPIENT_SUCCESS, payload: res }))
                .catch((res) => Observable.of({ type: OrganizationActions.GET_RECEIPIENT_FAILED, payload: res }))
              );

    @Effect()
        getMembers$ = this._actions$
            .ofType(OrganizationActions.GET_MEMBERS)
            .map(toPayload)
            .switchMap((payload) => this._orgService.getOrganizationMembers( payload )
                 .map(res => ({ type: OrganizationActions.GET_MEMBERS_SUCCESS, payload: res }))
                 .catch((res) => Observable.of({ type: OrganizationActions.GET_MEMBERS_FAILED, payload: res }))
            );

    /**
     * 
     * getting default settings of an organization
     * @param _orgService
     */
    @Effect()
        getSettings$ = this._actions$
            .ofType(OrganizationActions.GET_ORGANIZATION_BY_HANDLE)
            .map(toPayload)
            .switchMap((payload) => this._orgService.getDefaultSettings( payload )
                 .map(res => ({ type: OrganizationActions.GET_ORGANIZATION_BY_HANDLE_SUCCESS, payload: res }))
                 .catch((res) => Observable.of({ type: OrganizationActions.GET_ORGANIZATION_BY_HANDLE_FAILED, payload: res }))
            );



   constructor(
    private _actions$: Actions,
    private _orgService: OrganizationService,
  ) {}
}
