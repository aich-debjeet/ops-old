import { Component, OnInit, Input } from '@angular/core';
import { ProfileActions } from '../../../actions/profile.action';
import { Store } from '@ngrx/store';
import { ProfileModal } from '../../../models/profile.model';

@Component({
  selector: 'app-explore-profiles',
  templateUrl: './explore-profiles.component.html',
  styleUrls: ['./explore-profiles.component.scss']
})
export class ExploreProfilesComponent implements OnInit {
  @Input() profiles: any;
  ownerHandle = '';

  constructor(
    private profileStore: Store<ProfileModal>
  ) { }

  ngOnInit() {
    this.ownerHandle = localStorage.getItem('loggedInProfileHandle');
  }

  /**
   * follow/unfollow user
   * @param data params follow/unfollow action and user handle
   */
  followActions(data: any) {
    if (data.action && data.action === 'follow') {
      this.profileStore.dispatch({ type: ProfileActions.PROFILE_FOLLOW, payload: data.userHandle });
    } else {
      this.profileStore.dispatch({ type: ProfileActions.PROFILE_UNFOLLOW, payload: data.userHandle });
    }
  }

}
