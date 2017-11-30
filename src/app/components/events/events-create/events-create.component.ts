import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormArray } from '@angular/forms';
import {IDatePickerConfig} from 'ng2-date-picker';
import {ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';

// Model
import { EventModal, initialTag  } from '../../../models/event.model';

// action
import { EventActions } from '../../../actions/event.action';

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

  config: IDatePickerConfig = {
    firstDayOfWeek: 'su',
    monthFormat: 'MMM, YYYY',
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


  constructor(
    private fb: FormBuilder,
    private store: Store<EventModal>,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit() {
    this.buildForm();
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
      ticketQuantiy: new FormControl(val, Validators.required)
    })
  }

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
    //       Genre:[value.event_genres],
    //       ticket: [{
    //         ticketType: value.event_ts_type,
    //         startDate: this.reverseDate(value.ts_startTime) + 'T05:00:00',
    //         endDate: this.reverseDate(value.ts_endTime) + 'T05:00:00',
    //         maximum: value.ts_quantity
    //       }]
    //     },
    //     isFeatured: false
    // }


    // Dispatch to form value to server
    // this._store.dispatch({ type: ProfileActions.LOAD_DIRECTORY, payload: data });
  }

  /**
   * Date put to reverse formate
   */
  reverseDate(string) {
    return string.split('-').reverse().join('-');
  }

}

