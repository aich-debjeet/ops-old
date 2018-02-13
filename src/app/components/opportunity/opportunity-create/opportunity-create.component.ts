import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// toastr service
import { ToastrService } from 'ngx-toastr';

// store
import { Store } from '@ngrx/store';

// rxjs
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../../environments/environment';
import { ScrollHelper } from 'app/helpers/scroll.helper';

// opportunity imports
import { OpportunityActions } from 'app/actions/opportunity.action';
import { OpportunityModel } from 'app/models/opportunity.model';

@Component({
  selector: 'app-opportunity-create',
  templateUrl: './opportunity-create.component.html',
  styleUrls: ['./opportunity-create.component.scss']
})
export class OpportunityCreateComponent implements OnInit, AfterViewChecked {

  baseUrl = environment.API_IMAGE;
  auditionFrm: FormGroup;
  oppState: Observable<OpportunityModel>;

  activeTab = 'audition';
  oppSaved = false;

  // location details
  locationDetails = {
    lat: '',
    lng: ''
  };

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private scrollHelper: ScrollHelper,
    private oppStore: Store<OpportunityModel>
  ) {

    // creating audition form
    this.createAuditionForm();

    this.oppState = this.oppStore.select('opportunityTags');
    this.oppState.subscribe((state) => {
      console.log('app state', state);
      if (state && state['create_opportunity_data'] && state['create_opportunity_data']['SUCCESS']) {
        if (this.oppSaved === true) {
          this.toastr.success('Opportunity has been created successfully!');
          this.oppSaved = false;
        }
      }
    });

  }

  ngOnInit() {}

  ngAfterViewChecked() {
    this.scrollHelper.doScroll();
  }

  // change tab
  switchTabTo(tabId: string) {
    this.oppSaved = false;
    this.activeTab = tabId;
  }

  /**
   * Creating the reactive form for audition
   */
  createAuditionForm() {
    this.auditionFrm = this.fb.group({
      auditionTitle: ['', [Validators.required]],
      auditionDescription: ['', []],
      auditionCategory: ['', []],
      auditionDate: ['', [Validators.required]],
      auditionLocation: ['', [Validators.required]],
      auditionGender: ['', [Validators.required]],
      auditionEthnicity: ['', []],
      auditionComplexion: ['', []],
      auditionAgeMin: ['', [Validators.required]],
      auditionAgeMax: ['', [Validators.required]],
      auditionHeightFrom: ['', []],
      auditionHeightTo: ['', []],
      auditionWeightFrom: ['', []],
      auditionWeightTo: ['', []]
    });
  }

  submitAuditionForm(formData: any) {

    console.log('formData', formData);

    // audition form validation
    if (!this.auditionFrm.valid) {
      this.scrollHelper.scrollToFirst('error');
      console.log('invalid form');
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
        ethnicity: formData.auditionEthnicity,
        complexion: formData.auditionComplexion,
        ageLimit: String(formData.auditionAgeMax),
        height: {
          from: String(formData.auditionHeightFrom),
          to: String(formData.auditionHeightTo)
        },
        weight: {
          from: String(formData.auditionWeightFrom),
          to: String(formData.auditionWeightTo)
        },
        location: {
          lat: this.locationDetails.lat,
          lon: this.locationDetails.lng
        }
      }
    }

    // submit dispatch
    this.oppStore.dispatch({
      type: OpportunityActions.CREATE_OPPORTUNITY,
      payload: reqBody
    });

    this.oppSaved = true;

  }

}
