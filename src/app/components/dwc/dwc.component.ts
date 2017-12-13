import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import { Register, UserTag, initialTag, AuthModel, RightBlockTag } from '../../models/auth.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Modal } from '../../shared/modal-new/Modal';


// Action
import { AuthActions } from '../../actions/auth.action'

@Component({
  selector: 'app-dwc',
  templateUrl: './dwc.component.html',
  styleUrls: ['./dwc.component.scss']
})
export class DwcComponent implements OnInit {
  public eventForm: FormGroup;
  valueStore: any;
  Performance = ['Solo', 'Couple/Trio', 'Group'];
  Age_Group = ['Mini - 9 years and under', 'Junior section - 17 years and under', 'Children – 13 years and under', 'Senior section - 25 years and under']
  Dance_Style = ['Classical Ballet', 'National, Folklore, Character', 'Modern, Contemporary', 'Jazz and show dance', 'Hip Hop, Street Dance and Commercial', 'Song and Dance', 'Tap', 'Fusion Ballet'];
  @ViewChild('dwcModal') DwctypeModal: Modal;
  constructor(
    private fb: FormBuilder,
    private store: Store<AuthModel>,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.buildForm();
    this.loadScript('https://js.instamojo.com/v1/button.js');
    this.pushMember()
    console.log(this.Performance);
  }

  testClick() {
    console.log('onclick');
  }

  loadScript(url) {
    const node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
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
      'member' : ['', [Validators.required]],
      'school_owner' : ['', [Validators.required]],
      'school_address' : ['', [Validators.required]],
      'teammates_Name': ['', [Validators.required]],
      'teammates_Email': ['', [Validators.required]],
      'teammates_Phone': ['', [Validators.required]],
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
    this.valueStore = Object.assign({}, this.eventForm.value, {
      Performance: this.convertToValue('Performance'),
      Age_Group: this.convertToValue('Age_Group'),
      Dance_Style: this.convertToValue('Dance_Style'),
    });
    console.log(this.valueStore);
    if (this.eventForm.valid) {
      // const form = {
      //   schoolName: value.school_name,
      //   schoolOwner: value.school_owner,
      //   address: value.school_address,
      //   category: value.school_category,
      //   teamates: value.school_teammates,
      // }
      this.DwctypeModal.open();
      this.loadScript('https://js.instamojo.com/v1/button.js');
      // Plz enable this code after payment implementation
      // this.store.dispatch({ type: AuthActions.DWC_EVENT_REG, payload: form});
      // this.router.navigateByUrl('/profile/user');
    }
  }

  policySubmit(value) {
    console.log(value);
    const form = {
        schoolName: value.school_name,
        schoolOwner: value.school_owner,
        address: value.school_address,
        // category: value.school_category,
        // teamates: value.school_teammates,
        // otherInformation: value.otherInformation,
        // ageGroup: value.age_group,
        // danceCategory: value.category_dance,
        performance: this.valueStore.Performance,
        ageGroup: this.valueStore.Age_Group,
        danceStyle: this.valueStore.Dance_Style,
        member: value.member,
        teamates: {
          name: value.teammates_Name,
          email: value.teammates_Name,
          phone: value.teammates_Name,
          // Object.assign({}, this.eventForm.value, {
          //   Performance: this.convertToValue('Performance'),
          //   Age_Group: this.convertToValue('Age_Group'),
          //   Dance_Style: this.convertToValue('Dance_Style'),
          // });
        },
      }
      console.log(form)
    this.router.navigateByUrl('/profile/user');
    this.store.dispatch({ type: AuthActions.DWC_EVENT_REG, payload: form});
  }

}
