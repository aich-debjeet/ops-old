import { Component, OnInit } from '@angular/core';
import { ProfileModal, initialTag } from '../../models/profile.model';
import { Store } from '@ngrx/store';

// action
import { ProfileActions } from '../../actions/profile.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss']
})
export class StatusListComponent implements OnInit {
  storeState$: Observable<ProfileModal>;
  userStatus: any;
  constructor(
    private _store: Store<ProfileModal>
  ) {
    this.storeState$ = this._store.select('profileTags');

    this.storeState$.subscribe((state) => {
      this.userStatus = state['user_status_list'];
    });
  }

  ngOnInit() {
    this._store.dispatch({ type: ProfileActions.LOAD_USER_STATUS, payload: 'D_BC0C5227_3FF7_4260_8733_DFDBFE965437' });
  }

}
