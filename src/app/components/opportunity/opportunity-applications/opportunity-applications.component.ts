import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { OpportunityModel } from '../../../models/opportunity.model';
import { OpportunityActions } from '../../../actions/opportunity.action';
import { ISubscription } from 'rxjs/Subscription';
import { GeneralUtilities } from '../../../helpers/general.utils';

@Component({
  selector: 'app-opportunity-applications',
  templateUrl: './opportunity-applications.component.html',
  styleUrls: ['./opportunity-applications.component.scss']
})
export class OpportunityApplicationsComponent implements OnInit, OnDestroy {
  opportunityState$: any;
  opportunityState: any;
  routerSub: ISubscription;
  oppsSub: ISubscription;
  jobId: any;
  oppApplications: any[];
  showPreloader = true;

  constructor(
    private route: ActivatedRoute,
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
          this.generalUtils.checkNestedKey(state, ['get_applications']) && state['get_applications'] === false
          && this.generalUtils.checkNestedKey(state, ['get_applications_success']) && state['get_applications_success'] === true
        ) {
          this.showPreloader = false;
        }
        if (this.generalUtils.checkNestedKey(state, ['get_applications_result', 'applicationResponse'])) {
          this.oppApplications = state['get_applications_result']['applicationResponse'];
        }
      }
    });
  }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      if (params['id']) {
        // search job with id
        this.jobId = params['id'];
        this.getApplications({
          jobId: this.jobId
        });
      }
    });
  }

  getApplications(params: any) {
    this.store.dispatch({ type: OpportunityActions.GET_APPLICATIONS, payload: params });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    this.oppsSub.unsubscribe();
  }

}
