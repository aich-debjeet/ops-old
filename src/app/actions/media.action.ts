import { Action } from '@ngrx/store';

export class MediaActions {

  static MEDIA_POST_REPORT = 'MEDIA_POST_REPORT';
  static MEDIA_POST_REPORT_SUCCESS = 'MEDIA_POST_REPORT_SUCCESS';
  static MEDIA_POST_REPORT_FAILED = 'MEDIA_POST_REPORT_FAILED';

  // Status
  static STATUS_SAVE = 'STATUS_SAVE';
  static STATUS_SAVE_SUCCESS = 'STATUS_SAVE_SUCCESS';
  static STATUS_SAVE_FAILED = 'STATUS_SAVE_FAILED';

  // Media
  static MEDIA_UPLOAD = 'MEDIA_UPLOAD';
  static MEDIA_UPLOAD_SUCCESS = 'MEDIA_UPLOAD_SUCCESS';
  static MEDIA_UPLOAD_FAILED = 'MEDIA_UPLOAD_FAILED';

  // Channel single page details
  static GET_CHANNEL_DETAILS = 'GET_CHANNEL_DETAILS';
  static GET_CHANNEL_DETAILS_SUCCESS = 'GET_CHANNEL_DETAILS_SUCCESS';
  static GET_CHANNEL_DETAILS_FAILED = 'GET_CHANNEL_DETAILS_FAILED';

  // Channel single page details
  static GET_CURRENT_CHANNEL_POST = 'GET_CURRENT_CHANNEL_POST';
  static GET_CURRENT_CHANNEL_POST_SUCCESS = 'GET_CURRENT_CHANNEL_POST_SUCCESS';
  static GET_CURRENT_CHANNEL_POST_FAILED = 'GET_CURRENT_CHANNEL_POST_FAILED';

  // Media popup details
  static MEDIA_DETAILS = 'MEDIA_DETAILS';
  static MEDIA_DETAILS_SUCCESS = 'MEDIA_DETAILS_SUCCESS';
  static MEDIA_DETAILS_FAILED = 'MEDIA_DETAILS_FAILED';

  // Media Next
  static MEDIA_NEXT = 'MEDIA_NEXT';
  static MEDIA_NEXT_SUCCESS = 'MEDIA_NEXT_SUCCESS';
  static MEDIA_NEXT_FAILED = 'MEDIA_NEXT_FAILED';

  // Post Comment
  static POST_COMMENT = 'POST_COMMENT';
  static POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
  static POST_COMMENT_FAILED = 'POST_COMMENT_FAILED';

  // Delete Comment
  static DELETE_COMMENT = 'DELETE_COMMENT';
  static DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
  static DELETE_COMMENT_FAILED = 'DELETE_COMMENT_FAILED';

  // Update Comment
  static UPDATE_COMMENT = 'UPDATE_COMMENT';
  static UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS';
  static UPDATE_COMMENT_FAILED = 'UPDATE_COMMENT_FAILED';

  // Comment Fetch
  static MEDIA_COMMENT_FETCH = 'MEDIA_COMMENT_FETCH';
  static MEDIA_COMMENT_FETCH_SUCCESS = 'MEDIA_COMMENT_FETCH_SUCCESS';
  static MEDIA_COMMENT_FETCH_FAILED = 'MEDIA_COMMENT_FETCH_FAILED';

  // Spot
  static MEDIA_SPOT = 'MEDIA_SPOT';
  static MEDIA_SPOT_SUCCESS = 'MEDIA_SPOT_SUCCESS';
  static MEDIA_SPOT_FAILED = 'MEDIA_SPOT_FAILED';

  // Unspot
  static MEDIA_UNSPOT = 'MEDIA_UNSPOT';
  static MEDIA_UNSPOT_SUCCESS = 'MEDIA_UNSPOT_SUCCESS';
  static MEDIA_UNSPOT_FAILED = 'MEDIA_UNSPOT_FAILED';

  // Load user Media
  static LOAD_USER_MEDIA = '[USER]LOAD_USER_MEDIA';
  static LOAD_USER_MEDIA_SUCCESS = '[USER]LOAD_USER_MEDIA_SUCCESS';
  static LOAD_USER_MEDIA_FAILED = '[USER]LOAD_USER_MEDIA_FAILED';

   // Media post delete
  static MEDIA_POST_DELETE = 'MEDIA_POST_DELETE';
  static MEDIA_POST_DELETE_SUCCESS = 'MEDIA_POST_DELETE_SUCCESS';
  static MEDIA_POST_DELETE_FAILED = 'MEDIA_POST_DELETE_FAILED';


   // Load My Status
  static LOAD_MY_MEDIA = 'LOAD_MY_MEDIA';
  static LOAD_MY_MEDIA_SUCCESS = 'LOAD_MY_MEDIA_SUCCESS';
  static LOAD_MY_MEDIA_FAILED = 'LOAD_MY_MEDIA_FAILED';

  // edit media
  static MEDIA_EDIT = 'MEDIA_EDIT';
  static MEDIA_EDIT_SUCCESS = 'MEDIA_EDIT_SUCCESS';
  static MEDIA_EDIT_FAILED = 'MEDIA_EDIT_FAILED';


  /**
   * Upload status
   * @param value
   */
  uploadStatus(value): Action {
    return {
      type: MediaActions.STATUS_SAVE,
      payload: {
        value
      }
    };
  }

  /**
   * Upload Media
   * @param value
   */
  uploadMedia(value): Action {
    return {
      type: MediaActions.MEDIA_UPLOAD,
      payload: {
        value
      }
    };
  }

  /**
   * Media Popup Detail page
   */
  getMediaDetails(value): Action {
    return {
      type: MediaActions.MEDIA_DETAILS,
      payload: {
        value
      }
    };
  }

  getMediaDetailsSuccess(value): Action {
    return {
      type: MediaActions.MEDIA_DETAILS_SUCCESS,
      payload: {
        value
      }
    };
  }

  getMediaDetailsFailed(error: any): Action {
    return {
      type: MediaActions.MEDIA_DETAILS_FAILED,
      payload: error
    };
  }

  // ===================================
  //  Fetch media comment
  // -----------------------------------
  // mediaCommentFetchAction(value): Action {
  //   return {
  //     type: MediaActions.MEDIA_COMMENT_FETCH,
  //     payload: {
  //       value
  //     }
  //   };
  // }

  // mediaCommentFetchSuccessAction(value): Action {
  //   return {
  //     type: MediaActions.MEDIA_COMMENT_FETCH,
  //     payload: {
  //       value
  //     }
  //   };
  // }

  /**
   * Spot a media
   * @param media Media ID
   * @param channelId  Spotfeed ID
   */
  spotMedia(media: string): Action {
    return {
      type: MediaActions.MEDIA_SPOT,
      payload: {
        media
      }
    };
  }

}

export class MediaCommentFetchAction implements Action {
  type = MediaActions.MEDIA_COMMENT_FETCH;

  constructor(public payload: string) { };
}

export class MediaCommentFetchSuccessAction implements Action {
   type = MediaActions.MEDIA_COMMENT_FETCH_SUCCESS;

  constructor(public payload: Comment[]) { };
}
