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
  userChannels;

  loadMoreParams = {
    offset: -10,
    limit: 10
  };

  constructor(
    private http: Http,
    private store: Store<ProfileModal>
  ) {

    this.tagState$ = this.store.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.userState = state;
    });

    // const reqBody = {
    //   superType: 'channel'
    // };
    
    // const userHandle = 'W_E160B801_086B_4C6B_A55E_2014EE3C4171YASWANTHMDH_GMAIL_COM';
    // this.store.dispatch({ type: HomeActions.LOAD_CHANNELS, payload: userHandle });

    // load channel
    // this.getChannels();

    this.loadChannels();
  }

  /**
   * Check and Load Channels
   */
  loadChannels() {
    const userHandle = this.userState.profileUser.handle  || '';
    if (userHandle !== '' && this.userState.user_channels_loaded === false) {
      this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL, payload: userHandle });
    } else {
      // console.log(this.userState);
    }
  }

  // make http request to load channels
  getChannels() {

    // updating request params to load more channels
    this.loadMoreParams.offset = this.loadMoreParams.offset + this.loadMoreParams.limit;
    console.log(this.loadMoreParams);

    console.log('home component: getChannels() dispatched');

    this.store.dispatch({
      type: HomeActions.LOAD_CHANNELS,
      payload: this.loadMoreParams
    });

  }

}
