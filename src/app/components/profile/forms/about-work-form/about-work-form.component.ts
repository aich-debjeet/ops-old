import { Component, OnInit, Input ,Output, EventEmitter} from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import {DatabaseValidator } from '../../../../helpers/form.validator';
import { GeneralUtilities } from '../../../../helpers/general.utils';
import {Moment} from 'moment';

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
  @Input('workDetails') set setWorkFormData(value) {
    this._workDetails = value;
    console.log(value);
    if (this._workDetails.formType === 'edit') {
      this.buildWorkForm(this._workDetails.data);
      console.log('edit');
    } else {
      this.buildWorkForm(null);
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

  buildWorkForm(data:any){
    console.log(data)
    this.workForm = this.fb.group({
      company : [this.generalUtils.checkNestedKey(data, ['organizationName']) ? data['organizationName'] : '', [Validators.required]],
      position : [this.generalUtils.checkNestedKey(data, ['role']) ? data['role'] : '', [Validators.required]],
      from_month : [this.generalUtils.checkNestedKey(data, ['from']) ? data['from'] : '', [Validators.required], this.databaseValidator.validWorkFromDate.bind(this.databaseValidator)],
      from_year:'',
      to_month:'',
      to_year : [this.generalUtils.checkNestedKey(data, ['to']) ? data['to'] : '' , [Validators.required], this.databaseValidator.validWorkToDate.bind(this.databaseValidator)],
      currentWork : this.generalUtils.checkNestedKey(data, ['currentlyWith']) ? data['currentlyWith'] : false,
      id : this.generalUtils.checkNestedKey(data, ['id']) ? data['id'] : '',
      publicWork: this.generalUtils.checkNestedKey(data, ['access']) ? data['access'] : '0',
    })
  }

  workFormSubmit(value){
    console.log(value)
    // this.formSubmitted.emit(value);
  }

  closeForm(data: any){
    console.log(data);
    console.log('closing');
    this.closeForms.emit(data);    
  }
  onCheckboxChange(val) {
      if(val == true){
        this.hide = true;
        this.workForm.patchValue({
          to_month:'',
          to_year:''
        })
      }
      if(val == false){
        this.hide = false;
        this.workForm.patchValue({
          to_month:'JANUA',
          to_year:'1231'
        })
      }
  }
}
