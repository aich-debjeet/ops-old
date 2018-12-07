import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProfileActions } from './../../actions/profile.action';
import { Spotfeed } from './../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { environment } from './../../../environments/environment'
import { NgxMasonryOptions } from 'ngx-masonry';

@Component({
  selector: 'app-spotfeed',
  templateUrl: './spotfeed.component.html',
  styleUrls: ['./spotfeed.component.scss']
})
export class SpotfeedComponent {

  baseUrl: string;
  spotfeedId: string;
  spotfeedDetails: any;
  userState$: Observable<Spotfeed>;
  userState: any;
  page_start = 0;
  page_end = 20;
  scrolling = 0;
  scrollingLoad = 2000;
  masonryOptions: NgxMasonryOptions = {
    transitionDuration: '0s',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _store: Store<Spotfeed>,
  ) {

    this.baseUrl = environment.API_IMAGE;
    this.userState$ = this._store.select('profileTags');

    this.userState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        this.userState = state;
        this.spotfeedDetails = state['spotfeed_detail'];
        // this.spotfeedPosts = this.spotfeedDetails.spotfeedMedia;

        // filtering artists
        if (this.spotfeedDetails && typeof this.spotfeedDetails.spotfeedProfiles !== 'undefined') {
          // remove loggedn in user profile
          // filtering artists duplicate profiles
          const currentUserHandle = this.userState.profile_navigation_details.handle;
          this.spotfeedDetails.spotfeedProfiles = _.remove(this.spotfeedDetails.spotfeedProfiles, function (currentObject) {
            return currentObject.handle !== currentUserHandle;
          });
          // filtering artists duplicate profiles
          this.spotfeedDetails.spotfeedProfiles = _.uniqBy(this.spotfeedDetails.spotfeedProfiles, 'handle');
        }
        // filtering media duplicate profiles
        if (this.spotfeedDetails && typeof this.spotfeedDetails.spotfeedMedia !== 'undefined') {
          this.spotfeedDetails.spotfeedMedia = _.uniqBy(this.spotfeedDetails.spotfeedMedia, 'id');
        }
      }
    });

    // load the spotfeed
    this.spotfeedId = route.snapshot.params['id'];
    this.loadPostFeed();

    // subsribe for the route change
    router.events.subscribe((newRoute) => {
      // this.spotfeedId = route.snapshot.params['id'];
      // this.loadPostFeed();
    });
  }

  disableFollowForSelf(username: string) {
    if (username === this.userState.profile_navigation_details.username) {
      return true;
    }
    return false;
  }

  /**
   * Get Post feed
   */

  loadPostFeed() {
    const data = {
      handle: this.spotfeedId,
      page_start: this.page_start,
      page_end: this.page_end
    }
    this._store.dispatch({ type: ProfileActions.GET_SPOTFEED_DETAILS, payload: data });
  }

  onScroll(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 1500
      this.page_start = this.page_end + 1;
      this.page_end += 15;
      this.loadPostFeed();
    }
  }

  loadSpotfeed(spotfeedId: any) {
    this.spotfeedId = spotfeedId;
    this.page_start = 0;
    this.page_end = 20;
    this.loadPostFeed();
    this.router.navigate(['/spotfeed/' + spotfeedId]);
  }

}
