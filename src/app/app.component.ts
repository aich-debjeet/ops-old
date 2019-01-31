import { Component, OnInit, OnDestroy, Renderer } from '@angular/core';
import { Router, NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { ISubscription } from 'rxjs/Subscription';
import { environment } from 'environments/environment';

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
    public renderer: Renderer,
    public router: Router
  ) { }

  ngOnInit() {
    if (environment.production) {
      this.renderer.listenGlobal('document', 'contextmenu', (event) => {
        if (event.target.nodeName === 'IMG' || event.target.nodeName === 'VIDEO' || event.target.nodeName === 'AUDIO') {
          event.preventDefault();
        }
      });
    }
    this.routerSub = this.router.events
      .subscribe(event => {
        // for google analytics
        if (environment.production && event instanceof NavigationEnd) {
          // console.log('GA enabled for routes');
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
