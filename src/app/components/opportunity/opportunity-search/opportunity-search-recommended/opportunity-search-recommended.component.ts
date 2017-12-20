import { Component, OnInit } from '@angular/core';

import { OpportunityActions } from './../../../../actions/opportunity.action';
import { OpportunityModel } from './../../../../models/opportunity.model';
import { Media } from './../../../../models/media.model';

import { environment } from './../../../../../environments/environment.prod';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-opportunity-search-recommended',
  templateUrl: './opportunity-search-recommended.component.html',
  styleUrls: ['./opportunity-search-recommended.component.scss']
})
export class OpportunitySearchRecommendedComponent implements OnInit {

  opportunityState$: Observable<OpportunityModel>;
  userState$: Observable<Media>;
  userState: any;
  opportunities: any[];
  skillCodes = [];
  loadedRecomOpps = false;

  /* pagination settings */
  recordsPerPage = 10;
  /* pagination settings */

  constructor(
    private store: Store<OpportunityModel>,
    private mediaStore: Store<Media>
  ) {
    // check for opportunity details
    this.opportunityState$ = this.store.select('opportunityTags');

    // check for user details
    this.userState$ = this.mediaStore.select('profileTags');
  }

  ngOnInit() {

    // observe the opportunity state
    this.opportunityState$.subscribe((state) => {
      if (state && state.search_opportunities_data && state.search_opportunities_data.SUCCESS) {
        this.opportunities = state.search_opportunities_data.SUCCESS;
        // console.log('this.opportunities', this.opportunities);
      }

      // check for the result of recommended opportunities
      if (state && state.get_opportunities_data && state.get_opportunities_data.SUCCESS) {
        this.opportunities = state.get_opportunities_data.SUCCESS;
        // console.log('this.opportunities', this.opportunities);
      }
    });

    // observe the user state
    this.userState$.subscribe((state) => {
      this.userState = state;
      // check for user skills
      if (this.userState && this.userState['profile_navigation_details'] && this.userState['profile_navigation_details']['skills'] && this.userState['profile_navigation_details']['skills'].length > 0) {
        // fetching skills in a local var
        const skillsLoaded = this.userState['profile_navigation_details']['skills'];
        // preparing skills as an array of string
        skillsLoaded.forEach((skill, index) => {
          // console.log('skill.code', skill.code);
          if (skill && skill.code) {
            this.skillCodes.push(skill.code);
          }
          if ((skillsLoaded.length - 1) === index) {
            if (!this.loadedRecomOpps) {
              this.loadRecomOpps();
            }
          }
        });
      }

    });

  }

  /**
   * load recommended opportunities
   */
  loadRecomOpps() {
    const recomSearchParams = {
      industry: this.skillCodes,
      offset: 0, // initial request
      limit: this.recordsPerPage
    }
    // console.log('dispatch recommended opportunities');
    this.store.dispatch({
      type: OpportunityActions.GET_OPPORTUNITIES,
      payload: recomSearchParams
    });
  }

}
