import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScrollHelper } from '../../../../helpers/scroll.helper';
import { Store } from '@ngrx/store';
import { ProfileModal } from '../../../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { GeneralUtilities } from '../../../../helpers/general.utils';

@Component({
  selector: 'app-opportunity-freelance',
  templateUrl: './opportunity-freelance.component.html',
  styleUrls: ['./../opportunity-forms.scss']
})
export class OpportunityFreelanceComponent implements OnInit, OnDestroy {
  freelanceFrm: FormGroup;
  loginState: Observable<ProfileModal>;
  private loginSub: ISubscription;
  industryList = [];
  oppSubmitting = false;
  _oppDetails: any;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Input('oppDetails') set setOppFormData(value) {
    this._oppDetails = value;
    if (this._oppDetails.formType === 'edit') {
      this.buildFreelanceForm(this._oppDetails.data);
    } else {
      this.buildFreelanceForm(null);
    }
  };
  freelanceAttachments = [];

  constructor(
    private fb: FormBuilder,
    private scrollHelper: ScrollHelper,
    private generalUtils: GeneralUtilities,
    private loginStore: Store<any>
  ) {
    // this.buildFreelanceForm();
  }

  ngOnInit() {
    this.loginState = this.loginStore.select('loginTags');
    this.loginSub = this.loginState.subscribe((state) => {
      if (state['industries'] && state['industries'] !== 'undefined') {
        this.industryList = state['industries'];
      }
    });
  }

  ngOnDestroy() {
    this.loginSub.unsubscribe();
  }

  /**
   * Creating the reactive form for freelance
   */
  buildFreelanceForm(data: any) {
    this.freelanceFrm = this.fb.group({
      freelanceTitle: [this.generalUtils.checkNestedKey(data, ['opportunityFreelance', 'title']) ? data['opportunityFreelance']['title'] : '', [Validators.required]],
      freelanceDescription: [this.generalUtils.checkNestedKey(data, ['opportunityFreelance', 'description']) ? data['opportunityFreelance']['description'] : '', [Validators.required]],
      freelanceIndustry: [this.generalUtils.checkNestedKey(data, ['opportunityFreelance', 'category']) ? data['opportunityFreelance']['category'] : '', [Validators.required]],
      freelanceLocation: [this.generalUtils.checkNestedKey(data, ['opportunityFreelance', 'location', 'location']) ? data['opportunityFreelance']['location']['location'] : '', [Validators.required]],
      freelancePaymentMethod: [this.generalUtils.checkNestedKey(data, ['opportunityFreelance', 'payType']) ? data['opportunityFreelance']['payType'] : '', [Validators.required]],
      freelanceEngagement: [this.generalUtils.checkNestedKey(data, ['opportunityFreelance', 'engagement']) ? data['opportunityFreelance']['engagement'] : '', [Validators.required]],
      freelanceSkills: [this.generalUtils.checkNestedKey(data, ['opportunityFreelance', 'skills']) ? data['opportunityFreelance']['skills'] : '', [Validators.required]],
    });
  }

  /**
   * Submit form
   * @param: form data
   */
  submitFreelanceForm(formData: any) {
    // freelance form validation
    if (!this.freelanceFrm.valid) {
      this.scrollHelper.scrollToFirst('error');
      return;
    }

    // preparing request body to submit to the api
    const reqBody = {
      opportunityType: 'freelance',
      opportunityFreelance: {
        title: formData.freelanceTitle,
        description: formData.freelanceDescription,
        industry: formData.freelanceIndustry,
        payType: formData.freelancePaymentMethod,
        engagement: formData.freelanceEngagement,
        skills: formData.freelanceSkills,
        attachFiles: this.freelanceAttachments,
        location: {
          location: formData.freelanceLocation
        },
      }
    }
    this.oppSubmitting = true;
    this.formSubmitted.emit(reqBody);
  }

}
