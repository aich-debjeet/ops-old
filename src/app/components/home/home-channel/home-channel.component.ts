import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { UserChannel } from '../../../models/user-channel.model';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TAB_COMPONENTS  } from '../../../shared/tabs/tabset';

@Component({
  selector: 'app-home-channel',
  templateUrl: './home-channel.component.html',
  styleUrls: ['./home-channel.component.scss']
})
export class HomeChannelComponent {

  tagState$: Observable<UserChannel>;
  private tagStateSubscription: Subscription;
  userChannels;

  constructor(
    private http: Http,
    private store: Store<UserChannel>
  ) {

    this.tagState$ = this.store.select('profileTags');
    // this.test = 'salabeel';
    this.tagState$.subscribe((state) => {
      this.userChannels = state;
    });

    const reqBody = {
      superType: 'channel'
    };

    this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL, payload: reqBody });
  }

}
