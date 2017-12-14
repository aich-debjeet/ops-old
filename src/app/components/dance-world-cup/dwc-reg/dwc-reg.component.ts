import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Register, UserTag, initialTag, AuthModel, RightBlockTag, danceWorldTag, Dwc } from '../../../models/auth.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Modal } from '../../../shared/modal-new/Modal';
import { ToastrService } from 'ngx-toastr';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// Action
import { EventActions } from '../../../actions/event.action'

@Component({
  selector: 'app-dwc-reg',
  templateUrl: './dwc-reg.component.html',
  styleUrls: ['./dwc-reg.component.scss']
})
export class DwcRegComponent implements OnInit {

  err = false;
  tagState$: Observable<Dwc>;
  private tagStateSubscription: Subscription;
  public eventForm: FormGroup;
  valueStore: any;
  Performance = ['Solo', 'Couple/Trio', 'Group'];
  Age_Group = ['Mini - 9 years and under', 'Junior section - 17 years and under', 'Children – 13 years and under', 'Senior section - 25 years and under']
  Dance_Style = ['Classical Ballet', 'National, Folklore, Character', 'Modern, Contemporary', 'Jazz and show dance', 'Hip Hop, Street Dance and Commercial', 'Song and Dance', 'Tap', 'Fusion Ballet'];
  @ViewChild('dwcModal') DwctypeModal: Modal;
  constructor(
    private fb: FormBuilder,
    private store: Store<AuthModel>,
    private router: Router,
    private toastr: ToastrService,
    private _store: Store<Dwc>
    ) {
  this.tagState$ = _store.select('eventTags')
  this.tagState$.subscribe((state) => {
    console.log(state)
    if (state['err_msg'] === 'Bad Request' && !this.err) {
      this.err = true;
      this.toastr.error('You Have Already applied')
    }
  })
  }

  ngOnInit() {
    this.buildForm();
    this.pushMember();
  }

  testClick() {
    console.log('onclick');
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
    console.log(key)
    console.log(this.eventForm.value)
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
    console.log(value)
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
        this.router.navigateByUrl('/danceworldcup/payment');
      });
  }

}
