import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import {IDatePickerConfig} from 'ng2-date-picker';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxfUploaderService, UploadEvent, UploadStatus, FileError } from 'ngxf-uploader';



// Model
import { EventModal, initialTag  } from '../../../models/event.model';
import { ProfileModal } from '../../../models/profile.model';

// action
import { EventActions } from '../../../actions/event.action';
import { ProfileActions } from '../../../actions/profile.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-events-create',
  templateUrl: './events-create.component.html',
  styleUrls: ['./events-create.component.scss']
})
export class EventsCreateComponent implements OnInit {
  public eventForm: FormGroup;
  tagState$: Observable<EventModal>;
  profileState$: Observable<ProfileModal>;
  today = Date.now();
  industryList = initialTag ;
  image: any;
  eventCoverImage: any;

  datePickerConfig: IDatePickerConfig = {
    firstDayOfWeek: 'mo',
    // format: 'YYYY-MM-DDThh:mmTZD',
    disableKeypress: false,
    showSeconds: true,
  };

  config: IDatePickerConfig = {
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
    min: '12-10-2017',
    disableKeypress: false,
    allowMultiSelect: false,
    closeOnSelect: undefined,
    closeOnSelectDelay: 100,
    openOnFocus: true,
    openOnClick: true,
    onOpenDelay: 0,
    weekDayFormat: 'ddd',
    appendTo: document.body,
    showNearMonthDays: true,
    showWeekNumbers: false,
    enableMonthSelector: true,
    yearFormat: 'YYYY',
    showGoToCurrent: true,
    dayBtnFormat: 'DD',
    monthBtnFormat: 'MMM',
    hours12Format: 'hh',
    hours24Format: 'HH',
    meridiemFormat: 'A',
    minutesFormat: 'mm',
    minutesInterval: 1,
    secondsFormat: 'ss',
    secondsInterval: 1,
    showSeconds: false,
    showTwentyFourHours: false,
    timeSeparator: ':',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: false,
    hideInputContainer: false,
  };

  process: number[] = [];
  fileData: File;
  userHandle: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<EventModal>,
    private route: ActivatedRoute,
    private router: Router,
    private Upload: NgxfUploaderService
  ) {

    this.tagState$ = this.store.select('eventTags');
    this.tagState$.subscribe((state) => {
      this.industryList = state['all_industry'];
    });

    this.profileState$ = this.store.select('profileTags');
    this.profileState$.subscribe((state) => {
      // console.log(state);
    });

    this.store.select('profileTags')
      .first(profile => profile['profileUser'].handle )
      .subscribe( data => {
        this.userHandle = data['profileUser'].handle
      });

    this.store.dispatch({ type: EventActions.GET_ALL_INDUSTRY });
  }

  ngOnInit() {
    this.buildForm();
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







  /**
   * Init Form Action
   */
  buildForm() {
    this.eventForm = this.fb.group({
      'event_name' : ['', [Validators.required]],
      'event_genres': ['', [Validators.required]],
      'event_industry': ['', [Validators.required]],
      'event_venue': ['', [Validators.required]],
      'event_startdate' : ['', [Validators.required]],
      'event_enddate' : ['', [Validators.required]],
      'access': '0',
      'event_type': 'Free',
      'event_agenda' : this.fb.array(
        [this.agendaItem('')]
      ),
      'event_ts_type' : this.fb.array(
        [this.ticketItem('')]
      ),
      'event_brief' : ['', [Validators.required]],
      'ts_startTime': '',
      'ts_endTime': '',
      'ts_quantity': '',
    })

  }

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
    console.log(value);
    console.log(this.eventForm.valid);
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
        industry : [
            value.event_industry
        ],
        Type: {
          EntryType : value.event_type,
        },
        // /event_media: [this.eventCoverImage]
    }

    // Dispatch to form value to server
    this.store.dispatch({ type: EventActions.EVENT_REG, payload: data });

    this.store.select('eventTags')
      .first(regevent => regevent['event_create_success'] === true )
      .subscribe( reg => {
        console.log(reg);
        const id = reg['event_id'];
        // this.router.navigate(['/events/inner/' + id]);
      });
  }

  /**
   * Date put to reverse formate
   */
  reverseDate(string) {
    return string.split('-').reverse().join('-');
  }

}

