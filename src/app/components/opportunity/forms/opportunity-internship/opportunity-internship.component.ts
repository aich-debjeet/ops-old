import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScrollHelper } from '../../../../helpers/scroll.helper';
import { Store } from '@ngrx/store';
import { ProfileModal } from '../../../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { GeneralUtilities } from '../../../../helpers/general.utils';

@Component({
  selector: 'app-opportunity-internship',
  templateUrl: './opportunity-internship.component.html',
  styleUrls: ['./../opportunity-forms.scss']
})
export class OpportunityInternshipComponent implements OnInit, OnDestroy {
  internshipFrm: FormGroup;
  loginState: Observable<ProfileModal>;
  private loginSub: ISubscription;
  industryList = [];
  oppSubmitting = false;
  _oppDetails: any;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Input('oppDetails') set setOppFormData(value) {
    this._oppDetails = value;
    if (this._oppDetails.formType === 'edit') {
      this.buildInternshipForm(this._oppDetails.data);
    } else {
      this.buildInternshipForm(null);
    }
  };
  internshipAttachments = [];

  constructor(
    private fb: FormBuilder,
    private scrollHelper: ScrollHelper,
    private generalUtils: GeneralUtilities,
    private loginStore: Store<any>
  ) {
    // this.buildInternshipForm();
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
   * Creating the reactive form for internship
   */
  buildInternshipForm(data: any) {
    this.internshipFrm = this.fb.group({
      internshipRole: [this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'role']) ? data['opportunityInternship']['role'] : '', [Validators.required]],
      internshipDescription: [this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'description']) ? data['opportunityInternship']['description'] : '', [Validators.required]],
      internshipIndustry: [this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'industry']) ? data['opportunityInternship']['industry'] : '', [Validators.required]],
      internshipExperienceFrom: [this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'experience', 'from']) ? data['opportunityInternship']['experience']['from'] : '', [Validators.required]],
      internshipExperienceTo: [this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'experience', 'to']) ? data['opportunityInternship']['experience']['to'] : '', [Validators.required]],
      internshipSalaryAmount: [this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'salary', 'amount_from']) ? data['opportunityInternship']['salary']['amount_from'] : '', [Validators.required]],
      internshipSalaryDuration: [this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'salary', 'salaryType']) ? data['opportunityInternship']['salary']['salaryType'] : '', [Validators.required]],
      internshipSalaryCurrency: [this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'salary', 'currency']) ? data['opportunityInternship']['salary']['currency'] : '', [Validators.required]],
      internshipDuration: [this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'duration']) ? data['opportunityInternship']['duration'] : '', [Validators.required]],
      internshipLocation: [this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'location', 'location']) ? data['opportunityInternship']['location']['location'] : '', [Validators.required]],
      internshipTravelInclusive: [this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'includesTravel', 'option']) ? data['opportunityInternship']['includesTravel']['option'] : '', [Validators.required]],
      internshipCountry: [this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'includesTravel', 'country']) ? data['opportunityInternship']['includesTravel']['country'] : '', [Validators.required]],
      internshipSkills: [this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'skills']) ? data['opportunityInternship']['skills'] : '', [Validators.required]],
      internshipQualifications: [this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'qualifications']) ? data['opportunityInternship']['qualifications'] : '', [Validators.required]],
      internshipOrgName: [this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'organizationName']) ? data['opportunityInternship']['organizationName'] : '', [Validators.required]]
    });
  }

  /**
   * Submit form
   * @param: form data
   */
  submitInternshipForm(formData: any) {
    // internship form validation
    if (!this.internshipFrm.valid) {
      this.scrollHelper.scrollToFirst('error');
      return;
    }

    // preparing request body to submit to the api
    const reqBody = {
      opportunityType: 'internship',
      opportunityInternship: {
        role: formData.internshipRole,
          description: formData.internshipDescription,
          industry: formData.internshipIndustry,
          experience: {
            from: formData.internshipExperienceFrom,
            to: formData.internshipExperienceTo
          },
          salary: {
            amount: Number(formData.internshipSalaryAmount),
            salaryType: formData.internshipSalaryDuration,
            currency: formData.internshipSalaryCurrency
          },
          duration: formData.internshipDuration,
          location: {
            location: formData.internshipLocation
          },
          includesTravel: {
            option: formData.internshipTravelInclusive,
            country: formData.internshipCountry
          },
          skills: formData.internshipSkills,
          qualifications: formData.internshipQualifications,
          organizationName: formData.internshipOrgName,
          attachFiles: this.internshipAttachments
      }
    }
    this.oppSubmitting = true;
    this.formSubmitted.emit(reqBody);
  }

}
