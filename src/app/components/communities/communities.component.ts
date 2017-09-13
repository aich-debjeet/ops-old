import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit {

  comingsoon: any;
  constructor() {}

  ngOnInit() {
    this.comingsoon = {
      mainTitle: 'Communities will be Coming Soon.',
      description: 'Our folks are still arranging the chairs right now. Please wait outside while we set this up. <br> <br> Feel free to browse through our other pages.',
      buttonLink: '/home',
      buttonText: 'Go to Home',
      img: 'http://d33wubrfki0l68.cloudfront.net/7fa8ea0b364101d93091e6a21e6c3639c993416d/3027b/img/svg/404/events_img.svg'
    };
  }

}
