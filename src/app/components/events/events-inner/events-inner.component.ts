import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UtcDatePipe } from './../../../pipes/utcdate.pipe';
import { environment } from './../../../../environments/environment';

// Model
import { EventModal, initialTag  } from '../../../models/event.model';

// action
import { EventActions } from '../../../actions/event.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-events-inner',
  templateUrl: './events-inner.component.html',
  styleUrls: ['./events-inner.component.scss']
})
export class EventsInnerComponent implements OnInit, OnDestroy {
  id: any;
  private sub: any;
  totalTicket: any = 0;
  totalAmount: any = 0;
  tagState$: Observable<EventModal>;
  eventDetail: any ;
  baseUrl = environment.API_IMAGE;

  constructor(
    private route: ActivatedRoute,
    private store: Store<EventModal>,
  ) {
    this.tagState$ = this.store.select('eventTags');
    this.tagState$.subscribe((state) => {
      this.eventDetail = state['event_detail'];
      console.log(this.eventDetail);
    });

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.loadDetail();
    });

    console.log(this.id);
  }

  totalCountChange(value) {
    console.log(this.totalTicket)
    // if (this.totalTicket > 0) {
      this.totalTicket += value.count
      this.totalAmount += value.amount
    // }
  }

  loadDetail() {
    this.store.dispatch({ type: EventActions.EVENT_DETAILS_LOAD, payload: this.id });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  attendEvent() {
    this.store.dispatch({ type: EventActions.EVENT_ATTEND, payload: this.id });
  }

}
