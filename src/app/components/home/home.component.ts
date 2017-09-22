import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Channel } from '../../models/home.model';

// action
import { HomeActions } from '../../actions/home.action';
import { SharedActions } from '../../actions/shared.action';

import { ProfileModal, initialTag } from '../../models/profile.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  tagState$: Observable<ProfileModal>;
  userQuickAccess = initialTag;
  channelList$: Observable<Channel>;
  cards: any = [];

  loadMoreParams: any;
  userProfileHandle: string;

  /**
   * Unpin Channel from Quick Access
   * @param channelId
   */
  pinChannel(channelId: string /* channel id */) {
    console.log('home component: pinChannel() dispatched for channel: ' + channelId);
  }

  /**
   * Unpin Channels from Quick Access
   * @param id
   */
  unpinChannel(channelId: string /* channel id */) {
    console.log('home component: unpinChannel() dispatched for channel: ' + channelId);
    this.store.dispatch({
      type: SharedActions.UNPIN_CHANNEL,
      payload: {
        spotfeedHandle: channelId,
        profileHandle: this.userProfileHandle
      }
    });
  }

  /**
   * Load Following Channels
   */
  getChannels() {
    // updating request params to load more channels
    this.loadMoreParams.offset = this.loadMoreParams.offset + this.loadMoreParams.limit;
    this.store.dispatch({
      type: HomeActions.LOAD_CHANNELS,
      payload: this.loadMoreParams
    });

  }

  constructor(
    private store: Store<Channel>,
    private profileStore: Store<ProfileModal>
  ) {
    this.cards = [];
    this.loadMoreParams = { offset: -10, limit: 10 };

    // Own Profile
    this.tagState$ = this.profileStore.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.userQuickAccess = state;
    });
  }

}
