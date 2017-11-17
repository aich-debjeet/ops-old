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


    case OrganizationActions.ORGANIZATION_DELETE:
    console.log('about to delete')
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

      /**
       * get default settings of an organization
       */

      case OrganizationActions.GET_ORGANIZATION_BY_HANDLE:
      console.log('GET_ORGANIZATION_BY_HANDLE')
        return Object.assign({}, state, {
          defaultSettings: []

        });
      case OrganizationActions.GET_ORGANIZATION_BY_HANDLE_SUCCESS:
          console.log('GET_ORGANIZATION_BY_HANDLE success');
          console.log(payload)
        return Object.assign({}, state, {
          defaultSettings: payload.extras.settings
        });

      case OrganizationActions.GET_ORGANIZATION_BY_HANDLE_FAILED:
      console.log('GET_ORGANIZATION_BY_HANDLE failed');
        return Object.assign({}, state, {
          success: false
        });

    default:
      return state;
  }

}
