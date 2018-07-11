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
        channel_loading: true,
        channel_loaded: false,
        channel_detail: []
      });

    case MediaActions.GET_CHANNEL_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        channel_loading: false,
        channel_loaded: true,
        channel_detail: payload
      });

    case MediaActions.GET_CHANNEL_DETAILS_FAILED:
      return Object.assign({}, state, {
        channel_loading: false,
        channel_loaded: false,
        success: false
      });

    // Get Media Details
    case MediaActions.MEDIA_DETAILS:
      return Object.assign({}, state, {
        media_detail_loading: true,
        media_detail: []
      });

    case MediaActions.MEDIA_DETAILS_SUCCESS:
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
      return Object.assign({}, state, {
        media_comment_loading: true,
        media_post_success: false,
        media_comment: []
      });

    case MediaActions.MEDIA_COMMENT_FETCH_SUCCESS:
      return Object.assign({}, state, {
        media_comment_loading: false,
        media_post_success: false,
        media_comment: payload
      });

    case MediaActions.MEDIA_COMMENT_FETCH_FAILED:
      return Object.assign({}, state, {
        media_comment_loading: false,
        media_comment_failed: true,
        // media_comment: []
      });

    case MediaActions.DELETE_COMMENT_SUCCESS:
      return Object.assign({}, state, {
        media_comment: state.media_comment ? state.media_comment.filter(comment => comment.commentsId !== payload.id) : []
      });

    // Media comment success
    case MediaActions.POST_COMMENT:
      return Object.assign({}, state, {
        comment_post_loading: true
      });

    case MediaActions.POST_COMMENT_SUCCESS:
      return Object.assign({}, state, {
        media_post_success: true,
        comment_post_loading: false,
        media_comment: state.media_comment ? state.media_comment.concat(payload['comment']) : []
      });

    case MediaActions.POST_COMMENT_FAILED:
      return Object.assign({}, state, {
        comment_post_loading: false,
      });

    /**
     * Get User Media Post
     */
    case MediaActions.LOAD_USER_MEDIA:
      return Object.assign({}, state, {
        user_posts_loading: true,
        user_posts_loaded: false,
        // user_posts: []
      });

    case MediaActions.LOAD_USER_MEDIA_SUCCESS:
      return Object.assign({}, state, {
        mediaEntity: payload,
        user_posts_loaded: true,
        user_posts_loading: false,
        user_posts: payload
      });

    case MediaActions.LOAD_USER_MEDIA_FAILED:

      return Object.assign({}, state, {
        user_posts_loaded: false,
        user_posts_loading: false
      });

    case MediaActions.LOAD_MY_MEDIA:
      if (payload.offset === 0) {
        return Object.assign({}, state, {
          my_media: []
        });
      }
      return Object.assign({}, state, {
          my_media_loading: false
      });


    case MediaActions.LOAD_MY_MEDIA_SUCCESS:
      const new_media = state.my_media.concat(payload)
      return Object.assign({}, state, {
        my_media: new_media
      });

  /**
   * MEDIA_POST_DELETE
   */
    case MediaActions.MEDIA_POST_DELETE_SUCCESS:
      return Object.assign({}, state, {
        media_delete_msg: payload.SUCCESS,
        channel_detail: {
          ...state.channel_detail,
          spotCount: state.channel_detail ? state.channel_detail.spotCount - 1 : null
        }
      });
  /**
   * Media_Edit
   */
  case MediaActions.MEDIA_EDIT_SUCCESS:
    return Object.assign({}, state, {
      media_edit_msg: payload.SUCCESS
    });

  case MediaActions.MEDIA_NEXT_SUCCESS:
    return Object.assign({}, state, {
      media_carousel: payload
    });

/**
 * media report
 */
    case MediaActions.MEDIA_POST_REPORT:
        return Object.assign({}, state, {
          reports:[]
        });
    case MediaActions.MEDIA_POST_REPORT_SUCCESS:
        // console.log(payload)
        return Object.assign({}, state, {
          reports: payload.Success.questions
        });
    case MediaActions.MEDIA_POST_REPORT_FAILED:
        return Object.assign({}, state, {
          reports:[]
        });

    default:
      return state;
  }
}

