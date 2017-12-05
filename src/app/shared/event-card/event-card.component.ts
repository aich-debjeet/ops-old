import { Component, OnInit, Input } from '@angular/core';
import { environment } from './../../../environments/environment';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {
  @Input() eventData;
  baseUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

}
