import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ScrollHelper } from '../../../../helpers/scroll.helper';
import { Store } from '@ngrx/store';
import { ProfileModal } from '../../../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { GeneralUtilities } from '../../../../helpers/general.utils';
import { OpportunityActions } from '../../../../actions/opportunity.action';
import { OpportunityModel } from '../../../../models/opportunity.model';
import { environment } from 'environments/environment';
import { pull as _pull } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Modal } from '../../../../shared/modal-new/Modal';

@Component({
  selector: 'app-opportunity-job',
  templateUrl: './opportunity-job.component.html',
  styleUrls: ['./../opportunity-forms.scss']
})
export class OpportunityJobComponent implements OnInit, OnDestroy {
  jobFrm: FormGroup;
  loginState: Observable<ProfileModal>;
  oppState: Observable<OpportunityModel>;
  private loginSub: ISubscription;
  private oppSub: ISubscription;
  industryList = [];
  oppSubmitting = false;
  _oppDetails: any;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Input() userHandle: string;
  @Input('oppDetails') set setOppFormData(value) {
    this._oppDetails = value;
    if (this._oppDetails.formType === 'edit') {
      this.buildJobForm(this._oppDetails.data);
    } else {
      this.buildJobForm(null);
    }
    if (this.generalUtils.checkNestedKey(value, ['data', 'opportunityJob', 'attachFiles'])) {
      this.jobAttachments = this._oppDetails.data.opportunityJob.attachFiles;
    }
    if (value.userHandle) {
      this.userHandle = this._oppDetails.userHandle;
    }
  };
  jobAttachments = [];
  uploadingFile = false;
  uploadedFile = false;
  baseUrl = environment.API_IMAGE;
  @ViewChild('termsPopup') termsPopup: Modal;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private toastr: ToastrService,
    private scrollHelper: ScrollHelper,
    private generalUtils: GeneralUtilities,
    private loginStore: Store<any>,
    private oppStore: Store<OpportunityModel>
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
    this.oppState = this.oppStore.select('opportunityTags');
    this.oppSub = this.oppState.subscribe((state) => {
      if (state) {
        if (state['fileupload_response'] && state['fileupload_response'].length > 0) {
          this.uploadingFile = false;
          this.uploadedFile = true;
          for (let i = 0; i < state['fileupload_response'].length; i++) {
            const attUrl = state['fileupload_response'][i].repoPath;
            if (this.jobAttachments.indexOf(attUrl) === -1) {
              this.jobAttachments.push(attUrl);
            }
          }
        } else {
          this.uploadingFile = false;
          this.uploadedFile = false;
        }
      }
    })
  }

  ngOnDestroy() {
    this.jobAttachments = [];
    this.loginSub.unsubscribe();
    this.oppSub.unsubscribe();
  }

  /**
   * Creating the reactive form for job
   */
  buildJobForm(data: any) {
    this.jobFrm = this.fb.group({
      jobRole: [
        this.generalUtils.checkNestedKey(data, ['opportunityJob', 'role']) ? data['opportunityJob']['role'] : '',
        [Validators.required]
      ],
      jobDescription: [
        this.generalUtils.checkNestedKey(data, ['opportunityJob', 'description']) ? data['opportunityJob']['description'] : '',
        [Validators.required]
      ],
      jobIndustry: [
        this.generalUtils.checkNestedKey(data, ['opportunityJob', 'industry']) ? data['opportunityJob']['industry'] : '',
        [Validators.required]
      ],
      jobExperienceFrom: [
        this.generalUtils.checkNestedKey(data, ['opportunityJob', 'experience', 'from']) ? data['opportunityJob']['experience']['from'] : '',
        [Validators.required]
      ],
      jobExperienceTo: [
        this.generalUtils.checkNestedKey(data, ['opportunityJob', 'experience', 'to']) ? data['opportunityJob']['experience']['to'] : '',
        [Validators.required],
        this.experienceRangeValidator.bind(this)
      ],
      jobSalaryAmount: [
        this.generalUtils.checkNestedKey(data, ['opportunityJob', 'salary', 'amount']) ? data['opportunityJob']['salary']['amount'] : '',
        [Validators.required]
      ],
      jobSalaryDuration: [
        this.generalUtils.checkNestedKey(data, ['opportunityJob', 'salary', 'salaryType']) ? data['opportunityJob']['salary']['salaryType'] : '',
        [Validators.required]
      ],
      jobSalaryCurrency: [
        this.generalUtils.checkNestedKey(data, ['opportunityJob', 'salary', 'currency']) ? data['opportunityJob']['salary']['currency'] : '',
        [Validators.required]
      ],
      jobDuration: [
        this.generalUtils.checkNestedKey(data, ['opportunityJob', 'duration']) ? data['opportunityJob']['duration'] : '',
        [Validators.required]
      ],
      jobLocation: [
        this.generalUtils.checkNestedKey(data, ['opportunityJob', 'location', 'location']) ? data['opportunityJob']['location']['location'] : '',
        [Validators.required]
      ],
      jobTravelInclusive: [
        this.generalUtils.checkNestedKey(data, ['opportunityJob', 'includesTravel', 'option']) ? data['opportunityJob']['includesTravel']['option'] : '',
        [Validators.required]
      ],
      jobCountry: [
        this.generalUtils.checkNestedKey(data, ['opportunityJob', 'includesTravel', 'country']) ? data['opportunityJob']['includesTravel']['country'] : '',
        [Validators.required]
      ],
      jobSkills: [
        this.generalUtils.checkNestedKey(data, ['opportunityJob', 'skills']) ? data['opportunityJob']['skills'] : '',
        [Validators.required]
      ],
      jobQualifications: [
        this.generalUtils.checkNestedKey(data, ['opportunityJob', 'qualifications']) ? data['opportunityJob']['qualifications'] : '',
        [Validators.required]
      ],
      jobOrgName: [
        this.generalUtils.checkNestedKey(data, ['opportunityJob', 'organizationName']) ? data['opportunityJob']['organizationName'] : '',
        [Validators.required]
      ]
    });
  }
  /**
   * validate experience range
   * @param control : max experience limit
   */
  experienceRangeValidator(control: AbstractControl) {
    const q = new Promise((resolve, reject) => {
      const minExperience = this.jobFrm.controls['jobExperienceFrom'].value;
      const maxExperience = control.value;
      if (maxExperience !== '' && minExperience !== '') {
        if (maxExperience < minExperience) {
          resolve({ invalidExperienceRange: true });
        }
        resolve(null);
      } else {
        resolve(null);
      }
    });
    return q;
  }

  /**
   * Submit form
   * @param: form data
   */
  submitJobForm(formData: any) {
    // job form validation
    if (!this.jobFrm.valid) {
      this.toastr.warning('Please check for errors in the form.', '', {
        timeOut: 3000
      });
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
            from: formData.jobExperienceFrom.toString(),
            to: formData.jobExperienceTo.toString()
          },
          salary: {
            amount: formData.jobSalaryAmount,
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
    this.jobAttachments = [];
    this.formSubmitted.emit(reqBody);
  }

  fileSelectedAction($event) {
    const imgObj = this.generalUtils.attachMultipleFiles($event);
    this.uploadImage(imgObj);
    this.uploadingFile = true;
    this.uploadedFile = false;
  }

  /**
   * Upload image
   */
  uploadImage(fileObj) {
    const imageData = {
      handle: this.userHandle,
      image: fileObj
    };
    this.oppStore.dispatch({ type: OpportunityActions.OPPORTUNITY_FILE_UPLOAD, payload: imageData });
  }

  /**
   * Remove media from the attachments
   */
  removeAttachedMedia(fileName: string) {
    _pull(this.jobAttachments, fileName);
  }

  cancelUpdate() {
    this.location.back();
  }

  // terms show/hide
  termsAction(action: string) {
    if (action === 'hide') {
      this.termsPopup.close();
    } else {
      this.termsPopup.open();
    }
  }

}
