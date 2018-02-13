import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { environment } from '../../../../environments/environment';
import { ScrollHelper } from 'app/helpers/scroll.helper';

@Component({
  selector: 'app-opportunity-create',
  templateUrl: './opportunity-create.component.html',
  styleUrls: ['./opportunity-create.component.scss']
})
export class OpportunityCreateComponent implements OnInit, AfterViewChecked {

  baseUrl = environment.API_IMAGE;
  auditionFrm: FormGroup;

  activeTab = 'audition';

  // location details
  locationDetails = {
    lat: '',
    lng: ''
  };

  constructor(
    private fb: FormBuilder,
    private scrollHelper: ScrollHelper
  ) {

    // creating audition form
    this.createAuditionForm();

  }

  ngOnInit() {}

  ngAfterViewChecked() {
    this.scrollHelper.doScroll();
  }

  // change tab
  switchTabTo(tabId: string) {
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
        ageLimit: formData.auditionAgeMax,
        height: {
          from: formData.auditionHeightFrom,
          to: formData.auditionHeightTo
        },
        weight: {
          from: formData.auditionWeightFrom,
          to: formData.auditionWeightTo
        },
        location: {
          lat: this.locationDetails.lat,
          lon: this.locationDetails.lng
        }
      }

      // submit dispatch
      // this.
    }
  }

}
