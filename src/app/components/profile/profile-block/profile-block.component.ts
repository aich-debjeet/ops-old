import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { environment } from '../../../../environments/environment';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TabComponents  } from '../../../shared/tabs/tabset';
import { ProfileHelper } from '../../../helpers/profile.helper';

import { NguCarousel, NguCarouselStore } from '@ngu/carousel';

@Component({
  selector: 'app-profile-block',
  templateUrl: './profile-block.component.html',
  styleUrls: ['./profile-block.component.scss']
})

export class ProfileBlockComponent implements OnInit {
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  userQuickAccess = initialTag;
  router: any;
  activeUser: string;
  isCurrentUser: boolean;
  userName: string;
  sub: any;
  routeData: any;
  userId: string;
  channels: any;
  profileObject: any;
  imageBaseUrl = environment.API_IMAGE;
  userHandle: string;
  channelPinSuccess = false;
  carouselOne: NguCarousel;
  openChannel: boolean;

  constructor(
    private http: Http,
    private _router: Router,
    public route: ActivatedRoute,
    private utils: ProfileHelper,
    private profileStore: Store<ProfileModal>,
  ) {
    this.router = _router;
    this.userId = '';
    this.openChannel = false;

    // Own Profile
    this.tagState$ = this.profileStore.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.userQuickAccess = state;
      console.log('state', state)
      if (state.profile_user_info) {
        if (state.profile_user_info.isCurrentUser) {
          this.profileObject = this.loadProfile( state, 'own' );
          // console.log(this.profileObject)
          this.userHandle = this.profileObject.userDetails.handle;
          // console.log(this.userHandle)
        } else {
          if (state.profile_user_info.isClaimForGuest && state.profile_user_info.isClaimForGuest === true) {
            // console.log('state.profile_other', state.profile_other);
            if (state.profile_other && state.profile_other.length !== 0) {
              const profile = state.profile_other;
              this.profileObject = this.utils.claimProfileValueMapping(profile);
              // console.log('claim');
            }
          } else {
            // console.log('other');
            this.profileObject = this.loadProfile( state, 'other' );
          }
        }
      }
      if (state.channel_pin_success && this.channelPinSuccess) {
        this.profileStore.dispatch({ type: ProfileActions.LOAD_USER_CHANNEL, payload: this.userHandle });
        this.channelPinSuccess = false;
      }
    });
  }

  ngOnInit(): void {
    this.checkProfile();
    this.carouselOne = {
      grid: {xs: 3, sm: 3, md: 5, lg: 5, all: 0},
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

  checkEmpty(obj: Object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

   /**
   * User type based user load
   */
  loadProfile(profile: any, type: string) {
      return this.utils.profileValueMapping(profile, type );
  }

  /**
   * Load a Profile
   */
  checkProfile() {
    this.sub = this.router.routerState.parent(this.route)
      .params.subscribe(params => {
        if (this.checkEmpty(params)) {
          this.isCurrentUser = true;
        } else {
          this.userName = params['id'];
          this.isCurrentUser = false;
        }
      });
  }

  pinChannel(spotfeedId) {
        const data = {
       'spotfeedId': spotfeedId,
       'profileHandle': this.userHandle
     }
     this.profileStore.dispatch({ type: ProfileActions.PIN_CHANNEL, payload: data });
     this.channelPinSuccess = true;
  }
  channelList() {
    console.log('its hre')
    if (this.openChannel) {
    this.openChannel = false;
    }
    this.openChannel = true;
  }
}
