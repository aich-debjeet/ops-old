import { Component, OnInit, Input } from '@angular/core';
import { ProfileModal } from '../../../models/profile.model';
import { Store } from '@ngrx/store';
import { ProfileActions } from '../../../actions/profile.action';

@Component({
  selector: 'app-explore-channels',
  templateUrl: './explore-channels.component.html',
  styleUrls: ['./explore-channels.component.scss']
})
export class ExploreChannelsComponent implements OnInit {
  @Input() channels: any;

  constructor(
    private profileStore: Store<ProfileModal>
  ) { }

  ngOnInit() {
  }

  /**
   * Follow this channel
   */
  followChannel(e: any) {
    const req = {
      channelId: e.channel.spotfeedId,
      state: e.state
    };
    this.profileStore.dispatch({ type: ProfileActions.CHANNEL_FOLLOW, payload: req });
  }

}
