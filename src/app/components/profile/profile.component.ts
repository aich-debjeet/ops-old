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

  userId: number = 12;

  constructor(private store: Store<UserProfile>) {

    // loading logged in user profile
    this.getLoggedInProfile();

  }

  getLoggedInProfile() {

    console.log('loading logged in user');

    this.store.dispatch({
      type: ProfileActions.LOAD_USER_PROFILE
    });

  }

}
