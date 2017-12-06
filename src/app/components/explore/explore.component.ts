import { Component, OnInit } from '@angular/core';

// actions
import { ExploreActions } from 'app/actions/explore.action';

// store
import { Store } from '@ngrx/store';

// models
import { ExploreModel } from 'app/models/explore.model';

// services

// rx
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  userState$: Observable<any>;
  userProfile: any;
  spotfeeds: any[];

  constructor(
    private store: Store<ExploreModel>
  ) {

    /**
     * check user state
     */
    this.userState$ = this.store.select('profileTags');
    this.userState$.subscribe((state) => {
      console.log();
      if (state && state.profile_navigation_details) {
        this.userProfile = state.profile_navigation_details;
        // console.log('this.userProfile', this.userProfile);
      }

      // get current profiles spotfeeds
      if (state && state.home_spotfeeds && state.home_spotfeeds.SUCCESS) {
        this.spotfeeds = state.home_spotfeeds.SUCCESS;
        console.log('spotfeeds', this.spotfeeds);
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
