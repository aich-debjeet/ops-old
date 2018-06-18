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
import { Router, ActivatedRoute } from '@angular/router';

// helper functions
import { ScrollHelper } from '../../../helpers/scroll.helper';
import { GeneralUtilities } from '../../../helpers/general.utils';

@Component({
  selector: 'app-opportunity-search',
  templateUrl: './opportunity-search.component.html',
  styleUrls: ['./opportunity-search.component.scss']
})
export class OpportunitySearchComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('searchInput') searchInput;
  @ViewChild('searchQueryElement') searchQueryElement;
  private oppsSub: ISubscription;
  routeSub: any;
  opportunityState$: any;
  opportunityState: any;
  searchString = '';
  // default search type
  searchType = 'recommended';
  isSearching = false;
  opportunitiesCount = {
    Audition: '0',
    Projects: '0',
    Jobs: '0',
    Internship: '0',
    Volunteer: '0',
    Freelance: '0'
  };
  showPreloader = false;
  baseUrl = environment.API_IMAGE;
  opportunities = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private scrollHelper: ScrollHelper,
    private store: Store<OpportunityModel>,
    private generalUtils: GeneralUtilities
  ) {
    // state listener
    this.opportunityState$ = this.store.select('opportunityTags');
    this.oppsSub = this.opportunityState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        this.opportunityState = state;
        // check for the http request response status
        if (
          this.generalUtils.checkNestedKey(state, ['searching_opportunities']) && state['searching_opportunities'] === false
          && this.generalUtils.checkNestedKey(state, ['search_opportunities_success']) && state['search_opportunities_success'] === true
        ) {
          this.isSearching = false;
          this.showPreloader = false;
        }
        if (this.generalUtils.checkNestedKey(state, ['search_opportunities_result', 'opportunityResponse'])) {
          this.opportunities = state.search_opportunities_result.opportunityResponse;
          console.log('this.opportunities', this.opportunities);
        }
      }
    });
  }

  // trigger opps search action
  oppsSearchGetRequest(queryParams: any) {
    this.router.navigate(['/opportunity/search'], {
      queryParams: queryParams
    });
    return false;
  }

  /**
   * change the search type
   */
  switchSearchType(sType: string) {
    this.searchType = sType;
    this.scrollHelper.scrollTop();
    this.oppsSearchGetRequest({ q: this.searchString, type: this.searchType });
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

  ngOnInit() {
    this.routeSub = this.route.queryParams
      .subscribe(params => {
        // check if search type is available
        if (params.type && params.type.length > 0) {
          // giving back the search type
          this.searchType = params.type;
        }
        // check if search type is available
        if (this.searchType.length > 0) {
          const searchOppsParams = {
            limit: 12,
            scrollId: '',
            filtersMap: [],
            searchType: this.searchType,
            searchText: this.searchString
          }
          this.isSearching = true;
          this.showPreloader = true;
          this.store.dispatch({ type: OpportunityActions.SEARCH_OPPORTUNITIES, payload: searchOppsParams });
        }
      });
  }

  ngOnDestroy() {
    this.oppsSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

  ngAfterViewInit() {
    /**
     * Observing the search input change
     */
    this.searchInput.valueChanges
      .debounceTime(500)
      .subscribe(() => {

        // save search input ref in global var
        this.searchString = this.searchInput.value;

        if (this.searchString.length === 0) {
          // trigger search get request
          this.oppsSearchGetRequest({});
        }

        // preparing get query params for the search get request
        const params = {
          q: this.searchString,
          type: this.searchType
        };

        // trigger search get request
        this.oppsSearchGetRequest(params);

      });
  }

}
