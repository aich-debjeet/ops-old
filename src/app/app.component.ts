import { Component } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { GoogleAnalyticsEventsService } from './google-analytics-events-service';

declare let ga;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(
    public router: Router
  ) {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      ga('set', 'page', event.urlAfterRedirects);
      ga('send', 'pageview');
    }
  });
}
}
