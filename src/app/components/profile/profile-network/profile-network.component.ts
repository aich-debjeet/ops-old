import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { Observable } from 'rxjs/Observable';

import { ProfileActions } from '../../../actions/profile.action';

@Component({
  selector: 'app-profile-network',
  templateUrl: './profile-network.component.html',
  styleUrls: ['./profile-network.component.scss']
})
export class ProfileNetworkComponent implements OnInit {

  imageBaseUrl = environment.API_IMAGE;
  userProfile = initialTag ;
  tagState$: Observable<ProfileModal>;
  userHandle: String;

  constructor(
    private profileStore: Store<ProfileModal>,
  ) { 
    this.tagState$ = this.profileStore.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.userProfile = state;
      console.log('state ', state)
      // if ( state['profile_navigation_details'] && state ['profile_user_info']) {
      //   if (this.userProfile.profile_user_info.isCurrentUser === true){
      //     this.userHandle = this.userProfile.profile_navigation_details.handle;
      //   console.log('handle', this.userHandle)
      //   this.profileStore.dispatch({ type: ProfileActions.SENT_REQUEST_LIST, payload: this.userHandle });
      //   }
      // }
      console.log('user profile', this.userProfile)
    })

    this.profileStore.select('profileTags')
    .first(profile => profile['profile_user_info'] && profile['profile_navigation_details'].handle)
    .subscribe( data => {
      if (data['profile_user_info'].isCurrentUser === true) {
        this.userHandle = this.userProfile.profile_navigation_details.handle;
        this.profileStore.dispatch({ type: ProfileActions.SENT_REQUEST_LIST, payload: this.userHandle });
      }
    });
  }

  ngOnInit() {
  }

}
