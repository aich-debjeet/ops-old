import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-channel',
  templateUrl: './profile-channel.component.html',
  styleUrls: ['./profile-channel.component.scss']
})
export class ProfileChannelComponent implements OnInit {

  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  profileChannel = initialTag ;

  constructor(
    private http: Http,
    private profileStore: Store<ProfileModal>
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    // this.test = 'salabeel';
    this.tagState$.subscribe((state) => {
      this.profileChannel = state;
    });

    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL });

  }

  toggleFollowBtn(i) {
    console.log(i);
  }

  ngOnInit() {
  }

}
