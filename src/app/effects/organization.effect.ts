import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
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
     * Cover image upload
     */
    @Effect()
    loadCoverImage$ = this._actions$
        .ofType(OrganizationActions.ORG_COVER_IMAGE_UPLOAD)
        .map(toPayload)
        .switchMap((payload) => this._orgService.uploadImageServer(payload)
            .map(res => ({ type: OrganizationActions.ORG_COVER_IMAGE_UPLOAD_SUCCESS, payload: res }))
            .catch((res) => Observable.of({ type: OrganizationActions.ORG_COVER_IMAGE_UPLOAD_FAILED, payload: res }))
        );

    /**
     *  Profile image uplod
     */
    @Effect()
    loadProfileImage$ = this._actions$
        .ofType(OrganizationActions.ORG_PROFILE_IMAGE_UPLOAD)
        .map(toPayload)
        .switchMap((payload) => this._orgService.uploadImageServer(payload)
            .map(res => ({ type: OrganizationActions.ORG_PROFILE_IMAGE_UPLOAD_SUCCESS, payload: res }))
            .catch((res) => Observable.of({ type: OrganizationActions.ORG_PROFILE_IMAGE_UPLOAD_FAILED, payload: res }))
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
        .switchMap((payload) => this._orgService.getReceipientDetails(payload)
            .map(res => ({ type: OrganizationActions.GET_RECEIPIENT_SUCCESS, payload: res }))
            .catch((res) => Observable.of({ type: OrganizationActions.GET_RECEIPIENT_FAILED, payload: res }))
        );

    @Effect()
    getMembers$ = this._actions$
        .ofType(OrganizationActions.GET_MEMBERS)
        .map(toPayload)
        .switchMap((payload) => this._orgService.getOrganizationMembers(payload)
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
        .switchMap((payload) => this._orgService.getDefaultSettings(payload)
            .map(res => ({ type: OrganizationActions.GET_ORGANIZATION_BY_HANDLE_SUCCESS, payload: res }))
            .catch((res) => Observable.of({ type: OrganizationActions.GET_ORGANIZATION_BY_HANDLE_FAILED, payload: res }))
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
            .catch((res) => Observable.of({ type: OrganizationActions.ORG_PROFILE_DETAILS_FAILED, payload: res }))
        );

    /**
     *  Get organization profile navigation details
     */
    @Effect()
    orgNavDetails$ = this._actions$
        .ofType(OrganizationActions.ORG_PROFILE)
        .map(toPayload)
        .switchMap((payload) => this._orgService.orgNavigationDetails(payload)
            .map(res => ({ type: OrganizationActions.ORG_PROFILE_SUCCESS, payload: res }))
            .catch((res) => Observable.of({ type: OrganizationActions.ORG_PROFILE_FAILED, payload: res }))
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

    /**
     * Loading organization
     */
    @Effect()
    loadOrgChannels$ = this._actions$
        .ofType(OrganizationActions.LOAD_ORG_CHANNELS)
        .map(toPayload)
        .switchMap((payload) => this._orgService.loadOrgChannels(payload)
            .map(res => ({ type: OrganizationActions.LOAD_ORG_CHANNELS_SUCCESS, payload: res }))
            .catch((res) => Observable.of({ type: OrganizationActions.LOAD_ORG_CHANNELS_FAILED, payload: res }))
        );

    /**
     * Sending invitation to join org
     */
    @Effect()
    inviteMember$ = this._actions$
        .ofType(OrganizationActions.INVITE_MEMBER)
        .map(toPayload)
        .switchMap((payload) => this._orgService.inviteMember(payload)
            .map(res => ({ type: OrganizationActions.INVITE_MEMBER_SUCCESS, payload: res }))
            .catch((res) => Observable.of({ type: OrganizationActions.INVITE_MEMBER_FAILED, payload: res }))
        );

    constructor(
        private _actions$: Actions,
        private _orgService: OrganizationService,
    ) { }
}
