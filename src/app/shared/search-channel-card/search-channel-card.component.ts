import { Component, OnInit, Input } from '@angular/core';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-search-channel-card',
  templateUrl: './search-channel-card.component.html',
  styleUrls: ['./search-channel-card.component.scss']
})
export class SearchChannelCardComponent implements OnInit {

  baseUrl: string = environment.API_IMAGE;
  @Input() post: any;

  constructor() { }

  ngOnInit() {
  }

}
