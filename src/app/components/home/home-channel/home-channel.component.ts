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
export class HomeChannelComponent {

  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  userState;
  channelList;

  loadMoreParams = {
    offset: -10,
    limit: 10
  };

  constructor(
    private http: Http,
    private store: Store<ProfileModal>
  ) {
    const channelLoaded = false;

    this.tagState$ = this.store.select('profileTags');
    this.tagState$.subscribe((state) => {

      this.userState = state;
      console.log('user follwing channels listners');
      console.log(state);
      // const userHandle = this.userState.profileUser.handle  || '';

      // if (!channelLoaded && userHandle !== '') {
      //   channelLoaded = true;
      //   // console.log('DISPATCH');
      //   this.loadChannels(this.userState.profileUser.handle);
      // }

    });

    const userHandle = localStorage.getItem('currentUserID');
    if (userHandle) {
      this.loadChannels(userHandle);
    }

  }

  /**
   * Check and Load Channels
   */
  loadChannels(userHandle: string) {
    console.log('handle: ' + userHandle);
    this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_FOLLOWING_CHANNEL, payload: userHandle });
    this.tagState$.subscribe(data => {
      // console.log('ProfileActions.LOAD_CURRENT_USER_CHANNEL response: ');
      // console.log(data);
      this.channelList = data.user_channel;
      console.log(this.channelList);
    });
  }

}
