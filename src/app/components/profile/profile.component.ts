import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { Store } from '@ngrx/store';
import { UserProfile } from '../../models/user-profile.model';

// action
import { ProfileActions } from '../../actions/profile.action';
import { SharedActions } from '../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  tagState$: Observable<UserProfile>;
  userId: number = 12;
  bioTag:any;

  constructor(private store: Store<UserProfile>) {
    this.tagState$ = store.select('profileTags');
    // this.tagState$.subscribe(v => console.log(v));

    this.tagState$.subscribe((state) => {
      this.bioTag = state;
      console.log(state);
    });

    // loading logged in user profile
    this.getLoggedInProfile();

  }

  getLoggedInProfile() {

    console.log('loading logged in user');

    this.store.dispatch({
      type: ProfileActions.LOAD_USER_PROFILE
    });

  }

  getUserMedia() {

    console.log('loading logged in users media');

    this.store.dispatch({
      type: ProfileActions.LOAD_USER_MEDIA
    });

  }

}
