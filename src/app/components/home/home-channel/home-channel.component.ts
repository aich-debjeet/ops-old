import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { UserChannel } from '../../../models/user-channel.model';
import { ProfileModal, initialTag } from '../../../models/profile.model';

// action
// import { ProfileActions } from '../../../actions/profile.action';
import { HomeActions } from '../../../actions/home.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

import { TabsetComponent  } from '../../../shared/tabs/tabset';
import { ProfileActions } from '../../../actions/profile.action';

// load channel component
import { ChannelComponent } from '../../../shared/channel/channel.component';

import { ApiService } from '../../../helpers/api.service';

@Component({
  selector: 'app-home-channel',
  templateUrl: './home-channel.component.html',
  styleUrls: ['./home-channel.component.scss']
})

export class HomeChannelComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;
  private subscriptionOne: ISubscription;
  tagState$: Observable<ProfileModal>;
  userState;
  channelList;
  myProfile$: Observable<any>;
  myProfileData: any;
  handle: string;
  loadMoreParams: any;

  page_start = 0;
  page_end = 10;
 // total_pages = 10;
  scrolling = 0;
  scrollingLoad = 1000;

  constructor(
    private http: Http,
    private store: Store<ProfileModal>
  ) {

    this.loadMoreParams = { offset: -10, limit: 10 };
    this.channelList = [];

    this.tagState$ = store.select('profileTags');
    this.myProfile$ = store.select('profileTags').take(3);
    this.subscriptionOne = this.tagState$.subscribe((state) => {
      this.userState = state;
      if (state.user_following_channels_loaded) {
        this.channelList = state.user_following_channel;
      }
    });

    this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS })
  }

  ngOnInit() {
    // If there's input assign, other wise, reload channel list
    this.subscription = this.myProfile$.subscribe(event => {
      this.myProfileData = event;
      let isUserReady;
      if (event.profile_navigation_details && event.profile_navigation_details.handle) {
        this.handle = event.profile_navigation_details.handle;
        isUserReady = true;
        this.loadChannels(this.handle);
      }
    });
  }

  /**
   * Check and Load Channels
   */
  loadChannels(userHandle: string) {
    // console.log(userHandle)
    const datas = {
      handle: userHandle,
      page_start: this.page_start,
      page_end: 10
    }

    const body = {
      limit: 2
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
    // console.log(e)
    this.scrolling = e.currentScrollPosition;
    // console.log(this.scrolling)
    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 500
      this.page_start = this.page_start + 10;
      this.page_end = 10;
      this.loadChannels(this.handle);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionOne.unsubscribe();
  }
}
