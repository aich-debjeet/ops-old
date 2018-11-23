import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-bookmark-image-card',
  templateUrl: './bookmark-image-card.component.html',
  styleUrls: ['./../../bookmark.component.scss']
})
export class BookmarkImageCardComponent implements OnInit {

  @Input() mediaDetails: any;
  imageBaseUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

}
