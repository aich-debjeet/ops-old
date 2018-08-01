import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { OpportunityModel } from '../../../models/opportunity.model';
import { OpportunityActions } from '../../../actions/opportunity.action';
import { ISubscription } from 'rxjs/Subscription';
import { GeneralUtilities } from '../../../helpers/general.utils';
import { ToastrService } from 'ngx-toastr';
import { MessageActions } from '../../../actions/message.action';

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
    private router: Router,
    private toastr: ToastrService,
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

  submitApplicationAction(data: any) {
    if (data.action === 'remove') {
      this.store.dispatch({
        type: OpportunityActions.REMOVE_APPLICATION,
        payload: data.applicationInfo
      });
      setTimeout(() => {
        this.toastr.success('Appication removed successfully');
      }, 1000);
    } else if (data.action === 'reachout') {
      const userDetails = {
        handle: data['applicationInfo']['userHandle'],
        username: data['applicationInfo']['userUserName'],
        profileImage: data['applicationInfo']['userImage'],
        name: data['applicationInfo']['userName'],
        latestMessage: '',
        messageType: 'sent',
        isRead: true,
        isBlocked: false,
        isDeleted: false,
        time: Date.now()
      };
      this.store.dispatch({
        type: MessageActions.ADD_TO_MESSANGER_LIST,
        payload: userDetails
      });
      this.router.navigate(['/user/message']);
    }
  }

}
