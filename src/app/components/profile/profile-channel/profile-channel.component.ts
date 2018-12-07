import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// action
import { ProfileActions } from '../../../actions/profile.action';

// rx
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

import { remove as _remove } from 'lodash';

@Component({
  selector: 'app-profile-channel',
  templateUrl: './profile-channel.component.html',
  styleUrls: ['./profile-channel.component.scss']
})

export class ProfileChannelComponent implements OnInit, OnDestroy {
  @Input() userName: string;
  tagState$: Observable<ProfileModal>;
  private profSub: ISubscription;
  profileChannel = initialTag ;
  channelList: any;
  handle: any;
  sub: any;
  channels: any;
  loaded: boolean;
  router: any;
  counter: number;
  isOwner: boolean;
  scrolling = 0;
  scrollingLoad = 900;
  channel_scroll_id: any = '';
  constructor(
    private _router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService,
    private _store: Store<ProfileModal>
  ) {
    this.loaded = false;
    this.router = _router;
    this.counter = 0;
    this.isOwner = false;
    this.tagState$ = this._store.select('profileTags');
    this.profSub = this.tagState$.subscribe((state) => {
      this.profileChannel = state;
      this.channels = this.profileChannel.other_channel;
      if (state.profile_scrolling_channel) {
        this.channel_scroll_id = state.profile_scrolling_channel;
      }
    });
  }

  ngOnInit() {
    this.checkUserType();
  }

  ngOnDestroy() {
    this.profSub.unsubscribe();
  }

  checkUserType() {
    this._store.select('profileTags')
      .first(profile => profile['profile_user_info'] && profile['profile_navigation_details'].handle)
      .subscribe( data => {
        if (data['profile_user_info'].isCurrentUser === true) {
          const handle = this.profileChannel.profile_navigation_details.handle;
          this.handle = handle
          this.isOwner = true;
          this.channels = [];
          this.loadChannel(true);
        }
      });

    this._store.select('profileTags')
      .first(profile => profile['profile_user_info'] && profile['profile_other'].handle )
      .subscribe( data => {
        if (data['profile_user_info'].isCurrentUser === false) {
          const handle = this.profileChannel.profile_other.handle;
          this.handle = handle
          this.isOwner = false;
          this.loadChannel(true);
        }
      });
  }


  loadChannel(init: boolean) {
    let body: any;
    if (init) {
      body = {
        limit: 30,
        superType: 'channel',
        owner: this.handle,
      }
    } else {
      body = {
        limit: 30,
        superType: 'channel',
        owner: this.handle,
        scrollId: this.channel_scroll_id,
      }
    }
    this._store.dispatch({ type: ProfileActions.LOAD_USER_CHANNEL, payload: body});
  }

  onScroll(e) {
    this.scrolling = e.currentScrollPosition;

    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 500
      this.loadChannel(false);
    }
  }

  /**
   * Check Profile state
   */
  checkProfile() {
    this.route.parent.parent.params.subscribe(params => {
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
   * Follow this channel
   */
  followChannel(e: any) {
    const req = {
      channelId: e.channel.spotfeedId,
      state: e.state
    };
    this._store.dispatch({ type: ProfileActions.CHANNEL_FOLLOW, payload: req });
  }

  /**
   * Delete a channel
   */
  deleteChannel(channelId: string) {
    this._store.dispatch({ type: ProfileActions.CHANNEL_DELETE, payload: channelId });
    this.removeChannel(channelId);
    this.toastr.warning('Channel Deleted', '', {
      timeOut: 3000
    });
  }

  /**
   * Remove a channel from list
   * @param file
   */
  removeChannel(channelId: any) {
    const list = _remove(this.channels, function(n) {
      return n.spotfeedId === channelId;
    });

    if (list) {
      this.channels = list;
    }
  }

}
