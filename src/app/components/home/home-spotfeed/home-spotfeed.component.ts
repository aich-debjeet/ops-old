import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserSpotfeeds } from '../../../models/user-spotfeed.model';
import { ProfileActions } from '../../../actions/profile.action';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-home-spotfeed',
  templateUrl: './home-spotfeed.component.html',
  styleUrls: ['./home-spotfeed.component.scss']
})
export class HomeSpotfeedComponent implements OnInit, OnDestroy {

  private profSub: Subscription;
  tagState$: Observable<UserSpotfeeds>;
  userState;
  spotfeeds: any = [];
  baseUrl: String;

  constructor(
    private store: Store<UserSpotfeeds>,
  ) {
    this.tagState$ = this.store.select('profileTags');
    this.profSub = this.tagState$.subscribe((state) => {
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
    this.profSub.unsubscribe();
  }

}
