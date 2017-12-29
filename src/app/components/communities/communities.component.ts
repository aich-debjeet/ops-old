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
      mainTitle: 'Communities <br> Coming Soon.',
      description: 'We can\'t find John Doe! We can\'t start without him now, can we? We\'ll be back as soon as we find him. Feel free to browse through our other pages.',
      buttonLink: '/home',
      buttonText: 'Go to Home',
      img: 'https://d33wubrfki0l68.cloudfront.net/2a115820a1270ca0fd7016179883918dbf09e21f/83879/img/svg/404/communitiescomingsoon2.png'
    };
  }
}
