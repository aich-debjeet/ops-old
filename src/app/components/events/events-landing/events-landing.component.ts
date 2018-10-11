import { Component, OnInit, OnDestroy, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NguCarousel } from '@ngu/carousel';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import {IDatePickerConfig} from 'ng2-date-picker';
import { EventModal  } from '../../../models/event.model';
import { EventActions } from '../../../actions/event.action';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { TruncatePipe } from 'app/pipes/truncate.pipe';

@Component({
  selector: 'app-events-landing',
  templateUrl: './events-landing.component.html',
  styleUrls: ['./events-landing.component.scss'],
  providers: [ TruncatePipe ]
})
export class EventsLandingComponent implements OnInit, OnDestroy {
  public locForm: FormGroup;
  date = new Date();
  day: any;
  tomorrow: any;
  weekend: any;
  carouselOne: NguCarousel;
  eventTypeSlider: NguCarousel;
  tagState$: Observable<EventModal>;
  eventList: any;
  eventType: any;
  eventTypeList: any;
  baseUrl = environment.API_IMAGE;
  private subscription: ISubscription;
  industryList: any;
  category: string;
  myQueryParms: any;
  bannerList: any;

  filterStartDate: string;
  filterEndDate: string;
  filterLocation: string;
  filterStatus: string;
  filterSearchText: string;
  filterEventType: any;

  public latitude: number;
  public longitude: number;
  // public searchControl: FormControl;
  public zoom: number;
      // Address --
  address: string;
  country: string;
  state: string;
  postalCode: string;
  city: string;
  event_loading = true;
  scrollId: any;
  locPop = false;
  selectedDate: any;

  sum = 10;
  total_pages = 10;
  scrolling = 0;
  scrollingLoad = 800;

  dayStatus: string;
  calendar = false;

  config: IDatePickerConfig = {
    locale: 'en'
  };

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<EventModal>,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private fb: FormBuilder,
  ) {
    this.tagState$ = this.store.select('eventTags');
    this.subscription = this.tagState$.subscribe((state) => {
      if (state['event_list'] && state.event_loaded === true) {
        this.eventList = state['event_list'];
        this.scrollId = state['event_scroll_id']
        this.eventTypeList = state['event_filter']
        // console.log(this.eventTypeList)
        // console.log(this.eventList, this.scrollId)
      }
      this.eventType = state['event_type'];
      // this.eventTypeList = state['eventType_load'];
      this.bannerList = state['bannerload']
      this.event_loading = state['event_loading']
    });
    // this.store.dispatch({ type: EventActions.EVENT_LIST });

    // this.store.dispatch({ type: EventActions.GET_ALL_INDUSTRY });

    this.store.dispatch({ type: EventActions.GET_EVENT_TYPE });

    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        if (params['status']) {
          this.filterStatus = params['status'];
          // this.filterEventType = '';
          // this.filterStartDate = '';
          // this.filterLocation = '';
          // this.filterEndDate = '';
          // this.dayStatus = '';
          window.scrollTo(0,0);
          this.scrollingLoad = 800;
        }
        if (!params['status']) {
          this.filterStatus = 'recommended';
          // this.filterEventType = '';
          // this.filterLocation = '';
          // this.filterStartDate = '';
          // this.filterEndDate = '';
          // this.dayStatus = '';
        }
        this.filterEventType = '';
        this.filterStartDate = '';
        this.filterLocation = '';
        this.filterEndDate = '';
        this.dayStatus = '';
        this.serachApi();
      });


    // day
    this.day =  moment().format();
    this.tomorrow = moment().add('days', 1).format();
    this.weekend = moment().weekday(6).format();

    // this.myQueryParms = {
    //   startDate:  this.filterStartDate || '',
    //   endDate: this.filterEndDate || '',
    //   location: this.filterLocation || '',
    //   status: this.filterStatus || '',
    //   searchText: this.filterSearchText || '',
    //   eventType: this.filterEventType || '',
    // }
  }

  ngOnInit() {
    this.store.dispatch({ type: EventActions.BANNER_SEARCH});
    this.dayStatus = '';
    this.carouselOne = {
      grid: {xs: 1, sm: 1, md: 2, lg: 2, all: 0},
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
    this.eventTypeSlider = {
      grid: { xs: 2, sm: 3, md: 7, lg: 7, all: 0 },
      slide: 2,
      speed: 400,
      interval: 4000,
      point: {
        visible: false
      },
      load: 1,
      touch: true,
      loop: false,
      custom: 'banner'
    }
    this.buildForm();
    this.getLocationGoogle();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  calendarPop() {
    // console.log('calendar')
    if (!this.calendar) {
      this.calendar = true;
    } else {
      this.calendar = false;
    }
  }

  serachApi() {
    // const data = {
    //   startDate: this.filterStartDate || '',
    //   endDate: this.filterEndDate || '',
    //   location: this.filterLocation || '',
    //   status: this.filterStatus || '',
    //   searchText: '',
    //   eventType: this.filterEventType || '',
    //   offset: 0,
    //   limit: 50,
    // }
    let data;
    if (this.filterEventType === '' && (this.filterStartDate === '' && this.filterEndDate === '')) {
       data = {
        scrollId: '',
        searchType: this.filterStatus,
        searchText: this.filterLocation || '',
        filtersMap: []
      }
      // console.log(data)
    }
    if (this.filterEventType !== ''  && (this.filterStartDate === '' && this.filterEndDate === '')) {
       data = {
        scrollId: '',
        searchType: this.filterStatus,
        searchText: this.filterLocation || '',
        filtersMap: [
          {
            key: 'EVENT_TYPE',
            value: this.filterEventType.name
          }
        ]
      }
      // console.log(data)
    }
    if (this.filterEventType === '' && (this.filterStartDate !== '' && this.filterEndDate !== '')) {
      data = {
        scrollId: '',
        searchType: this.filterStatus,
        searchText: this.filterLocation || '',
        filtersMap: [
          {
            key: 'START_DATE',
            value: this.filterStartDate + 'Z'
          },
          {
            key: 'END_DATE',
            value: this.filterEndDate + 'Z'
          }
        ]
      }
      // console.log(data)
    }
    if (this.filterEventType !== '' && (this.filterStartDate !== '' && this.filterEndDate !== '')) {
      data = {
        scrollId: '',
        searchType: this.filterStatus,
        searchText: this.filterLocation || '',
        filtersMap: [
          {
            key: 'EVENT_TYPE',
            value: this.filterEventType.name
          },
          {
            key: 'START_DATE',
            value: this.filterStartDate + 'Z'
          },
          {
            key: 'END_DATE',
            value: this.filterEndDate + 'Z'
          }
        ]
      }
      //  console.log(data)
    }
    this.store.dispatch({ type: EventActions.EVENT_SEARCH, payload: data });
  }

  filter(filter: any) {
    this.filterEventType = filter;
    if (this.filterEventType) {
      this.serachApi();
    }
  }

  filterDate(date: any, filterDay: string) {
    if (date) {
      this.dayStatus = filterDay;
      if (filterDay === 'weekend') {
        let startDate = date.split('T');
        this.filterStartDate = startDate[0] + 'T00:00:00.001';
        let x = moment(date).add('days', 1).format();
        let endDate = x.split('T');
        this.filterEndDate = endDate[0] + 'T23:59:59.000';
        this.serachApi();
      } else {
        let d = date.split('T');
        this.filterStartDate  = d[0] + 'T00:00:00.001';
        this.filterEndDate = d[0] + 'T23:59:59.000';
        this.serachApi();
      }
    }
  }

  buildForm() {
    this.locForm = this.fb.group({
      'location': ['']
    })

  }

  onDateChange(event) {
    // console.log(event)
    // console.log(event._d)
    if (event !== undefined) {
      const d = moment(event._d).format('YYYY-MM-DD')
      this.filterStartDate  = d + 'T00:00:00.001';
      this.filterEndDate = d + 'T23:59:59.000';
      this.serachApi();
    }
  }


      /**
   * Location find from google
   */
  getLocationGoogle() {
    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    // create search FormControl
    // this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    });
    const componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'long_name',
      country: 'long_name',
      postal_code: 'short_name'
    };

    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        // get the place result
        const place: google.maps.places.PlaceResult = autocomplete.getPlace();
// console.log(place)
        // for (let i = 0; i < place.address_components.length; i++) {
        //   const addressType = place.address_components[i].types[0];
        //   if (componentForm[addressType]) {
        //     const val = place.address_components[i][componentForm[addressType]];
        //     if ( addressType === 'country') {
        //       this.country = val;
        //     }
        //     if ( addressType === 'postal_code') {
        //       this.postalCode = val;
        //     }
        //     if ( addressType === 'locality') {
        //       this.city = val
        //     }
        //     if ( addressType === 'administrative_area_level_1') {
        //       this.state = val
        //     }
        //   }
        // }

        // verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        // set latitude, longitude and zoom
        this.address = place.formatted_address;
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 12;

        if (this.address !== '') {
          this.filterLocation = this.address;
          this.serachApi();
        }
      });
    });
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  openDropbox() {
    if (this.locPop) {
      this.locPop = false;
      this.locForm.reset();
    } else {
      this.locPop = true;
    }
  }
  reset() {
    this.locForm.patchValue({
      location: ''
    });
  }
  manualSearch(value: string) {
    this.filterLocation = value;
    this.serachApi();
  }
  onScroll(e) {
     console.log(e)
    this.scrolling = e.currentScrollPosition;
    // console.log(this.scrolling)
    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 800
      const data = {
        searchType: this.filterStatus,
        scrollId: this.scrollId,
      }
      this.store.dispatch({ type: EventActions.EVENT_SEARCH, payload: data });
    }
  }
}
