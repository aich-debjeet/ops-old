import { Component, OnInit, OnDestroy, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import {IDatePickerConfig} from 'ng2-date-picker';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';
import { DatePipe } from '@angular/common';
import { EventValidator, FormValidation } from '../../../helpers/event.validator';
import {Moment} from 'moment';

import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';



// Model
import { EventModal, initialTag  } from '../../../models/event.model';
import { ProfileModal } from '../../../models/profile.model';

// action
import { EventActions } from '../../../actions/event.action';
import { ProfileActions } from '../../../actions/profile.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { environment } from './../../../../environments/environment';

import * as moment from 'moment';


@Component({
  selector: 'app-events-create',
  templateUrl: './events-create.component.html',
  styleUrls: ['./events-create.component.scss'],
  providers: [DatePipe, EventValidator]
})
export class EventsCreateComponent implements OnInit, OnDestroy {
  public eventForm: FormGroup;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  tagState$: Observable<EventModal>;
  profileState$: Observable<ProfileModal>;
  today = Date.now();
  industryList = initialTag ;
  image: any;
  eventCoverImage: any;
  minDate = new Date();
  dateExpires;
  baseUrl = environment.API_IMAGE;
  imageUpload: boolean;
  id: any;
  private sub: any;
  eventDetail: any;
  eventCover: File;

    // Address --
    address: string;
    country: string;
    state: string;
    postalCode: string;
    city: string;

  datePickerConfig: IDatePickerConfig = {
    firstDayOfWeek: 'mo',
    // format: 'YYYY-MM-DDThh:mmTZD',
    disableKeypress: false,
    showSeconds: true
  };

  private configDateTime = {
    locale: 'en',
    format: 'DD/MM/YYYY hh:mm A',
    min: moment().format('MM/DD/YYYY'),
    closeOnSelect: true,
    disableKeypress: 'Disabled',
    returnedValueType: 'Moment'

  };

  config: IDatePickerConfig = {
    locale: 'en'
  };

  process: number[] = [];
  fileData: File;
  userHandle: any;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private fb: FormBuilder,
    private store: Store<EventModal>,
    private route: ActivatedRoute,
    private router: Router,
    private Upload: NgxfUploaderService,
    private datePipe: DatePipe,
    private eventValidator: EventValidator,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) {

    this.tagState$ = this.store.select('eventTags');
    this.tagState$.subscribe((state) => {
      this.industryList = state['all_industry'];
      this.eventDetail = state['event_detail'];
    });

    this.store.dispatch({ type: EventActions.GET_ALL_INDUSTRY });
  }

  ngOnInit() {
    // load stuffs
    this.store.select('profileTags')
    .first(profile => profile['profile_navigation_details'].handle )
    .subscribe( data => {
      this.userHandle = data['profile_cards'].active.handle;
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.store.dispatch({ type: EventActions.EVENT_DETAILS_LOAD, payload: this.id });
    });

    // Form Build
    this.buildForm();
    this.getLocationGoogle();
  }

  /**
   * File Change Binder
   * @param  $event
   */

  fileChangeListener($event) {
    const data = new FormData();

    if ($event.target.files.length > 0) {
      const randm = Math.random().toString(36).slice(2);
      const fileName = 'prof_' + randm + '.' + 'jpg';

      let file = $event.target.files[0];

      const data = new FormData();
      data.append('file', file, fileName );

      // Display the key/value pairs

      // Upload files
      this.uploadCoverImage(data);
    }


    // const image: any = new Image();
    // const file: File = $event.target.files[0];
    // const myReader: FileReader = new FileReader();
    // const that = this;
    // let val: any;

    // myReader.onloadend = function (loadEvent: any) {
    //   image.src = loadEvent.target.result;
    //   val = loadEvent.target.result;
    //   that.image = loadEvent.target.result;
    //   that.uploadCoverImage(loadEvent.target.result);
    // };

    // myReader.readAsDataURL(file);
  }

   /**
   * Upload Cover image
   */
  uploadCoverImage(fileObj) {
    const imageData = {
      handle: this.userHandle,
      image: fileObj
    };

    this.store.dispatch({ type: EventActions.FILE_UPLOAD, payload: imageData });

    this.store.select('eventTags')
      .first(file => file['fileupload_success'] === true )
      .subscribe( data => {
        this.eventCoverImage = data['fileUpload'][0].repoPath
      });
  }


  ngOnDestroy() {
      this.sub.unsubscribe();
  }

  /**
   * Init Form Action
   */
  buildForm() {
    this.eventForm = this.fb.group({
      'event_name' : ['', [Validators.required]],
      'event_genres': ['', [Validators.required]],
      'event_industry': ['', [Validators.required]],
      'event_venue': ['', [Validators.required]],
      'event_startdate' : ['', [Validators.required, FormValidation.datevalidation]],
      'event_enddate' : ['', [Validators.required, FormValidation.oldEndDatevalidation]],
      'access': '0',
      'event_type': 'Free',
      'event_agenda' : this.fb.array([]),
      // 'event_ts_type' : this.fb.array(
      //   [this.ticketItem('')]
      // ),
      'event_brief' : ['', [Validators.required]],
      'ts_startTime': ['', [Validators.required]],
      'ts_endTime': ['', [Validators.required]],
      'ts_quantity': ['', [Validators.required]]
    }, {
      validators: [FormValidation.endateValidation]
    })

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

    /**
   * Location find from google
   */
  getLocationGoogle() {
    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    // create search FormControl
    this.searchControl = new FormControl();

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

        for (let i = 0; i < place.address_components.length; i++) {
          const addressType = place.address_components[i].types[0];
          if (componentForm[addressType]) {
            const val = place.address_components[i][componentForm[addressType]];
            if ( addressType === 'country') {
              this.country = val;
            }
            if ( addressType === 'postal_code') {
              this.postalCode = val;
            }
            if ( addressType === 'locality') {
              this.city = val
            }
            if ( addressType === 'administrative_area_level_1') {
              this.state = val
            }
          }
        }

        // verify result
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        // set latitude, longitude and zoom
        this.address = place.formatted_address;
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 12;
      });
    });
    });
  }

  // this.eventValidator.datevalidation.bind(this.eventValidator)

  /**
   * More Agenda Item push to Form
   */
  agendaItem(val: string) {
    return new FormGroup({
      startTime: new FormControl(val, Validators.required),
      description: new FormControl(val, Validators.required)
    })
  }

  pushAgenda() {
    const control = <FormArray>this.eventForm.controls['event_agenda'];
    control.push(this.agendaItem(''));
  }

  pushTicket() {
    const control = <FormArray>this.eventForm.controls['event_ts_type'];
    control.push(this.ticketItem(''));
  }

  /**
   * More Ticket Item push to Form
   */
  ticketItem(val: string) {
    return new FormGroup({
      name: new FormControl(val, Validators.required),
      price: new FormControl(val, Validators.required),
      quantity: new FormControl(val),
      ticketQuantiy: new FormControl(val, Validators.required),
      ticketType: new FormControl(val)
    })
  }


  /**
   * Event Creatation Sybmit
   * @param value value of form
   */
  submitForm(value) {
    console.log(this.eventForm.valid)
    if (this.eventForm.valid) {
      if (this.eventCoverImage === '') {
        this.imageUpload = true;
        console.log(this.imageUpload)
        return
      }
      this.imageUpload = false;
      const data = {
          title : value.event_name,
          access :  Number(value.access),
          active : true,
          isFeatured: false,
          eventTiming: {
            startDate : this.reverseDate(value.event_startdate) + 'T05:00:00',
            endDate : this.reverseDate(value.event_enddate) + 'T05:00:00',
          },
          venue : {
            location: value.event_venue
          },
          event_agenda: value.event_agenda,
          extras: {
            Genre: [value.event_genres],
            ticket: [{
              startDate: this.reverseDate(value.ts_startTime) + 'T05:00:00',
              endDate: this.reverseDate(value.ts_endTime) + 'T05:00:00',
              maximum: value.ts_quantity
            }]
          },
          brief: value.event_brief,
          industry : [
              value.event_industry
          ],
          Type: {
            EntryType : value.event_type,
          },
          event_media: [this.eventCoverImage]
      }

      // Dispatch to form value to server
      this.store.dispatch({ type: EventActions.EVENT_REG, payload: data });

      this.store.select('eventTags')
        .first(regevent => regevent['event_create_success'] === true )
        .subscribe( reg => {
          const id = reg['event_id'];
          this.router.navigate(['/event/inner/' + id]);
        });
    }
  }

  /**
   * Date put to reverse formate
   */
  reverseDate(string) {
    return string.split('-').reverse().join('-');
  }

}

