import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-bookmark-image-card',
  templateUrl: './bookmark-image-card.component.html',
  styleUrls: ['./../../bookmark.component.scss']
})
export class BookmarkImageCardComponent implements OnInit {

  @Input() mediaDetails: any;
  @Output() removeBookmark: EventEmitter<any> = new EventEmitter<any>();
  imageBaseUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

  deleteBookmark(data) {
    const reqParams = {
      type: data.postType,
      id: data.postId
    }
    this.removeBookmark.emit(reqParams);
  }

}
