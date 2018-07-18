import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-opportunity-application-card',
  templateUrl: './opportunity-application-card.component.html',
  styleUrls: ['./opportunity-application-card.component.scss']
})
export class OpportunityApplicationCardComponent implements OnInit {
  @Input('applicationDetails') applicationDetails: any;

  constructor() { }

  ngOnInit() {
  }

}
