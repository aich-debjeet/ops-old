import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {
  comingsoon: any;
  constructor() { }

  ngOnInit() {
    this.comingsoon = {
      mainTitle: 'Resources will be coming soon.',
      description: 'The dog did this! I swear! <br> <br> Feel free to browse through our other pages while we get this ready again.',
      buttonLink: '/home',
      buttonText: 'Go to Home',
      img: 'http://d33wubrfki0l68.cloudfront.net/edb62634b18c3145068bf6a1abc6e6f1ff7e1c1c/db98e/img/svg/404/resources_image.svg'
    };
  }

}
