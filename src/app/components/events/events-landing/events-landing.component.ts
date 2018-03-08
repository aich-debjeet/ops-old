import { Component, OnInit, OnDestroy } from '@angular/core';
import { NguCarousel } from '@ngu/carousel';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UtcDatePipe } from './../../../pipes/utcdate.pipe';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';

// Model
import { EventModal, initialTag  } from '../../../models/event.model';

// action
import { EventActions } from '../../../actions/event.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-events-landing',
  templateUrl: './events-landing.component.html',
  styleUrls: ['./events-landing.component.scss']
})
export class EventsLandingComponent implements OnInit, OnDestroy {
  date = new Date();
  day: any;
  tomorrow: any;
  weekend: any;
  carouselOne: NguCarousel;
  tagState$: Observable<EventModal>;
  eventList = initialTag ;
  eventType: any;
  baseUrl = environment.API_IMAGE;
  private subscription: ISubscription;

  category: string;
  myQueryParms: any;

  filterStartDate: string;
  filterEndDate: string;
  filterLocation: string;
  filterStatus: string;
  filterSearchText: string;
  filterEventType: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<EventModal>
  ) {
    this.tagState$ = this.store.select('eventTags');
    this.subscription = this.tagState$.subscribe((state) => {
      this.eventList = state['event_list'];
      this.eventType = state['event_type'];
    });
    // this.store.dispatch({ type: EventActions.EVENT_LIST });

    this.store.dispatch({ type: EventActions.EVENT_TYPE_LOAD });

    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        if (params['status']) {
          this.filterStatus = params['status'];
        }
        this.serachApi();
      });


    // day
    this.day =  moment().format();
    this.tomorrow = moment().add('days', 1);
    this.weekend = moment().weekday(5);

    this.myQueryParms = {
      startDate:  this.filterStartDate || '',
      endDate: this.filterEndDate || '',
      location: this.filterLocation || '',
      status: this.filterStatus || '',
      searchText: this.filterSearchText || '',
      eventType: this.filterEventType || '',
    }
  }

  ngOnInit() {
    this.carouselOne = {
      grid: {xs: 3, sm: 3, md: 3, lg: 3, all: 0},
      slide: 1,
      speed: 4000,
      interval: 400000,
      custom: 'banner',
      point: {
        visible: false,
        pointStyles: `
          .ngucarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            bottom: 20px;
            left: 0;
            box-sizing: border-box;
          }
          .ngucarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.55);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngucarouselPoint li.active {
              background: white;
              width: 10px;
          }
        `
      },
      load: 2,
      loop: false,
      touch: true
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  serachApi() {
    const data = {
      startDate: '',
      endDate: '',
      location: '',
      status: this.filterStatus || '',
      searchText: '',
      eventType: '',
      offset: 0,
      limit: 50,
    }

    this.store.dispatch({ type: EventActions.EVENT_SEARCH, payload: data });
  }

}
