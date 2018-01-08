import { Component, OnInit } from '@angular/core';

import { Store, Action } from '@ngrx/store';

import { ProfileModal, initialTag } from 'app/models/profile.model';
import { Media, initialMedia  } from 'app/models/media.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// action
import { ProfileActions } from 'app/actions/profile.action';

@Component({
  selector: 'app-org-post',
  templateUrl: './org-post.component.html',
  styleUrls: ['./org-post.component.scss']
})
export class OrgPostComponent implements OnInit {

  tagState$: Observable<ProfileModal>;
  counter: number;
  posts: any;
  userMedia = initialTag;
  isOwner: boolean;
  page_start = 0;
  page_end = 20;

  constructor(
    private _store: Store<Media>
  ) {
    this.tagState$ = this._store.select('profileTags');
    this.counter = 0;
    this.posts = [];
    this.tagState$.subscribe((state) => {
      this.userMedia = state;
      console.log('org state', this.userMedia);
      this.posts = this.userMedia.user_posts;
      console.log('org posts', this.posts);

      const profileHandle = localStorage.getItem('profileHandle');

      // check if org owner
      if (profileHandle && state
        && state['profile_cards']
        && state['profile_cards']['active']
        && state['profile_cards']['active']['isOrg']
        && state['profile_cards']['active']['isOrg'] === true
        && state['profile_cards']['active']['handle'] === profileHandle) {
        console.log('owner of org');
      }
    });
  }

  ngOnInit() {
    const pType = localStorage.getItem('profileType');
    const pHandle = localStorage.getItem('profileHandle');
    if (pType && pHandle && pType === 'organization') {
      this.postLoad(pHandle);
    }
  }

  /**
   * Current org post load
   * @param handle Org Handle
   */
  postLoad(handle) {
    const data = {
      handle: handle,
      page_start: this.page_start,
      page_end: this.page_end
    }
    this._store.dispatch({ type: ProfileActions.LOAD_USER_MEDIA, payload: data });
  }

  onScroll(e) {
  }

}
