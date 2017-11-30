import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// action
import { OrganizationActions } from '../../../../actions/organization.action';
import { ProfileActions } from '../../../../actions/profile.action';
import { SharedActions } from '../../../../actions/shared.action';

import { ProfileModal } from '../../../../models/profile.model';

import { LocalStorageService } from '../../../../services/local-storage.service';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { remove as _remove } from 'lodash';

@Component({
  selector: 'app-org-channel',
  templateUrl: './org-channel.component.html',
  styleUrls: ['./org-channel.component.scss']
})
export class OrgChannelComponent implements OnInit {

  orgState: any;
  orgProfile: any;
  profileHandle: string;
  profileUsername: string;
  channels: any[];
  isOwner = true;

  constructor(
    private orgStore: Store<any>,
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    private _store: Store<ProfileModal>
  ) {

    this.orgState = this.orgStore.select('organizationTags');
    this.orgState.subscribe((state) => {
      this.orgProfile = state;
      console.log('org tags', this.orgProfile);
      this.channels = this.orgProfile.org_channels;
    });

    // check if creator is user or organization
    if (localStorage.getItem('accountStatus') !== null) {
      const localStore = JSON.parse(this.localStorageService.theAccountStatus);
      if (localStore.profileType === 'org') {
        this.profileHandle = localStore.handle;
        this.profileUsername = localStore.username;
        // console.log('org channel load trigger', this.orgProfile);
        this.orgStore.dispatch({
          type: OrganizationActions.LOAD_ORG_CHANNELS,
          payload: this.profileHandle
        });
      }
    }
  }

  ngOnInit() {}

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
    // console.log('before ', this.channels);
    // console.log('remove ', channelId);
    const list = _remove(this.channels, function(n){
      return n.spotfeedId === channelId;
    });
    if (list) {
      this.channels = list;
    }
    // console.log('after ', this.channels);
  }

  // @Input() userName: string;
  // tagState$: Observable<ProfileModal>;
  // private tagStateSubscription: Subscription;
  // profileChannel = initialTag ;
  // channelList: any;
  // handle: any;
  // sub: any;
  // channels: any;
  // loaded: boolean;
  // router: any;
  // counter: number;
  // isOwner: boolean;
  // constructor(
  //   private http: Http,
  //   private _router: Router,
  //   public route: ActivatedRoute,
  //   private toastr: ToastrService,
  //   private _store: Store<ProfileModal>
  // ) {
  //   this.loaded = false;
  //   this.router = _router;
  //   this.counter = 0;
  //   this.isOwner = false;
  //   this.tagState$ = this._store.select('profileTags');
  //   this.tagState$.subscribe((state) => {
  //     this.profileChannel = state;
  //     this.channels = this.profileChannel.other_channel;
  //   });
  // }

  // ngOnInit() {
  //   this.checkUserType();
  // }


  // checkUserType() {
  //   // console.log('channel');
  //   this._store.select('profileTags')
  //     .first(profile => profile['profileUser'].handle)
  //     .subscribe( data => {
  //       // console.log(data);
  //       const handle = this.profileChannel.profileUser.handle;
  //         this.isOwner = true;
  //         this.channels = [];
  //         this.loadChannel(handle);

  //     });

  //   this._store.select('profileTags')
  //     .first(profile => profile['profile_user_info'] && profile['profile_other'].handle )
  //     .subscribe( data => {
  //       if (data['profile_user_info'].isCurrentUser === false) {
  //         const handle = this.profileChannel.profile_other.handle;
  //         this.isOwner = false;
  //         this.loadChannel(handle);
  //       }
  //     });
  // }


  // loadChannel(handle: string) {
  //   // console.log(handle);
  //   this._store.dispatch({ type: ProfileActions.LOAD_USER_CHANNEL, payload: handle });
  // }

  // /**
  //  * Check Profile state
  //  */
  // checkProfile() {
  //   this.sub = this.route.parent.parent.params.subscribe(params => {
  //     if (params['id'] && params['id'] !== null && this.handle !== null) {
  //       this.userName = params['id'];
  //       this.isOwner = false;
  //     }
  //   });
  // }

  // checkEmpty(obj: Object) {
  //   return Object.keys(obj).length === 0 && obj.constructor === Object;
  // }


  // /**
  //  * Follow this channel
  //  */
  // followChannel(e: any) {
  //   const req = {
  //     channelId: e.channel.spotfeedId,
  //     state: e.state
  //   };
  //   this._store.dispatch({ type: ProfileActions.CHANNEL_FOLLOW, payload: req });
  // }

}
