import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../models/profile.model';

// action
import { ProfileActions } from '../../actions/profile.action';

// rx
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss']
})
export class QuickAccessComponent {

  @Input() quickAccessData;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
  storeState$: Observable<ProfileModal>;
  userProfile = initialTag;
  userHandle: any;
  imageBaseUrl: string = environment.API_IMAGE;
  channel_unpin_success = false;

  constructor(
    private _store: Store<ProfileModal>
  ) {
    this.storeState$ = this._store.select('profileTags');
     this.storeState$.subscribe((state) => {
       this.userHandle = state['profile_details'].handle;
       if (state.channel_unpin_success && this.channel_unpin_success) {
        this._store.dispatch({ type: ProfileActions.LOAD_USER_CHANNEL, payload: this.userHandle });
        this.channel_unpin_success = false;
       }
      // this.userProfile = state['profile_details'];
    });
  }

  unpinQuickAccess(spotfeedId: string) {
    this.channel_unpin_success = true;
    const data = {
      'spotfeedId': spotfeedId,
      'profileHandle': this.userHandle
    }

    this._store.dispatch({ type: ProfileActions.UNPIN_CHANNEL, payload: data });
  }

}
