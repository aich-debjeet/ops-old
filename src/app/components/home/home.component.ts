import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { Channel } from '../../models/home.model';

// action
import { HomeActions } from '../../actions/home.action';
import { SharedActions } from '../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {


  channelList$: Observable<Channel>;
  cards: any = [];

  loadMoreParams = {
    offset: -10,
    limit: 10
  };

  userProfileHandle: string;

  pinChannel(id: string /* channel id */) {
    console.log('home component: pinChannel() dispatched for channel: ' + id);

    // this.store.dispatch({
    //   type: SharedActions.PIN_CHANNEL,
    //   payload: {
    //     spotfeedHandle: id,
    //     profileHandle: this.userProfileHandle
    //   }
    // });

  }

  unpinChannel(id: string /* channel id */) {
    console.log('home component: unpinChannel() dispatched for channel: ' + id);

    this.store.dispatch({
      type: SharedActions.UNPIN_CHANNEL,
      payload: {
        spotfeedHandle: id,
        profileHandle: this.userProfileHandle
      }
    });

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

  constructor(private store: Store<Channel>) {
    this.getChannels();
    this.cards = [];
  }

}
