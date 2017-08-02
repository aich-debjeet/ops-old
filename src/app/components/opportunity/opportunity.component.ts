import { Component } from '@angular/core';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent {

  jobs: any = [];

  constructor() {

    // initial cards
    this.jobs = [{
      position: 'creative director',
      experience: '2-4',
      location: 'mumbai'
    }, {
      position: 'designer',
      experience: '0-1',
      location: 'bangalore'
    }, {
      position: 'jr web developer',
      experience: '0-1',
      location: 'delhi'
    }, {
      position: 'full stack developer',
      experience: '2-4',
      location: 'kolkata'
    }, {
      position: 'sr tech manager',
      experience: '5-10',
      location: 'banglaore'
    }, {
      position: 'test',
      experience: 'test',
      location: 'test'
    }];

  }

}