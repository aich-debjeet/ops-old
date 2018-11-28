import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UtcDatePipe } from './../../../pipes/utcdate.pipe';
import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

// Model
import { EventModal, initialTagEve  } from '../../../models/event.model';
import { Modal } from '../../../shared/modal-new/Modal';

// action
import { EventActions } from '../../../actions/event.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ModalService } from '../../../shared/modal/modal.component.service';

import { TruncatePipe } from 'app/pipes/truncate.pipe';
import { BookmarkActions } from 'app/actions/bookmark.action';

@Component({
  selector: 'app-events-inner',
  templateUrl: './events-inner.component.html',
  styleUrls: ['./events-inner.component.scss'],
  providers: [ TruncatePipe ],
  // encapsulation: ViewEncapsulation.None,
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
  @ViewChild('reportModal') reportModal: Modal;

  constructor(
    private route: ActivatedRoute,
    private store: Store<EventModal>,
    private toastr: ToastrService,
    private router: Router,
    public modalService: ModalService,
    private _location: Location,
  ) {
    this.tagState$ = this.store.select('eventTags');
    this.tagState$.subscribe((state) => {
      this.eventDetail = state['event_detail'];
      this.attendeeList = state['attendee_load'];
      // console.log(this.eventDetail)
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
        // this.router.navigateByUrl('/event');
        // this._location.back();
        this.router.navigate(['/event'], { queryParams: { status: 'created' } });
        this.toastr.success('The Event has been deleted successfully', '', {
          timeOut: 3000
        });
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
    } else {
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

  /**
   * method to open report pop-up with options for event 
   * @param id to open specific report model
   */
  reportModalOpen(id: string) {
    this.reportId = id;
    this.reportModal.open();
    this.store.dispatch({ type: SharedActions.GET_OPTIONS_REPORT, payload: 'event' });
  }

  bookmarkAction(action: string, eventId: string) {
    if (action === 'add') {
      const reqBody = {
        bookmarkType: 'event',
        contentId: eventId
      };
      this.store.dispatch({ type: BookmarkActions.BOOKMARK, payload: reqBody });
      const bookmarkSub = this.store.select('bookmarkStore')
      .take(2)
      .subscribe(data => {
        if (data['bookmarking'] === false && data['bookmarked'] === true) {
          this.toastr.success('Bookmarked successfully', 'Success!');
          this.store.dispatch({ type: EventActions.EVENT_BOOKAMRK_FLAG_UPDATE, payload: { isBookmarked: true } });
          bookmarkSub.unsubscribe();
        }
      });
    } else {
      const reqBody = {
        type: 'event',
        id: eventId
      };
      this.store.dispatch({ type: BookmarkActions.DELETE_BOOKMARK, payload: reqBody });
      const bookmarkSub = this.store.select('bookmarkStore')
      .take(2)
      .subscribe(data => {
        if (data['deletingBookmark'] === false && data['deletedBookmark'] === true) {
          this.toastr.success('Bookmark deleted successfully', 'Success!');
          this.store.dispatch({ type: EventActions.EVENT_BOOKAMRK_FLAG_UPDATE, payload: { isBookmarked: false } });
          bookmarkSub.unsubscribe();
        }
      });
    }
  }
}
