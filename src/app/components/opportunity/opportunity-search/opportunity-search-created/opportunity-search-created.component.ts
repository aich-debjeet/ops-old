import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-opportunity-search-created',
  templateUrl: './opportunity-search-created.component.html',
  styleUrls: []
})
export class OpportunitySearchCreatedComponent {
  @Input() opportunities: any;
  constructor() { }
}
