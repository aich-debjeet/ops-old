import { ActionReducer, Action } from '@ngrx/store';
import { EventActions } from '../actions/event.action';
import { EventModal, initialTag  } from '../models/event.model';

export const EventReducer: ActionReducer<any> = (state = initialTag, {payload, type}: Action) =>  {

  switch (type) {

    case EventActions.GET_EVENT_TYPE:
      return Object.assign({}, state, {
        eventType_load_success: false
      })

    case EventActions.GET_EVENT_TYPE_SUCCESS:
    console.log(payload.SUCCESS)
      return Object.assign({}, state, {
        eventType_success: true,
        eventType_load: payload.SUCCESS
      })

    case EventActions.EVENT_ATTENDEE_LOAD:
      return Object.assign({}, state, {
        attendee_load_success: false
      })

    case EventActions.EVENT_ATTENDEE_LOAD_SUCCESS:
    console.log(payload.SUCCESS)
      return Object.assign({}, state, {
        attendee_load_success: true,
        attendee_load: payload.SUCCESS
      })

    case EventActions.BANNER_SEARCH:
      return Object.assign({}, state, {
        banner_success: false
      });

    case EventActions.BANNER_SEARCH_SUCCESS:
    console.log(payload)
      return Object.assign({}, state, {
        bannerload: payload,
        banner_success: true
      });
    
    case EventActions.EVENT_REG:
      return Object.assign({}, state, {
        event_create_success: false,
      });
    case EventActions.EVENT_REG_SUCCESS:
      return Object.assign({}, state, {
        event_create_success: true,
        event_id: payload['SUCCESS'].id
      });

    case EventActions.EVENT_DETAILS_LOAD:
      return Object.assign({}, state, {
        event_detail: []
      });

    case EventActions.EVENT_DETAILS_LOAD_SUCCESS:
      return Object.assign({}, state, {
        event_detail: payload
      });

    case EventActions.GET_ALL_INDUSTRY_SUCCESS:
    console.log(payload)
      return Object.assign({}, state, {
        all_industry: payload
      });

    case EventActions.FILE_UPLOAD:
      return Object.assign({}, state, {
        fileupload_success: false
      });

    case EventActions.FILE_UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        fileUpload: payload['SUCCESS'],
        fileupload_success: true
      });

    case EventActions.EVENT_LIST_SUCCESS:
      return Object.assign({}, state, {
        event_list: payload['SUCCESS'],
      });

    case EventActions.EVENT_SEARCH:
      return Object.assign({}, state, {
        event_list: [],
        event_loading: true
      });

    case EventActions.EVENT_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        event_list: payload['SUCCESS'],
        event_loading: false
      });

    case EventActions.EVENT_TYPE_LOAD_SUCCESS:
      return Object.assign({}, state, {
        event_type: payload,
      });

    case EventActions.DWC_CONTACT_FORM:
      return Object.assign({}, state, {
        dwc_contact_form_uploading: true,
        dwc_contact_form_req_body: payload
      });

    case EventActions.DWC_CONTACT_FORM_SUCCESS:
      return Object.assign({}, state, {
        dwc_contact_form_uploading: false,
        dwc_contact_form_res_body: payload,
        dwc_contact_form_upload_success: true
      });

    case EventActions.DWC_CONTACT_FORM_FAILED:
      return Object.assign({}, state, {
        dwc_contact_form_uploading: false,
        dwc_contact_form_upload_success: false
      });

    case EventActions.DWC_PAYMENT_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        dwc_payment_url: payload,
      });

    // dwc event reg
    case EventActions.DWC_EVENT_REG_SUCCESS:
      return Object.assign({}, state, {
        dwc_event_reg_success: true,
      });

    case EventActions.DWC_EVENT_REG_FAILED:
      return Object.assign({}, state, {
        dwc_event_reg_success: false,
        err_msg: payload.statusText
      });

    case EventActions.DWC_EVENT_REG:
      return Object.assign({}, state, {
        dwc_event_reg_success: false,
        err_msg: null
      });

    default:
      return state;

  }

}
