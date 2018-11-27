import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-bookmark-event-card',
  templateUrl: './bookmark-event-card.component.html',
  styleUrls: ['./../../bookmark.component.scss']
})
export class BookmarkEventCardComponent implements OnInit {

  @Input() eventDetails: any;
  @Output() removeBookmark: EventEmitter<any> = new EventEmitter<any>();
  imageBaseUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

  deleteBookmark(data) {
    const reqParams = {
      type: 'event',
      id: data.id
    }
    this.removeBookmark.emit(reqParams);
  }

}
