import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-opportunity-search-applied',
  templateUrl: './opportunity-search-applied.component.html',
  styleUrls: []
})
export class OpportunitySearchAppliedComponent {
  @Input() opportunities: any;
  constructor() { }
}
