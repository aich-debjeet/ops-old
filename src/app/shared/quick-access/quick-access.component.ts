import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../models/profile.model';

// action
import { ProfileActions } from '../../actions/profile.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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

  constructor(
    private _store: Store<ProfileModal>
  ) {
    this.storeState$ = this._store.select('profileTags');

     this.storeState$.subscribe((state) => {
       this.userHandle = state['profile_details'].handle;
      // this.userProfile = state['profile_details'];
    });
  }

  unpinQuickAccess(spotfeedId: string) {
    const data = {
      'spotfeedId': spotfeedId,
      'profileHandle': this.userHandle
    }

    this._store.dispatch({ type: ProfileActions.UNPIN_CHANNEL, payload: data });
  }

}
