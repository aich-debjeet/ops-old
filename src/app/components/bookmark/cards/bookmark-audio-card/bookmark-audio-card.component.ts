import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-bookmark-audio-card',
  templateUrl: './bookmark-audio-card.component.html',
  styleUrls: ['./../../bookmark.component.scss']
})
export class BookmarkAudioCardComponent implements OnInit {

  @Input() mediaDetails: any;
  imageBaseUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

}
