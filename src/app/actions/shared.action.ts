import { Action } from '@ngrx/store';

export class SharedActions {

  /* -------------------------------- PIN channel -------------------------------- */
  static PIN_CHANNEL = 'PIN_CHANNEL';
  static PIN_CHANNEL_SUCCESS = 'PIN_CHANNEL_SUCCESS';
  static PIN_CHANNEL_FAILED = 'PIN_CHANNEL_FAILED';
  /* -------------------------------- PIN channel -------------------------------- */

  /* -------------------------------- UNPIN channel -------------------------------- */
  static UNPIN_CHANNEL = 'UNPIN_CHANNEL';
  static UNPIN_CHANNEL_SUCCESS = 'UNPIN_CHANNEL_SUCCESS';
  static UNPIN_CHANNEL_FAILED = 'UNPIN_CHANNEL_FAILED';
  /* -------------------------------- UNPIN channel -------------------------------- */


  /* -------------------------------- PIN channel methods -------------------------------- */
  pinChannel(value): Action {
    return {
      type: SharedActions.PIN_CHANNEL,
      payload: { value }
    };
  }

  pinChannelSuccess(value): Action {
    return {
      type: SharedActions.PIN_CHANNEL_SUCCESS,
      payload: { value }
    };
  }

  pinChannelFailed(error: any): Action {
    return {
      type: SharedActions.PIN_CHANNEL_FAILED,
      payload: error
    };
  }
  /* -------------------------------- PIN channel methods -------------------------------- */


  /* -------------------------------- UNPIN channel methods -------------------------------- */
  unpinChannel(value): Action {
    return {
      type: SharedActions.UNPIN_CHANNEL,
      payload: { value }
    };
  }

  unpinChannelSuccess(value): Action {
    return {
      type: SharedActions.UNPIN_CHANNEL_SUCCESS,
      payload: { value }
    };
  }

  unpinChannelFailed(error: any): Action {
    return {
      type: SharedActions.UNPIN_CHANNEL_FAILED,
      payload: error
    };
  }
  /* -------------------------------- UNPIN channel methods -------------------------------- */


}
