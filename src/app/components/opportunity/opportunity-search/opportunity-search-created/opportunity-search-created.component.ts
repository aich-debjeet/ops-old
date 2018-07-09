import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-opportunity-search-created',
  templateUrl: './opportunity-search-created.component.html',
  styleUrls: ['./opportunity-search-created.component.scss']
})
export class OpportunitySearchCreatedComponent implements OnInit, OnDestroy {
  @Input() opportunities: any;
  constructor() {}

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
