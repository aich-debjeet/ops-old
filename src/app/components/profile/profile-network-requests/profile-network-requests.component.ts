import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { Observable } from 'rxjs/Observable';

import { ProfileActions } from '../../../actions/profile.action';

@Component({
  selector: 'app-profile-network-requests',
  templateUrl: './profile-network-requests.component.html',
  styleUrls: ['./profile-network-requests.component.scss']
})
export class ProfileNetworkRequestsComponent implements OnInit {
  userProfile = initialTag ;
  tagState$: Observable<ProfileModal>;
  imageBaseUrl = environment.API_IMAGE;
  userHandle: String;

  constructor(
    private profileStore: Store<ProfileModal>,
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.userProfile = state;
    })
    this.profileStore.select('profileTags')
    .first(profile => profile['profile_user_info'] && profile['profile_navigation_details'].handle)
    .subscribe( data => {
      if (data['profile_user_info'].isCurrentUser === true) {
        this.userHandle = this.userProfile.profile_navigation_details.handle;
        console.log(this.userHandle)
        this.profileStore.dispatch({ type: ProfileActions.GET_PENDING_REQUEST_LIST, payload: this.userHandle });
      }
    });
   }

  ngOnInit() {
    
  }

}
