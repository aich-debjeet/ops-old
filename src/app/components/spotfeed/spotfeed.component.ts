import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { ProfileActions } from './../../actions/profile.action';
import { Spotfeed } from './../../models/profile.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { environment } from './../../../environments/environment'

@Component({
  selector: 'app-spotfeed',
  templateUrl: './spotfeed.component.html',
  styleUrls: ['./spotfeed.component.scss']
})
export class SpotfeedComponent {

  baseUrl: string;
  spotfeedId: string;
  spotfeedDetails: any;
  userState$: Observable<Spotfeed>;
  userState: any;
  spotfeedPosts: any[];

  constructor(
    private route: ActivatedRoute,
    private _store: Store<Spotfeed>,
  ) {

    this.baseUrl = environment.API_IMAGE;

    this.userState$ = this._store.select('profileTags');

    this.spotfeedId = route.snapshot.params['id'];
    this.userState$.subscribe((state) => {
      this.userState = state;
      this.spotfeedDetails = state.spotfeed_detail;
      if (state.spotfeed_detail && state.spotfeed_detail['SUCCESS'].spotfeedMedia) {
        this.spotfeedPosts = state.spotfeed_detail['SUCCESS'].spotfeedMedia;
        // console.log('this.spotfeedPosts');
        // console.log(this.spotfeedPosts);
      }
    });

    this._store.dispatch({ type: ProfileActions.GET_SPOTFEED_DETAILS, payload: this.spotfeedId });
  }

  disableFollowForSelf(username: string) {
    if (username === this.userState.profileUser.username) {
      return true;
    }
    return false;
  }

}
