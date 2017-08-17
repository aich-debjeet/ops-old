import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nearest-events',
  templateUrl: './nearest-events.component.html',
  styleUrls: ['./nearest-events.component.css']
})
export class NearestEventsComponent {

  events: any = [];

  constructor() {

    // initial cards
    this.events = [{
      name: 'event\'s name',
      dateTime: '18-12-2016',
      location: 'location'
    }, {
      name: 'event\'s name',
      dateTime: '10-08-2016',
      location: 'location'
    }, {
      name: 'event\'s name',
      dateTime: '22-06-2016',
      location: 'location'
    }, {
      name: 'event\'s name',
      dateTime: '07-10-2016',
      location: 'location'
    }];

  }

}
