import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-opportunity-application-card',
  templateUrl: './opportunity-application-card.component.html',
  styleUrls: ['./opportunity-application-card.component.scss']
})
export class OpportunityApplicationCardComponent implements OnInit {
  @Input('applicationDetails') applicationDetails: any;
  baseUrl = environment.API_IMAGE;

  constructor() { }

  ngOnInit() {
  }

}
