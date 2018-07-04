import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScrollHelper } from '../../../../helpers/scroll.helper';
import { OpportunityActions } from '../../../../actions/opportunity.action';
import { OpportunityModel } from '../../../../models/opportunity.model';
import { Store } from '@ngrx/store';
import { ProfileModal } from '../../../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

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
  oppCreating = false;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private scrollHelper: ScrollHelper,
    private oppStore: Store<OpportunityModel>,
    private loginStore: Store<any>
  ) {
    this.buildAuditionForm();
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
  buildAuditionForm() {
    this.auditionFrm = this.fb.group({
      auditionTitle: ['', [Validators.required]],
      auditionDescription: ['', [Validators.required]],
      auditionCategory: ['', [Validators.required]],
      auditionDate: ['', [Validators.required]],
      auditionLocation: ['', [Validators.required]],
      auditionGender: ['', [Validators.required]],
      auditionAgeMin: ['', [Validators.required]],
      auditionAgeMax: ['', [Validators.required]],
      auditionHeightFrom: ['', [Validators.required]],
      auditionHeightTo: ['', [Validators.required]],
      auditionWeightFrom: ['', [Validators.required]],
      auditionWeightTo: ['', [Validators.required]]
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

    // submit audition details
    this.oppStore.dispatch({
      type: OpportunityActions.CREATE_OPPORTUNITY,
      payload: reqBody
    });
    this.oppCreating = true;
    this.formSubmitted.emit();
  }

}
