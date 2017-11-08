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
      // localStorage.setItem('accountStatus', JSON.stringify({ 'profileType': 'org', 'handle': payload }));
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

    /**
     * Load image to database
     */
    case OrganizationActions.IMAGE_UPLOAD_SERVER:
      return Object.assign({}, state, {
        profile_img_upload_loading: true,
        image_upload_starting: true,
        image_upload_success: false,
        success: true
      });

    case OrganizationActions.IMAGE_UPLOAD_SERVER_SUCCESS:
      return Object.assign({}, state, {
        profileImage: payload['SUCCESS'],
        image_upload_success: true,
        image_upload_starting: false,
        profile_img_upload_loading: false,
        success: true
      });

    case OrganizationActions.IMAGE_UPLOAD_SERVER_FAILED:
      return Object.assign({}, state, {
        image_upload_starting: false,
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

    /**
     * Get Org Profile Deatils
     */
    case OrganizationActions.ORG_PROFILE_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        org_profile_details: payload
      });


    default:
      return state;
  }

}
