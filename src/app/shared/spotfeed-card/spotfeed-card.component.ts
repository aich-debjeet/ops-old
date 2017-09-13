import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spotfeed-card',
  templateUrl: './spotfeed-card.component.html',
  styleUrls: ['./spotfeed-card.component.scss']
})
export class SpotfeedCardComponent implements OnInit {

  @Input() spotfeedData;
  constructor() { }

  ngOnInit() {
    // console.log(this.spotfeedData);
  }

}
