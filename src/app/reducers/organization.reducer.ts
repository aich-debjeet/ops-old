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
        status_saved: true
      });

    case OrganizationActions.ORGANIZATION_REGISTRATION_FAILED:
    console.log('registration failed');
      return Object.assign({}, state, {
        status_saved: false,
        status_error: payload
      });

    default:
      return state;
  }
}
