import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-event-search-card',
  templateUrl: './event-search-card.component.html',
  styleUrls: ['./event-search-card.component.scss']
})
export class EventSearchCardComponent implements OnInit {
  @Input() eventDetails: any;
  baseUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

}
