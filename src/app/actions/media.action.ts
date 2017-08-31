import { Action } from '@ngrx/store';

export class MediaActions {

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

  // Media popup details
  static MEDIA_DETAILS = 'MEDIA_DETAILS';
  static MEDIA_DETAILS_SUCCESS = 'MEDIA_DETAILS_SUCCESS';
  static MEDIA_DETAILS_FAILED = 'MEDIA_DETAILS_FAILED';

  // Post Comment
  static POST_COMMENT = 'POST_COMMENT';
  static POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
  static POST_COMMENT_FAILED = 'POST_COMMENT_FAILED';


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

}
