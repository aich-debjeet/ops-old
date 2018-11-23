import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-bookmark-video-card',
  templateUrl: './bookmark-video-card.component.html',
  styleUrls: ['./../../bookmark.component.scss']
})
export class BookmarkVideoCardComponent implements OnInit {

  @Input() mediaDetails: any;
  imageBaseUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

}
