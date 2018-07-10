import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-opportunity-search-recommended',
  templateUrl: './opportunity-search-recommended.component.html',
  styleUrls: ['./opportunity-search-recommended.component.scss']
})
export class OpportunitySearchRecommendedComponent implements OnInit, OnDestroy {
  @Input() opportunities: any;
  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
