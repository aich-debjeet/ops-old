import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { Observable } from 'rxjs/Observable';

import { ProfileActions } from '../../../actions/profile.action';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-network-requests',
  templateUrl: './profile-network-requests.component.html',
  styleUrls: ['./profile-network-requests.component.scss']
})
export class ProfileNetworkRequestsComponent implements OnInit, OnDestroy {
  userProfile = initialTag;
  tagState$: Observable<ProfileModal>;
  imageBaseUrl = environment.API_IMAGE;
  userHandle: String;
  requestList: any[];
  profSub: Subscription;

  constructor(
    private profileStore: Store<ProfileModal>,
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    this.profSub = this.tagState$.subscribe((state) => {
      this.userProfile = state;
      this.requestList = this.userProfile.pending_request_list
    })
    this.profileStore.select('profileTags')
      .first(profile => profile['profile_user_info'] && profile['profile_navigation_details'].handle)
      .subscribe(data => {
        if (data['profile_user_info'].isCurrentUser === true) {
          this.userHandle = this.userProfile.profile_navigation_details.handle;
          this.profileStore.dispatch({ type: ProfileActions.GET_PENDING_REQUEST_LIST, payload: this.userHandle });
        }
      });
  }

  acceptRequest(handle: string) {
    const data = {
      receiver_id: handle,
      status: 'accept'
    }
    this.profileStore.dispatch({ type: ProfileActions.ACCEPT_NETWORK_REQUEST, payload: data });
  }

  declineRequest(handle: string) {
    const data = {
      receiver_id: handle,
      status: 'reject'
    }
    this.profileStore.dispatch({ type: ProfileActions.DECLINE_NETWORK_REQUEST, payload: data });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.profSub.unsubscribe();
  }

}
