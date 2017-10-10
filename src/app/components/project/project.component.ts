import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  comingsoon: any;
  constructor() { }

  ngOnInit() {
    this.comingsoon = {
      mainTitle: 'Project <br> Coming Soon.',
      description: 'It’s our boss’s birthday! We’ll get back to you tomorrow when he’s breathing down our necks again. <br><br>Feel free to browse through our other pages.',
      buttonLink: '/home',
      buttonText: 'Go to Home',
      img: 'http://d33wubrfki0l68.cloudfront.net/46c397b33cf7a3ed3dd796666394c1d96ed23631/70ad4/img/svg/404/project.png'
    };
  }

}
