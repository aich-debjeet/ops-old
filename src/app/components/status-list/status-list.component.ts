import { Component, OnInit } from '@angular/core';
import { ProfileModal, initialTag } from '../../models/profile.model';
import { Store } from '@ngrx/store';

// action
import { ProfileActions } from '../../actions/profile.action';
import { MediaActions } from '../../actions/media.action';

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
    this._store.dispatch({ type: ProfileActions.LOAD_USER_STATUS });
  }

  postDelete(post) {
    const index: number = this.userStatus.indexOf(post);
    if (index !== -1) {
      this.userStatus.splice(index, 1);
      const id = post.id;
      this._store.dispatch({ type: MediaActions.MEDIA_POST_DELETE, payload: id});
    }
  }

}
