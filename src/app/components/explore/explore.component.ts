import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NguCarousel } from '@ngu/carousel';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit, AfterViewInit {
  exploreSlider: NguCarousel;
  spotfeeds: any[];

  constructor() {
    this.spotfeeds = [1, 2, 3];
  }

  ngOnInit() {
    this.exploreSlider = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 5,
      speed: 400,
      interval: 4000,
      point: {
        visible: true
      },
      load: 5,
      touch: true,
      loop: true,
      custom: 'banner'
    }
  }

  ngAfterViewInit() {}

}
