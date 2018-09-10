import { Component, OnInit, OnDestroy, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray, NgControl } from '@angular/forms';
import {IDatePickerConfig} from 'ng2-date-picker';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';
import { DatePipe } from '@angular/common';
import { EventValidator, FormValidation } from '../../../helpers/event.validator';
import {Moment} from 'moment';
import { ToastrService } from 'ngx-toastr';

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
  selector: 'app-events-edit',
  templateUrl: './events-edit.component.html',
  styleUrls: ['./events-edit.component.scss'],
  providers: [DatePipe, EventValidator]
})
export class EventsEditComponent implements OnInit {
  public eventForm: FormGroup;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  tagState$: Observable<EventModal>;
  profileState$: Observable<ProfileModal>;
  today = Date.now();
  industryList = [];
  image: any;
  eventCoverImage ='';
  minDate = new Date();
  dateExpires;
  baseUrl = environment.API_IMAGE;
  imageUpload: boolean;
  id: any;
  private sub: any;
  eventDetail: any;
  eventCover: File;
  textEdit = true;
  eventTypeList: any;
  bldForm: boolean = false;

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

  // Rich Text editor toolbar
  defaultModules = {
    toolbar: [
      ['bold', 'underline'],
      ['link']
    ]
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
    private toastr: ToastrService,
    private store: Store<EventModal>,
    private route: ActivatedRoute,
    private router: Router,
    private Upload: NgxfUploaderService,
    private datePipe: DatePipe,
    private eventValidator: EventValidator,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
  ) {
      this.eventForm = this.fb.group({
      'event_name' :['',[Validators.required]],
      'event_genres': ['',[Validators.required]],
      'event_industry': ['',[Validators.required]],
      'event_venue': ['',[Validators.required]],
      'event_startdate' : ['', [Validators.required, FormValidation.datevalidation, this.dateCompare.bind(this)]],
      'event_enddate' : ['',[Validators.required, FormValidation.oldEndDatevalidation, this.dateComparision.bind(this)]],
      'access': '0',
      'event_type': 'Free',
      'event_agenda' : this.fb.array([this.agendaItem()]),
      'event_brief' :['', [Validators.required]],
      'ts_startTime': ['',[Validators.required, FormValidation.datevalidation]],
      'ts_endTime': ['',[Validators.required, FormValidation.oldEndDatevalidation]],
      'ts_quantity': ['', [Validators.required]]
    })
    this.tagState$ = this.store.select('eventTags');
    this.tagState$.subscribe((state) => {
      if (state) {
        if (state['all_industry']) {
          this.industryList = state['all_industry'];
        }
        if (state['eventType_load']) {
          this.eventTypeList = state['eventType_load'];
        }
        // console.log('state', state);
        if (state['event_detail']) {
          // console.log('event_detail available', state['event_detail']);
          this.eventDetail = state['event_detail'];
          if (!this.bldForm) {
            this.buildForm(state);
            this.getLocationGoogle();
            this.bldForm = true;
          }
        }
      }
      // this.eventDetail = state['event_detail'];
      // console.log(this.eventDetail)
      // this.buildForm();
    });
    // this.store.select('eventTags')
    // .first(state => state['event_detail'] !== 'undefined' )
    // .subscribe( data => {
    //   this.eventDetail = data['event_detail']
    //   //  console.log(this.eventDetail)
    //   if(!this.bldForm){
    //     this.buildForm(data);
    //     this.getLocationGoogle();
    //     this.bldForm = true;
    //   }

    // });
    // this.store.dispatch({ type: EventActions.GET_EVENT_TYPE });
    // this.store.dispatch({ type: EventActions.GET_ALL_INDUSTRY });
   }

  ngOnInit() {
    window.scrollTo(0, 0);
    // this.buildForm();
    // this.getLocationGoogle();
    this.store.select('profileTags')
    .first(profile => profile['profile_navigation_details'].handle )
    .subscribe( data => {
      this.userHandle = data['profile_cards'].active.handle;
    });
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (params['id'] && params['id'].length > 0) {
        this.loadDetail();
      }
    });
    // this.sub = this.route.params.subscribe(params => {
    //   this.id = params['id'];
    //   this.loadDetail();
    // });

  }

  loadDetail() {
    console.log('loadDetail', this.id);
    this.store.dispatch({ type: EventActions.EVENT_DETAILS_LOAD, payload: this.id });
    this.store.dispatch({ type: EventActions.GET_EVENT_TYPE });
    this.store.dispatch({ type: EventActions.GET_ALL_INDUSTRY });
  }

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
  buildForm(data: any) {
    console.log('in buildForm', data)
    // this.eventAgenda(data['event_detail']);
    this.eventForm = this.fb.group({
      'event_name' :[data['event_detail']['title'],[Validators.required]],
      'event_genres': [data['event_detail']['Type']['eventType'],[Validators.required]],
      'event_industry': [data['event_detail']['industry'][0],[Validators.required]],
      'event_venue': [data['event_detail']['venue']['location'],[Validators.required]],
      'event_startdate' : [this.removeTime(data['event_detail']['eventTiming']['startDate']), [Validators.required, FormValidation.datevalidation, this.dateCompare.bind(this)]],
      'event_enddate' : [this.removeTime(data['event_detail']['eventTiming']['endDate']),[Validators.required, FormValidation.oldEndDatevalidation, this.dateComparision.bind(this)]],
      'access': '0',
      'event_type': 'Free',
      'event_agenda' : this.fb.array(this.eventAgenda(data['event_detail'])),
      // 'event_ts_type' : this.fb.array(
      //   [this.ticketItem('')]
      // ),
      'event_brief' :[data['event_detail']['brief'], [Validators.required]],
      'ts_startTime': [this.removeTime(data['event_detail']['extras']['ticket'][0]['startDate']),[Validators.required, FormValidation.datevalidation]],
      'ts_endTime': [this.removeTime(data['event_detail']['extras']['ticket'][0]['endDate']),[Validators.required, FormValidation.oldEndDatevalidation]],
      'ts_quantity': [data['event_detail']['extras']['ticket'][0]['maximum'], [Validators.required]]
    }, {
      // validators: [FormValidation.endateValidation]
    })
    this.eventCoverImage = this.eventDetail.extras.coverImage

  }
  // eventAgenda(data){
  //   let newFormGroup = [];
  //   for (let i = 0; i < data['event_agenda'].length; i++){
  //     let fg = this.fb.group({
  //       startTime: [data['event_agenda'][i].startTime],
  //       description: [data['event_agenda'][i].description]
  //     });
  //     newFormGroup.push(fg);
  //     if (i >= (data['event_agenda'].length - 1)) {
  //       return newFormGroup;
  //     }
  //   }
  // }

  eventAgenda(data){
    if(data['event_agenda'] !== undefined){
      // console.log('not undefined')
      let newFormGroup = [];
      for (let i = 0; i < data['event_agenda'].length; i++){
        let fg = this.fb.group({
          startTime: [data['event_agenda'][i].startTime,[Validators.required, this.agendaDateComp.bind(this)]],
          description: [data['event_agenda'][i].description, [Validators.required]]
        });
        newFormGroup.push(fg);
        if (i >= (data['event_agenda'].length - 1)) {
          return newFormGroup;
        }
      }
    } else {
      // console.log('undefined')
      let newFormGroup = [];
      let fg = this.fb.group({
        startTime: ['',[Validators.required, this.agendaDateComp.bind(this)]],
        description: ['', [Validators.required]]
      });
      newFormGroup.push(fg);
      return newFormGroup;
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
    // control.push(this.ticketItem(''));
  }

  /**
   * More Ticket Item push to Form
   */
  ticketItem(val: string) {
    // return new FormGroup({
    //   name: new FormControl(val, Validators.required),
    //   price: new FormControl(val, Validators.required),
    //   quantity: new FormControl(val),
    //   ticketQuantiy: new FormControl(val, Validators.required),
    //   ticketType: new FormControl(val)
    // })
  }


  /**
   * Event Creatation Sybmit
   * @param value value of form
   */
  submitForm(value) {
    // console.log(this.eventForm.valid)
    // console.log(this.eventCoverImage)
    if (this.eventForm.valid) {
      if (this.eventCoverImage === '') {
        this.imageUpload = true;
        // console.log(this.imageUpload)
        return
      }
      this.imageUpload = false;
      const data = {
          id:  this.eventDetail.id,
          title : value.event_name,
          access :  Number(value.access),
          attendeeCount: this.eventDetail.attendeeCount,
          isFeatured: this.eventDetail.isFeatured,
          creationDate: this.eventDetail.creationDate,
          event_media: this.eventDetail.event_media,
          eventTiming: {
            startDate : this.reverseDate(value.event_startdate) + 'T00:00:00.001',
            endDate : this.reverseDate(value.event_enddate) + 'T23:59:59.000',
          },
          venue : {
            location: this.address || value.event_venue,
            latitude: this.latitude.toString(),
            longitude: this.longitude.toString(),
          },
          event_agenda: value.event_agenda,
          extras: {
            coverImage: this.eventCoverImage,
            ticket: [{
              startDate: this.reverseDate(value.ts_startTime) + 'T00:00:00.001',
              endDate: this.reverseDate(value.ts_endTime) + 'T23:59:59.000',
              maximum: value.ts_quantity,
              ticketId: this.eventDetail.extras.ticket[0].ticketId
            }]
          },
          brief: value.event_brief,
          industry : [
              value.event_industry
          ],
          Type: {
            entryType : value.event_type,
            eventType : value.event_genres
          },
          isFollowing	:	this.eventDetail.isFollowing,
          isGoing	:	this.eventDetail.isGoing,
          isInterested	:	this.eventDetail.isInterested,
          isOwner	:	this.eventDetail.isOwner,
          notGoing	:	this.eventDetail.notGoing,
      }
      // const id =  this.eventDetail.id;
      // const edit = [data, id]
      //  console.log(data)

      // Dispatch to form value to server
      this.store.dispatch({ type: EventActions.EVENT_EDIT, payload: data });

      this.store.select('eventTags')
        .first(regevent => regevent['event_updated'] === true )
        .subscribe( reg => {
          // const id = reg['event_id'];
          this.toastr.success('Event Successfully Updated', '', {
            timeOut: 3000
          });
          this.router.navigate(['/event/inner/' +  this.eventDetail.id]);
        });
    }
  }

  /**
   * Date put to reverse formate
   */
  reverseDate(string) {
    return string.split('-').reverse().join('-');
  }
  removePhoto(){
    // console.log('comming')
    
      this.eventCoverImage = '';
    
  }
  enableEdit(){
    this.router.navigateByUrl('/event/inner/' + this.eventDetail.id);
  }
  removeTime(s:string){
    let x = s.split('T')
    // console.log(s.split('T'))
    let d = x[0];
    // console.log(d);
    return d.split('-').reverse().join('-');
  }
}
