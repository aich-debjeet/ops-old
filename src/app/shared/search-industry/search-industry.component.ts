import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-industry',
  templateUrl: './search-industry.component.html',
  styleUrls: ['./search-industry.component.scss']
})
export class SearchIndustryComponent implements OnInit {

  @Input() industryDetails: any;

  constructor() { }

  ngOnInit() {
  }

}
