import { Component, OnInit } from '@angular/core';
import { NgxCarousel, NgxCarouselStore } from 'ngx-carousel';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UtcDatePipe } from './../../../pipes/utcdate.pipe';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';

// Model
import { EventModal, initialTag  } from '../../../models/event.model';

// action
import { EventActions } from '../../../actions/event.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-events-landing',
  templateUrl: './events-landing.component.html',
  styleUrls: ['./events-landing.component.scss']
})
export class EventsLandingComponent implements OnInit {
  date = new Date();
  day: any;
  tomorrow: any;
  weekend: any;
  carouselOne: NgxCarousel;
  tagState$: Observable<EventModal>;
  eventList = initialTag ;

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
    this.tagState$.subscribe((state) => {
      this.eventList = state['event_list'];
      // console.log(this.eventList);
    });
    // this.store.dispatch({ type: EventActions.EVENT_LIST });



  

    this.route
      .queryParams
      .subscribe(params => {

        // Defaults to 0 if no query param provided.
        if (params['cate']) {
          this.filterStatus = params['cate'];
          console.log(params['cate']);
        }
        this.serachApi();
        console.log(this.myQueryParms);
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

    



  //  this.route.params.subscribe(params => {
  //    console.log(params['category']);
  //   });


    this.carouselOne = {
      grid: {xs: 3, sm: 3, md: 3, lg: 3, all: 0},
      slide: 1,
      speed: 4000,
      interval: 400000,
      custom: 'banner',
      point: {
        visible: false,
        pointStyles: `
          .ngxcarouselPoint {
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
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.55);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngxcarouselPoint li.active {
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

  /* This will be triggered after carousel viewed */
  afterCarouselViewedFn(data) {
    // console.log(data);
  }

  /* It will be triggered on every slide*/
  onmoveFn(data: NgxCarouselStore) {
    // console.log(data);
  }


}
