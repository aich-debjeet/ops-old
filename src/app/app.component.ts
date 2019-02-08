import { Component, OnInit, OnDestroy, Renderer } from '@angular/core';
import { Router, NavigationEnd, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { NgProgress } from 'ngx-progressbar';
import { ISubscription } from 'rxjs/Subscription';
import { environment } from 'environments/environment';
import { Meta } from '@angular/platform-browser';

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
    public router: Router,
    private meta: Meta,
  ) {
    // search engine
    this.meta.addTags([
      { name: 'title', content: 'One Page Spotlight' },
      { name: 'image', content: 'https://cdn.onepagespotlight.com/v2/index/logo.svg' },
      { name: 'description', content: 'An online hub for artists and creators. Create your profile, highlight your work, build connections and network exclusively with artists, showcase your portfolio, and find the best opportunities.' },
      { name: 'keywords', content: '' }
    ]);

    // schema.org
    this.meta.addTags([
      { itemprop: 'name', content: 'One Page Spotlight' },
      { itemprop: 'image', content: 'https://cdn.onepagespotlight.com/v2/index/logo.svg' },
      { itemprop: 'description', content: 'An online hub for artists and creators. Create your profile, highlight your work, build connections and network exclusively with artists, showcase your portfolio, and find the best opportunities.' },
    ]);

    // twitter
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:title', content: 'One Page Spotlight' },
      { name: 'twitter:description', content: 'An online hub for artists and creators. Create your profile, highlight your work, build connections and network exclusively with artists, showcase your portfolio, and find the best opportunities.' },
      { name: 'twitter:site', content: '@1pagespotlight' },
      { name: 'twitter:image:src', content: 'https://cdn.onepagespotlight.com/v2/ops_icon.png' },
    ]);

    // open graph (facebook, pinterest, google+ etc.)
    this.meta.addTags([
      { name: 'og:title', content: 'One Page Spotlight' },
      { name: 'og:description', content: 'An online hub for artists and creators. Create your profile, highlight your work, build connections and network exclusively with artists, showcase your portfolio, and find the best opportunities.' },
      { name: 'og:image', content: 'https://cdn.onepagespotlight.com/v2/ops_icon.png' },
      { name: 'og:url', content: 'https://onepagespotlight.com' },
      { name: 'og:site_name', content: 'One Page Spotlight' },
      { name: 'og:type', content: 'website' },
    ]);

    this.meta.addTags([
      { property: 'og:title', content: 'One Page Spotlight' },
      { property: 'og:description', content: 'An online hub for artists and creators. Create your profile, highlight your work, build connections and network exclusively with artists, showcase your portfolio, and find the best opportunities.' },
      { property: 'og:image', content: 'https://cdn.onepagespotlight.com/v2/ops_icon.png' },
      { property: 'og:url', content: 'https://onepagespotlight.com' },
      { property: 'og:site_name', content: 'One Page Spotlight' },
      { property: 'og:type', content: 'website' },
    ]);
  }

  ngOnInit() {

    // to disable right click for OPS media on Prod env
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
