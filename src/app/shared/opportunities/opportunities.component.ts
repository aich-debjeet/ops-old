import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.css']
})
export class OpportunitiesComponent {

  opportunities: any = [];

  constructor() {

    // initial cards
    this.opportunities = [{
      name: 'name of opportunity',
      location: 'location'
    }, {
      name: 'name of opportunity',
      location: 'location'
    }, {
      name: 'name of opportunity',
      location: 'location'
    }, {
      name: 'name of opportunity',
      location: 'location'
    }];

  }

}
