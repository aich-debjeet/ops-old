import { Component, OnInit, OnDestroy, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import {IDatePickerConfig} from 'ng2-date-picker';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';
import { DatePipe,Location } from '@angular/common';
import { EventValidator, FormValidation } from '../../../helpers/event.validator';
import {Moment} from 'moment';
import { Modal } from '../../../shared/modal-new/Modal';
import { QuillEditorComponent } from 'ngx-quill/src/quill-editor.component';
import Quill from 'quill';

import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';



// Model
import { EventModal, initialTagEve  } from '../../../models/event.model';
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
  industryList = initialTagEve ;
  image: any;
  eventCoverImage ='';
  minDate = new Date();
  dateExpires;
  baseUrl = environment.API_IMAGE;
  imageUpld: boolean;
  id: any;
  private sub: any;
  eventDetail: any;
  eventCover: File;
  eventTypeList: any;
  invalidDate: boolean = false;
  requiredAgenda: boolean = false;
    // Address --
    address: string;
    country: string;
    state: string;
    postalCode: string;
    city: string;

    imageChangedEvent = '';
    croppedImage = '';
    hidePreview = false;
    disableSave = true;
    fileUploadingData: any;

  datePickerConfig: IDatePickerConfig = {
    firstDayOfWeek: 'mo',
    // format: 'YYYY-MM-DDThh:mmTZD',
    disableKeypress: false,
    showSeconds: true
  };

  private configDateTime = {
    locale: 'en',
    format: 'DD/MM/YYYY',
    // min: moment().format('MM/DD/YYYY'),
    // closeOnSelect: true,
    disableKeypress: 'Disabled',
    returnedValueType: 'Moment'

  };

  config: IDatePickerConfig = {
    locale: 'en',
    showSeconds: false
  };

  process: number[] = [];
  fileData: File;
  userHandle: any;
  @ViewChild('imageUpload') imageUpload: Modal;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  // Rich Text editor toolbar
  defaultModules = {
    toolbar: [
      ['bold', 'underline'],
      ['link']
    ]
  };

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
    private _location: Location,
  ) {

    this.tagState$ = this.store.select('eventTags');
    this.tagState$.subscribe((state) => {
      this.industryList = state['all_industry'];
      this.eventDetail = state['event_detail'];
      this.eventTypeList = state['eventType_load'];
    });
    this.store.dispatch({ type: EventActions.GET_EVENT_TYPE });
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
  // go back to the page
  // isClosed(event: any) {
  //   this._location.back();
  // }

  /**
   * File Change Binder
   * @param  $event
   */

  fileChangeListener(event: any): void {
    this.disableSave = false;
    this.imageChangedEvent = event;
    // const data = new FormData();

    // if ($event.target.files.length > 0) {
    //   const randm = Math.random().toString(36).slice(2);
    //   const fileName = 'prof_' + randm + '.' + 'jpg';

    //   let file = $event.target.files[0];

    //   const data = new FormData();
    //   data.append('file', file, fileName );

    //   // Display the key/value pairs

    //   // Upload files
    //   // this.uploadCoverImage(data);
    //   this.fileUploadingData = data;
    // }


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

  imageCropped(image: string) {
    this.croppedImage = image;
    this.hidePreview = true;
  }

  openModel(){
    if(this.eventCoverImage === ''){
      this.croppedImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
    }
    this.imageUpload.open();
  }

   /**
   * Upload Cover image
   */
  uploadCoverImage() {
    const imageData = {
      handle: this.userHandle,
      image: this.croppedImage.split((/,(.+)/)[1])
    };
    this.disableSave = true;
    this.store.dispatch({ type: EventActions.FILE_UPLOAD, payload: imageData });

    this.store.select('eventTags')
      .first(file => file['fileupload_success'] === true )
      .subscribe( data => {
        this.eventCoverImage = data['fileUpload'][0].repoPath;
        this.imageUpload.close();
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
      'event_startdate' : ['', [Validators.required, FormValidation.datevalidation, this.dateCompare.bind(this), this.validDate.bind(this)]],
      'event_enddate' : ['', [Validators.required, FormValidation.oldEndDatevalidation, this.dateComparision.bind(this), this.validDate.bind(this)]],
      'access': '0',
      'event_type': 'Free',
      'event_agenda' : this.fb.array([this.agendaItem()]),
      // 'event_ts_type' : this.fb.array(
      //   [this.ticketItem('')]
      // ),
      'event_brief' : ['', [Validators.required]],
      'ts_startTime': ['', [Validators.required, FormValidation.datevalidation, this.tickeSellStartDate.bind(this)]],
      'ts_endTime': ['', [Validators.required, FormValidation.oldEndDatevalidation, this.tickeSellEndDate.bind(this),this.ticketSellDateComparision.bind(this)]],
      'ts_quantity': ['', [Validators.required]]
    }, {
      // validators: [FormValidation.endateValidation]
    })

  }

  dateComparision(control: AbstractControl){
    if (control.value === '') {
      return null;
    } else {
      const startDate = this.eventForm.controls['event_startdate'].value.split('-').reverse().join('-');
      // const startDate = AC.get('event_startdate').value.split('-').reverse().join('-');
      const endData = control.value.split('-').reverse().join('-');
      const startSelect = moment(startDate).format('YYYYMMDD');
      const endSelect = moment(endData).format('YYYYMMDD');
      if (endSelect < startSelect && !isNaN(Number(startSelect))) {
        // console.log('validating')
        // console.log('validating',startSelect)
        return { endDateLess: true };
      } else {
        return null;
      }
    }

  }
  validDate(control: AbstractControl){
    if (control.value === '') {
      this.invalidDate = false;
      return null;
    } else {
      if(!moment(control.value, "DD-MM-YYYY", true).isValid()){
        // console.log('invalid');
        this.invalidDate = true;
      } else {
        this.invalidDate = false;
      }
    }    
  }

  dateCompare(control: AbstractControl){
    if (control.value === '') {
      return null;
    } else {
      const endData = this.eventForm.controls['event_enddate'].value.split('-').reverse().join('-');
      // const startDate = AC.get('event_startdate').value.split('-').reverse().join('-');
      const startDate = control.value.split('-').reverse().join('-');
      const startSelect = moment(startDate).format('YYYYMMDD');
      const endSelect = moment(endData).format('YYYYMMDD');
      if (startSelect > endSelect && !isNaN(Number(startSelect))) {
        // console.log('validating')
        // console.log('validating',startSelect)
        return { endDateLess: true };
      } else {
        return null;
      }
    }

  }

  agendaDateComp(control: AbstractControl){
    if (control.value === '' || control.value === undefined) {
      // console.log('undefined')
      return null;
    } else {
      const startDate = this.eventForm.controls['event_startdate'].value.split('-').reverse().join('-');
      const endtDate = this.eventForm.controls['event_enddate'].value.split('-').reverse().join('-');
      const startSelect = moment(startDate).format('YYYYMMDD');
      const endSelect = moment(endtDate).format('YYYYMMDD');
      const date = control.value.split(' ');
      const agenda = date[0].split('-').reverse().join('-');
      const agendaDate = moment(agenda).format('YYYYMMDD');
      // console.log(agendaDate)
      if(agendaDate < startSelect || agendaDate > endSelect){
        // console.log(agendaDate)
        return {invalidAgendDate: true};
      } else {
        return null;;
      }
    }

  }

  ticketSellDateComparision(control: AbstractControl){
    if (control.value === '') {
      return;
    }
    const startDate = this.eventForm.controls['ts_startTime'].value.split('-').reverse().join('-');
    // const startDate = AC.get('event_startdate').value.split('-').reverse().join('-');
    const endData = control.value.split('-').reverse().join('-');
    const startSelect = moment(startDate).format('YYYYMMDD');
    const endSelect = moment(endData).format('YYYYMMDD');
    if (endSelect < startSelect) {
      return { ticketendDateLess: true };
    }
    return null;
  }

  tickeSellStartDate(control: AbstractControl) {
    if (control.value === '') {
      return;
    }
    const endDateEvent = this.eventForm.controls['event_enddate'].value.split('-').reverse().join('-');
    // const startDate = AC.get('event_startdate').value.split('-').reverse().join('-');
    const startDateTick = control.value.split('-').reverse().join('-');
    const startTick = moment(startDateTick).format('YYYYMMDD');
    const endEvent = moment(endDateEvent).format('YYYYMMDD');
    if (startTick > endEvent) {
      return { eventClosed: true };
    }
    return null;
  }

  tickeSellEndDate(control: AbstractControl) {
    if (control.value === '') {
      return;
    }
    const startDate = this.eventForm.controls['event_startdate'].value.split('-').reverse().join('-');
    // const startDate = AC.get('event_startdate').value.split('-').reverse().join('-');
    const endData = control.value.split('-').reverse().join('-');
    const startSelect = moment(startDate).format('YYYYMMDD');
    const endSelect = moment(endData).format('YYYYMMDD');
    if (endSelect > startSelect) {
      return { ticketsClosed: true };
    }
    return null;
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
        //  console.log(place)

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
        this.address = place.name + ', '+place.formatted_address;
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
  agendaItem() {
    return this.fb.group({
      startTime: ['',[Validators.required, this.agendaDateComp.bind(this)]],
      description: ['', [Validators.required]]
    })
  }

  pushAgenda() {
    const control = <FormArray>this.eventForm.controls['event_agenda'];
    control.push(this.agendaItem());
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
    if (this.eventForm.valid) {
      let event_agenda = [];
      if (this.eventCoverImage === '') {
        this.imageUpld = true;
        return;
      }
      if(value.event_agenda.length <= 0){
        this.requiredAgenda = true;
        return;
      } else {
        for(let i in value.event_agenda) {
          let agenda = {
            description: '',
            startTime: ''
          }
          agenda.description = value.event_agenda[i].description;
          agenda.startTime = this.parseDate(value.event_agenda[i].startTime);
          event_agenda.push(agenda);
        }
      }
      this.imageUpld = false;
      const data = {
          title : value.event_name,
          access :  Number(value.access),
          active : true,
          isFeatured: false,
          eventTiming: {
            startDate : this.reverseDate(value.event_startdate) + 'T00:00:00.001',
            endDate : this.reverseDate(value.event_enddate) + 'T23:59:59.000',
          },
          venue : {
            location: this.address,
            latitude: this.latitude.toString(),
            longitude: this.longitude.toString(),
          },
          event_agenda: event_agenda,
          extras: {
            coverImage: this.eventCoverImage,
            ticket: [{
              startDate: this.reverseDate(value.ts_startTime) + 'T00:00:00.001',
              endDate: this.reverseDate(value.ts_endTime) + 'T23:59:59.000',
              maximum: value.ts_quantity
            }]
          },
          brief: value.event_brief,
          industry : [
              value.event_industry
          ],
          Type: {
            entryType : value.event_type,
            eventType : value.event_genres
          }
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
  parseDate(string){
    let parsedDate;
    const date = string.split(' ');
    parsedDate = date[0].split('-').reverse().join('-') + 'T' + date[1];
    return parsedDate;
  }
  imageLoaded(){}

}

