import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss']
})
export class PlannerComponent implements OnInit {

  comingsoon: any;
  constructor() { }

  ngOnInit() {
    this.comingsoon = {
      mainTitle: 'Planner <br> Coming Soon.',
      description: 'We are currently under construction. We will be operable soon.',
      buttonLink: '/home',
      buttonText: 'Go to Home',
      img: 'https://d33wubrfki0l68.cloudfront.net/46c397b33cf7a3ed3dd796666394c1d96ed23631/70ad4/img/svg/404/project.png'
    };
  }

}
