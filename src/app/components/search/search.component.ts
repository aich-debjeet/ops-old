import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  previousUrl: string;
  constructor(router: Router) {
    router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe(e => {
      this.previousUrl = e['url'];
      // console.log('prev:', this.previousUrl);
    });
  }

  ngOnInit() {
  }

}
