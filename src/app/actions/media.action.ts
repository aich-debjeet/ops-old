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

}
