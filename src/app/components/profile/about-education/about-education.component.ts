import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { UserMedia } from '../../../models/user-media.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-about-education',
  templateUrl: './about-education.component.html',
  providers: [ModalService, DatePipe],
  styleUrls: ['./about-education.component.scss']
})
export class AboutEducationComponent implements OnInit {

  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  aboutWork = initialTag ;
  public educationForm: FormGroup;
  private dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  private editFormPopup: boolean;
  stateProfile = initialTag;
  userProfile: any;
  ownProfile: boolean;

  constructor(
    private http: Http,
    public modalService: ModalService,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private profileStore: Store<ProfileModal>
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.stateProfile = state;
      if (this.stateProfile.current_user_profile && this.stateProfile.profile_other_loaded === true) {
        this.ownProfile = false;
        this.userProfile = this.stateProfile.profile_other;
      }else {
        this.ownProfile = true;
        this.userProfile = this.stateProfile.profileDetails;
      }
    });

    // this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });

    // Init Form
    this.buildEditForm();
  }

  ngOnInit() {
  }

  /**
   * Add Work User
   */
  addEducationUser() {
    this.editFormPopup = false;
    this.modalService.open('userEducationkAdd');
  }

  /**
   * Reserve date
   * @param string
   */
  reverseDate(string) {
    return string.split('-').reverse().join('-');
  }

  /**
   * Form initial value
   */
  buildEditForm(): void {
    this.educationForm = this.fb.group({
      'institute' : ['' , [Validators.required]],
      'course' : ['' , [Validators.required]],
      'from' : ['' , [Validators.required]],
      'to' : ['' , [Validators.required]],
      'publicWork': '0',
      'id': ''
    })
  }

  /**
   * Add Work form submit
   */
  educationSubmit(value) {
    if ( this.educationForm.valid === true ) {
      if (this.editFormPopup === false) {
        const body = {
          'institute': value.institute,
          'name': value.course,
          'from': this.reverseDate(value.from) + 'T05:00:00',
          'to': this.reverseDate(value.to) + 'T05:00:00',
        }
        this.modalService.close('userEducationkAdd');
        this.profileStore.dispatch({ type: ProfileActions.ADD_USER_EDUCATION, payload: body});
      } else {
        const body = {
          'institute': value.institute,
          'name': value.course,
          'from': this.reverseDate(value.from) + 'T05:00:00',
          'to': this.reverseDate(value.to) + 'T05:00:00',
          'id': value.id
        }
        this.profileStore.dispatch({ type: ProfileActions.UPDATE_USER_EDUCATION, payload: body});
        this.modalService.close('userEducationkAdd');
      }
    }

  }

  /**
   * Delete Current Work of user
   */
  deleteCurrentEducation(id) {
    this.profileStore.dispatch({ type: ProfileActions.DELETE_USER_EDUCATION, payload: id});
  }

  /**
   * Edit Current Work of user
   */
  editCurrentEducation(data) {
    this.editFormPopup = true;
    this.educationForm.patchValue({
      institute: data.institute,
      course: data.name,
      from: this.datepipe.transform(data.from, 'dd-MM-yyyy'),
      to: this.datepipe.transform(data.to, 'dd-MM-yyyy'),
      id: data.id
    });
    this.modalService.open('userEducationkAdd');
  }

  /**
   * Close work add form
   */
  educationFormClose() {
    this.modalService.close('userEducationkAdd');
  }

}
