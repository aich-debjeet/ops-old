import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dance-world-cup',
  templateUrl: './dance-world-cup.component.html',
  styleUrls: ['./dance-world-cup.component.scss']
})
export class DanceWorldCupComponent implements OnInit {

  navItem = '';

  constructor() { }

  ngOnInit() {
  }

  navigateTo(id: string) {
    this.navItem = id;
  }

}
