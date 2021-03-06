import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileModal } from '../../../models/profile.model';

// action
import { ProfileActions } from '../../../actions/profile.action';

// rx
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-home-channel',
  templateUrl: './home-channel.component.html',
  styleUrls: ['./home-channel.component.scss']
})

export class HomeChannelComponent implements OnInit, OnDestroy {

  private profSub: ISubscription;
  tagState$: Observable<ProfileModal>;
  userState;
  channelList;
  myProfile$: Observable<any>;
  myProfileData: any;
  handle: string;
  loadMoreParams: any;
  channel_scroll_id: any = '';

  page_start = 0;
  page_end = 10;
 // total_pages = 10;
  scrolling = 0;
  scrollingLoad = 500;

  channel_load: boolean;

  constructor(
    private store: Store<ProfileModal>
  ) {

    this.loadMoreParams = { offset: -10, limit: 10 };
    this.channelList = [];

    this.tagState$ = store.select('profileTags');
    this.profSub = this.tagState$.subscribe((state) => {
      this.userState = state;
      if (state.user_following_channels_loaded) {
        this.channelList = state.user_following_channel;
        this.channel_scroll_id = state.user_channel_scroll_id;
      }
      if (state['user_following_channels_loading'] !== null) {
         this.channel_load = state['user_following_channels_loading']
      }
    });

    this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS })
  }

  ngOnInit() {
    this.loadChannels(null);
  }

  /**
   * Check and Load Channels
   */
  loadChannels(scroll_id: any) {
    const body = {
      limit: 12,
      scrollId: scroll_id,
    }

    this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_FOLLOWING_CHANNEL, payload: body });
  }

  /**
   * Follow this channel
   */
  followChannel(e: any) {
    const req = {
      channelId: e.channel.spotfeedId,
      state: e.state
    };
    this.store.dispatch({ type: ProfileActions.CHANNEL_FOLLOW, payload: req });
  }

  onScroll(e) {
    this.scrolling = e.currentScrollPosition;

    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 500
      this.loadChannels(this.channel_scroll_id);
    }
  }

  ngOnDestroy() {
    this.profSub.unsubscribe();
  }
}
