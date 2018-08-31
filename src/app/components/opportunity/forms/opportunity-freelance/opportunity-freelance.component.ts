import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  selector: 'app-opportunity-freelance',
  templateUrl: './opportunity-freelance.component.html',
  styleUrls: ['./../opportunity-forms.scss']
})
export class OpportunityFreelanceComponent implements OnInit, OnDestroy {
  freelanceFrm: FormGroup;
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
      this.buildFreelanceForm(this._oppDetails.data);
    } else {
      this.buildFreelanceForm(null);
    }
    if (this.generalUtils.checkNestedKey(value, ['data', 'opportunityFreelance', 'attachFiles'])) {
      this.freelanceAttachments = this._oppDetails.data.opportunityFreelance.attachFiles;
    }
    if (value.userHandle) {
      this.userHandle = this._oppDetails.userHandle;
    }
  };
  freelanceAttachments = [];
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
  ) { }

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
            if (this.freelanceAttachments.indexOf(attUrl) === -1) {
              this.freelanceAttachments.push(attUrl);
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
    this.freelanceAttachments = [];
    this.loginSub.unsubscribe();
    this.oppSub.unsubscribe();
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
      this.toastr.warning('Please check for errors in the form.');
      this.scrollHelper.scrollToFirst('error');
      return;
    }

    // preparing request body to submit to the api
    const reqBody = {
      opportunityType: 'freelance',
      opportunityFreelance: {
        title: formData.freelanceTitle,
        description: formData.freelanceDescription,
        category: formData.freelanceIndustry,
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
    this.freelanceAttachments = [];
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
    _pull(this.freelanceAttachments, fileName);
  }

  cancelUpdate() {
    this.location.back();
  }

}
