import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import {IDatePickerConfig} from 'ng2-date-picker';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';
import { DatePipe } from '@angular/common';
import { EventValidator, FormValidation } from '../../../helpers/event.validator';
import {Moment} from 'moment';



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

  constructor(
    private fb: FormBuilder,
    private store: Store<EventModal>,
    private route: ActivatedRoute,
    private router: Router,
    private Upload: NgxfUploaderService,
    private datePipe: DatePipe,
    private eventValidator: EventValidator,
  ) {

    this.tagState$ = this.store.select('eventTags');
    this.tagState$.subscribe((state) => {
      this.industryList = state['all_industry'];
      this.eventDetail = state['event_detail'];
      console.log(state);
    });

    this.profileState$ = this.store.select('profileTags');
    this.profileState$.subscribe((state) => {
       console.log(state);
    });

    this.store.select('profileTags')
      .first(profile => profile['profile_navigation_details'].handle )
      .subscribe( data => {
        this.userHandle = data['profile_navigation_details'].handle
      });

    this.store.dispatch({ type: EventActions.GET_ALL_INDUSTRY });
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(params['id']);
      this.store.dispatch({ type: EventActions.EVENT_DETAILS_LOAD, payload: this.id });
    });



    this.buildForm();
    // this.eventForm.setValue({
    //   event_name: 'title'
    // });
  }

  fileChangeListener($event) {
      let image: any = new Image();
      let file: File = $event.target.files[0];
      let myReader: FileReader = new FileReader();
      let that = this;
      let val: any;
      myReader.onloadend = function (loadEvent: any) {
          image.src = loadEvent.target.result;
          val = loadEvent.target.result;
          that.image = loadEvent.target.result;
          that.uploadCoverImage(loadEvent.target.result);
      };

      myReader.readAsDataURL(file);
  }

   /**
   * Upload Cover image
   */
  uploadCoverImage(val) {
      const imageData = {
        handle: this.userHandle,
        image: this.image.split((/,(.+)/)[1])
      };
      this.store.dispatch({ type: EventActions.FILE_UPLOAD, payload: imageData });

    this.store.select('eventTags')
      .first(file => file['fileupload_success'] === true )
      .subscribe( data => {
        this.eventCoverImage = data['fileUpload'].repoPath
        console.log(data);
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

  // onCheckChange(event) {
  // const formArray: FormArray = this.eventForm.get('event_ts_type') as FormArray;

  // /* Selected */
  // if(event.target.checked){
  //   // Add a new control in the arrayForm
  //   formArray.push(new FormControl(event.target.value));
  // }
  // /* unselected */
  // else{
  //   // find the unselected element
  //   let i: number = 0;

  //   formArray.controls.forEach((ctrl: FormControl) => {
  //     if(ctrl.value == event.target.value) {
  //       // Remove the unselected element from the arrayForm
  //       formArray.removeAt(i);
  //       return;
  //     }

  //     i++;
  //   });
  // }


  /**
   * Event Creatation Sybmit
   * @param value value of form
   */
  submitForm(value) {
    console.log(this.eventForm);
    console.log(value);
    console.log('Form validation' + this.eventForm.valid);
    // struct of backend
    // const data = {
    //     title : value.event_name,
    //     eventTiming: {
    //       startDate : this.reverseDate(value.event_startdate) + 'T05:00:00',
    //       endDate : this.reverseDate(value.event_enddate) + 'T05:00:00',
    //       startTime : this.reverseDate(value.event_startdate) + 'T05:00:00',
    //       endTime : this.reverseDate(value.event_enddate) + 'T05:00:00',
    //     },
    //     venue : {
    //         line1 : 'BANGALORE',
    //         line2 : 'BANGALORE',
    //         city : 'BANGALORE',
    //         state : 'KARANATAKA',
    //         country : 'INDIA',
    //         postalCode : '560075',
    //         latitude: '',
    //         longitude: ''
    //     },
    //     industry : [
    //         value.event_industry
    //     ],
    //     event_agenda: value.event_agenda,
    //     brief: value.event_brief,
    //     event_media: [''],
    //     access : 0,
    //     active : true,
    //     ratedBy : [],
    //     Type: {
    //       EntryType : 'Free',
    //       eventType : 'Theatre'
    //     },
    //     extras: {
    //       Genre: [value.event_genres],
    //       ticket: [{
    //         ticketType: value.event_ts_type,
    //         startDate: this.reverseDate(value.ts_startTime) + 'T05:00:00',
    //         endDate: this.reverseDate(value.ts_endTime) + 'T05:00:00',
    //         maximum: value.ts_quantity
    //       }]
    //     },
    //     isFeatured: false
    // }

    if (this.eventForm.valid) {
      if (this.eventCoverImage === '') {
        this.imageUpload = true;
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
          console.log(reg);
          const id = reg['event_id'];
          this.router.navigate(['/events/inner/' + id]);
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

