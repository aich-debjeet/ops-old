import { Component, OnInit, Input ,Output, EventEmitter} from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgControl } from '@angular/forms';
import {DatabaseValidator } from '../../../../helpers/form.validator';
import { GeneralUtilities } from '../../../../helpers/general.utils';
import {Moment} from 'moment';
import { FormValidation } from '../../../../helpers/form.validator';

// import {Month} from '../../../../models/profile.model'
import * as moment from 'moment';

@Component({
  selector: 'app-about-work-form',
  templateUrl: './about-work-form.component.html',
  styleUrls: ['./about-work-form.component.scss']
})
export class AboutWorkFormComponent implements OnInit {
  workForm: FormGroup;
  imageBaseUrl = environment.API_IMAGE;
  _workDetails: any;
  private mm : string ;
  private monthNumber: number;
  hide: boolean =false;
  privacy: number;
  public dateMask = [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  months = [
    { val: '01',  name: 'Jan' },
    { val: '02',  name: 'Feb' },
    { val: '03',  name: 'Mar' },
    { val: '04',  name: 'Apr' },
    { val: '05',  name: 'May' },
    { val: '06',  name: 'Jun' },
    { val: '07',  name: 'Jul' },
    { val: '08',  name: 'Aug' },
    { val: '09',  name: 'Sep' },
    { val: '10',  name: 'Oct' },
    { val: '11',  name: 'Nov' },
    { val: '12',  name: 'Dec' }
];
private years: number[] =[];
private yy : number;

  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeForms: EventEmitter<any> = new EventEmitter<any>();
  // @Input() set disableControl( hide : boolean ) {
  //   const action = hide ? 'disable' : 'enable';
  //   this.ngControl.control[action]();
  // }
  @Input('workDetails') set setWorkFormData(value) {
    this._workDetails = value;
    if (this._workDetails.formType === 'edit') {
      this.privacy = this._workDetails.data.access
      this.buildWorkForm(this._workDetails.data);
    } else {
      this.privacy = 0;
      this.buildWorkForm(null);
    }
  };
  constructor(
    private fb: FormBuilder,
    private databaseValidator: DatabaseValidator,
    private generalUtils: GeneralUtilities,
    // private ngControl : NgControl
  ) { }

  ngOnInit() {
    // this.getMonth();
    // this.getYear();
  }
  // getMonth(){
  //   const today = moment().month();
  // console.log(today.getMonth());
  //   this.monthNumber = today +1;     
  //   if(this.monthNumber<10) {
  //   this.mm = '0' + this.monthNumber;        
  //   }
  //  }

  // getYear(){
  //   this.yy = moment().year();      
  //   for(let i = (this.yy-100); i <= this.yy; i++){
  //     this.years.push(i);
  //   }
  // }

  buildWorkForm(data:any){
    this.workForm = this.fb.group({
      company : [this.generalUtils.checkNestedKey(data, ['organizationName']) ? data['organizationName'] : '', [Validators.required]],
      position : [this.generalUtils.checkNestedKey(data, ['role']) ? data['role'] : '', [Validators.required]],
      from : [this.generalUtils.checkNestedKey(data, ['from']) ? this.removeTime(data['from']) : '', [Validators.required, FormValidation.validWorkFromDate]],
      // from_year:'',
      // to_month:'',
      to : [this.generalUtils.checkNestedKey(data, ['to']) ? this.removeTime(data['to']) : '', [FormValidation.validWorkToDate]],
      currentWork : this.generalUtils.checkNestedKey(data, ['currentlyWith']) ? data['currentlyWith'] : false,
      id : this.generalUtils.checkNestedKey(data, ['id']) ? data['id'] : '',
      // publicWork: this.generalUtils.checkNestedKey(data, ['access']) ? data['access'] : '0',
    },
    {
      validator: FormValidation.toFieldEmpty
    })
  }

  workFormSubmit(value){
    if ( this.workForm.valid === true ) {
      let body;      
      if (this._workDetails.formType === 'create') {
        if (!this.hide ||! this.workForm.controls['currentWork']) {
          body = {
            'role': value.position,
            'organizationName': value.company,
            'workOrAward': 'work',
            'from': this.reverseDate(value.from) + 'T05:00:00',
            'to': this.reverseDate(value.to) + 'T05:00:00',
            'currentlyWith': Boolean(value.currentWork),
            'access': Number(this.privacy)
          }
        } else {
           body = {
            'role': value.position,
            'organizationName': value.company,
            'workOrAward': 'work',
            'from': this.reverseDate(value.from) + 'T05:00:00',
            'currentlyWith': Boolean(value.currentWork),
            'access': Number(this.privacy)
          }
        }
      } 
      if (this._workDetails.formType === 'edit') {
        
        if (!this.hide || !this.workForm.controls['currentWork']) {
           body = {
            'role': value.position,
            'organizationName': value.company,
            'workOrAward': 'work',
            'from': this.reverseDate(value.from) + 'T05:00:00',
            'to': this.reverseDate(value.to) + 'T05:00:00',
            'currentlyWith': Boolean(value.currentWork),
            'access': Number(this.privacy),
            'id': value.id,
          }
        } else {
           body = {
            'role': value.position,
            'organizationName': value.company,
            'workOrAward': 'work',
            'from': this.reverseDate(value.from) + 'T05:00:00',
            'currentlyWith': Boolean(value.currentWork),
            'access': Number(this.privacy),
            'id': value.id,
          }
        }
      }
      this.formSubmitted.emit(body);
    }
    // else {
    //     const invalid = [];
    //     const controls = this.workForm.controls;
    //     for (const name in controls) {
    //         if (controls[name].invalid) {
    //             invalid.push(name);
    //         }
    //     }
    //     // console.log(invalid);
    // }
  }

  reverseDate(string) {
    return string.split('-').reverse().join('-');
  }

  removeTime(dateTime:string){
    let dateAndTime = dateTime.split('T')
    // console.log(s.split('T'))
    let date = dateAndTime[0];
    // console.log(d);
    return date.split('-').reverse().join('-');
  }

  closeForm(data: any){
    this.closeForms.emit(data);    
  }
  onCheckboxChange(val) {
      if(val == true){
        this.hide = true;
        this.workForm.patchValue({
          // to_month:'',
          // to_year:''
          to: null,
        })
      }
      if(val == false){
        this.hide = false;
        this.workForm.patchValue({
          // to_month:'JANUA',
          // to_year:'1231'
          to: this._workDetails.data['to'] ? this.removeTime(this._workDetails.data['to']) : '' ,
        })
      }
  }
  choosePrivacy(val: number){
    this.privacy = val;
  }
}
