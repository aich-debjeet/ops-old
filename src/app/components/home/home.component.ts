import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Channel } from '../../models/home.model';
import { NguCarousel } from '@ngu/carousel';
import { Meta, Title } from '@angular/platform-browser';

// action
import { HomeActions } from '../../actions/home.action';
import { ProfileActions } from '../../actions/profile.action';
import { SharedActions } from '../../actions/shared.action';

import { ProfileModal, initialTag } from '../../models/profile.model';
import { environment } from '../../../environments/environment';

// rx
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public metaShow: Meta;
  tagState$: Observable<ProfileModal>;
  userQuickAccess = initialTag;
  channelList$: Observable<Channel>;
  cards: any = [];
  carouselOne: NguCarousel;
  quickList: any = [];

  loadMoreParams: any;
  userProfileHandle: string;
  imageBaseUrl: string = environment.API_IMAGE;

  private subscription: ISubscription;


  constructor(
    private title: Title,
    private meta: Meta,
    private store: Store<Channel>,
    private profileStore: Store<ProfileModal>,
    private metaService: Meta
  ) {
    this.cards = [];
    this.loadMoreParams = { offset: -10, limit: 10 };

    // Own Profile
    this.tagState$ = this.profileStore.select('profileTags');
    this.subscription = this.tagState$
    .subscribe((state) => {
      this.userQuickAccess = state;
      this.quickList = state.userQuickAccess;
    });

  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  /**
   * Unpin Channels from Quick Access
   * @param id
   */
  unpinChannel(channelId: string /* channel id */) {
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
