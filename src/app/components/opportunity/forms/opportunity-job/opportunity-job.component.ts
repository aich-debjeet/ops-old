import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScrollHelper } from '../../../../helpers/scroll.helper';
import { Store } from '@ngrx/store';
import { ProfileModal } from '../../../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { GeneralUtilities } from '../../../../helpers/general.utils';

@Component({
  selector: 'app-opportunity-job',
  templateUrl: './opportunity-job.component.html',
  styleUrls: ['./../opportunity-forms.scss']
})
export class OpportunityJobComponent implements OnInit, OnDestroy {
  jobFrm: FormGroup;
  loginState: Observable<ProfileModal>;
  private loginSub: ISubscription;
  industryList = [];
  oppSubmitting = false;
  _oppDetails: any;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Input('oppDetails') set setOppFormData(value) {
    this._oppDetails = value;
    if (this._oppDetails.formType === 'edit') {
      this.buildJobForm(this._oppDetails.data);
    } else {
      this.buildJobForm(null);
    }
  };
  jobAttachments = [];

  constructor(
    private fb: FormBuilder,
    private scrollHelper: ScrollHelper,
    private generalUtils: GeneralUtilities,
    private loginStore: Store<any>
  ) {
    // this.buildJobForm();
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
   * Creating the reactive form for job
   */
  buildJobForm(data: any) {
    this.jobFrm = this.fb.group({
      jobRole: [this.generalUtils.checkNestedKey(data, ['opportunityJob', 'role']) ? data['opportunityJob']['role'] : '', [Validators.required]],
      jobDescription: [this.generalUtils.checkNestedKey(data, ['opportunityJob', 'description']) ? data['opportunityJob']['description'] : '', [Validators.required]],
      jobIndustry: [this.generalUtils.checkNestedKey(data, ['opportunityJob', 'industry']) ? data['opportunityJob']['industry'] : '', [Validators.required]],
      jobExperienceFrom: [this.generalUtils.checkNestedKey(data, ['opportunityJob', 'experience', 'from']) ? data['opportunityJob']['experience']['from'] : '', [Validators.required]],
      jobExperienceTo: [this.generalUtils.checkNestedKey(data, ['opportunityJob', 'experience', 'to']) ? data['opportunityJob']['experience']['to'] : '', [Validators.required]],
      jobSalaryAmount: [this.generalUtils.checkNestedKey(data, ['opportunityJob', 'salary', 'amount_from']) ? data['opportunityJob']['salary']['amount_from'] : '', [Validators.required]],
      jobSalaryDuration: [this.generalUtils.checkNestedKey(data, ['opportunityJob', 'salary', 'salaryType']) ? data['opportunityJob']['salary']['salaryType'] : '', [Validators.required]],
      jobSalaryCurrency: [this.generalUtils.checkNestedKey(data, ['opportunityJob', 'salary', 'currency']) ? data['opportunityJob']['salary']['currency'] : '', [Validators.required]],
      jobDuration: [this.generalUtils.checkNestedKey(data, ['opportunityJob', 'duration']) ? data['opportunityJob']['duration'] : '', [Validators.required]],
      jobLocation: [this.generalUtils.checkNestedKey(data, ['opportunityJob', 'location', 'location']) ? data['opportunityJob']['location']['location'] : '', [Validators.required]],
      jobTravelInclusive: [this.generalUtils.checkNestedKey(data, ['opportunityJob', 'includesTravel', 'option']) ? data['opportunityJob']['includesTravel']['option'] : '', [Validators.required]],
      jobCountry: [this.generalUtils.checkNestedKey(data, ['opportunityJob', 'includesTravel', 'country']) ? data['opportunityJob']['includesTravel']['country'] : '', [Validators.required]],
      jobSkills: [this.generalUtils.checkNestedKey(data, ['opportunityJob', 'skills']) ? data['opportunityJob']['skills'] : '', [Validators.required]],
      jobQualifications: [this.generalUtils.checkNestedKey(data, ['opportunityJob', 'qualifications']) ? data['opportunityJob']['qualifications'] : '', [Validators.required]],
      jobOrgName: [this.generalUtils.checkNestedKey(data, ['opportunityJob', 'organizationName']) ? data['opportunityJob']['organizationName'] : '', [Validators.required]]
    });
  }

  /**
   * Submit form
   * @param: form data
   */
  submitJobForm(formData: any) {
    // job form validation
    if (!this.jobFrm.valid) {
      this.scrollHelper.scrollToFirst('error');
      return;
    }

    // preparing request body to submit to the api
    const reqBody = {
      opportunityType: 'job',
      opportunityJob: {
        role: formData.jobRole,
          description: formData.jobDescription,
          industry: formData.jobIndustry,
          experience: {
            from: formData.jobExperienceFrom,
            to: formData.jobExperienceTo
          },
          salary: {
            amount: Number(formData.jobSalaryAmount),
            salaryType: formData.jobSalaryDuration,
            currency: formData.jobSalaryCurrency
          },
          duration: formData.jobDuration,
          location: {
            location: formData.jobLocation
          },
          includesTravel: {
            option: formData.jobTravelInclusive,
            country: formData.jobCountry
          },
          skills: formData.jobSkills,
          qualifications: formData.jobQualifications,
          organizationName: formData.jobOrgName,
          attachFiles: this.jobAttachments
      }
    }
    this.oppSubmitting = true;
    this.formSubmitted.emit(reqBody);
  }

}
