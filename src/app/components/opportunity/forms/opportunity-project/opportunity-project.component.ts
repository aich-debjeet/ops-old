import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScrollHelper } from '../../../../helpers/scroll.helper';
import { Store } from '@ngrx/store';
import { ProfileModal } from '../../../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { GeneralUtilities } from '../../../../helpers/general.utils';

@Component({
  selector: 'app-opportunity-project',
  templateUrl: './opportunity-project.component.html',
  styleUrls: ['./../opportunity-forms.scss']
})
export class OpportunityProjectComponent implements OnInit, OnDestroy {
  projectFrm: FormGroup;
  loginState: Observable<ProfileModal>;
  private loginSub: ISubscription;
  industryList = [];
  oppSubmitting = false;
  _oppDetails: any;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Input('oppDetails') set setOppFormData(value) {
    this._oppDetails = value;
    if (this._oppDetails.formType === 'edit') {
      this.buildProjectForm(this._oppDetails.data);
    } else {
      this.buildProjectForm(null);
    }
  };

  constructor(
    private fb: FormBuilder,
    private scrollHelper: ScrollHelper,
    private generalUtils: GeneralUtilities,
    private loginStore: Store<any>
  ) {
    // this.buildProjectForm();
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
   * Creating the reactive form for project
   */
  buildProjectForm(data: any) {
    this.projectFrm = this.fb.group({
      projectTitle: [this.generalUtils.checkNestedKey(data, ['opportunityProject', 'title']) ? data['opportunityProject']['title'] : '', [Validators.required]],
      projectDescription: [this.generalUtils.checkNestedKey(data, ['opportunityProject', 'description']) ? data['opportunityProject']['description'] : '', [Validators.required]],
      projectIndustry: [this.generalUtils.checkNestedKey(data, ['opportunityProject', 'category']) ? data['opportunityProject']['category'] : '', [Validators.required]],
      projectLocation: [this.generalUtils.checkNestedKey(data, ['opportunityProject', 'location', 'location']) ? data['opportunityProject']['location']['location'] : '', [Validators.required]],
      projectSkills: [this.generalUtils.checkNestedKey(data, ['opportunityProject', 'skills']) ? data['opportunityProject']['skills'] : '', [Validators.required]],
      projectCollaborators: [this.generalUtils.checkNestedKey(data, ['opportunityProject', 'addCollaborators']) ? data['opportunityProject']['addCollaborators'][0] : '', []],
    });
  }

  /**
   * Submit form
   * @param: form data
   */
  submitProjectForm(formData: any) {
    // project form validation
    if (!this.projectFrm.valid) {
      this.scrollHelper.scrollToFirst('error');
      return;
    }

    // preparing request body to submit to the api
    const reqBody = {
      opportunityType: 'project',
      opportunityProject: {
        title: formData.projectTitle,
        description: formData.projectDescription,
        industry: formData.projectIndustry,
        skills: formData.projectSkills,
        addCollaborators: [formData.projectCollaborators],
        location: {
          location: formData.projectLocation
        }
      }
    }
    this.oppSubmitting = true;
    this.formSubmitted.emit(reqBody);
  }

}