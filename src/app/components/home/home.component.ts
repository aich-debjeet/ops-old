import { Component, OnInit, AfterViewInit, OnDestroy, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Channel } from '../../models/home.model';
import { NguCarousel, NguCarouselStore } from '@ngu/carousel';

import { PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

// action
import { HomeActions } from '../../actions/home.action';
import { ProfileActions } from '../../actions/profile.action';
import { SharedActions } from '../../actions/shared.action';

import { ProfileModal, initialTag } from '../../models/profile.model';
import { environment } from '../../../environments/environment';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

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
    @Inject(PLATFORM_ID) private platformId: Object, meta: Meta, title: Title,
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

    this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS });

    title.setTitle('OPS - Home page');
    meta.addTags([
      { name: 'keywords', content: 'dance, dance world cup 2017, dwc, dance world cup india, asia, world, dance competition, competition, dwc info, phoenix marketcity, bangalore, one page soptlight dance, dance world cup qualifiers, qualifiers'},
      { name: 'description', content: 'OPS' },
      { name: 'og:image', content: 'https://cdn.onepagespotlight.com/img/landing/logobetawhite.svg' },
    ]);
    this.metaShow = meta;
  }

  ngOnInit() {
    // console.log(document.body.scrollTop);
    // document.body.scrollTop = 0;
    window.scrollTo(0, 0);
    this.carouselOne = {
      grid: {xs: 3, sm: 3, md: 10, lg: 10, all: 0},
      slide: 2,
      speed: 4000,
      // interval: 400000,
      // custom: 'banner',
      point: {
        visible: true,
        pointStyles: `
          .ngucarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            bottom: 20px;
            left: 0;
            box-sizing: border-box;
            display: none;
          }
          .ngucarouselPoint li {
            display: inline;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.55);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngucarouselPoint li.active {
              background: white;
              width: 10px;
          }
        `
      },
      load: 2,
      loop: true,
      touch: true
    }
  }

  ngAfterViewInit() {
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

  // carouselTileLoad(evt: any) {
  //   console.log(event)
  //   // const len = this.carouselTileItems.length
  //   // if (len <= 30) {
  //   //   for (let i = len; i < len + 10; i++) {
  //   //     this.carouselTileItems.push(i);
  //     // }
  //   // }
  // }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
