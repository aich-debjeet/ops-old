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
      description: 'Does 2011 look like 2017? I guess not. Yo Johnny, we gotta print these calendars again. Feel free to browse through our other pages.',
      buttonLink: '/home',
      buttonText: 'Go to Home',
      img: 'https://d33wubrfki0l68.cloudfront.net/46c397b33cf7a3ed3dd796666394c1d96ed23631/70ad4/img/svg/404/project.png'
    };
  }

}
