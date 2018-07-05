import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { GeneralUtilities } from '../../../helpers/general.utils';
import { ToastrService } from 'ngx-toastr';
import { OpportunityModel } from '../../../models/opportunity.model';
import { Store } from '@ngrx/store';
import { OpportunityActions } from '../../../actions/opportunity.action';
import { AuthActions } from '../../../actions/auth.action';

@Component({
  selector: 'app-opportunity-edit',
  templateUrl: './opportunity-edit.component.html',
  styleUrls: ['./opportunity-edit.component.scss']
})
export class OpportunityEditComponent implements OnInit, OnDestroy {
  opportunityState$: any;
  opportunityState: any;
  opportunity: any;
  jobId: any;
  loginState: any;
  loginState$: any;
  routerSub: any;
  oppsSub: any;
  loginSub: any;

  dataAddedToForm = false;
  formData: any;

  activeTab: string;
  oppSaved = false;
  oppUpdating = false;
  industryList = [];

  /* attachments */
  jobAttachments = [];
  internshipAttachments = [];
  freelanceAttachments = [];
  /* attachments */

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private generalUtils: GeneralUtilities,
    private toastr: ToastrService,
    private oppStore: Store<OpportunityModel>,
    private loginStore: Store<any>
  ) {
    // opportunity state listener
    this.opportunityState$ = this.oppStore.select('opportunityTags');
    this.oppsSub = this.opportunityState$.subscribe((state) => {
      this.opportunityState = state;
      // console.log('state', state);
      if (state) {
        if (state['get_opportunity_data']) {
          this.activeTab = state['get_opportunity_data']['opportunityType']
          if (!this.dataAddedToForm) {
            this.formData = {
              formType: 'edit',
              data: state['get_opportunity_data'],
              userHandle: localStorage.getItem('loggedInProfileHandle')
            };
            this.dataAddedToForm = true;
          }
        }
        if (state['update_opportunity_success'] && state['update_opportunity_success'] === true) {
          this.oppUpdating = false;
          if (this.oppSaved === true) {
            this.toastr.success('Opportunity has been updated successfully!');
            this.oppSaved = false;
            this.router.navigateByUrl('/opportunity/edit/' + this.jobId);
            return;
          }
        }
      }
    });
    this.loginState = this.loginStore.select('loginTags');
    this.loginSub = this.loginState.subscribe((state) => {
      if (state['industries'] && state['industries'] !== 'undefined') {
        this.industryList = state['industries'];
      }
    });
    this.loginStore.dispatch({ type: AuthActions.LOAD_INDUSTRIES });
  }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      if (params['id']) {
        // search job with id
        this.jobId = params['id'];
        this.oppStore.dispatch({ type: OpportunityActions.GET_OPPORTUNITY, payload: this.jobId });
      }
    });
  }

  submitFormData(formData: string) {
    this.oppSaved = true;
    this.oppUpdating = true;
    this.oppStore.dispatch({
      type: OpportunityActions.UPDATE_OPPORTUNITY,
      payload: { id: this.jobId, data: formData }
    });
  }

  ngOnDestroy() {
    this.oppsSub.unsubscribe();
    this.routerSub.unsubscribe();
    this.loginSub.unsubscribe();
  }

}
