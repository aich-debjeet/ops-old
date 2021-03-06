import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IDatePickerConfig } from 'ng2-date-picker';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { environment } from '../../../../environments/environment';
import { ScrollHelper } from '../../../helpers/scroll.helper';
import { GeneralUtilities } from '../../../helpers/general.utils';
import { OpportunityActions } from 'app/actions/opportunity.action';
import { OpportunityModel } from 'app/models/opportunity.model';

@Component({
  selector: 'app-opportunity-create',
  templateUrl: './opportunity-create.component.html',
  styleUrls: ['./opportunity-create.component.scss']
})
export class OpportunityCreateComponent implements OnInit, AfterViewChecked, OnDestroy {

  baseUrl = environment.API_IMAGE;
  userHandle: any;
  public dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  private oppSub: Subscription;
  private loginSub: Subscription;
  oppState: Observable<OpportunityModel>;
  loginState: Observable<any>;
  oppSaved = false;
  oppCreating = false;
  activeTab = 'audition';
  uploadedFile = false;
  uploadingFile = false;
  uploadedFileSrc = 'https://cdn.onepagespotlight.com/img/default/opp-thumb.png';

  // location details
  locationDetails = {
    lat: '',
    lng: ''
  };
  industryList = [];

  datePicketConfig: IDatePickerConfig = {
    showMultipleYearsNavigation: true,
    disableKeypress: true,
    closeOnSelect: true,
    format: 'DD-MMMM-YYYY',
    locale: 'en'
  };

  /* attachments */
  jobAttachments = [];
  internshipAttachments = [];
  freelanceAttachments = [];
  /* attachments */

  formData = {
    formType: 'create',
    userHandle: '',
    data: {}
  };

  constructor(
    private toastr: ToastrService,
    private scrollHelper: ScrollHelper,
    private generalUtils: GeneralUtilities,
    private loginStore: Store<any>,
    private oppStore: Store<OpportunityModel>,
    private router: Router
  ) {
    this.oppState = this.oppStore.select('opportunityTags');
    this.oppSub = this.oppState.subscribe((state) => {
      if (state) {
        if (state['create_opportunity_success'] && state['create_opportunity_success'] === true) {
          this.oppCreating = false;
          if (this.oppSaved === true) {
            this.toastr.success('Opportunity has been created successfully!', '', {
              timeOut: 3000
            });
            this.oppSaved = false;
            if (this.generalUtils.checkNestedKey(state, ['create_opportunity_response', 'id'])) {
              this.router.navigateByUrl('/opportunity/view/' + state['create_opportunity_response']['id']);
              return;
            }
          }
        }
      }
    });
    this.userHandle = localStorage.getItem('loggedInProfileHandle');
    this.formData.userHandle = this.userHandle;
    this.loginState = this.loginStore.select('loginTags');
    this.loginSub = this.loginState.subscribe((state) => {
      if (state['industries'] && state['industries'] !== 'undefined') {
        this.industryList = state['industries'];
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.oppSub.unsubscribe();
    this.loginSub.unsubscribe();
  }

  submitFormData(formData: string) {
    this.oppSaved = true;
    this.oppCreating = true;

    // submit opportunity
    this.oppStore.dispatch({
      type: OpportunityActions.CREATE_OPPORTUNITY,
      payload: formData
    });
  }

  ngAfterViewChecked() {
    this.scrollHelper.doScroll();
  }

  // change tab
  switchTabTo(tabId: string) {
    this.oppSaved = false;
    this.activeTab = tabId;
  }

  creatingOpp() {
    this.oppSaved = true;
    this.oppCreating = true;
  }

}
