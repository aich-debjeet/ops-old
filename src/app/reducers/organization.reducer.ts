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

    /**
     * Load image to database
     */
    case OrganizationActions.IMAGE_UPLOAD_SERVER:
      return Object.assign({}, state, {
        profile_img_upload_loading: true,
        success: true
      });

    case OrganizationActions.IMAGE_UPLOAD_SERVER_SUCCESS:
      return Object.assign({}, state, {
        profileImage: payload['SUCCESS'],
        image_upload_success: true,
        profile_img_upload_loading: false,
        success: true
      });

    case OrganizationActions.IMAGE_UPLOAD_SERVER_FAILED:
      return Object.assign({}, state, {
        success: false
      });

    /**
     * Org Profile Update
     */
    case OrganizationActions.ORG_PROFILE_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        org_profile_update_success: true
      });

    case OrganizationActions.ORG_PROFILE_UPDATE_FAILED:
      return Object.assign({}, state, {
        org_profile_update_failed: true
      });

    default:
      return state;
  }
}
