import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { remove as _remove } from 'lodash';

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
    private toastr: ToastrService,
    private _store: Store<ProfileModal>
  ) {
    this.loaded = false;
    this.router = _router;
    this.counter = 0;
    this.isOwner = false;
    this.tagState$ = this._store.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.profileChannel = state;
      this.channels = this.profileChannel.other_channel;
      // console.log(this.channels)
    });
  }

  ngOnInit() {
    this.checkUserType();
  }


  checkUserType() {
    this._store.select('profileTags')
      .first(profile => profile['profile_user_info'] && profile['profile_navigation_details'].handle)
      .subscribe( data => {
        if (data['profile_user_info'].isCurrentUser === true) {
          const handle = this.profileChannel.profile_navigation_details.handle;
          this.isOwner = true;
          this.channels = [];
          this.loadChannel(handle);
        }
      });

    this._store.select('profileTags')
      .first(profile => profile['profile_user_info'] && profile['profile_other'].handle )
      .subscribe( data => {
        if (data['profile_user_info'].isCurrentUser === false) {
          const handle = this.profileChannel.profile_other.handle;
          this.isOwner = false;
          this.loadChannel(handle);
        }
      });
  }


  loadChannel(handle: string) {
    this._store.dispatch({ type: ProfileActions.LOAD_USER_CHANNEL, payload: handle });
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
    this.toastr.warning('Channel Deleted');
  }

  /**
   * Remove a channel from list
   * @param file
   */
  removeChannel(channelId: any) {
    const list = _remove(this.channels, function(n){
      return n.spotfeedId === channelId;
    });

    if (list) {
      this.channels = list;
    }
  }

}
