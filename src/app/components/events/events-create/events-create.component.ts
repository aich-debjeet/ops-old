import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import {IDatePickerConfig} from 'ng2-date-picker';


@Component({
  selector: 'app-events-create',
  templateUrl: './events-create.component.html',
  styleUrls: ['./events-create.component.scss']
})
export class EventsCreateComponent implements OnInit {
  public eventForm: FormGroup;

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
  ) {

  }

  ngOnInit() {
    this.buildForm();
  }

  /**
   * Form init
   */
  buildForm() {
    this.eventForm = this.fb.group({
      'event_name' : ['', [Validators.required]],
      'event_startdate' : '',
      'event_enddate' : '',
      'event_agenda' : this.fb.array(
        [this.agendaItem('')]
      ),
      'event_ts_type' : this.fb.array(
        [this.ticketItem('')]
      ),
      'ts_startTime': '',
      'ts_endTime': ''
    })

  }



  agendaItem(val: string) {
    return new FormGroup({
      startTime: new FormControl(val, Validators.required),
      description: new FormControl(val, Validators.required)
    })
  }

  ticketItem(val: string) {
    return new FormGroup({
      paymentType: new FormControl(val, Validators.required),
      ticketName: new FormControl(val, Validators.required),
      ticketPrice: new FormControl(val),
      ticketQuantiy: new FormControl(val, Validators.required)
    })
  }

  submitForm(value) {
    console.log(value);
  }

}

