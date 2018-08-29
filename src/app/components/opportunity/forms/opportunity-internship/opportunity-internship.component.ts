import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
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

@Component({
  selector: 'app-opportunity-internship',
  templateUrl: './opportunity-internship.component.html',
  styleUrls: ['./../opportunity-forms.scss']
})
export class OpportunityInternshipComponent implements OnInit, OnDestroy {
  internshipFrm: FormGroup;
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
      this.buildInternshipForm(this._oppDetails.data);
    } else {
      this.buildInternshipForm(null);
    }
    if (this.generalUtils.checkNestedKey(value, ['data', 'opportunityInternship', 'attachFiles'])) {
      this.internshipAttachments = this._oppDetails.data.opportunityInternship.attachFiles;
    }
    if (value.userHandle) {
      this.userHandle = this._oppDetails.userHandle;
    }
  };
  internshipAttachments = [];
  uploadingFile = false;
  uploadedFile = false;
  baseUrl = environment.API_IMAGE;

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private toastr: ToastrService,
    private scrollHelper: ScrollHelper,
    private generalUtils: GeneralUtilities,
    private loginStore: Store<any>,
    private oppStore: Store<OpportunityModel>
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
    this.oppState = this.oppStore.select('opportunityTags');
    this.oppSub = this.oppState.subscribe((state) => {
      if (state) {
        if (state['fileupload_response'] && state['fileupload_response'].length > 0) {
          this.uploadingFile = false;
          this.uploadedFile = true;
          for (let i = 0; i < state['fileupload_response'].length; i++) {
            const attUrl = state['fileupload_response'][i].repoPath;
            if (this.internshipAttachments.indexOf(attUrl) === -1) {
              this.internshipAttachments.push(attUrl);
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
    this.internshipAttachments = [];
    this.loginSub.unsubscribe();
    this.oppSub.unsubscribe();
  }

  /**
   * Creating the reactive form for internship
   */
  buildInternshipForm(data: any) {
    this.internshipFrm = this.fb.group({
      internshipRole: [
        this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'role']) ? data['opportunityInternship']['role'] : '',
        [Validators.required]
      ],
      internshipDescription: [
        this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'description']) ? data['opportunityInternship']['description'] : '',
        [Validators.required]
      ],
      internshipIndustry: [
        this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'industry']) ? data['opportunityInternship']['industry'] : '',
        [Validators.required]
      ],
      internshipExperienceFrom: [
        this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'experience', 'from']) ? data['opportunityInternship']['experience']['from'] : '',
        [Validators.required]
      ],
      internshipExperienceTo: [
        this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'experience', 'to']) ? data['opportunityInternship']['experience']['to'] : '',
        [Validators.required],
        this.experienceRangeValidator.bind(this)
      ],
      internshipSalaryAmount: [
        this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'salary', 'amount']) ? data['opportunityInternship']['salary']['amount'] : '',
        [Validators.required]
      ],
      internshipSalaryDuration: [
        this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'salary', 'salaryType']) ? data['opportunityInternship']['salary']['salaryType'] : '',
        [Validators.required]
      ],
      internshipSalaryCurrency: [
        this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'salary', 'currency']) ? data['opportunityInternship']['salary']['currency'] : '',
        [Validators.required]
      ],
      internshipDuration: [
        this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'duration']) ? data['opportunityInternship']['duration'] : '',
        [Validators.required]
      ],
      internshipLocation: [
        this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'location', 'location']) ? data['opportunityInternship']['location']['location'] : '',
        [Validators.required]
      ],
      internshipTravelInclusive: [
        this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'includesTravel', 'option']) ? data['opportunityInternship']['includesTravel']['option'] : '',
        [Validators.required]
      ],
      internshipCountry: [
        this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'includesTravel', 'country']) ? data['opportunityInternship']['includesTravel']['country'] : '',
        [Validators.required]
      ],
      internshipSkills: [
        this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'skills']) ? data['opportunityInternship']['skills'] : '',
        [Validators.required]
      ],
      internshipQualifications: [
        this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'qualifications']) ? data['opportunityInternship']['qualifications'] : '',
        [Validators.required]
      ],
      internshipOrgName: [
        this.generalUtils.checkNestedKey(data, ['opportunityInternship', 'organizationName']) ? data['opportunityInternship']['organizationName'] : '',
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
      const minExperience = this.internshipFrm.controls['internshipExperienceFrom'].value;
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
  submitInternshipForm(formData: any) {
    // internship form validation
    if (!this.internshipFrm.valid) {
      this.toastr.warning('Please check for errors in the form.');
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
            from: formData.internshipExperienceFrom.toString(),
            to: formData.internshipExperienceTo.toString()
          },
          salary: {
            amount: formData.internshipSalaryAmount,
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
    this.internshipAttachments = [];
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
    _pull(this.internshipAttachments, fileName);
  }

  cancelUpdate() {
    this.location.back();
  }

}
