import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-opportunity-create',
  templateUrl: './opportunity-create.component.html',
  styleUrls: ['./opportunity-create.component.scss']
})
export class OpportunityCreateComponent implements OnInit {

  baseUrl = environment.API_IMAGE;
  auditionFrm: FormGroup;

  activeTab = 'audition';

  constructor(
    private fb: FormBuilder
  ) {

    // creating audition form
    this.createAuditionForm();

  }

  ngOnInit() {}

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
      auditionHeightFrom: ['', [Validators.required]],
      auditionHeightTo: ['', [Validators.required]],
      auditionWeightFrom: ['', [Validators.required]],
      auditionWeightTo: ['', [Validators.required]]
    });
  }

  submitAuditionForm(formData: any) {

    // audition form validation
    if (!this.auditionFrm.valid) {
      window.scrollTo(0, 0);
      console.log('invalid form');
      return;
    }

    const reqBody = {
      opportunityType: 'audition',
      opportunityAudition: {
        title: 'Ariel',
        description: 'Casting Ariel, a dark comedy short about a writers psychological struggle after experiencing writers block. There are two roles. David and Allan',
        category: 'Film',
        auditionDate: '25-02-2018',
        gender: 'M',
        ethnicity: 'Kannadika',
        complexion: 'Fair',
        ageLimit: '30',
        height: {
          from: '151',
          to: '165'
        },
        weight: {
          from: '65',
          to: '80'
        },
        location: {
          lat: '',
          lon: ''
        }
      }
    }
  }

}
