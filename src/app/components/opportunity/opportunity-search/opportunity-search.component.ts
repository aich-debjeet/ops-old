import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

// actions
import { OpportunityActions } from 'app/actions/opportunity.action';
import { AuthActions } from 'app/actions/auth.action';
import { environment } from '../../../../environments/environment';

// store
import { Store } from '@ngrx/store';

// models
import { OpportunityModel } from './../../../models/opportunity.model';

// services
import { LocalStorageService } from './../../../services/local-storage.service';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-opportunity-search',
  templateUrl: './opportunity-search.component.html',
  styleUrls: ['./opportunity-search.component.scss']
})
export class OpportunitySearchComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('searchInput') searchInput;
  @ViewChild('searchQueryElement') searchQueryElement;

  // loginTagState$: Observable<any>;
  private subscription: ISubscription;
  // opportunityState$: any;
  // opportunityState: any;
  // searchString: string;
  // insdustryType: 'Industry';
  // isSearching = false;
  opportunitiesCount = {
    Audition: '0',
    Projects: '0',
    Jobs: '0',
    Internship: '0',
    Volunteer: '0',
    Freelance: '0'
  };

  // recordsPerPage = 10;
  // showPreloader = false;
  baseUrl = environment.API_IMAGE;

  constructor(
    private store: Store<OpportunityModel>
  ) {
    // // state listener
    // this.opportunityState$ = this.store.select('opportunityTags');
    // this.subscription = this.opportunityState$.subscribe((state) => {
    //   if (typeof state !== 'undefined') {
    //     this.opportunityState = state;
    //     if (state && state.searching_opportunities === false) {
    //       this.isSearching = false;
    //       this.showPreloader = false;
    //     }

    //     if (state && state.get_opportunity_type_success && state.get_opportunity_type_success === true) {
    //       this.prepareOppCount(state.get_opportunity_type_data.SUCCESS);
    //     }
    //   }
    // });
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
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {

    // /**
    //  * Observing the search input change
    //  */
    // this.searchInput.valueChanges
    // .debounceTime(500)
    // .subscribe(() => {

    //   this.searchString = this.searchInput.value;

    //   // search if string is available
    //   if (this.searchString && this.searchString.length > 0) {
    //     this.isSearching = true;

    //     const searchParams = {
    //       query: this.searchString,
    //       offset: 0,
    //       limit: this.recordsPerPage
    //     }

    //     // search opportunities
    //     this.store.dispatch({ type: OpportunityActions.SEARCH_OPPORTUNITIES, payload: searchParams });
    //   }

    // });

  }

}
