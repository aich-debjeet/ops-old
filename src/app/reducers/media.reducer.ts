import { ActionReducer, Action } from '@ngrx/store';
import { Login, initialTag } from '../models/auth.model';

import { MediaActions } from '../actions/media.action';

export const MediaReducer: ActionReducer<any> = (state = initialTag, {payload, type}: Action) =>  {
  switch (type) {
    case MediaActions.STATUS_SAVE:
      return Object.assign({}, state, {
        success: true
      });

    default:
      return state;
  }
}

