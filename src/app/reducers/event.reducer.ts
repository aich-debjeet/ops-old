import { ActionReducer, Action } from '@ngrx/store';
import { EventActions } from '../actions/event.action';
import { EventModal, initialTagEve  } from '../models/event.model';

export const EventReducer: ActionReducer<any> = (state = initialTagEve, {payload, type}: Action) =>  {

  switch (type) {

    case EventActions.BOOKAMRK_FLAG_UPDATE:
      return Object.assign({}, state, {
        event_detail: {
          ...state.event_detail,
          extras: {
            ...state.event_detail.extras,
            isBookmarked: payload.isBookmarked
          }
        }
      });

    case EventActions.EVENT_EDIT:
      return Object.assign({}, state, {
        event_update: [],
        event_updated : false,
      })

    case EventActions.EVENT_EDIT_SUCCESS:
      return Object.assign({}, state, {
        event_update : payload,
        event_updated: true
      })

    case EventActions.GET_EVENT_TYPE:
      return Object.assign({}, state, {
        eventType_load_success: false
      })

    case EventActions.GET_EVENT_TYPE_SUCCESS:
      return Object.assign({}, state, {
        eventType_success: true,
        eventType_load: payload.SUCCESS
      })

      case EventActions.EVENT_DELETE:
      return Object.assign({}, state, {
        event_del_success: false
      })

    case EventActions.EVENT_DELETE_SUCCESS:
      return Object.assign({}, state, {
        event_del_success: true,
      })

    case EventActions.EVENT_ATTENDEE_LOAD:
      return Object.assign({}, state, {
        attendee_load_success: false
      })

    case EventActions.EVENT_ATTENDEE_LOAD_SUCCESS:
      return Object.assign({}, state, {
        attendee_load_success: true,
        attendee_load: payload.SUCCESS
      })

    case EventActions.BANNER_SEARCH:
      return Object.assign({}, state, {
        banner_success: false
      });

    case EventActions.BANNER_SEARCH_SUCCESS:
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
        event_detail: undefined
      });

    case EventActions.EVENT_DETAILS_LOAD_SUCCESS:
      return Object.assign({}, state, {
        event_detail: payload
      });

    case EventActions.EVENT_DETAILS_LOAD_FAILED:
      return Object.assign({}, state, {
        event_detail_error: payload
      });

    case EventActions.GET_ALL_INDUSTRY_SUCCESS:
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
    if (payload.scrollId === '') {
      return Object.assign({}, state, {
        event_list: [],
        event_loading: true,
        event_loaded: false,
      });
    } else {
      return Object.assign({}, state, {
        event_loading: true,
        event_loaded: false,
      });
    }

    case EventActions.EVENT_SEARCH_SUCCESS:
      let elastic_list = [];
      let filterList = [];
      if (state && state['event_list'] && state['event_list'].length > 0) {
        elastic_list = [...state['event_list'], ...payload['eventResponse']];
        filterList = [...state['event_filter'], ...payload.filterList];
      } else {
          elastic_list = payload['eventResponse'];
          filterList = payload.filterList;
      }
      return Object.assign({}, state, {
        event_filter: filterList,
        event_list: elastic_list,
        event_loading: false,
        event_loaded: true,
        event_scroll_id: payload.scrollId
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
