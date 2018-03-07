import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileModal, initialTag } from '../../models/profile.model';
import { Store } from '@ngrx/store';

// action
import { ProfileActions } from '../../actions/profile.action';
import { MediaActions } from '../../actions/media.action';

// rx
// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.scss']
})
export class StatusListComponent implements OnInit, OnDestroy {
  storeState$: Observable<ProfileModal>;
  userStatus: any;
  handle: any;
  private subscription: ISubscription;
  constructor(
    private _store: Store<ProfileModal>
  ) {
    this.storeState$ = this._store.select('profileTags');

    this.subscription = this.storeState$.subscribe((state) => {
      if (state) {
        this.userStatus = state['user_status_list'];
        if (state['profile_cards'] && state['profile_cards']['active'] && state['profile_cards']['active'].handle) {
          this.handle = state['profile_cards']['active'].handle;
          console.log(this.handle);
          // this.userList()
        }

      }
    });
  }

  ngOnInit() {
    this.userList()
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  userList() {
    this._store.dispatch({ type: ProfileActions.LOAD_USER_STATUS,  payload: this.handle });
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
