import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Register, UserTag, initialTag, AuthModel, RightBlockTag, danceWorldTag, Dwc } from '../../../models/auth.model';
import { ProfileModal, initialTag as profileTag, UserCard, ProfileCards } from '../../../models/profile.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Modal } from '../../../shared/modal-new/Modal';
import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// Action
import { EventActions } from '../../../actions/event.action'
import { Profile } from 'selenium-webdriver/firefox';
import { NgxCarousel, NgxCarouselStore } from 'ngx-carousel';

@Component({
  selector: 'app-dwc-reg',
  templateUrl: './dwc-reg.component.html',
  styleUrls: ['./dwc-reg.component.scss']
})
export class DwcRegComponent implements OnInit {

  err = false;
  tagState$: Observable<Dwc>;
  profileState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  public eventForm: FormGroup;
  isAuthed: boolean;
  valueStore: any;
  Performance = ['Solo', 'Couple/Trio', 'Group'];
  Age_Group = ['Mini - 9 years and under', 'Junior section - 17 years and under', 'Children – 13 years and under', 'Senior section - 25 years and under']
  Dance_Style = ['Classical Ballet', 'National, Folklore, Character', 'Modern, Contemporary', 'Jazz and show dance', 'Hip Hop, Street Dance and Commercial', 'Song and Dance', 'Tap', 'Fusion Ballet'];
  @ViewChild('dwcModal') DwctypeModal: Modal;
  dwcSlider: NgxCarousel;
  constructor(
    private fb: FormBuilder,
    private store: Store<AuthModel>,
    private __store: Store<ProfileModal>,
    private router: Router,
    private toastr: ToastrService,
    private _store: Store<Dwc>
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
        // console.log(state)
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
  }

  testClick() {
    // console.log('onclick');
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
      'school_owner' : ['', [Validators.required]],
      'school_address' : ['', [Validators.required]],
      'team_member' : this.fb.array([]),
      // 'event_agenda' : this.fb.array([]),
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
      email: new FormControl(val, Validators.required),
      phone: new FormControl(val, Validators.required)
    })
  }

  pushMember() {
    const control = <FormArray>this.eventForm.controls['team_member'];
    control.push(this.memberItem(''));
  }


// dwc_event_reg_success
  submitForm(value) {
    // console.log(value)
    this.valueStore = Object.assign({}, this.eventForm.value, {
      Performance: this.convertToValue('Performance'),
      Age_Group: this.convertToValue('Age_Group'),
      Dance_Style: this.convertToValue('Dance_Style')
    });
    if (this.eventForm.valid) {
      this.policySubmit(value);
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
        this.router.navigateByUrl('/post?event=dwc');
      });
  }

}
