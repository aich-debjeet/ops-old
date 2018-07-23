import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScrollHelper } from '../../../../helpers/scroll.helper';
import { Store } from '@ngrx/store';
import { ProfileModal } from '../../../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { GeneralUtilities } from '../../../../helpers/general.utils';

@Component({
  selector: 'app-opportunity-volunteer',
  templateUrl: './opportunity-volunteer.component.html',
  styleUrls: ['./../opportunity-forms.scss']
})
export class OpportunityVolunteerComponent implements OnInit, OnDestroy {
  volunteerFrm: FormGroup;
  loginState: Observable<ProfileModal>;
  private loginSub: ISubscription;
  industryList = [];
  oppSubmitting = false;
  _oppDetails: any;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Input('oppDetails') set setOppFormData(value) {
    this._oppDetails = value;
    if (this._oppDetails.formType === 'edit') {
      this.buildVolunteerForm(this._oppDetails.data);
    } else {
      this.buildVolunteerForm(null);
    }
  };

  constructor(
    private fb: FormBuilder,
    private scrollHelper: ScrollHelper,
    private generalUtils: GeneralUtilities,
    private loginStore: Store<any>
  ) {
    // this.buildVolunteerForm();
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
   * Creating the reactive form for volunteer
   */
  buildVolunteerForm(data: any) {
    this.volunteerFrm = this.fb.group({
      volunteerTitle: [this.generalUtils.checkNestedKey(data, ['opportunityVolunteer', 'title']) ? data['opportunityVolunteer']['title'] : '', [Validators.required]],
      volunteerCause: [this.generalUtils.checkNestedKey(data, ['opportunityVolunteer', 'cause']) ? data['opportunityVolunteer']['cause'] : '', [Validators.required]],
      volunteerIndustry: [this.generalUtils.checkNestedKey(data, ['opportunityVolunteer', 'category']) ? data['opportunityVolunteer']['category'] : '', [Validators.required]],
      volunteerLocation: [this.generalUtils.checkNestedKey(data, ['opportunityVolunteer', 'location', 'location']) ? data['opportunityVolunteer']['location']['location'] : '', [Validators.required]],
      volunteerSkills: [this.generalUtils.checkNestedKey(data, ['opportunityVolunteer', 'skills']) ? data['opportunityVolunteer']['skills'] : '', [Validators.required]],
      volunteerDL: [this.generalUtils.checkNestedKey(data, ['opportunityVolunteer', 'requirements']) ? data['opportunityVolunteer']['requirements'].includes('Background Check') : false, [Validators.required]],
      volunteerBGC: [this.generalUtils.checkNestedKey(data, ['opportunityVolunteer', 'requirements']) ? data['opportunityVolunteer']['requirements'].includes('Driver\'s License') : false, [Validators.required]],
      volunteerORTR: [this.generalUtils.checkNestedKey(data, ['opportunityVolunteer', 'requirements']) ? data['opportunityVolunteer']['requirements'].includes('Orientation or Training') : false, [Validators.required]],
    });
  }

  /**
   * Submit form
   * @param: form data
   */
  submitVolunteerForm(formData: any) {
    // volunteer form validation
    if (!this.volunteerFrm.valid) {
      this.scrollHelper.scrollToFirst('error');
      return;
    }

    const volunteerRequirements = [];
    if (formData.volunteerBGC && formData.volunteerBGC === true) {
      volunteerRequirements.push('Background Check');
    }
    if (formData.volunteerDL && formData.volunteerDL === true) {
      volunteerRequirements.push('Driver\'s License');
    }
    if (formData.volunteerORTR && formData.volunteerORTR === true) {
      volunteerRequirements.push('Orientation or Training');
    }

    // preparing request body to submit to the api
    const reqBody = {
      opportunityType: 'volunteer',
      opportunityVolunteer: {
        title: formData.volunteerTitle,
        cause: formData.volunteerCause,
        category: formData.volunteerIndustry,
        skills: formData.volunteerSkills,
        location: {
          location: formData.volunteerLocation
        },
        requirements: volunteerRequirements
      }
    }
    this.oppSubmitting = true;
    this.formSubmitted.emit(reqBody);
  }

}
