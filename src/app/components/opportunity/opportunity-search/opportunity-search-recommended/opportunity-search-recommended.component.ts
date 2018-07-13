import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-opportunity-search-recommended',
  templateUrl: './opportunity-search-recommended.component.html',
  styleUrls: []
})
export class OpportunitySearchRecommendedComponent {
  @Input() opportunities: any;
  constructor() { }
}
