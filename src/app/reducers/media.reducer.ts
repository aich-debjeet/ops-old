import { ActionReducer, Action } from '@ngrx/store';
import { Login, initialTag } from '../models/auth.model';

import { MediaActions } from '../actions/media.action';

export const MediaReducer: ActionReducer<any> = (state = initialTag, {payload, type}: Action) =>  {
  switch (type) {
    case MediaActions.STATUS_SAVE:
      return Object.assign({}, state, {
        success: true
      });

    case MediaActions.MEDIA_UPLOAD:
      return Object.assign({}, state, {
        uploaded: false,
        uploading: true
      });

    case MediaActions.MEDIA_UPLOAD_SUCCESS:
      return Object.assign({}, state, {
        uploaded: true,
        uploading: true,
        uploaded_files: payload
      });

    default:
      return state;
  }
}

