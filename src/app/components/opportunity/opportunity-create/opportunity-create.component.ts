import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OpportunityActions } from 'app/actions/opportunity.action';

import { Store } from '@ngrx/store';

import { OpportunityModel } from './../../../models/opportunity.model';

import { LocalStorageService } from './../../../services/local-storage.service';

@Component({
  selector: 'app-opportunity-create',
  templateUrl: './opportunity-create.component.html',
  styleUrls: ['./opportunity-create.component.scss']
})
export class OpportunityCreateComponent implements OnInit {

  createOppFrm: FormGroup;
  orgHandle = '';

  constructor(
    private fb: FormBuilder,
    private store: Store<OpportunityModel>,
    private localStorageService: LocalStorageService
  ) {

    this.createOppFrm = fb.group({
      oppType: [null],
      role: [null],
      description: [null],
      yearsExpFrom: [null],
      yearsExpTo: [null],
      salaryAmount: [null],
      salaryDuration: [null],
      salaryCurrency: [null],
      oppDuration: [null],
      oppLocation: [null],
      oppLevel: [null],
      userSkills: [null],
      userQualifications: [null],
      orgName: [null],
      country: [null],
      attachments: [null]
    });

    // check if creator is user or organization
    if (localStorage.getItem('accountStatus') !== null) {
      const localStore = JSON.parse(this.localStorageService.theAccountStatus);
      if (localStore.profileType === 'org') {
        this.orgHandle = localStore.handle;
      }
    }

  }

  ngOnInit() {
  }

  postOpportunity(formData: any) {
    console.log('formData', formData);

    // validation step
    if (!this.createOppFrm.valid) {
      console.log('invalid form');
      return;
    } else {
      console.log('submit form');
    }

    // preparing skills for req body
    let skillsArr = [];
    if (formData.userSkills && formData.userSkills.length > 0) {
      skillsArr = formData.userSkills.split(',');
    }

    // preparing qualifications for req body
    let qualificationsArr = [];
    if (formData.userQualifications && formData.userQualifications.length > 0) {
      qualificationsArr = formData.userQualifications.split(',');
    }

    const reqObj = {
      title: formData.oppType,
      role: formData.role,
      description: formData.description,
      experience: {
        experienceFrom: formData.experienceFrom,
        experienceTo: formData.experienceTo
      },
      salary: {
        amount: formData.salaryAmount,
        salaryType: formData.salaryType,
        currency: formData.salaryCurrency
      },
      organization: this.orgHandle,
      // organizationName: formData.orgName,
      jobType: formData.oppType,
      skills: skillsArr,
      attachment: [''],
      qualifications: qualificationsArr,
      count: {
        like: [],
        spots: [],
        channel: ['']
      }
    };

    // trigger dispatch for creating the opportunity
    this.store.dispatch({
      type: OpportunityActions.CREATE_OPPORTUNITY,
      payload: reqObj
    });

  }

}
