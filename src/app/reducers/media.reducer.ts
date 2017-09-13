import { ActionReducer, Action } from '@ngrx/store';
import { Media, initialMedia  } from '../models/media.model';
import { MediaActions } from '../actions/media.action';

export const MediaReducer: ActionReducer<any> = (state = initialMedia, {payload, type}: Action) =>  {
  switch (type) {
    case MediaActions.STATUS_SAVE:
      return Object.assign({}, state, {
        status_saved: false
      });
    case MediaActions.STATUS_SAVE_SUCCESS:
      return Object.assign({}, state, {
        status_saved: true
      });

    case MediaActions.STATUS_SAVE_FAILED:
      return Object.assign({}, state, {
        status_saved: false,
        status_error: payload
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

    // Get single channel details
    case MediaActions.GET_CHANNEL_DETAILS:
      return Object.assign({}, state, {
        success: true,
        channel_loading: false,
      });

    case MediaActions.GET_CHANNEL_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        channel_loading: true,
        channel_detail: payload
      });

    case MediaActions.GET_CHANNEL_DETAILS_FAILED:
      return Object.assign({}, state, {
        success: false
      });

    // Get Media Details
    case MediaActions.MEDIA_DETAILS:
    console.log(payload);
      return Object.assign({}, state, {
        media_detail_loading: true,
        media_detail: []
      });

    case MediaActions.MEDIA_DETAILS_SUCCESS:
      console.log(payload);
      return Object.assign({}, state, {
        media_detail_loading: false,
        media_detail: payload
      });

    case MediaActions.MEDIA_DETAILS_FAILED:
      return Object.assign({}, state, {
        media_detail_loading: false,
        media_detail_failed: true,
        media_detail: []
      });

    // Fetch Media comment
    case MediaActions.MEDIA_COMMENT_FETCH:
    console.log(state);
      return Object.assign({}, state, {
        media_comment_loading: true,
        media_post_success: false,
        media_comment: []
      });

    case MediaActions.MEDIA_COMMENT_FETCH_SUCCESS:
      console.log('comment loading');
      console.log(payload);
      return Object.assign({}, state, {
        media_comment_loading: false,
        media_post_success: false,
        media_comment: payload
      });

    case MediaActions.MEDIA_COMMENT_FETCH_FAILED:
      return Object.assign({}, state, {
        media_comment_loading: false,
        media_comment_failed: true,
        media_comment: []
      });

    // Media comment success
    case MediaActions.POST_COMMENT_SUCCESS:
      console.log('comment loading');
      return Object.assign({}, state, {
        media_post_success: true
      });



    default:
      return state;
  }
}

