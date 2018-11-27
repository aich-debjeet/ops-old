import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-bookmark-opportunity-card',
  templateUrl: './bookmark-opportunity-card.component.html',
  styleUrls: ['./../../bookmark.component.scss']
})
export class BookmarkOpportunityCardComponent implements OnInit {

  @Input() oppDetails: any;
  @Output() removeBookmark: EventEmitter<any> = new EventEmitter<any>();
  imageBaseUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

  deleteBookmark(data) {
    const reqParams = {
      type: 'opportunity',
      id: data.id
    }
    this.removeBookmark.emit(reqParams);
  }

}
