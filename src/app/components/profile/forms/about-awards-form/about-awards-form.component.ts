import { Component, OnInit, Input ,Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import {DatabaseValidator } from '../../../../helpers/form.validator';
import { GeneralUtilities } from '../../../../helpers/general.utils';
import {Moment} from 'moment';
import { FormValidation } from '../../../../helpers/form.validator';

// import {Month} from '../../../../models/profile.model'
import * as moment from 'moment';

@Component({
  selector: 'app-about-awards-form',
  templateUrl: './about-awards-form.component.html',
  styleUrls: ['./about-awards-form.component.scss']
})
export class AboutAwardsFormComponent implements OnInit {

  awardForm: FormGroup;
  imageBaseUrl = environment.API_IMAGE;
  _awardDetails: any;
  private mm : string ;
  private monthNumber: number;
  checkbox: boolean;
  hide = false;
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
  @Input('awardDetails') set setAwardFormData(value) {
    this._awardDetails = value;
    if (this._awardDetails.formType === 'edit') {
      this.privacy = this._awardDetails.data.access
      this.buildAwardForm(this._awardDetails.data);
    } else {
      this.privacy = 0;
      this.buildAwardForm(null);
    }
  };
  constructor(
    private fb: FormBuilder,
    private databaseValidator: DatabaseValidator,
    private generalUtils: GeneralUtilities
  ) { }

  ngOnInit() {
    this.getMonth();
    this.getYear();
  }
  getMonth(){
    const today = moment().month();
    // console.log(today.getMonth());
    this.monthNumber = today +1;     
    if(this.monthNumber<10) {
    this.mm = '0' + this.monthNumber;        
    }
   }

  getYear(){
    this.yy = moment().year();      
    for(let i = (this.yy-100); i <= this.yy; i++){
      this.years.push(i);
    }
  }

  buildAwardForm(data:any){
    this.awardForm = this.fb.group({
      presenter : [this.generalUtils.checkNestedKey(data, ['organizationName']) ? data['organizationName'] : '', [Validators.required]],
      title : [this.generalUtils.checkNestedKey(data, ['role']) ? data['role'] : '', [Validators.required]],
      date : [this.generalUtils.checkNestedKey(data, ['from']) ? this.removeTime(data['from']) : '', [Validators.required, FormValidation.validWorkFromDate]],
      // from_month : [this.generalUtils.checkNestedKey(data, ['from']) ? data['from'] : '', [Validators.required], this.databaseValidator.validWorkFromDate.bind(this.databaseValidator)],
      // from_year:'',
      id : this.generalUtils.checkNestedKey(data, ['id']) ? data['id'] : '',
      publicWork: this.generalUtils.checkNestedKey(data, ['access']) ? data['access'] : '0',
    })
  }

  awardFormSubmit(value){
    
    if ( this.awardForm.valid === true ) {
      let body;      
      if (this._awardDetails.formType === 'create') {
        body = {
          'role': value.title,
          'organizationName': value.presenter,
          'workOrAward': 'awards',
          'from': this.reverseDate(value.date) + 'T05:00:00',
          'access': Number(this.privacy)
        }
      } 
      if (this._awardDetails.formType === 'edit') {
          body = {
          'role': value.title,
          'organizationName': value.presenter,
          'workOrAward': 'awards',
          'from': this.reverseDate(value.date) + 'T05:00:00',
          'access': Number(this.privacy),
          'id': value.id,
        }
      }
      this.formSubmitted.emit(body);
    }
  }
  reverseDate(string) {
    return string.split('-').reverse().join('-');
  }

  closeForm(data: any){
    this.closeForms.emit(data);    
  }
  removeTime(dateTime:string){
    let dateAndTime = dateTime.split('T')
    // console.log(s.split('T'))
    let date = dateAndTime[0];
    // console.log(d);
    return date.split('-').reverse().join('-');
  }
  choosePrivacy(val: number){
    this.privacy = val;
  }
}
