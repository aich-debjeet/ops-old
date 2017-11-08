import { ActionReducer, Action } from '@ngrx/store';
import { Organization, initialOrganization } from '../models/organization.model';
import { OrganizationActions } from '../actions/organization.action';

export const OrganizationReducer: ActionReducer<any> = (state = initialOrganization, {payload, type}: Action) =>  {
  switch (type) {
    case OrganizationActions.ORGANIZATION_REGISTRATION:
      return Object.assign({}, state, {
        status_saved: false
      });
    case OrganizationActions.ORGANIZATION_REGISTRATION_SUCCESS:
        console.log('registration success');
      return Object.assign({}, state, {
        org_registration_success: true
      });

    case OrganizationActions.ORGANIZATION_REGISTRATION_FAILED:
    console.log('registration failed');
      return Object.assign({}, state, {
        org_registration_failed: true
      });

    case OrganizationActions.ORGANIZATION_DELETE:
      return Object.assign({}, state, {
        status_saved: false
      });
    case OrganizationActions.ORGANIZATION_DELETE_SUCCESS:
        console.log('deletion success');
      return Object.assign({}, state, {
        org_deletion_success: true
      });

    case OrganizationActions.ORGANIZATION_DELETE_FAILED:
    console.log('deletion failed');
      return Object.assign({}, state, {
        org_deletion_failed: true
      });

      case OrganizationActions.GET_RECEIPIENT:
      return Object.assign({}, state, {
      receipients: [],
      receipients_loaded: false
    });
    case OrganizationActions.GET_RECEIPIENT_SUCCESS:
      return Object.assign({}, state, {
        receipients: payload,
        receipients_loaded: true
      });
    case OrganizationActions.GET_RECEIPIENT_FAILED:
      return Object.assign({}, state, {
        success: false,
        receipients_loaded: false
      });



    case OrganizationActions.GET_MEMBERS:
    console.log('u will get success')
      return Object.assign({}, state, {
        members_loading: false
      });
    case OrganizationActions.GET_MEMBERS_SUCCESS:
        console.log('members success');
      return Object.assign({}, state, {
        members_loading: true,
        organizationMembers: payload
      });

    case OrganizationActions.GET_MEMBERS_FAILED:
    console.log('members failed');
      return Object.assign({}, state, {
        members_loading: false
      });

    default:
      return state;
  }
}
