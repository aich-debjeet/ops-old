import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-opportunity-search-applied',
  templateUrl: './opportunity-search-applied.component.html',
  styleUrls: ['./opportunity-search-applied.component.scss']
})
export class OpportunitySearchAppliedComponent implements OnInit, OnDestroy {
  @Input() opportunities: any;
  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
