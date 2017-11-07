import { ActionReducer, Action } from '@ngrx/store';
import { Organization, initialOrganization } from '../models/organization.model';
import { OrganizationActions } from '../actions/organization.action';

export const OrganizationReducer: ActionReducer<any> = (state = initialOrganization, {payload, type}: Action) =>  {

  switch (type) {

    /* Create Org */
    case OrganizationActions.ORGANIZATION_REGISTRATION:
      return Object.assign({}, state, {
        status_saved: false
      });
    case OrganizationActions.ORGANIZATION_REGISTRATION_SUCCESS:
      // console.log('registration success');
      return Object.assign({}, state, {
        org_registration_success: true
      });
    case OrganizationActions.ORGANIZATION_REGISTRATION_FAILED:
      // console.log('registration failed');
      return Object.assign({}, state, {
        org_registration_failed: true
      });
    /* Create Org */

    /* Load Org */
    case OrganizationActions.LOAD_ORGANIZATION:
      localStorage.setItem('accountStatus', JSON.stringify({ 'profileType': 'org', 'handle': payload }));
      return Object.assign({}, state, {
        status: 'laoding',
        orgHandle: payload,
      });

    case OrganizationActions.LOAD_ORGANIZATION_SUCCESS:
      return Object.assign({}, state, {
        status: 'loaded',
        orgProfileDetails: payload,
      });

    case OrganizationActions.LOAD_ORGANIZATION_FAILED:
      return Object.assign({}, state, {
        status: 'failed'
      });
    /* Load Org */

    default:
      return state;
  }

}
