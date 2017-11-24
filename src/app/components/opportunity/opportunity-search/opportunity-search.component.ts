import { Component, OnInit, ViewChild } from '@angular/core';

// actions
import { OpportunityActions } from 'app/actions/opportunity.action';

// store
import { Store } from '@ngrx/store';

// models
import { OpportunityModel } from './../../../models/opportunity.model';

// services
import { LocalStorageService } from './../../../services/local-storage.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-opportunity-search',
  templateUrl: './opportunity-search.component.html',
  styleUrls: ['./opportunity-search.component.scss']
})
export class OpportunitySearchComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput') searchInput;
  @ViewChild('searchQueryElement') searchQueryElement;

  opportunityState$: any;
  opportunityState: any;
  searchString: string;
  isSearching = false;
  opportunitiesCount = {
    Audition: '0',
    Projects: '0',
    Jobs: '0',
    Internship: '0',
    Volunteer: '0',
    Freelance: '0'
  };

  recordsPerPage = 10;
  showPreloader = false;

  constructor(
    private store: Store<OpportunityModel>
  ) {
    // state listener
    this.opportunityState$ = this.store.select('opportunityTags');
    this.opportunityState$.subscribe((state) => {
      this.opportunityState = state;
      // console.log('state', state);
      if (state && state.searching_opportunities === false) {
        this.isSearching = false;
        this.showPreloader = false;
      }
      // if (state && state.getting_opportunity_type_count === true) {
      //   console.log('requesting opp type count');
      // }
      if (state && state.get_opportunity_type_success && state.get_opportunity_type_success === true) {
        this.prepareOppCount(state.get_opportunity_type_data.SUCCESS);
      }
    });

    // get opportunity type count
    this.store.dispatch({ type: OpportunityActions.GET_OPPORTUNITY_TYPE_COUNT });
  }

  /**
   * Preparing opp counts to display
   */
  prepareOppCount(oppTypes: any) {
    oppTypes.forEach((oppType, index) => {
      if (oppType.jobType === 'Audition') {
        this.opportunitiesCount.Audition = String(oppType.count);
      } else if (oppType.jobType === 'Projects') {
        this.opportunitiesCount.Projects = String(oppType.count);
      } else if (oppType.jobType === 'Jobs') {
        this.opportunitiesCount.Jobs = String(oppType.count);
      } else if (oppType.jobType === 'Internship') {
        this.opportunitiesCount.Internship = String(oppType.count);
      } else if (oppType.jobType === 'Volunteer') {
        this.opportunitiesCount.Volunteer = String(oppType.count);
      } else if (oppType.jobType === 'Freelance') {
        this.opportunitiesCount.Freelance = String(oppType.count);
      }
      // console.log(oppType.jobType);
      // console.log(oppType.count);
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    /**
     * Observing the search input change
     */
    this.searchInput.valueChanges
    .debounceTime(500)
    .subscribe(() => {

      this.searchString = this.searchInput.value;
      // console.log('searching: ', this.searchString);

      // search if string is available
      if (this.searchString && this.searchString.length > 0) {
        // console.log('new search', this.searchString);
        this.isSearching = true;

        const searchParams = {
          query: this.searchString,
          offset: 0,
          limit: this.recordsPerPage
        }

        // search opportunities
        this.store.dispatch({ type: OpportunityActions.SEARCH_OPPORTUNITIES, payload: searchParams });
      }

    });

  }

}
