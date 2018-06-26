import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralUtilities } from '../../../helpers/general.utils';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { OpportunityModel } from '../../../models/opportunity.model';
import { Store } from '@ngrx/store';
import { OpportunityActions } from '../../../actions/opportunity.action';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComingSoonComponent } from '../../../shared/coming-soon/coming-soon.component';
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

  auditionFrm: FormGroup;
  filledAuditionFrm = false;
  projectFrm: FormGroup;
  jobFrm: FormGroup;
  internshipFrm: FormGroup;
  freelanceFrm: FormGroup;
  volunteerFrm: FormGroup;

  activeTab: string;
  oppUpdating = false;
  industryList = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private generalUtils: GeneralUtilities,
    private toastr: ToastrService,
    // public modalService: ModalService,
    private oppStore: Store<OpportunityModel>,
    private loginStore: Store<any>,
  ) {
    // opportunity state listener
    this.opportunityState$ = this.oppStore.select('opportunityTags');
    this.oppsSub = this.opportunityState$.subscribe((state) => {
      this.opportunityState = state;
      // console.log('state', state);
      if (state) {
        if (state['get_opportunity_data']) {
          this.activeTab = state['get_opportunity_data']['opportunityType']
          if (!this.filledAuditionFrm) {
            this.buildAuditionForm(state['get_opportunity_data']);
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

  /* forms */
  /**
   * Edit audition form
   */
  buildAuditionForm(data: any) {
    this.auditionFrm = this.fb.group({
      auditionTitle: [data['opportunityAudition']['title'], [Validators.required]],
      auditionDescription: [data['opportunityAudition']['description'], []],
      auditionCategory: [data['opportunityAudition']['category'], []],
      auditionDate: [data['opportunityAudition']['auditionDate'], [Validators.required]],
      auditionLocation: [data['opportunityAudition']['location']['location'], [Validators.required]],
      auditionGender: [data['opportunityAudition']['gender'], [Validators.required]],
      auditionAgeMin: [data['opportunityAudition']['ageLimit']['from'], [Validators.required]],
      auditionAgeMax: [data['opportunityAudition']['ageLimit']['to'], [Validators.required]],
      auditionHeightFrom: [data['opportunityAudition']['height']['from'], []],
      auditionHeightTo: [data['opportunityAudition']['height']['to'], []],
      auditionWeightFrom: [data['opportunityAudition']['weight']['from'], []],
      auditionWeightTo: [data['opportunityAudition']['weight']['to'], []]
    });
  }
  /* forms */

  ngOnDestroy() {
    this.oppsSub.unsubscribe();
    this.routerSub.unsubscribe();
    this.loginSub.unsubscribe();
  }

}
