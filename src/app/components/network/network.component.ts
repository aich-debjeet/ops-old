import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.scss']
})
export class NetworkComponent implements OnInit {
  comingsoon: any;
  constructor() { }

  ngOnInit() {
    this.comingsoon = {
      mainTitle: 'Network <br> Coming Soon.',
      description: '“Hello? Sorry, what?! I’m sorry, but you seem to have the wrong number.” <br> <br> Feel free to browse through our other pages.',
      buttonLink: '/home',
      buttonText: 'Go to Home',
      img: 'http://d33wubrfki0l68.cloudfront.net/d6452c28932efa78006b38938c187c8ff908bedf/d64bf/img/svg/404/network.png'
    };
  }

}
