import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-opporunity-search-card',
  templateUrl: './opporunity-search-card.component.html',
  styleUrls: ['./opporunity-search-card.component.scss']
})
export class OpporunitySearchCardComponent implements OnInit {
  @Input() opportunityDetails: any;

  constructor() { }

  ngOnInit() {
  }

}
