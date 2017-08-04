import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { Store } from '@ngrx/store';
import { Channel } from '../../models/home.model';

// action
import { HomeActions } from '../../actions/home.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  channelList$: Observable<Channel>;
  cards: any = [];

  loadMoreParams = {
    offset: -10,
    limit: 10
  };

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

    // initial cards
    this.cards = [{
      title: 'title 1',
      image: 'http://via.placeholder.com/640x360',
      descirption: '1 Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      links: [
        { linkRight: 'http://testlink-right.com' },
        { linkLeft: 'http://testlink-left.com' }
      ]
    }, {
      title: 'title 2',
      image: 'http://via.placeholder.com/640x360',
      descirption: '2 Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      links: [
        { linkRight: 'http://testlink-right.com' },
        { linkLeft: 'http://testlink-left.com' }
      ]
    }, {
      title: 'title 3',
      image: 'http://via.placeholder.com/640x360',
      descirption: '3 Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      links: [
        { linkRight: 'http://testlink-right.com' },
        { linkLeft: 'http://testlink-left.com' }
      ]
    }, {
      title: 'title 4',
      image: 'http://via.placeholder.com/640x360',
      descirption: '4 Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      links: [
        { linkRight: 'http://testlink-right.com' },
        { linkLeft: 'http://testlink-left.com' }
      ]
    }, {
      title: 'title 5',
      image: 'http://via.placeholder.com/640x360',
      descirption: '5 Some quick example text to build on the card title and make up the bulk of the card\'s content.',
      links: [
        { linkRight: 'http://testlink-right.com' },
        { linkLeft: 'http://testlink-left.com' }
      ]
    }];

  }

}
