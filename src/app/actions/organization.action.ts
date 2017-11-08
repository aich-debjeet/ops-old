import { Action } from '@ngrx/store';

export class OrganizationActions {

    // Organization Registration
    static ORGANIZATION_REGISTRATION = 'ORGANIZATION_REGISTRATION';
    static ORGANIZATION_REGISTRATION_SUCCESS = 'ORGANIZATION_REGISTRATION_SUCCESS';
    static ORGANIZATION_REGISTRATION_FAILED = 'ORGANIZATION_REGISTRATION_FAILED';

    static ORGANIZATION_DELETE = 'ORGANIZATION_DELETE';
    static ORGANIZATION_DELETE_SUCCESS = 'ORGANIZATION_DELETE_SUCCESS';
    static ORGANIZATION_DELETE_FAILED = 'ORGANIZATION_DELETE_FAILED';

    static GET_RECEIPIENT = 'GET_RECEIPIENT';
    static GET_RECEIPIENT_SUCCESS = 'GET_RECEIPIENT_SUCCESS';
    static GET_RECEIPIENT_FAILED = 'GET_RECEIPIENT_FAILED';

    static GET_MEMBERS = 'GET_MEMBERS';
    static GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS';
    static GET_MEMBERS_FAILED = 'GET_MEMBERS_FAILED';

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

}
