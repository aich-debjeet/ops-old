import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { UserMedia } from '../../../models/user-media.model';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-slider',
  templateUrl: './profile-slider.component.html',
  styleUrls: ['./profile-slider.component.scss']
})
export class ProfileSliderComponent implements OnInit {

  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  userProfile = initialTag ;

  constructor(
    private http: Http,
    private profileStore: Store<ProfileModal>
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    // this.test = 'salabeel';
    this.tagState$.subscribe((state) => {
      this.userProfile = state;
    });

    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS });

  }

  ngOnInit() {

  }
}
