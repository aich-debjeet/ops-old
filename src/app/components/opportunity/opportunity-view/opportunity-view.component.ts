import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// actions
import { OpportunityActions } from 'app/actions/opportunity.action';

// store
import { Store } from '@ngrx/store';

// models
import { OpportunityModel } from './../../../models/opportunity.model';

import { environment } from '../../../../environments/environment';

import { ISubscription } from 'rxjs/Subscription';
// import { GeneralUtilities } from '../../../helpers/general.utils';
import { ToastrService } from 'ngx-toastr';
import { GeneralUtilities } from '../../../helpers/general.utils';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { Modal } from '../../../shared/modal-new/Modal';
import { BookmarkActions } from 'app/actions/bookmark.action';

@Component({
  selector: 'app-opportunity-view',
  templateUrl: './opportunity-view.component.html',
  styleUrls: ['./opportunity-view.component.scss']
})
export class OpportunityViewComponent implements OnInit, OnDestroy {

  opportunityState$: any;
  opportunityState: any;
  opportunity: any;
  jobId: any;
  profileState: any;
  profileState$: any;
  hasApplied: boolean;
  routerSub: any;
  userActionLoading = false;

  baseUrl = environment.API_IMAGE;
  private oppsSub: ISubscription;
  private profileSub: ISubscription;
  isOwnOpportunity = false;
  showOptions = false;
  reportId: string;
  questions: any;
  reportType: string;
  @ViewChild('cancelApplicationModal') cancelApplicationModal: Modal;

  similarOpportunities: any;
  similarOpportunitiesLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private generalUtils: GeneralUtilities,
    private toastr: ToastrService,
    public modalService: ModalService,
    private store: Store<OpportunityModel>
  ) {
    // opportunity state listener
    this.opportunityState$ = this.store.select('opportunityTags');
    this.oppsSub = this.opportunityState$.subscribe((state) => {
      this.opportunityState = state;
      // console.log('state', state);
      if (state) {
        // get opp data
        if (state['reports']) {
          this.questions = state['reports'];
          this.reportType = 'opportunity';
          // console.log(this.questions)
        }

        if (state.get_opportunity_data) {
          this.opportunity = state.get_opportunity_data;
          this.hasApplied = state.get_opportunity_data.isApplied;

          if (!this.similarOpportunitiesLoaded) {
            this.similarOpportunitiesLoaded = true;
            const simOppsParams = {
              limit: 5,
              scrollId: '',
              // filtersMap: this.globalFilter,
              searchType: 'recommended'
            }
            // this.isSearching = true;
            // this.showPreloader = true;
            this.store.dispatch({ type: OpportunityActions.GET_SIMILAR_OPPORTUNITIES, payload: simOppsParams });
          }
        }
        const userHandle = localStorage.getItem('loggedInProfileHandle');
        if (userHandle
          && this.generalUtils.checkNestedKey(this.opportunityState, ['get_opportunity_data', 'ownerHandle'])
          && state['get_opportunity_data']['ownerHandle'] === userHandle
        ) {
          this.isOwnOpportunity = true;
        } else {
          this.isOwnOpportunity = false;
        }
        // delete listener
        if (state['delete_opp_requested'] === false && state['delete_opp_success'] === true) {
          this.toastr.success('Opporunity deleted successfully!', '', {
            timeOut: 3000
          });
          setTimeout(() => {
            this.router.navigateByUrl('/opportunity');
          }, 2000);
        }
      }
    });

    /**
     * check user state
     */
    this.profileState$ = this.store.select('profileTags');
    this.profileSub = this.profileState$.subscribe((state) => {
      if (state && state.profile_navigation_details) {
        this.profileState = state.profile_navigation_details;
      }
    });
  }

  /**
   * Disable appy for opportunity for self
   */
  disableApplicationForSelf(username: string) {
    if (this.profileState && (this.profileState['username'] === username)) {
      // console.log('DISABLE');
      return true;
    }
    // console.log('ENABLE');
    return false;
  }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      if (params['id']) {
        // search job with id
        this.jobId = params['id'];
        this.store.dispatch({ type: OpportunityActions.GET_OPPORTUNITY, payload: this.jobId });
        this.store.dispatch({ type: OpportunityActions.GET_OPPORTUNITY_COLLABORATORS, payload: this.jobId });
      }
    });
  }

  ngOnDestroy() {
    this.oppsSub.unsubscribe();
    this.routerSub.unsubscribe();
    this.profileSub.unsubscribe();
  }

  /**
   * apply for job
   */
  userOppAction(action: string) {
    if (action === 'apply') {
      this.userActionLoading = true;
      const reqBody = {
        jobId: this.jobId
      }
      this.store.dispatch({
        type: OpportunityActions.APPLY_FOR_AN_OPPORTUNITY,
        payload: reqBody
      });
      this.store.select('opportunityTags')
        .first(state => state['applying_for_an_opportunity'] === false && state['apply_for_an_opportunity_success'] === true)
        .subscribe(() => {
          this.userActionLoading = false;
          this.toastr.success('Successfully applied for the opportunity!', 'Success!', {
            timeOut: 3000
          });
        });
    } else if (action === 'cancel') {
      this.cancelApplicationModal.open();
    }
  }

  deleteOpp(oppId: string) {
    if (oppId.length > 0) {
      this.store.dispatch({
        type: OpportunityActions.DELETE_OPPORTUNITY,
        payload: oppId
      });
    }
  }

  reportModalOpen(id: string) {
    this.reportId = id;
    this.modalService.open('reportPopUp');
    this.store.dispatch({ type: OpportunityActions.OPPORTUNITY_REPORT, payload: 'opportunity' });
  }

  closeReport() {
    this.modalService.close('reportPopUp');
  }

  confirmation(action: string) {
    this.closeCancelApplicationModal();
    if (action === 'yes') {
      this.userActionLoading = true;
      this.store.dispatch({
        type: OpportunityActions.CANCEL_APPLICATION,
        payload: { jobId: this.jobId }
      });
      this.store.select('opportunityTags')
        .first(state => state['cancel_application'] === false && state['cancel_application_success'] === true)
        .subscribe(() => {
          this.userActionLoading = false;
          this.toastr.success('Application cancelled!', 'Success!', {
            timeOut: 3000
          });
        });
    }
  }

  closeCancelApplicationModal() {
    this.cancelApplicationModal.close();
  }

  bookmarkAction(action: string, oppId: string) {
    if (action === 'add') {
      const reqBody = {
        bookmarkType: 'opportunity',
        contentId: oppId
      };
      this.store.dispatch({ type: BookmarkActions.BOOKMARK, payload: reqBody });
      const bookmarkSub = this.store.select('bookmarkStore')
      .take(2)
      .subscribe(data => {
        if (data['bookmarking'] === false && data['bookmarked'] === true) {
          this.toastr.success('Bookmarked successfully', 'Success!');
          bookmarkSub.unsubscribe();
        }
      });
    }
  }

}
