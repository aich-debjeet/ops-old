import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-channel',
  templateUrl: './profile-channel.component.html',
  styleUrls: ['./profile-channel.component.scss']
})

export class ProfileChannelComponent implements OnInit {
  @Input() userName: string;
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  profileChannel = initialTag ;
  channelList: any;
  handle: any;
  sub: any;
  channels: any;
  loaded: boolean;
  router: any;
  counter: number;
  isOwner: boolean;
  constructor(
    private http: Http,
    private _router: Router,
    public route: ActivatedRoute,
    private profileStore: Store<ProfileModal>
  ) {
    this.loaded = false;
    this.router = _router;
    this.counter = 0;
    this.isOwner = false;
    this.tagState$ = this.profileStore.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.profileChannel = state;
      this.userFlag(state);
    });
  }

  /**
   * Check Profile state
   */
  checkProfile() {
    this.sub = this.route.parent.parent.params.subscribe(params => {
      if (params['id'] && params['id'] !== null && this.handle !== null) {
        this.userName = params['id'];
        this.isOwner = false;
      }
    });
  }

  checkEmpty(obj: Object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  /**
   * Check if current user or other profile
   * @param userName
   */
  userFlag(state) {
    this.sub = this.route.parent.parent.params.subscribe(params => {
      if (this.checkEmpty(params)) {
        this.isOwner = true;
        this.loadCurrentProfile(state);
      } else {
        this.isOwner = false;
        this.userName = params['id'];
        this.loadOtherProfile(state);
      }
    });
  }

  /**
   * Load Other Profile Related Data
   */
  loadOtherProfile(state) {
    const isChannelReady = this.profileChannel.other_channels_loaded;
    const isProfileReady = this.profileChannel.profile_other_loaded;

    // Check if the other profile is loaded; also make sure the activated route is not current user
    if ( isChannelReady === false && isProfileReady === true) {
      this.counter++;
      const handleID = state.profile_other.handle;
      console.log('TOKEN #1', handleID);
      if (this.counter < 10) {
        this.handle = handleID;
        if (this.handle && this.userName ) {
          this.profileStore.dispatch({ type: ProfileActions.LOAD_USER_CHANNEL, payload: handleID });
        }
      }
    }

    // Assign channel data to general list
    if ( isChannelReady === true ) {
      this.channels = this.profileChannel.other_channel;
    }
  }

  /**
   * Load current user profile data
   */
  loadCurrentProfile(state: any) {
    const isChannelReady = this.profileChannel.user_channels_loaded;
    const isProfileReady = this.profileChannel.profile_loaded;

    // Check if the other profile is loaded; also make sure the activated route is not current user
    if ( isChannelReady === false && isProfileReady === true) {

      const profile = this.profileChannel.profileUser;
      this.counter++;
      // const handleID = this.profileChannel.profileDetails.handle;
      if (this.counter < 10 && profile.handle !== undefined) {
        console.log('TOKEN #2', profile.handle);
        this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL, payload: profile.handle });
      }
    }

    // Assign channel data to general list
    if ( isChannelReady === true ) {
      this.channels = this.profileChannel.user_channel;
    }
  }

  toggleFollowBtn(i) {
    // console.log(i);

    // Follow dispatches to happen here
  }

  /**
   * Follow this channel
   */
  followChannel(e: any) {
    const req = {
      channelId: e.channel.spotfeedId,
      state: e.state
    };

    console.log(req);

    this.profileStore.dispatch({ type: ProfileActions.CHANNEL_FOLLOW, payload: req });
  }

  ngOnInit(): void {
    this.checkProfile();
  }
}
