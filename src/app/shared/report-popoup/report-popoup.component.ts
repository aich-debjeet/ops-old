import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../../shared/modal/modal.component.service';
import { SharedActions } from '../../actions/shared.action';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs/Subscription';
import {SharedModal, initialSharedTags} from '../../models/shared.model';

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

  constructor(
    private fb: FormBuilder,
    public modalService: ModalService,
    private _store: Store<any>,
  ) {
      this.profileThankYou = false;
      this.mediaState$ = _store.select('mediaStore');
      this.thirdSubscription = this.mediaState$.subscribe((state) => {
        if (state['reports']) {
          console.log(state)
          this.reportQues = state['reports'];
        }
      });
      this.sharedStates$ = _store.select('sharedTags');
      this.secondSubscription = this.sharedStates$.subscribe((state)=> {
        console.log('initailstate', this.sharedStore)
        this.sharedStore = state;
        if(state !== undefined){
          console.log(state);
          if(state['report']){
            this.reportQues = state['report'];
          }
        }
      })
   }

  ngOnInit() {
    this.buildForm();
    // console.log(this.reportContentId)
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
    console.log(data)
    this._store.dispatch({ type: SharedActions.POST_SELECTED_OPTION, payload: data });
  }
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
