import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { UserChannel } from '../../../models/user-channel.model';

// action
// import { ProfileActions } from '../../../actions/profile.action';
import { HomeActions } from '../../../actions/home.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TAB_COMPONENTS  } from '../../../shared/tabs/tabset';

import { ApiService } from '../../../helpers/api.service';

@Component({
  selector: 'app-home-channel',
  templateUrl: './home-channel.component.html',
  styleUrls: ['./home-channel.component.scss']
})
export class HomeChannelComponent {

  tagState$: Observable<UserChannel>;
  private tagStateSubscription: Subscription;
  userState;
  userChannels;

  constructor(
    private http: Http,
    private store: Store<UserChannel>
  ) {

    this.tagState$ = this.store.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.userState = state;
      this.userChannels = this.userState.channelEntity;
      console.log('this.userChannels');
      console.log(this.userState);
    });

    // const reqBody = {
    //   superType: 'channel'
    // };
    // this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL, payload: reqBody });

    const userHandle = 'W_E160B801_086B_4C6B_A55E_2014EE3C4171YASWANTHMDH_GMAIL_COM';
    this.store.dispatch({ type: HomeActions.LOAD_CHANNELS, payload: userHandle });
  }

}
