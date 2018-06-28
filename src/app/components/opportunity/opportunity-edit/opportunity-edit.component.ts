import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralUtilities } from '../../../helpers/general.utils';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { OpportunityModel } from '../../../models/opportunity.model';
import { Store } from '@ngrx/store';
import { OpportunityActions } from '../../../actions/opportunity.action';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComingSoonComponent } from '../../../shared/coming-soon/coming-soon.component';
import { AuthActions } from '../../../actions/auth.action';
import { ScrollHelper } from '../../../helpers/scroll.helper';

@Component({
  selector: 'app-opportunity-edit',
  templateUrl: './opportunity-edit.component.html',
  styleUrls: ['./opportunity-edit.component.scss']
})
export class OpportunityEditComponent implements OnInit, OnDestroy {
  opportunityState$: any;
  opportunityState: any;
  opportunity: any;
  jobId: any;
  loginState: any;
  loginState$: any;
  routerSub: any;
  oppsSub: any;
  loginSub: any;

  auditionFrm: FormGroup;
  dataAddedToForm = false;
  projectFrm: FormGroup;
  jobFrm: FormGroup;
  internshipFrm: FormGroup;
  freelanceFrm: FormGroup;
  volunteerFrm: FormGroup;

  activeTab: string;
  oppSaved = false;
  oppUpdating = false;
  industryList = [];

  /* attachments */
  jobAttachments = [];
  internshipAttachments = [];
  freelanceAttachments = [];
  /* attachments */

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private generalUtils: GeneralUtilities,
    private toastr: ToastrService,
    // public modalService: ModalService,
    private oppStore: Store<OpportunityModel>,
    private loginStore: Store<any>,
    private scrollHelper: ScrollHelper
  ) {
    // opportunity state listener
    this.opportunityState$ = this.oppStore.select('opportunityTags');
    this.oppsSub = this.opportunityState$.subscribe((state) => {
      this.opportunityState = state;
      // console.log('state', state);
      if (state) {
        if (state['get_opportunity_data']) {
          this.activeTab = state['get_opportunity_data']['opportunityType']
          if (!this.dataAddedToForm) {
            if (this.activeTab === 'audition') {
              this.buildAuditionForm(state['get_opportunity_data']);
            }
            if (this.activeTab === 'project') {
              this.buildProjectForm(state['get_opportunity_data']);
            }
            if (this.activeTab === 'job') {
              this.buildJobForm(state['get_opportunity_data']);
            }
            if (this.activeTab === 'internship') {
              this.buildInternshipForm(state['get_opportunity_data']);
            }
            if (this.activeTab === 'freelance') {
              this.buildFreelanceForm(state['get_opportunity_data']);
            }
            if (this.activeTab === 'volunteer') {
              this.buildVolunteerForm(state['get_opportunity_data']);
            }
            this.dataAddedToForm = true;
          }
        }
        if (state['update_opportunity_success'] && state['update_opportunity_success'] === true) {
          this.oppUpdating = false;
          if (this.oppSaved === true) {
            this.toastr.success('Opportunity has been updated successfully!');
            this.oppSaved = false;
            this.router.navigateByUrl('/opportunity/edit/' + this.jobId);
            return;
          }
        }
      }
    });
    this.loginState = this.loginStore.select('loginTags');
    this.loginSub = this.loginState.subscribe((state) => {
      if (state['industries'] && state['industries'] !== 'undefined') {
        this.industryList = state['industries'];
      }
    });
    this.loginStore.dispatch({ type: AuthActions.LOAD_INDUSTRIES });
  }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      if (params['id']) {
        // search job with id
        this.jobId = params['id'];
        this.oppStore.dispatch({ type: OpportunityActions.GET_OPPORTUNITY, payload: this.jobId });
      }
    });
  }

  /* =================================== audition form =================================== */
  /**
   * Edit audition form
   */
  buildAuditionForm(data: any) {
    this.auditionFrm = this.fb.group({
      auditionTitle: [data['opportunityAudition']['title'], [Validators.required]],
      auditionDescription: [data['opportunityAudition']['description'], []],
      auditionCategory: [data['opportunityAudition']['category'], []],
      auditionDate: [data['opportunityAudition']['auditionDate'], [Validators.required]],
      auditionLocation: [data['opportunityAudition']['location']['location'], [Validators.required]],
      auditionGender: [data['opportunityAudition']['gender'], [Validators.required]],
      auditionAgeMin: [data['opportunityAudition']['ageLimit']['from'], [Validators.required]],
      auditionAgeMax: [data['opportunityAudition']['ageLimit']['to'], [Validators.required]],
      auditionHeightFrom: [data['opportunityAudition']['height']['from'], []],
      auditionHeightTo: [data['opportunityAudition']['height']['to'], []],
      auditionWeightFrom: [data['opportunityAudition']['weight']['from'], []],
      auditionWeightTo: [data['opportunityAudition']['weight']['to'], []]
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
      // console.log('invalid form');
      return;
    }

    // preparing request body to submit to the api
    const reqBody = {
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
      type: OpportunityActions.UPDATE_OPPORTUNITY,
      payload: { id: this.jobId, data: reqBody }
    });
    this.oppSaved = true;
    this.oppUpdating = true;
  }
  /* =================================== audition form =================================== */

  /* =================================== project form =================================== */
  buildProjectForm(data: any) {
    this.projectFrm = this.fb.group({
      projectTitle: [data['opportunityProject']['title'], [Validators.required]],
      projectDescription: [data['opportunityProject']['description'], []],
      projectIndustry: [data['opportunityProject']['category'], []],
      projectSkills: [data['opportunityProject']['skills'], []],
      projectCollaborators: [data['opportunityProject']['addCollaborators'][0], []],
    });
  }

  submitProjectForm(formData: any) {
    // validation check
    if (!this.projectFrm.valid) {
      // console.log('invalid form');
      return;
    }

    // else prepare and submit the form
    const reqBody = {
      opportunityProject: {
        title: formData.projectTitle,
        description: formData.projectDescription,
        industry: formData.projectIndustry,
        skills: formData.projectSkills,
        addCollaborators: [formData.projectCollaborators]
      }
    };

    // submit project details
    this.oppStore.dispatch({
      type: OpportunityActions.UPDATE_OPPORTUNITY,
      payload: { id: this.jobId, data: reqBody }
    });
    this.oppSaved = true;
    this.oppUpdating = true;
  }
  /* =================================== project form =================================== */

  /* =================================== job form =================================== */
  buildJobForm(data: any) {
    this.jobFrm = this.fb.group({
      jobRole: [data['opportunityJob']['role'], [Validators.required]],
      jobDescription: [data['opportunityJob']['description'], []],
      jobIndustry: [data['opportunityJob']['industry'], []],
      jobExperienceFrom: [data['opportunityJob']['experience']['from'], [Validators.required]],
      jobExperienceTo: [data['opportunityJob']['experience']['to'], [Validators.required]],
      jobSalaryAmount: [data['opportunityJob']['salary']['amount_from'], []],
      jobSalaryDuration: [data['opportunityJob']['salary']['salaryType'], []],
      jobSalaryCurrency: [data['opportunityJob']['salary']['currency'], []],
      jobDuration: [data['opportunityJob']['duration'], []],
      jobLocation: [data['opportunityJob']['location']['location'], []],
      jobTravelInclusive: [data['opportunityJob']['includesTravel']['option'], []],
      jobCountry: [data['opportunityJob']['includesTravel']['country'], []],
      jobSkills: [data['opportunityJob']['skills'], []],
      jobQualifications: [data['opportunityJob']['qualifications'], []],
      jobOrgName: [data['opportunityJob']['organizationName'], []]
    });
  }

  submitJobForm(formData: any) {
    // validation check
    if (!this.jobFrm.valid) {
      this.scrollHelper.scrollToFirst('error');
      // console.log('invalid form');
      return;
    }

    // else prepare and submit the form
    const reqBody = {
      opportunityJob: {
        role: formData.jobRole,
          description: formData.jobDescription,
          industry: formData.jobIndustry,
          experience: {
            from: formData.jobExperienceFrom,
            to: formData.jobExperienceTo
          },
          salary: {
            amount: Number(formData.jobSalaryAmount),
            salaryType: formData.jobSalaryDuration,
            currency: formData.jobSalaryCurrency
          },
          duration: formData.jobDuration,
          location: {
            location: formData.jobLocation
          },
          includesTravel: {
            option: formData.jobTravelInclusive,
            country: formData.jobCountry
          },
          skills: formData.jobSkills,
          qualifications: formData.jobQualifications,
          organizationName: formData.jobOrgName,
          attachFiles: this.jobAttachments
      }
    };

    // submit job details
    this.oppStore.dispatch({
      type: OpportunityActions.UPDATE_OPPORTUNITY,
      payload: { id: this.jobId, data: reqBody }
    });
    this.oppSaved = true;
    this.oppUpdating = true;
  }
  /* =================================== job form =================================== */

  /* =================================== internship form =================================== */
  buildInternshipForm(data: any) {
    this.internshipFrm = this.fb.group({
      internshipRole: [data['opportunityInternship']['role'], [Validators.required]],
      internshipDescription: [data['opportunityInternship']['description'], []],
      internshipIndustry: [data['opportunityInternship']['industry'], []],
      internshipExperienceFrom: [data['opportunityInternship']['experience']['from'], [Validators.required]],
      internshipExperienceTo: [data['opportunityInternship']['experience']['to'], [Validators.required]],
      internshipSalaryAmount: [data['opportunityInternship']['salary']['amount_from'], []],
      internshipSalaryDuration: [data['opportunityInternship']['salary']['salaryType'], []],
      internshipSalaryCurrency: [data['opportunityInternship']['salary']['currency'], []],
      internshipDuration: [data['opportunityInternship']['duration'], []],
      internshipLocation: [data['opportunityInternship']['location']['location'], []],
      internshipTravelInclusive: [data['opportunityInternship']['includesTravel']['option'], []],
      internshipCountry: [data['opportunityInternship']['includesTravel']['country'], []],
      internshipSkills: [data['opportunityInternship']['skills'], []],
      internshipQualifications: [data['opportunityInternship']['qualifications'], []],
      internshipOrgName: [data['opportunityInternship']['organizationName'], []]
    });
  }

  submitInternshipForm(formData: any) {
    // validation check
    if (!this.internshipFrm.valid) {
      this.scrollHelper.scrollToFirst('error');
      // console.log('invalid form');
      return;
    }

    // else prepare and submit the form
    const reqBody = {
      opportunityInternship: {
        role: formData.internshipRole,
          description: formData.internshipDescription,
          industry: formData.internshipIndustry,
          experience: {
            from: formData.internshipExperienceFrom,
            to: formData.internshipExperienceTo
          },
          salary: {
            amount: Number(formData.internshipSalaryAmount),
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
    };

    // submit internship details
    this.oppStore.dispatch({
      type: OpportunityActions.UPDATE_OPPORTUNITY,
      payload: { id: this.jobId, data: reqBody }
    });
    this.oppSaved = true;
    this.oppUpdating = true;
  }
  /* =================================== internship form =================================== */

  /* =================================== freelance form =================================== */
  buildFreelanceForm(data: any) {
    this.freelanceFrm = this.fb.group({
      freelanceTitle: [data['opportunityFreelance']['title'], [Validators.required]],
      freelanceDescription: [data['opportunityFreelance']['description'], []],
      freelanceIndustry: [data['opportunityFreelance']['category'], []],
      freelancePaymentMethod: [data['opportunityFreelance']['payType'], [Validators.required]],
      freelanceEngagement: [data['opportunityFreelance']['engagement'], [Validators.required]],
      freelanceSkills: [data['opportunityFreelance']['skills'], []],
    });
  }

  submitFreelanceForm(formData: any) {
    // validation check
    if (!this.freelanceFrm.valid) {
      this.scrollHelper.scrollToFirst('error');
      // console.log('invalid form');
      return;
    }

    // else prepare and submit the form
    const reqBody = {
      opportunityFreelance: {
        title: formData.freelanceTitle,
        description: formData.freelanceDescription,
        industry: formData.freelanceIndustry,
        payType: formData.freelancePaymentMethod,
        engagement: formData.freelanceEngagement,
        skills: formData.freelanceSkills,
        attachFiles: this.freelanceAttachments
      }
    };

    // submit freelance details
    this.oppStore.dispatch({
      type: OpportunityActions.UPDATE_OPPORTUNITY,
      payload: { id: this.jobId, data: reqBody }
    });
    this.oppSaved = true;
    this.oppUpdating = true;
  }
  /* =================================== freelance form =================================== */

  /* =================================== volunteer form =================================== */
  buildVolunteerForm(data: any) {
    this.volunteerFrm = this.fb.group({
      volunteerTitle: [data['opportunityVolunteer']['title'], [Validators.required]],
      volunteerCause: [data['opportunityVolunteer']['cause'], []],
      volunteerIndustry: [data['opportunityVolunteer']['category'], []],
      volunteerLocation: [data['opportunityVolunteer']['location']['location'], []],
      volunteerSkills: [data['opportunityVolunteer']['skills'], []],
      volunteerDL: [data['opportunityVolunteer']['requirements'].includes('Background Check'), []],
      volunteerBGC: [data['opportunityVolunteer']['requirements'].includes('Driver\'s License Needed'), []],
      volunteerORTR: [data['opportunityVolunteer']['requirements'].includes('Orientation or Training'), []],
    });
  }

  submitVolunteerForm(formData: any) {
    // validation check
    if (!this.volunteerFrm.valid) {
      this.scrollHelper.scrollToFirst('error');
      // console.log('invalid form');
      return;
    }

    const volunteerRequirements = [];
    if (formData.volunteerBGC && formData.volunteerBGC === true) {
      volunteerRequirements.push('Background Check');
    }
    if (formData.volunteerDL && formData.volunteerDL === true) {
      volunteerRequirements.push('Driver\'s License Needed');
    }
    if (formData.volunteerORTR && formData.volunteerORTR === true) {
      volunteerRequirements.push('Orientation or Training');
    }

    // else prepare and submit the form
    const reqBody = {
      opportunityType: 'volunteer',
      opportunityVolunteer: {
        title: formData.volunteerTitle,
        cause: formData.volunteerCause,
        industry: formData.volunteerIndustry,
        skills: formData.volunteerSkills,
        location: {
          location: formData.volunteerLocation
        },
        requirements: volunteerRequirements
      }
    };

    // submit volunteer details
    this.oppStore.dispatch({
      type: OpportunityActions.UPDATE_OPPORTUNITY,
      payload: { id: this.jobId, data: reqBody }
    });
    this.oppSaved = true;
    this.oppUpdating = true;
  }
  /* =================================== volunteer form =================================== */

  ngOnDestroy() {
    this.oppsSub.unsubscribe();
    this.routerSub.unsubscribe();
    this.loginSub.unsubscribe();
  }

}
