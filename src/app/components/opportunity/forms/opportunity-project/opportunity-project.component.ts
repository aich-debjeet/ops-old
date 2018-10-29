import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScrollHelper } from '../../../../helpers/scroll.helper';
import { Store } from '@ngrx/store';
import { ProfileModal } from '../../../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import { GeneralUtilities } from '../../../../helpers/general.utils';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Modal } from '../../../../shared/modal-new/Modal';
import { ApiService } from '../../../../helpers/api.service';
import { environment } from 'environments/environment';

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
  @ViewChild('termsPopup') termsPopup: Modal;
  imageLink: string = environment.API_IMAGE;

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],
      ['clean'],                                         // remove formatting button
    ]
  };

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private location: Location,
    private toastr: ToastrService,
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
      projectCollaborators: [this.generalUtils.checkNestedKey(data, ['opportunityProject', 'addCollaborators']) ? data['opportunityProject']['addCollaborators'] : [], []],
    });
  }

  /**
   * Submit form
   * @param: form data
   */
  submitProjectForm(formData: any) {
    // project form validation
    if (!this.projectFrm.valid) {
      this.toastr.warning('Please check for errors in the form.', '', {
        timeOut: 3000
      });
      this.scrollHelper.scrollToFirst('error');
      return;
    }
    // const projectCollaborators = formData.projectCollaborators.map(item => item['handle']);
    const projectCollaborators = [];
    for (let i = 0; i < formData.projectCollaborators.length; i++) {
      const person = {
        name: formData.projectCollaborators[i]['name'],
        // username: formData.projectCollaborators[i]['extra']['username'],
        handle: formData.projectCollaborators[i]['handle'],
        profileImage: formData.projectCollaborators[i]['profileImage'],
      }
      projectCollaborators.push(person);
    }

    // preparing request body to submit to the api
    const reqBody = {
      opportunityType: 'project',
      opportunityProject: {
        title: formData.projectTitle,
        description: formData.projectDescription,
        category: formData.projectIndustry,
        skills: formData.projectSkills,
        addCollaborators: projectCollaborators,
        location: {
          location: formData.projectLocation
        }
      }
    }
    this.oppSubmitting = true;
    this.formSubmitted.emit(reqBody);
  }

  cancelUpdate() {
    this.location.back();
  }

  // terms show/hide
  termsAction(action: string) {
    if (action === 'hide') {
      this.termsPopup.close();
    } else {
      this.termsPopup.open();
    }
  }

  /**
   * Get people search
   */
  public requestAutocompleteItems = (text: string): Observable<Response> => {
    if (text === '') { text = 'a'; }
    const apiLink = '/portal/searchprofiles/1/' + text + '/0/10';
    return this.api.get(apiLink);
  };

}
