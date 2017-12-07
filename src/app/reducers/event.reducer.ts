import { ActionReducer, Action } from '@ngrx/store';
import { EventActions } from '../actions/event.action';
import { EventModal, initialTag  } from '../models/event.model';

export const EventReducer: ActionReducer<any> = (state = initialTag, {payload, type}: Action) =>  {

  switch (type) {
    case EventActions.EVENT_REG_SUCCESS:
      return Object.assign({}, state, {
        event_create_success: true,
        event_id: payload['SUCCESS'].id
      });

    case EventActions.EVENT_DETAILS_LOAD_SUCCESS:
      return Object.assign({}, state, {
        event_detail: payload
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

    case EventActions.EVENT_SEARCH_SUCCESS:
      return Object.assign({}, state, {
        event_list: payload['SUCCESS'],
      });

    case EventActions.EVENT_TYPE_LOAD_SUCCESS:
      return Object.assign({}, state, {
        event_type: payload,
      });

    default:
      return state;

  }

}
