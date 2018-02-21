import { Component, OnInit, OnDestroy } from '@angular/core';
import { FooterComponent } from './../../shared/footer/footer.component';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NguCarousel, NguCarouselStore } from '@ngu/carousel';

import { ProfileModal, initialTag, ProfileCard } from '../../models/profile.model';
import { environment } from '../../../environments/environment';

// action
import { ProfileActions } from '../../actions/profile.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-logout-home',
  templateUrl: './logout-home.component.html',
  styleUrls: ['./logout-home.component.scss']
})
export class LogoutHomeComponent implements OnInit, OnDestroy {

  tagState$: Observable<ProfileModal>;
  userDetails = initialTag;
  private subscription: Subscription;
  homeSlider: NguCarousel;
  base_image = environment.API_IMAGE;

  constructor(
    private profileStore: Store<ProfileModal>,
    private router: Router
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
  }

  ngOnInit() {
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });


    this.homeSlider = {
      grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
      slide: 1,
      speed: 4000,
      // interval: 4000,
      custom: 'banner',
      point: {
        visible: false,
        pointStyles: `
          .ngucarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            bottom: 20px;
            left: 0;
            box-sizing: border-box;
          }
          .ngucarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.55);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngucarouselPoint li.active {
              background: white;
              width: 10px;
          }
        `
      },
      load: 1,
      loop: true,
      touch: true
    }
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  /* This will be triggered after carousel viewed */
  afterCarouselViewedFn(data) {
  }

  /* It will be triggered on every slide*/
  onmoveFn(data: NguCarouselStore) {
  }

}
