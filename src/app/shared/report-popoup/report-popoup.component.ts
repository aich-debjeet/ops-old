import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ModalService } from '../../shared/modal/modal.component.service';
import { SharedActions } from '../../actions/shared.action';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-report-popoup',
  templateUrl: './report-popoup.component.html',
  providers:[ModalService],
  styleUrls: ['./report-popoup.component.scss']
})
export class ReportPopoupComponent implements OnInit {
  @Input() reportQues;
  @Input() reportContentId;
  @Input() reportType;
  @Output() onclose: EventEmitter<any> = new EventEmitter<any>();
  public repPop: FormGroup;
  profileThankYou: boolean;
  describe: boolean = false;
  imageLink: string = environment.API_IMAGE;

  constructor(
    private fb: FormBuilder,
    public modalService: ModalService,
    private _store: Store<any>,
  ) {
      this.profileThankYou = false;
// console.log(this.reportQues)
   }

  ngOnInit() {
    this.buildForm();
    // console.log(this.reportContentId)
  }

  buildForm(): void {
    this.repPop = this.fb.group({
      repOption: ['', [Validators.required]],
      desc: ''
    });
  }
  submitForm(value) {
    // this.onclose.emit();
    this.profileThankYou = true;
    // this.modalService.open('thankYou');

    const data = {
      reportType: this.reportType,
      reportContentId: this.reportContentId,
      reason: value.repOption,
      description: value.desc || '',
    }
    // console.log(data)
    this._store.dispatch({ type: SharedActions.GET_REPORT_OPTIONS, payload: data });
  }
  closeThankyou() {
    this.profileThankYou = false;
    this.onclose.emit();
  }
  onSelectionChange(que){
    // console.log(que)
    if(que === 'Other issues'){
      this.describe = true;
    } else {
      this.describe = false;
    }
  }

}
