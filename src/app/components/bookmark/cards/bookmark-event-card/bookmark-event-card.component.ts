import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-bookmark-event-card',
  templateUrl: './bookmark-event-card.component.html',
  styleUrls: ['./../../bookmark.component.scss']
})
export class BookmarkEventCardComponent implements OnInit {

  @Input() eventDetails: any;
  imageBaseUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

}
