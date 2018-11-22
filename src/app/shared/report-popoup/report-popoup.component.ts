import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../shared/modal/modal.component.service';
import { SharedActions } from '../../actions/shared.action';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs/Subscription';
import {SharedModal, initialSharedTags} from '../../models/shared.model';
import { ToastrService } from 'ngx-toastr';

// rx
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-report-popoup',
  templateUrl: './report-popoup.component.html',
  providers: [ModalService],
  styleUrls: ['./report-popoup.component.scss']
})
export class ReportPopoupComponent implements OnInit, OnDestroy {
  @Input() reportQues;
  @Input() reportContentId;
  @Input() reportType;
  @Output() onclose: EventEmitter<any> = new EventEmitter<any>();
  thirdSubscription: Subscription;
  secondSubscription: Subscription;
  public repPop: FormGroup;
  profileThankYou: boolean;
  describe: boolean = false;
  imageLink: string = environment.API_IMAGE;
  mediaState$: Observable<any>;
  sharedStates$: Observable<SharedModal>;
  sharedStore = initialSharedTags;
  openThankYou: boolean = false;

  constructor(
    private fb: FormBuilder,
    public modalService: ModalService,
    private _store: Store<any>,
    private toastr: ToastrService,
  ) {
      this.profileThankYou = false;
      this.mediaState$ = _store.select('mediaStore');
      this.thirdSubscription = this.mediaState$.subscribe((state) => {
        if (state['reports']) {
          this.reportQues = state['reports'];
        }
      });
      /**
       * observing state changes for shared model
       */
      this.sharedStates$ = _store.select('sharedTags');
      this.secondSubscription = this.sharedStates$.subscribe((state)=> {
        this.sharedStore = state;
        if(typeof state !== 'undefined'){
          if(state['report']){
            this.reportQues = state['report'];
          }
          if(state['report_failed'] && state['report_failed'].length > 0){
            this.toastr.error('You have already reported');
          }
          if(state['rep_success'] === true && state['report_success'].Success){
            if(this.openThankYou){
              this.profileThankYou = true;
              this.openThankYou = false;
            }
          }
        }
      })
   }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    this.thirdSubscription.unsubscribe();
  }

  buildForm(): void {
    this.repPop = this.fb.group({
      repOption: ['', [Validators.required]],
      desc: ''
    });
  }
  /**
   * 
   * @param value Method invoked after submiting selected option for reporting
   */
  submitForm(value) {
    this.openThankYou = true;
    const data = {
      reportType: this.reportType,
      reportContentId: this.reportContentId,
      reason: value.repOption,
      description: value.desc || '',
    }
    this._store.dispatch({ type: SharedActions.POST_SELECTED_OPTION, payload: data });
  }

  /**
   * closure method for Thank you Modal
   */
  closeThankyou() {
    this.profileThankYou = false;
    this.onclose.emit();
  }
  onSelectionChange(que) {
    // console.log(que)
    if (que === 'Other issues') {
      this.describe = true;
    } else {
      this.describe = false;
    }
  }

}
