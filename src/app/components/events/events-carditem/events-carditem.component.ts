import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from './../../../../environments/environment';

@Component({
  selector: 'app-events-carditem',
  templateUrl: './events-carditem.component.html',
  styleUrls: ['./events-carditem.component.scss']
})
export class EventsCarditemComponent implements OnInit {
  count: number = 0;
  @Input() cartItem;
  @Output() countChange: EventEmitter<any> = new EventEmitter<any>();
  baseUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

  increment(amount: any) {
    this.count++;
    const data = {
      count: +1,
      amount: amount
    }
    this.countChange.emit(data);
  }
  decrement(amount) {
    this.count--;
    const data = {
      count: -1,
      amount: amount
    }
    this.countChange.emit(data);
  }

}
