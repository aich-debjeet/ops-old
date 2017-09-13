import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { UserSpotfeeds } from '../../../models/user-spotfeed.model';

// action
import { ProfileActions } from '../../../actions/profile.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home-spotfeed',
  templateUrl: './home-spotfeed.component.html',
  styleUrls: ['./home-spotfeed.component.scss']
})
export class HomeSpotfeedComponent implements OnInit {

  tagState$: Observable<UserSpotfeeds>;
  private tagStateSubscription: Subscription;
  userSpotfeeds;

  constructor(
    private http: Http,
    private store: Store<UserSpotfeeds>
  ) {

    this.tagState$ = this.store.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.userSpotfeeds = state;
    });

    const reqBody = {
      superType: 'spotfeed'
    };

    this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL, payload: reqBody });
  }

  ngOnInit() {
  }

}
