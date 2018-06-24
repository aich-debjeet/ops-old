import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ModalService } from '../../shared/modal/modal.component.service';

@Component({
  selector: 'app-report-popoup',
  templateUrl: './report-popoup.component.html',
  providers:[ModalService],
  styleUrls: ['./report-popoup.component.scss']
})
export class ReportPopoupComponent implements OnInit {
  @Input() reportQues;
  @Input() reportContentId;
  @Output() onclose: EventEmitter<any> = new EventEmitter<any>();
  public repPop: FormGroup;
  profileThankYou: boolean;
  describe: boolean = false;

  constructor(
    private fb: FormBuilder,
    public modalService: ModalService
  ) {
this.profileThankYou = false;
console.log(this.reportQues)
   }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.repPop = this.fb.group({
      repOption: ['', [Validators.required]],
      desc: ''
    });
  }
  submitForm(value){
    console.log(value);
    // this.onclose.emit();
    this.profileThankYou = true;
    // this.modalService.open('thankYou');

    const data = {
      reportType:'profile',
      reportContentId: this.reportContentId,
      reason: value.repOption,
      description: value.desc || '',
    }
    console.log(data)
  }
  closeThankyou(){
    this.profileThankYou = false;
    this.onclose.emit();
  }
  onSelectionChange(que){
    console.log(que)
    if(que === 'Other issues'){
      this.describe = true;
    } else {
      this.describe = false;
    }
  }

}
