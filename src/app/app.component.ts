import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { ISubscription } from 'rxjs/Subscription';

declare let ga;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  loadingModule = false;
  routerSub: ISubscription;

  constructor(
    public ngProgress: NgProgress,
    public router: Router
  ) { }

  ngOnInit() {
    this.routerSub = this.router.events
      .subscribe(event => {
        // for google analytics
        if (event instanceof NavigationEnd) {
          ga('set', 'page', event.urlAfterRedirects);
          ga('send', 'pageview');
        }
        // for page preloader
        if (event instanceof RouteConfigLoadStart) {
          if (this.loadingModule === false) {
            this.loadingModule = true;
            this.ngProgress.start();
          }
        } else if (event instanceof RouteConfigLoadEnd) {
          if (this.loadingModule === true) {
            this.loadingModule = false;
            this.ngProgress.done();
          }
        }
      });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

}
