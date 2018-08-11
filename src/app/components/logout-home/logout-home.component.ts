import { Component, OnInit, OnDestroy, Inject  } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import { PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-logout-home',
  templateUrl: './logout-home.component.html',
  styleUrls: ['./logout-home.component.scss']
})
export class LogoutHomeComponent implements OnInit, OnDestroy {

  public metaShow: Meta;
  private subscription: Subscription;
  base_image = environment.API_IMAGE;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, meta: Meta, title: Title,
    private router: Router
  ) {

    title.setTitle('One Page Spotlight');
    meta.addTags([
      { name: 'keywords', content: 'dance, dance world cup 2017, dwc, dance world cup india, asia, world, dance competition, competition, dwc info, phoenix marketcity, bangalore, one page soptlight dance, dance world cup qualifiers, qualifiers'},
      { name: 'description', content: 'OPS' },
      { name: 'og:image', content: 'https://cdn.onepagespotlight.com/img/landing/logobetawhite.svg' },
    ]);
    this.metaShow = meta;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }



}
