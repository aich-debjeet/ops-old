import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  comingsoon: any;
  constructor() { }

  ngOnInit() {
    this.comingsoon = {
      mainTitle: 'Portfolio <br> Coming Soon.',
      description: 'People are over qualified these days. Who has time for all this paperwork?! I do, apparently.<br> <br> Feel free to browse through our other pages while we sort this out.',
      buttonLink: '/home',
      buttonText: 'Go to Home',
      img: 'http://d33wubrfki0l68.cloudfront.net/ae303d8f5b64ab940ebb1cb37926483a4c6cfc3b/fb074/img/svg/404/portfolio.png'
    };
  }

}
