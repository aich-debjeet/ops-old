import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-spotfeed-card',
  templateUrl: './spotfeed-card.component.html',
  styleUrls: ['./spotfeed-card.component.scss']
})
export class SpotfeedCardComponent implements OnInit {
  baseUrl: string;

  @Input() spotfeedData;
  constructor() {
    this.baseUrl = environment.API_IMAGE;
  }

  ngOnInit() {
    // console.log(this.spotfeedData);
  }

}
