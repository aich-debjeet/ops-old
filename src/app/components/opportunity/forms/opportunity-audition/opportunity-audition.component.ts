import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScrollHelper } from '../../../../helpers/scroll.helper';
import { Store } from '@ngrx/store';
import { ProfileModal } from '../../../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { GeneralUtilities } from '../../../../helpers/general.utils';

@Component({
  selector: 'app-opportunity-audition',
  templateUrl: './opportunity-audition.component.html',
  styleUrls: ['./../opportunity-forms.scss']
})
export class OpportunityAuditionComponent implements OnInit, OnDestroy {
  auditionFrm: FormGroup;
  loginState: Observable<ProfileModal>;
  private loginSub: ISubscription;
  industryList = [];
  oppSubmitting = false;
  _oppDetails: any;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Input('oppDetails') set setOppFormData(value) {
    this._oppDetails = value;
    if (this._oppDetails.formType === 'edit') {
      this.buildAuditionForm(this._oppDetails.data);
    } else {
      this.buildAuditionForm(null);
    }
  };

  constructor(
    private fb: FormBuilder,
    private scrollHelper: ScrollHelper,
    private generalUtils: GeneralUtilities,
    private loginStore: Store<any>
  ) {
    // this.buildAuditionForm();
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
   * Creating the reactive form for audition
   */
  buildAuditionForm(data: any) {
    this.auditionFrm = this.fb.group({
      auditionTitle: [this.generalUtils.checkNestedKey(data, ['opportunityAudition', 'title']) ? data['opportunityAudition']['title'] : '', [Validators.required]],
      auditionDescription: [this.generalUtils.checkNestedKey(data, ['opportunityAudition', 'description']) ? data['opportunityAudition']['description'] : '', [Validators.required]],
      auditionCategory: [this.generalUtils.checkNestedKey(data, ['opportunityAudition', 'category']) ? data['opportunityAudition']['category'] : '', []],
      auditionDate: [this.generalUtils.checkNestedKey(data, ['opportunityAudition', 'auditionDate']) ? data['opportunityAudition']['auditionDate'] : '', [Validators.required]],
      auditionLocation: [this.generalUtils.checkNestedKey(data, ['opportunityAudition', 'location', 'location']) ? data['opportunityAudition']['location']['location'] : '', [Validators.required]],
      auditionGender: [this.generalUtils.checkNestedKey(data, ['opportunityAudition', 'gender']) ? data['opportunityAudition']['gender'] : '', [Validators.required]],
      auditionAgeMin: [this.generalUtils.checkNestedKey(data, ['opportunityAudition', 'ageLimit', 'from']) ? data['opportunityAudition']['ageLimit']['from'] : '', [Validators.required]],
      auditionAgeMax: [this.generalUtils.checkNestedKey(data, ['opportunityAudition', 'ageLimit', 'to']) ? data['opportunityAudition']['ageLimit']['to'] : '', [Validators.required]],
      auditionHeightFrom: [this.generalUtils.checkNestedKey(data, ['opportunityAudition', 'height', 'from']) ? data['opportunityAudition']['height']['from'] : '', [Validators.required]],
      auditionHeightTo: [this.generalUtils.checkNestedKey(data, ['opportunityAudition', 'height', 'to']) ? data['opportunityAudition']['height']['to'] : '', [Validators.required]],
      auditionWeightFrom: [this.generalUtils.checkNestedKey(data, ['opportunityAudition', 'weight', 'from']) ? data['opportunityAudition']['weight']['from'] : '', [Validators.required]],
      auditionWeightTo: [this.generalUtils.checkNestedKey(data, ['opportunityAudition', 'weight', 'to']) ? data['opportunityAudition']['weight']['to'] : '', [Validators.required]]
    });
  }

  /**
   * Submit form
   * @param: form data
   */
  submitAuditionForm(formData: any) {
    // audition form validation
    if (!this.auditionFrm.valid) {
      this.scrollHelper.scrollToFirst('error');
      return;
    }

    // preparing request body to submit to the api
    const reqBody = {
      opportunityType: 'audition',
      opportunityAudition: {
        title: formData.auditionTitle,
        description: formData.auditionDescription,
        category: formData.auditionCategory,
        auditionDate: formData.auditionDate,
        gender: formData.auditionGender,
        ageLimit: {
          from: String(formData.auditionAgeMin),
          to: String(formData.auditionAgeMax)
        },
        height: {
          from: String(formData.auditionHeightFrom),
          to: String(formData.auditionHeightTo)
        },
        weight: {
          from: String(formData.auditionWeightFrom),
          to: String(formData.auditionWeightTo)
        },
        location: {
          location: formData.auditionLocation
        }
      }
    }
    this.oppSubmitting = true;
    this.formSubmitted.emit(reqBody);
  }

}
