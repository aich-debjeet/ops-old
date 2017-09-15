import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  comingsoon: any;
  constructor() {}

  ngOnInit() {
    this.comingsoon = {
      mainTitle: 'Explore Coming Soon.',
      description: 'Our Explorers are working up the map. Feel free to browse through our other pages',
      buttonLink: '/home',
      buttonText: 'Go to Home',
      img: 'https://d33wubrfki0l68.cloudfront.net/aa7151c6bd31e22c19fee9e6753360fe77abcb99/7b1df/img/svg/404/explore_coming_soon_02.png'
    };
  }

}
