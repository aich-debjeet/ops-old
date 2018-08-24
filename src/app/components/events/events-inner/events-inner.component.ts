import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UtcDatePipe } from './../../../pipes/utcdate.pipe';
import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Model
import { EventModal, initialTagEve  } from '../../../models/event.model';

// action
import { EventActions } from '../../../actions/event.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ModalService } from '../../../shared/modal/modal.component.service';

import { TruncatePipe } from 'app/pipes/truncate.pipe';

@Component({
  selector: 'app-events-inner',
  templateUrl: './events-inner.component.html',
  styleUrls: ['./events-inner.component.scss'],
  providers: [ TruncatePipe ]
})
export class EventsInnerComponent implements OnInit, OnDestroy {
  id: any;
  private sub: any;
  totalTicket: any = 0;
  totalAmount: any = 0;
  tagState$: Observable<EventModal>;
  eventDetail: any ;
  baseUrl = environment.API_IMAGE;
  eventTag: any;
  isAttend: boolean;
  attendeeList: any;
  reportId: string;
  questions: any;
  reportType: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<EventModal>,
    private toastr: ToastrService,
    private router: Router,
    public modalService: ModalService,
  ) {
    this.tagState$ = this.store.select('eventTags');
    this.tagState$.subscribe((state) => {
      this.eventDetail = state['event_detail'];
      this.attendeeList = state['attendee_load'];
      // console.log(this.eventDetail)
      if (state['reports']) {
        this.questions = state['reports'];
        this.reportType = 'event';
        // console.log(this.questions)
      }
    });

    // Event tag
    this.store.select('eventTags')
      .first(attend => attend['event_detail'])
      .subscribe( data => {
        if (data['event_detail']) {
          this.isAttend = data['event_detail'].isGoing;
        }
      });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.loadDetail();
    });
  }

  totalCountChange(value) {
    // if (this.totalTicket > 0) {
      this.totalTicket += value.count
      this.totalAmount += value.amount
    // }
  }

  deleteEvent(id: string){
    // console.log(id)
    this.store.dispatch({ type: EventActions.EVENT_DELETE, payload: id });
    this.store.select('eventTags')
      .first(state => state['event_del_success'] === true)
      .subscribe( datas => {
        this.router.navigateByUrl('/event');
        this.toastr.success('The Event has been deleted successfully');
      });
  }
  loadDetail() {
    this.store.dispatch({ type: EventActions.EVENT_DETAILS_LOAD, payload: this.id });
    this.store.dispatch({ type: EventActions.EVENT_ATTENDEE_LOAD, payload: this.id });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  attendEvent() {
    if (this.isAttend) {
      this.isAttend = false;
      const data = {
        id: this.id,
        status: 'NotGoing'
      }
      this.updateAttend(data);
    }else {
      this.isAttend = true;
      const data = {
        id: this.id,
        status: 'Going'
      }
      this.updateAttend(data);
    }
  }

  updateAttend(data) {
    this.store.dispatch({ type: EventActions.EVENT_ATTEND, payload: data });
  }

 reportModalOpen(id: string){
    // console.log(id)
    this.reportId = id;
   this.modalService.open('reportPopUp');
   this.store.dispatch({ type: EventActions.EVENT_REPORT, payload: 'event' });
 }

 closeReport(){
  // console.log('comming')
  this.modalService.close('reportPopUp');
}

}
