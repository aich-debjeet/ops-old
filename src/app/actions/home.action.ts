import { Action } from '@ngrx/store';
import { Channel } from '../models/home.model';

export class HomeActions {

  static LOAD_CHANNELS = 'LOAD_CHANNELS';
  static LOAD_CHANNELS_SUCCESS = 'LOAD_CHANNELS_SUCCESS';
  static LOAD_CHANNELS_FAILED = 'LOAD_CHANNELS_FAILED';

  // home load channels

  loadChannels(value: Channel): Action {
    console.log('home action: LOAD_CHANNELS triggred');
    return {
      type: HomeActions.LOAD_CHANNELS,
      payload: { value }
    };
  }

  loadChannelsSuccess(value: Channel): Action {
    console.log('home action: LOAD_CHANNELS_SUCCESS triggred');
    return {
      type: HomeActions.LOAD_CHANNELS_SUCCESS,
      payload: { value }
    };
  }

  loadChannelsFailed(error: any): Action {
    console.log('home action: LOAD_CHANNELS_FAILED triggred');
    return {
      type: HomeActions.LOAD_CHANNELS_FAILED,
      payload: error
    };
  }


}
