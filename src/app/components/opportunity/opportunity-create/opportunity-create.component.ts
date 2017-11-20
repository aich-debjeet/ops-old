import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

// actions
import { OpportunityActions } from 'app/actions/opportunity.action';

// store
import { Store } from '@ngrx/store';

// models
import { OpportunityModel } from './../../../models/opportunity.model';

// services
import { LocalStorageService } from './../../../services/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opportunity-create',
  templateUrl: './opportunity-create.component.html',
  styleUrls: ['./opportunity-create.component.scss']
})
export class OpportunityCreateComponent implements OnInit {

  createOppFrm: FormGroup;
  orgHandle = '';
  opportunityState$: any;
  opportunityState: any;
  isSaved = false;
  formData: any;
  createClicked = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private store: Store<OpportunityModel>,
    private localStorageService: LocalStorageService
  ) {

    // state listener
    this.opportunityState$ = this.store.select('opportunityTags');
    this.opportunityState$.subscribe((state) => {

      this.opportunityState = state;
      // console.log('state', state);

      // check if opportunity created successfully
      if (this.opportunityState && this.opportunityState.create_opportunity_data && this.opportunityState.create_opportunity_data.SUCCESS) {
        if (this.isSaved === false) {
          this.isSaved = true;
          this.toastr.success('Opportunity has been created successfully!');
        }
        // console.log('opportunity created successfully')
        this.resetOppForm();

        // redirecting to the created job
        const jobId = this.opportunityState.create_opportunity_data.SUCCESS.id;
        setTimeout(() => {
          this.router.navigate(['/opportunity/view/' + jobId]);
        }, 2000);

      }
    });

    // create form
    this.createOppForm();

    // check if creator is user or organization
    if (localStorage.getItem('accountStatus') !== null) {
      const localStore = JSON.parse(this.localStorageService.theAccountStatus);
      if (localStore.profileType === 'org') {
        this.orgHandle = localStore.handle;
      }
    }

  }

  /**
   * Creating the reactive form
   */
  createOppForm() {
    // reactive from group
    this.createOppFrm = this.fb.group({
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
  }

  /**
   * Reset the form to empty/default values
   */
  resetOppForm() {
    this.createOppForm();
  }

  ngOnInit() {
  }

  // channel select
  channelSelection(formData: any) {
    this.createClicked = true;
    this.formData = formData;
    console.log('channel selection');
    // this.postOpportunity(this.formData);
  }

  // opp create form submit
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

    // create opp request object
    const reqObj = {
      title: formData.oppType,
      role: formData.role,
      description: formData.description,
      experience: {
        experienceFrom: Number(formData.yearsExpFrom),
        experienceTo: Number(formData.yearsExpTo)
      },
      salary: {
        amount: Number(formData.salaryAmount),
        salaryType: formData.salaryDuration,
        currency: formData.salaryCurrency
      },
      organization: this.orgHandle,
      organizationName: formData.orgName,
      jobType: formData.oppType,
      skills: skillsArr,
      attachment: [''],
      qualification: qualificationsArr,
      count: {
        like: [],
        spots: [],
        channel: ['']
      }
    };

    // console.log(reqObj);
    // create the opportunity
    this.store.dispatch({
      type: OpportunityActions.CREATE_OPPORTUNITY,
      payload: reqObj
    });

  }

}
