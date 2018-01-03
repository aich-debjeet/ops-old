import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Register, UserTag, initialTag, AuthModel, RightBlockTag, danceWorldTag, Dwc } from '../../../models/auth.model';
import { ProfileModal, initialTag as profileTag, UserCard, ProfileCards } from '../../../models/profile.model';
import { Router, ActivatedRoute } from '@angular/router';
import {IDatePickerConfig} from 'ng2-date-picker';
import { Store } from '@ngrx/store';
import { Modal } from '../../../shared/modal-new/Modal';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { FormValidation, DatabaseValidator } from '../../../helpers/form.validator';

// Action
import { EventActions } from '../../../actions/event.action'
import { Profile } from 'selenium-webdriver/firefox';
import { NgxCarousel, NgxCarouselStore } from 'ngx-carousel';

@Component({
  selector: 'app-dwc-reg',
  templateUrl: './dwc-reg.component.html',
  providers: [DatabaseValidator],
  styleUrls: ['./dwc-reg.component.scss']
})
export class DwcRegComponent implements OnInit {

  public dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  err = false;
  tagState$: Observable<Dwc>;
  profileState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  public eventForm: FormGroup;
  isAuthed = false;
  valueStore: any;
  isPeformanceSelected: boolean;
  isAgeGroupSelected: boolean;
  isDanceStyle: boolean;
  Performance = ['Solo', 'Couple/Trio', 'Group'];
  Age_Group = ['Mini - 9 years and under', 'Junior section - 17 years and under', 'Children – 13 years and under', 'Senior section - 25 years and under']
  Dance_Style = ['Hip Hop, Street Dance and Commercial', 'National, Folklore, Classical, Tribal', 'Modern, Contemporary', 'Classical Ballet, Jazz, Tap, Acro', 'Song and Dance'];
  @ViewChild('dwcModal') DwctypeModal: Modal;
  dwcSlider: NgxCarousel;
  hideSchoolName = false;
  imageBaseUrl = environment.API_IMAGE;

  config: IDatePickerConfig = {
    firstDayOfWeek: 'mo',
    // format: 'YYYY-MM-DDThh:mmTZD',
    disableKeypress: true,
    showSeconds: true
  };

  constructor(
    private fb: FormBuilder,
    private store: Store<AuthModel>,
    private __store: Store<ProfileModal>,
    private router: Router,
    private toastr: ToastrService,
    private _store: Store<Dwc>,
    private databaseValidator: DatabaseValidator,
    ) {
      this.isAuthed = false;
      this.tagState$ = _store.select('eventTags');
      this.profileState$ = __store.select('profileTags');

      // X
      this.profileState$.subscribe((state) => {
        // If nav component has profile details
        const user = state.profile_navigation_details.handle;
        if (state.profile_navigation_details && state.profile_navigation_details.handle) {
          this.isAuthed = true;
        }
      });

      this.tagState$.subscribe((state) => {
        if (state['err_msg'] === 'Bad Request' && !this.err) {
          this.err = true;
          this.toastr.error('You Have Already applied')
        }
    })

  }

  ngOnInit() {
    this.buildForm();
    this.pushMember();

    this.dwcSlider = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 4000,
      interval: 4000,
      custom: 'banner',
      point: {
        visible: false,
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            bottom: 20px;
            left: 0;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.55);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngxcarouselPoint li.active {
              background: white;
              width: 10px;
          }
        `
      },
      load: 1,
      loop: true,
      touch: true
    }


    this.eventForm.get('member').valueChanges.subscribe(
      (validateBy: string) => {
        if (validateBy === 'true') {
          this.hideSchoolName = true;
          this.eventForm.get('school_owner').setValidators([Validators.required]);
          this.eventForm.get('school_owner').updateValueAndValidity();
        }

        if (validateBy === 'false') {
          this.hideSchoolName = false;
          this.eventForm.get('school_owner').clearValidators();
          this.eventForm.get('school_owner').updateValueAndValidity();
        }
      }
    )


  }

  testClick() {
  }

  /**
   * Form init
   */
  buildForm() {
    const defaultPerformance = [];
    const defaultAge_Group = [];
    const defaultDance_Style = [];
    this.eventForm = this.fb.group({
      Performance   : this.fb.array(this.Performance.map(x => defaultPerformance.indexOf(x) > -1)),
      Age_Group : this.fb.array(this.Age_Group.map(x => defaultAge_Group.indexOf(x) > -1)),
      Dance_Style: this.fb.array(this.Dance_Style.map(x => defaultDance_Style.indexOf(x) > -1)),
      'school_name' : ['', [Validators.required]],
      'member' : '',
      'school_owner' : [''],
      'school_address' : ['', [Validators.required]],
      'team_member' : this.fb.array([]),
    });

  }

  convertToValue(key: string) {
    return this.eventForm.value[key].map((x, i) => x && this[key][i]).filter(x => !!x);
  }

  /**
   * More Agenda Item push to Form
   */
  memberItem(val: string) {
    return new FormGroup({
      name: new FormControl(val, Validators.required),
      email: new FormControl(val, Validators.compose([Validators.min(1), Validators.required, FormValidation.validEmail ])),
      phone: new FormControl(val, Validators.required),
      dob: new FormControl(val , Validators.compose([ Validators.required, FormValidation.dwcValidDOB]))
    })
  }

  pushMember() {
    const control = <FormArray>this.eventForm.controls['team_member'];
    control.push(this.memberItem(''));
  }

 


// dwc_event_reg_success
  submitForm(value) {
    this.isPeformanceSelected = this.checkAtLeastOneSelection(this.Performance, 'people');
    this.isAgeGroupSelected = this.checkAtLeastOneSelection(this.Age_Group, 'age');
    this.isDanceStyle = this.checkAtLeastOneSelection(this.Dance_Style, 'dance');
    if (this.eventForm.valid) {
      this.valueStore = Object.assign({}, this.eventForm.value, {
        Performance: this.convertToValue('Performance'),
        Age_Group: this.convertToValue('Age_Group'),
        Dance_Style: this.convertToValue('Dance_Style')
      });
      if (this.isPeformanceSelected && this.isAgeGroupSelected && this.isDanceStyle) {
        this.policySubmit(value);
      }
    }
  }

  checkAtLeastOneSelection(arr, elem) {
    for (let i = 0; i < arr.length; i++) {
      const isChecked = (<HTMLInputElement>document.getElementById(elem + '-' + i)).checked;
      if (isChecked === true) {
        return true;
      }
      if (i >= (arr.length - 1)) {
        return false;
      }
    }
  }

  policySubmit(value) {
    const form = {
      schoolName: value.school_name,
      schoolOwner: value.school_owner,
      address: value.school_address,
      performance: this.valueStore.Performance,
      ageGroup: this.valueStore.Age_Group,
      danceStyle: this.valueStore.Dance_Style,
      member: Boolean(value.member),
      teamates: value.team_member
    }
    this.store.dispatch({ type: EventActions.DWC_EVENT_REG, payload: form});

    this.store.select('eventTags')
      .first(profile => profile['dwc_event_reg_success'] === true )
      .subscribe( data => {
        this.router.navigateByUrl('/dwc/payment');
      });
  }

}
