import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss']
})
export class LearnComponent implements OnInit {
  comingsoon: any;
  constructor() { }

  ngOnInit() {
    this.comingsoon = {
      mainTitle: 'Learn Coming Soon.',
      description: 'Lights! Camera! Action!!! ......Action! Action? Wait, wheres the bloody camera??! <br> <br> Sorry folks, do feel free to browse through our other pages while we sort this shit out.',
      buttonLink: '/home',
      buttonText: 'Go to Home',
      img: 'http://d33wubrfki0l68.cloudfront.net/aad06159fee949ca6aeff3608afdf54908132639/397b7/img/svg/404/learn_image.svg'
    };
  }

}
