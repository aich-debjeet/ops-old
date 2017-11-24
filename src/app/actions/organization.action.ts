import { Action } from '@ngrx/store';

export class OrganizationActions {

    // Organization Registration
    static ORGANIZATION_REGISTRATION = 'ORGANIZATION_REGISTRATION';
    static ORGANIZATION_REGISTRATION_SUCCESS = 'ORGANIZATION_REGISTRATION_SUCCESS';
    static ORGANIZATION_REGISTRATION_FAILED = 'ORGANIZATION_REGISTRATION_FAILED';

    // Load Organization
    static LOAD_ORGANIZATION = 'LOAD_ORGANIZATION';
    static LOAD_ORGANIZATION_SUCCESS = 'LOAD_ORGANIZATION_SUCCESS';
    static LOAD_ORGANIZATION_FAILED = 'LOAD_ORGANIZATION_FAILED';

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

    // Get Organization profile Details
    static ORG_PROFILE_DETAILS = 'ORG_PROFILE_DETAILS';
    static ORG_PROFILE_DETAILS_SUCCESS = 'ORG_PROFILE_DETAILS_SUCCESS';
    static ORG_PROFILE_DETAILS_FAILED = 'ORG_PROFILE_DETAILS_FAILED';
    static ORGANIZATION_DELETE = 'ORGANIZATION_DELETE';
    static ORGANIZATION_DELETE_SUCCESS = 'ORGANIZATION_DELETE_SUCCESS';
    static ORGANIZATION_DELETE_FAILED = 'ORGANIZATION_DELETE_FAILED';

    static GET_RECEIPIENT = 'GET_RECEIPIENT';
    static GET_RECEIPIENT_SUCCESS = 'GET_RECEIPIENT_SUCCESS';
    static GET_RECEIPIENT_FAILED = 'GET_RECEIPIENT_FAILED';

    static GET_MEMBERS = 'GET_MEMBERS';
    static GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS';
    static GET_MEMBERS_FAILED = 'GET_MEMBERS_FAILED';

    static GET_ORGANIZATION_BY_HANDLE = 'GET_ORGANIZATION_BY_HANDLE';
    static GET_ORGANIZATION_BY_HANDLE_SUCCESS = 'GET_ORGANIZATION_BY_HANDLE_SUCCESS';
    static GET_ORGANIZATION_BY_HANDLE_FAILED = 'GET_ORGANIZATION_BY_HANDLE_FAILED';

    static LOAD_ORG_CHANNELS = 'LOAD_ORG_CHANNELS';
    static LOAD_ORG_CHANNELS_SUCCESS = 'LOAD_ORG_CHANNELS_SUCCESS';
    static LOAD_ORG_CHANNELS_FAILED = 'LOAD_ORG_CHANNELS_FAILED';

    /*------------------------ get receipient details---------------------------------*/

  getReceipient(value) {
    console.log('GET_RECEIPIENT action triggred');
    return {
      type: OrganizationActions.GET_RECEIPIENT,
      payload: { value }
    };
  }
  getReceipientSuccess (value) {
    console.log('GET_RECEIPIENT_SUCCESS action triggred');
    return {
      type: OrganizationActions.GET_RECEIPIENT_SUCCESS,
      payload: { value }
    };
  }
  getReceipientFailure (value) {
    console.log('GET_RECEIPIENT_FAIlURE action triggred');
    return {
      type: OrganizationActions.GET_RECEIPIENT_FAILED,
      payload: { value }
    };
  }

  /*------------------------ get organization members---------------------------------*/
  getMembers(value) {
    console.log('GET_MEMBERS action triggred');
    return {
      type: OrganizationActions.GET_MEMBERS,
      payload: { value }
    };
  }
  getMembersSuccess (value) {
    console.log('GET_MEMBERS_SUCCESS action triggred');
    return {
      type: OrganizationActions.GET_MEMBERS_SUCCESS,
      payload: { value }
    };
  }
  getMembersFailure (value) {
    console.log('GET_MEMBERS_FAIlURE action triggred');
    return {
      type: OrganizationActions.GET_MEMBERS_FAILED,
      payload: { value }
    };
  }


  /*------------------------ get organization settings details by handle---------------------------------*/
  getDefaultSettings(value) {
    console.log('GET_ORGANIZATION_BY_HANDLE action triggred');
    return {
      type: OrganizationActions.GET_ORGANIZATION_BY_HANDLE,
      payload: { value }
    };
  }
  getDefaultSettingsSuccess (value) {
    console.log('GET_ORGANIZATION_BY_HANDLE_SUCCESS action triggred');
    return {
      type: OrganizationActions.GET_ORGANIZATION_BY_HANDLE_SUCCESS,
      payload: { value }
    };
  }
  getDefaultSettingsFailure (value) {
    console.log('GET_ORGANIZATION_BY_HANDLE_FAIlURE action triggred');
    return {
      type: OrganizationActions.GET_ORGANIZATION_BY_HANDLE_FAILED,
      payload: { value }
    };
  }
}
