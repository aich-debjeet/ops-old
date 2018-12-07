import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserSpotfeeds } from '../../../models/user-spotfeed.model';

// action
import { ProfileActions } from '../../../actions/profile.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-spotfeed',
  templateUrl: './profile-spotfeed.component.html',
  styleUrls: ['./profile-spotfeed.component.scss']
})
export class ProfileSpotfeedComponent implements OnInit, OnDestroy {

  tagState$: Observable<UserSpotfeeds>;
  private profSub: Subscription;
  userState;
  spotfeeds: any = [];
  baseUrl: String;

  constructor(
    private store: Store<UserSpotfeeds>
  ) {

    this.tagState$ = this.store.select('profileTags');
    this.profSub = this.tagState$.subscribe((state) => {
      this.userState = state;
      if (this.userState.home_spotfeeds !== undefined && this.userState.home_spotfeeds.SUCCESS !== undefined) {
        this.spotfeeds = this.userState.home_spotfeeds.SUCCESS;
      }
    });
    this.store.dispatch({ type: ProfileActions.LOAD_HOME_PAGE_SPOTFEEDS });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.profSub.unsubscribe();
  }

}
