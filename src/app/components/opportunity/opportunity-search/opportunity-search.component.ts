import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

// actions
import { OpportunityActions } from 'app/actions/opportunity.action';
import { environment } from '../../../../environments/environment';

// store
import { Store } from '@ngrx/store';

// models
import { OpportunityModel } from './../../../models/opportunity.model';

// services
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

// rx
import { ISubscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';

// helper functions
import { ScrollHelper } from '../../../helpers/scroll.helper';
import { GeneralUtilities } from '../../../helpers/general.utils';
import * as _ from 'lodash';

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
  globalFilter = [];
  showPreloader = false;
  baseUrl = environment.API_IMAGE;
  opportunities = [];
  recordsPerPage = 4;

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
          this.prepareFilters(state.search_opportunities_result.filterList);
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
  prepareFilters(filterList: any) {
    // for opportunity type filter
    for (let i = 0; i < filterList.length; i++) {
      if (filterList[i].hasOwnProperty('title') && filterList[i]['title'] === 'OPPORTUNITY_TYPE') {
        if (filterList[i].hasOwnProperty('filters')) {
          for (let j = 0; j < filterList[i].filters.length; j++) {
            if (filterList[i].filters[j].hasOwnProperty('name') && filterList[i].filters[j].hasOwnProperty('count')) {
              const oppType = this.generalUtils.capitalizeFirstLetter(filterList[i].filters[j].name);
              this.opportunitiesCount[oppType] = filterList[i].filters[j].count;
            }
          }
        }
        // console.log('this.opportunitiesCount', this.opportunitiesCount);
        break;
      }
    }
  }

  /**
   * select opportunity filter
   */
  selectOppTypeFilter(parentNode: string, oppType: string) {
    if (parentNode.length > 0 && oppType.length > 0) {
      const fltrObj = { key: parentNode, value: oppType };
      // check if filter contains the value already
      if (!_.find(this.globalFilter, fltrObj)) {
        this.globalFilter.push(fltrObj);
      } else {
        return;
      }
      const params = {
        q: this.searchString,
        type: this.searchType,
        filters: encodeURIComponent(JSON.stringify(this.globalFilter))
      };
      this.oppsSearchGetRequest(params);
    }
  }

  /**
   * reset search filter
   */
  resetGlobalFilter() {
    this.globalFilter = [];
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
            limit: this.recordsPerPage,
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
