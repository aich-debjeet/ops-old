import { Action } from '@ngrx/store';

export class OrganizationActions {

    // Organization Registration
    static ORGANIZATION_REGISTRATION = 'ORGANIZATION_REGISTRATION';
    static ORGANIZATION_REGISTRATION_SUCCESS = 'ORGANIZATION_REGISTRATION_SUCCESS';
    static ORGANIZATION_REGISTRATION_FAILED = 'ORGANIZATION_REGISTRATION_FAILED';

    // Organization image upload Server
    static IMAGE_UPLOAD_SERVER = 'IMAGE_UPLOAD_SERVER';
    static IMAGE_UPLOAD_SERVER_SUCCESS = 'IMAGE_UPLOAD_SERVER_SUCCESS';
    static IMAGE_UPLOAD_SERVER_FAILED = 'IMAGE_UPLOAD_SERVER_FAILED';

    // Organization profile image upload
    static ORG_PROFILE_IMAGE_UPLOAD = 'ORG_PROFILE_IMAGE_UPLOAD';
    static ORG_PROFILE_IMAGE_UPLOAD_SUCCESS = 'ORG_PROFILE_IMAGE_UPLOAD_SUCCESS';
    static ORG_PROFILE_IMAGE_UPLOAD_FAILED = 'ORG_PROFILE_IMAGE_UPLOAD_FAILED';

    // Organization profile Update
    static ORG_PROFILE_UPDATE = 'ORG_PROFILE_UPDATE';
    static ORG_PROFILE_UPDATE_SUCCESS = 'ORG_PROFILE_UPDATE_SUCCESS';
    static ORG_PROFILE_UPDATE_FAILED = 'ORG_PROFILE_UPDATE_FAILED';
}
