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
  selector: 'app-about-work',
  templateUrl: './about-work.component.html',
  providers: [ModalService, DatePipe],
  styleUrls: ['./about-work.component.scss']
})
export class AboutWorkComponent implements OnInit {

  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  aboutWork = initialTag ;
  public workForm: FormGroup;
  private dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private http: Http,
    public modalService: ModalService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    private profileStore: Store<ProfileModal>
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    // this.test = 'salabeel';
    this.tagState$.subscribe((state) => {
      this.aboutWork = state;
    });

    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });
    this.buildEditForm();

  }

  ngOnInit() {
  }

  /**
   * Add Work User
   */
  addWorkUser() {
    this.modalService.open('userWorkAdd');
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
    this.workForm = this.fb.group({
      'company' : ['' , [Validators.required]],
      'position' : ['' , [Validators.required]],
      'from' : ['' , [Validators.required]],
      'to' : ['' , [Validators.required]],
      'currentWork' : '',
      'publicWork': '0'
    })
  }

  /**
   * Add Work form submit
   */
  workFormSubmit(value) {
    if ( this.workForm.valid === true ) {
      const body = {
        'role': value.position,
        'organizationName': value.company,
        'workOrAward': 'work',
        'from': this.reverseDate(value.from) + 'T05:00:00',
        'to': this.reverseDate(value.to) + 'T05:00:00',
        'currentlyWith': true,
        'access': 0
      }
      this.profileStore.dispatch({ type: ProfileActions.ADD_USER_WORK, payload: body});
      this.modalService.close('userWorkAdd');
    }
  }

  /**
   * Delete Current Work of user
   */
  deleteCurrentWork(id) {
    console.log(id);
    this.profileStore.dispatch({ type: ProfileActions.DELETE_USER_WORK, payload: id});
  }

  /**
   * Close work add form
   */
  workFormClose() {
    this.modalService.close('userWorkAdd');
  }
}
