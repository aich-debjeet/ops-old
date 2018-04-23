import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { Observable } from 'rxjs/Observable';

import { ProfileActions } from '../../../actions/profile.action';

@Component({
  selector: 'app-profile-accepted-requests',
  templateUrl: './profile-accepted-requests.component.html',
  styleUrls: ['./profile-accepted-requests.component.scss']
})
export class ProfileAcceptedRequestsComponent implements OnInit {
  userProfile = initialTag ;
  tagState$: Observable<ProfileModal>;
  imageBaseUrl = environment.API_IMAGE;
  userHandle: String;
  connectionList: any[];

  constructor(
    private profileStore: Store<ProfileModal>,
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.userProfile = state;
      this.connectionList = this.userProfile.active_connection_list;  
    })
    this.profileStore.select('profileTags')
    .first(profile => profile['profile_user_info'] && profile['profile_navigation_details'].handle)
    .subscribe( data => {
      if (data['profile_user_info'].isCurrentUser === true) {
        this.userHandle = this.userProfile.profile_navigation_details.handle;
        // console.log(this.userHandle)
        this.profileStore.dispatch({ type: ProfileActions.GET_ACTIVE_CONNECTIONS_LIST, payload: this.userHandle });
      }
    });
   }

  ngOnInit() {
  }

}
