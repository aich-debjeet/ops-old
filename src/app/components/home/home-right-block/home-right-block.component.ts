import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ProfileActions } from '../../../actions/profile.action';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { OpportunityModel } from '../../../models/opportunity.model';
import { Store } from '@ngrx/store';
import { ProfileModal } from '../../../models/profile.model';
import { filter as _filter } from 'lodash';
import { OpportunityActions } from '../../../actions/opportunity.action';
import { environment } from '../../../../environments/environment';
import { GeneralUtilities } from '../../../helpers/general.utils';

@Component({
  selector: 'app-home-right-block',
  templateUrl: './home-right-block.component.html',
  styleUrls: ['./home-right-block.component.scss'],
  // providers: [ TruncatePipe ]
})

export class HomeRightBlockComponent implements OnInit, OnDestroy {
  @Output() followUpdate: EventEmitter<any> = new EventEmitter<any>();
  private oppSub: Subscription;
  opportunityState$: Observable<OpportunityModel>;
  baseUrl = environment.API_IMAGE;
  userState: any;
  skillCodes = [];
  loadedRecomOpps = false;
  recordsPerPage = 2;
  opportunities: any[];
  imageBaseUrl: string = environment.API_IMAGE;

  constructor(
    private store: Store<ProfileModal>,
    private generalUtils: GeneralUtilities
  ) {
    this.opportunityState$ = this.store.select('opportunityTags');
    this.oppSub = this.opportunityState$.subscribe((state) => {
      if (this.generalUtils.checkNestedKey(state, ['search_opportunities_result', 'opportunityResponse'])) {
        this.opportunities = state['search_opportunities_result']['opportunityResponse'];
      }
    });
  }

  ngOnInit() {
    this.loadRecomOpps();
  }

  /**
   * load recommended opportunities
   */
  loadRecomOpps() {
    const recommOppParams = {
      limit: this.recordsPerPage,
      scrollId: '',
      filtersMap: [],
      searchType: 'recommended'
    }
    this.store.dispatch({ type: OpportunityActions.SEARCH_OPPORTUNITIES, payload: recommOppParams });
  }

  ngOnDestroy() {
    this.oppSub.unsubscribe();
  }

}
