import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss']
})
export class OpportunityComponent implements OnInit {
  comingsoon: any;
  constructor() { }

  ngOnInit() {
    this.comingsoon = {
      mainTitle: 'Opportunities will be coming soon.',
      description: 'Sorry. We are on the way. Traffic these days, I tell you! Feel free to browse through our other pages.',
      buttonLink: '/home',
      buttonText: 'Go to Home',
      img: 'http://d33wubrfki0l68.cloudfront.net/bd74fa7300db348698a9c798b806975d0040d7b6/5259e/img/svg/404/opportunity_image.svg'
    };
  }
}
