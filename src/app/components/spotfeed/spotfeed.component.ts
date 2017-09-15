import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { ProfileActions } from './../../actions/profile.action';
import { Spotfeed } from './../../models/profile.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-spotfeed',
  templateUrl: './spotfeed.component.html',
  styleUrls: ['./spotfeed.component.scss']
})
export class SpotfeedComponent implements OnInit {

  spotfeedId: string;
  spotfeedDetails: any;
  userState$: Observable<Spotfeed>;

  constructor(
    private route: ActivatedRoute,
    private _store: Store<Spotfeed>,
  ) {

    this.userState$ = this._store.select('profileTags');

    this.spotfeedId = route.snapshot.params['id'];
    console.log(this.spotfeedId);
    this.userState$.subscribe((state) => {
      this.spotfeedDetails = state;
      console.log('this.spotfeedDetails');
      console.log(this.spotfeedDetails);
    });

    this._store.dispatch({ type: ProfileActions.GET_SPOTFEED_DETAILS, payload: this.spotfeedId });
  }

  ngOnInit() {
  }

}
