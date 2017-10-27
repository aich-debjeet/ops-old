import { Component, OnInit } from '@angular/core';

import { ProfileActions } from '../../../actions/profile.action';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';

import { ProfileModal, initialTag } from '../../../models/profile.model';
import { filter as _filter } from 'lodash';

@Component({
  selector: 'home-right-block',
  templateUrl: './home-right-block.component.html',
  styleUrls: ['./home-right-block.component.scss']
})

export class HomeRightBlockComponent implements OnInit {
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  myProfile$: Observable<any>;
  userState: any;
  profiles: any;
  constructor(
    private store: Store<ProfileModal>
  ) {
    this.myProfile$ = store.select('profileTags');
  }

  ngOnInit() {
    this.store.dispatch({ type: ProfileActions.LOAD_ALL_PROFILES, payload: '' });
    this.myProfile$.subscribe(event => {
      this.profiles = event.user_profiles_all;
    });
  }

  getProfileImage() {
    return _filter(this.profiles, function(item) {
      return item.profileImage !== '';
    });
  }

}
