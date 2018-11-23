import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-bookmark-profile-card',
  templateUrl: './bookmark-profile-card.component.html',
  styleUrls: ['./../../bookmark.component.scss']
})
export class BookmarkProfileCardComponent implements OnInit {

  @Input() profileDetails: any;
  imageBaseUrl = environment.API_IMAGE;
  @Output() follow: EventEmitter<any> = new EventEmitter<any>();
  @Output() unfollow: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  followAction(action: string) {
    if (action === 'follow') {
      this.follow.emit(this.profileDetails);
    } else {
      this.unfollow.emit(this.profileDetails);
    }
  }

}
