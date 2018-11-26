import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-bookmark-audio-card',
  templateUrl: './bookmark-audio-card.component.html',
  styleUrls: ['./../../bookmark.component.scss']
})
export class BookmarkAudioCardComponent implements OnInit {

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
