import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { Store } from '@ngrx/store';
import { UserProfile } from '../../models/user-profile.model';
import { UserMedia } from '../../models/user-media.model';

// action
import { ProfileActions } from '../../actions/profile.action';
import { SharedActions } from '../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  userProfile$: Observable<UserProfile>;
  userMedia$: Observable<UserMedia>;
  userId: number = 12;
  userProfile; userMedia;

  mediaLoadMoreParams = {
    offset: -10,
    limit: 10,
    mediaType: "image"
  };

  constructor(private profileStore: Store<UserProfile>, private mediaStore: Store<UserMedia>) {

    this.userProfile$ = this.profileStore.select('profileTags');

    this.userProfile$.subscribe((state) => {
      this.userProfile = state;
    });

    this.profileStore.dispatch({ type: ProfileActions.LOAD_USER_PROFILE });

    this.loadMoreMedia();

  }

  getUserMedia() {

    this.mediaLoadMoreParams.offset = this.mediaLoadMoreParams.offset + this.mediaLoadMoreParams.limit;
    console.log(this.mediaLoadMoreParams);

    this.userMedia$ = this.mediaStore.select('userMediaTags');

    this.userMedia$.subscribe((state) => {
      this.userMedia = state;
    });

    this.mediaStore.dispatch({
      type: ProfileActions.LOAD_USER_MEDIA,
      payload: this.mediaLoadMoreParams
    });

  }

  loadMoreMedia() {
    this.getUserMedia();
  }

}
