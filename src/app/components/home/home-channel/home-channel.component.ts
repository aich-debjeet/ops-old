import { Component, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs/Subscription';

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
export class HomeChannelComponent implements OnInit {

  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  userState;
  channelList;
  myProfile$: Observable<any>;
  myProfileData: any;
  handle: string;
  loadMoreParams: any;

  constructor(
    private http: Http,
    private store: Store<ProfileModal>
  ) {

    this.loadMoreParams = { offset: -10, limit: 10 };

    this.tagState$ = store.select('profileTags');
    this.myProfile$ = store.select('profileTags').take(3);
    this.tagState$.subscribe((state) => {
      this.userState = state;
    });

  }

  ngOnInit() {
    // If there's input assign, other wise, reload channel list
    this.myProfile$.subscribe(event => {
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
    this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_FOLLOWING_CHANNEL, payload: userHandle });
    this.tagState$.subscribe(data => {
      if (data.user_following_channels_loaded) {
        this.channelList = data.user_following_channel;
      }
    });
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
}
