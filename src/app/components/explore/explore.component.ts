import { Component, OnInit } from '@angular/core';

// actions
import { ExploreActions } from 'app/actions/explore.action';
import { ProfileActions } from 'app/actions/profile.action';

// store
import { Store } from '@ngrx/store';

// models
import { ExploreModel } from 'app/models/explore.model';

// services

// rx
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment.prod';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  userState$: Observable<any>;
  userProfile: any;
  spotfeeds: any[];
  baseUrl: string;

  constructor(
    private store: Store<ExploreModel>
  ) {

    this.baseUrl = environment.API_IMAGE;

    // load user specific spotfeeds
    this.store.dispatch({ type: ProfileActions.LOAD_HOME_PAGE_SPOTFEEDS });

    // load category wise spotfeeds
    this.store.dispatch({ type: ExploreActions.LOAD_SPOTFEEDS });

    /**
     * check user state
     */
    this.userState$ = this.store.select('profileTags');
    this.userState$.subscribe((state) => {
      if (state && state.profile_navigation_details) {
        this.userProfile = state.profile_navigation_details;
        // console.log('this.userProfile', this.userProfile);
      }

      // get current profiles spotfeeds
      if (state && state.home_spotfeeds && state.home_spotfeeds.SUCCESS) {
        this.spotfeeds = state.home_spotfeeds.SUCCESS;
        // console.log('spotfeeds', this.spotfeeds);
      }
    });

  }

  ngOnInit() {
  }

  /**
   * Navigate to the spotfeed
   */
  gotoSpotfeed(spotfeedId: string) {
    console.log('goto ', spotfeedId);
  }

}
