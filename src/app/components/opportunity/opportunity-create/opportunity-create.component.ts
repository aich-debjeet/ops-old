import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// toastr service
import { ToastrService } from 'ngx-toastr';

// store
import { Store } from '@ngrx/store';

// rxjs
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

import { environment } from '../../../../environments/environment';
import { ScrollHelper } from '../../../helpers/scroll.helper';
import { GeneralUtilities } from '../../../helpers/general.utils';

// opportunity imports
import { OpportunityActions } from 'app/actions/opportunity.action';
import { OpportunityModel } from 'app/models/opportunity.model';

// auth imports
import { AuthActions } from 'app/actions/auth.action';
import { ProfileModal } from 'app/models/profile.model';

@Component({
  selector: 'app-opportunity-create',
  templateUrl: './opportunity-create.component.html',
  styleUrls: ['./opportunity-create.component.scss']
})
export class OpportunityCreateComponent implements OnInit, AfterViewChecked, OnDestroy {

  baseUrl = environment.API_IMAGE;
  userHandle: any;

  public dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  auditionFrm: FormGroup;
  projectFrm: FormGroup;
  jobFrm: FormGroup;
  internshipFrm: FormGroup;
  freelanceFrm: FormGroup;
  volunteerFrm: FormGroup;
  private oppSub: ISubscription;
  private profSub: ISubscription;

  oppState: Observable<OpportunityModel>;
  profileState: Observable<ProfileModal>;

  oppSaved = false;
  oppCreating = false;
  activeTab = 'audition';
  uploadedFile = false;
  uploadingFile = false;
  uploadedFileSrc = 'https://cdn.onepagespotlight.com/img/default/opp-thumb.png';

  // location details
  locationDetails = {
    lat: '',
    lng: ''
  };
  industryList = [];

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private scrollHelper: ScrollHelper,
    private generalUtils: GeneralUtilities,
    private profileStore: Store<ProfileModal>,
    private oppStore: Store<OpportunityModel>,
    private router: Router
  ) {

    // creating audition form
    this.createAuditionForm();

    // creating project form
    this.createProjectForm();

    // creating job form
    this.createJobForm();

    // creating internship form
    this.createInternshipForm();

    // creating freelance form
    this.createFreelanceForm();

    // creating vulunteer form
    this.createVolunteerForm();

    this.oppState = this.oppStore.select('opportunityTags');
    this.oppSub = this.oppState.subscribe((state) => {
      if (state) {
        if (state['create_opportunity_success'] && state['create_opportunity_success'] === true) {
          this.oppCreating = false;
          if (this.oppSaved === true) {
            this.toastr.success('Opportunity has been created successfully!');
            this.oppSaved = false;
            if (this.generalUtils.checkNestedKey(state, ['create_opportunity_response', 'id'])) {
              this.router.navigateByUrl('/opportunity/view/' + state['create_opportunity_response']['id']);
              return;
            }
          }
        }
      }
    });
    this.profileState = this.profileStore.select('loginTags');
    this.profSub = this.profileState.subscribe((state) => {
      if (this.generalUtils.checkNestedKey(state, ['profile_cards', 'active', 'handle'])) {
        this.userHandle = state['profile_cards'].active.handle;
      }
      if (state['industries'] && state['industries'] !== 'undefined') {
        this.industryList = state['industries'];
      }
    });
    this.profileStore.dispatch({ type: AuthActions.LOAD_INDUSTRIES });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.oppSub.unsubscribe();
    this.profSub.unsubscribe();
  }

  ngAfterViewChecked() {
    this.scrollHelper.doScroll();
  }

  // change tab
  switchTabTo(tabId: string) {
    this.oppSaved = false;
    this.activeTab = tabId;
  }

  fileSelectedAction($event) {
    const imgObj = this.generalUtils.fileChangeListener($event);
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

    this.oppStore.dispatch({ type: OpportunityActions.FILE_UPLOAD, payload: imageData });

    this.oppStore.select('opportunityTags')
      .first(file => file['fileupload_success'] === true )
      .subscribe( data => {
        // console.log(data);
        if (data && data['fileupload_response'] && data['fileupload_response'][0] && data['fileupload_response'][0].repoPath) {
          // console.log('IN');
          this.uploadingFile = false;
          this.uploadedFile = true;
          // const file = data['fileupload_response'][0].repoPath;
          // this.uploadedFileSrc = file.substr(0, file.lastIndexOf('.')) + '_thumb_250.jpeg';
          // console.log(this.baseUrl + this.uploadedFileSrc);
        } else {
          // console.log('OUT');
          this.uploadingFile = false;
          this.uploadedFile = false;
        }
      });
  }

  /* =================================== audition form =================================== */
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
      auditionAgeMin: ['', [Validators.required]],
      auditionAgeMax: ['', [Validators.required]],
      auditionHeightFrom: ['', []],
      auditionHeightTo: ['', []],
      auditionWeightFrom: ['', []],
      auditionWeightTo: ['', []]
    });
  }

  /**
   * Submit form
   * @param: form data
   */
  submitAuditionForm(formData: any) {

    console.log('formData', formData);

    // audition form validation
    if (!this.auditionFrm.valid) {
      this.scrollHelper.scrollToFirst('error');
      // console.log('invalid form');
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
          location: formData.auditionLocation
        }
      }
    }

    // submit audition details
    this.oppStore.dispatch({
      type: OpportunityActions.CREATE_OPPORTUNITY,
      payload: reqBody
    });
    this.oppSaved = true;
    this.oppCreating = true;
  }
  /* =================================== audition form =================================== */

  /* =================================== project form =================================== */
  createProjectForm() {
    this.projectFrm = this.fb.group({
      projectTitle: ['', [Validators.required]],
      projectDescription: ['', []],
      projectIndustry: ['', []],
      projectSkills: ['', []],
      projectCollaborators: ['', []],
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
      opportunityType: 'project',
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
      type: OpportunityActions.CREATE_OPPORTUNITY,
      payload: reqBody
    });
    this.oppSaved = true;
    this.oppCreating = true;
  }
  /* =================================== project form =================================== */

  /* =================================== job form =================================== */
  createJobForm() {
    this.jobFrm = this.fb.group({
      jobRole: ['', [Validators.required]],
      jobDescription: ['', []],
      jobIndustry: ['', []],
      jobExperienceFrom: ['', [Validators.required]],
      jobExperienceTo: ['', [Validators.required]],
      jobSalaryAmount: ['', []],
      jobSalaryDuration: ['', []],
      jobSalaryCurrency: ['', []],
      jobDuration: ['', []],
      jobLocation: ['', []],
      jobTravelInclusive: ['', []],
      jobCountry: ['', []],
      jobSkills: ['', []],
      jobQualifications: ['', []],
      jobOrgName: ['', []]
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
      opportunityType: 'job',
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
            lat: formData.jobLocation,
            lon: formData.jobLocation
          },
          includesTravel: {
            option: formData.jobTravelInclusive,
            country: formData.jobCountry
          },
          skills: formData.jobSkills,
          qualifications: formData.jobQualifications,
          organizationName: formData.jobOrgName,
          attachFiles: []
      }
    };

    // submit job details
    this.oppStore.dispatch({
      type: OpportunityActions.CREATE_OPPORTUNITY,
      payload: reqBody
    });
    this.oppSaved = true;
    this.oppCreating = true;
  }
  /* =================================== job form =================================== */

  /* =================================== internship form =================================== */
  createInternshipForm() {
    this.internshipFrm = this.fb.group({
      internshipRole: ['', [Validators.required]],
      internshipDescription: ['', []],
      internshipIndustry: ['', []],
      internshipExperienceFrom: ['', [Validators.required]],
      internshipExperienceTo: ['', [Validators.required]],
      internshipSalaryAmount: ['', []],
      internshipSalaryDuration: ['', []],
      internshipSalaryCurrency: ['', []],
      internshipDuration: ['', []],
      internshipLocation: ['', []],
      internshipTravelInclusive: ['', []],
      internshipCountry: ['', []],
      internshipSkills: ['', []],
      internshipQualifications: ['', []],
      internshipOrgName: ['', []]
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
      opportunityType: 'internship',
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
            lat: formData.internshipLocation,
            lon: formData.internshipLocation
          },
          includesTravel: {
            option: formData.internshipTravelInclusive,
            country: formData.internshipCountry
          },
          skills: formData.internshipSkills,
          qualifications: formData.internshipQualifications,
          organizationName: formData.internshipOrgName,
          attachFiles: []
      }
    };

    // submit internship details
    this.oppStore.dispatch({
      type: OpportunityActions.CREATE_OPPORTUNITY,
      payload: reqBody
    });
    this.oppSaved = true;
    this.oppCreating = true;
  }
  /* =================================== internship form =================================== */

  /* =================================== freelance form =================================== */
  createFreelanceForm() {
    this.freelanceFrm = this.fb.group({
      freelanceTitle: ['', [Validators.required]],
      freelanceDescription: ['', []],
      freelancePaymentMethod: ['', [Validators.required]],
      freelanceEngagement: ['', [Validators.required]],
      freelanceSkills: ['', []],
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
      opportunityType: 'freelance',
      opportunityFreelance: {
        title: formData.freelanceTitle,
        description: formData.freelanceDescription,
        payType: formData.freelancePaymentMethod,
        engagement: formData.freelanceEngagement,
        skills: formData.freelanceSkills,
        attachFiles: []
      }
    };

    // submit freelance details
    this.oppStore.dispatch({
      type: OpportunityActions.CREATE_OPPORTUNITY,
      payload: reqBody
    });
    this.oppSaved = true;
    this.oppCreating = true;
  }
  /* =================================== freelance form =================================== */

  /* =================================== volunteer form =================================== */
  createVolunteerForm() {
    this.volunteerFrm = this.fb.group({
      volunteerTitle: ['', [Validators.required]],
      volunteerCause: ['', []],
      volunteerLocation: ['', []],
      volunteerSkills: ['', []],
      volunteerDL: [false, []],
      volunteerBGC: [false, []],
      volunteerORTR: [false, []],
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
        skills: formData.volunteerSkills,
        location: {
          lat: formData.volunteerLocation,
          lon: formData.volunteerLocation
        },
        requirements: volunteerRequirements
      }
    };

    // submit volunteer details
    this.oppStore.dispatch({
      type: OpportunityActions.CREATE_OPPORTUNITY,
      payload: reqBody
    });
    this.oppSaved = true;
    this.oppCreating = true;
  }
  /* =================================== volunteer form =================================== */

}
