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
     *  Load image to database
     */
    @Effect()
    loadProfileImage$ = this._actions$
        .ofType(OrganizationActions.IMAGE_UPLOAD_SERVER)
        .map(toPayload)
        .switchMap((payload) => this._orgService.uploadImageServer(payload)
        .map(res => ({ type: OrganizationActions.IMAGE_UPLOAD_SERVER_SUCCESS, payload: res }))
        .catch((res) => Observable.of({ type: OrganizationActions.IMAGE_UPLOAD_SERVER_FAILED, payload: res }))
        );

    /**
     *  Update organization profile
     */
    @Effect()
    updateOrganization$ = this._actions$
        .ofType(OrganizationActions.ORG_PROFILE_UPDATE)
        .map(toPayload)
        .switchMap((payload) => this._orgService.updateOrganization(payload)
            .map(res => ({ type: OrganizationActions.ORG_PROFILE_UPDATE_SUCCESS, payload: res }))
            .catch((res) => Observable.of({ type: OrganizationActions.ORG_PROFILE_UPDATE_FAILED, payload: res }))
        );

    /**
     *  Get organization profile details
     */
    @Effect()
    detailsOrganizaation$ = this._actions$
        .ofType(OrganizationActions.ORG_PROFILE_DETAILS)
        .map(toPayload)
        .switchMap((payload) => this._orgService.detailOrganization(payload)
            .map(res => ({ type: OrganizationActions.ORG_PROFILE_DETAILS_SUCCESS, payload: res }))
            .catch((res) => Observable.of({ type: OrganizationActions.IMAGE_UPLOAD_SERVER_FAILED, payload: res }))
        );



//   /**
//    *  Save image to ProfileUI
//    */
//    @Effect()
//    loadProfileImageSuccess$ = this._actions$
//    .ofType(ProfileActions.LOAD_PROFILE_IMAGE_SUCCESS)
//    .map(toPayload)
//    .switchMap((payload) => this.profileService.saveProfileImage(payload)
//      .map(res => ({ type: ProfileActions.SAVE_PROFILE_IMAGE_SUCCESS, payload: res }))
//      .catch((res) => Observable.of({ type: ProfileActions.SAVE_PROFILE_IMAGE_FAILED, payload: res }))
//     );

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
