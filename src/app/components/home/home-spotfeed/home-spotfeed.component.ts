import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { UserSpotfeeds } from '../../../models/user-spotfeed.model';

import { LocalStorageService } from './../../../services/local-storage.service';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { environment } from '../../../../environments/environment';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home-spotfeed',
  templateUrl: './home-spotfeed.component.html',
  styleUrls: ['./home-spotfeed.component.scss']
})
export class HomeSpotfeedComponent implements OnInit, OnDestroy {

  private subscription: ISubscription;
  tagState$: Observable<UserSpotfeeds>;
  private tagStateSubscription: Subscription;
  userState;
  spotfeeds: any = [];
  baseUrl: String;

  constructor(
    private http: Http,
    private store: Store<UserSpotfeeds>,
    private localStorageService: LocalStorageService
  ) {

    this.tagState$ = this.store.select('profileTags');
    this.subscription = this.tagState$.subscribe((state) => {
      this.userState = state;
      if (this.userState.home_spotfeeds !== undefined && this.userState.home_spotfeeds.SUCCESS !== undefined) {
        this.spotfeeds = this.userState.home_spotfeeds.SUCCESS;
      }
    });
  }

  ngOnInit() {
    this.store.dispatch({ type: ProfileActions.LOAD_HOME_PAGE_SPOTFEEDS });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
