import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-bookmark-opportunity-card',
  templateUrl: './bookmark-opportunity-card.component.html',
  styleUrls: ['./../../bookmark.component.scss']
})
export class BookmarkOpportunityCardComponent implements OnInit {

  @Input() oppDetails: any;
  imageBaseUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

}
