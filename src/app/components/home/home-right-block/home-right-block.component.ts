import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

import { ProfileActions } from '../../../actions/profile.action';

import { Observable } from 'rxjs/Observable';
import { Subscription, ISubscription } from 'rxjs/Subscription';
import { OpportunityModel } from '../../../models/opportunity.model';
import { Store } from '@ngrx/store';

import { ProfileModal, initialTag } from '../../../models/profile.model';
import { filter as _filter } from 'lodash';
import { OpportunityActions } from '../../../actions/opportunity.action';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'home-right-block',
  templateUrl: './home-right-block.component.html',
  styleUrls: ['./home-right-block.component.scss'],
  // providers: [ TruncatePipe ]
})

export class HomeRightBlockComponent implements OnInit, OnDestroy {
  @Output() followUpdate: EventEmitter<any> = new EventEmitter<any>();
  private subscription: ISubscription;
  private profilesubscription: ISubscription;
  opportunityState$: Observable<OpportunityModel>;
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  myProfile$: Observable<any>;
  baseUrl = environment.API_IMAGE;
  userState: any;
  profiles = [];
  skillCodes = [];
  loadedRecomOpps = false;
  recordsPerPage = 2;
  opportunities: any[];
  imageBaseUrl: string = environment.API_IMAGE;
  people_follow_id: any = '';
  scrolling = 0;
  scrollingLoad = 100;

  constructor(
    private store: Store<ProfileModal>,
    private router: Router,
  ) {
    this.myProfile$ = store.select('profileTags');
    this.opportunityState$ = this.store.select('opportunityTags');
  }

  ngOnInit() {
    this.loadProfiles();
    // observe the opportunity state
    this.subscription = this.opportunityState$.subscribe((state) => {
     // check for the result of recommended opportunities
     if (state && state.get_opportunities_data && state.get_opportunities_data.SUCCESS) {
       this.opportunities = state.get_opportunities_data.SUCCESS;
     }
   });

    this.profilesubscription = this.myProfile$.subscribe((event) => {
      if (event.user_profiles_all_loaded) {
        this.people_follow_id = event.people_follow_scroll_id
      }
      if (typeof event !== 'undefined') {
        this.userState = event;
        if (event['user_profiles_all'] !== 'undefined') {
          this.profiles = event.user_profiles_all;
        }

        // check for user skills
        if (this.userState && this.userState['profile_navigation_details'] && this.userState['profile_navigation_details']['skills'] && this.userState['profile_navigation_details']['skills'].length > 0) {
          // fetching skills in a local var
          const skillsLoaded = this.userState['profile_navigation_details']['skills'];
          // preparing skills as an array of string
          skillsLoaded.forEach((skill, index) => {
            if (skill && skill.code) {
              this.skillCodes.push(skill.code);
            }
            if ((skillsLoaded.length - 1) === index) {
              if (!this.loadedRecomOpps) {
                this.loadRecomOpps();
                this.loadedRecomOpps = true;
              }
            }
          });
        }
      }
    });
  }

  getProfileImage() {
    return _filter(this.profiles, function(item) {
      return item.profileImage !== '';
    });
  }
  /**
   * load recommended opportunities
   */
  loadRecomOpps() {
    const recomSearchParams = {
      // industry: this.skillCodes,
      offset: 0, // initial request
      limit: this.recordsPerPage
    }

    this.store.dispatch({
      type: OpportunityActions.GET_OPPORTUNITIES,
      payload: recomSearchParams
    });
  }

  /**
   * Follow an artist
   * @param user obj
   */
  followUser(user: any) {
    this.store.dispatch({ type: ProfileActions.PROFILE_FOLLOW, payload: user.handle });
    user.extra.isFollowing = true;
    this.store.select('profileTags')
      .first(state => state['profile_other_followed'] === true)
      .subscribe( datas => {
        this.postLoad();
        this.loadChannels();
      });
  }

  /**
   * post user channel
   */
  postLoad() {
    const data = {
      limit: 10,
    }
    this.store.dispatch({ type: ProfileActions.LOAD_USER_FOLLOWING_POSTS, payload: data });
  }

  /**
   * following user channel
   */
  loadChannels() {
    const body = {
      limit: 9
    }

    this.store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_FOLLOWING_CHANNEL, payload: body });
  }

  /**
   * Unfollow an artist
   * @param user obj
   */
  unfollowUser(user: any) {
    this.store.dispatch({ type: ProfileActions.PROFILE_UNFOLLOW, payload: user.handle });
    user.extra.isFollowing = false;
  }

  disableFollowForSelf(username: string) {
    if (this.userState && (this.userState['profile_navigation_details']['username']) === username) {
      return true;
    }
    return false;
  }
  loadProfiles() {
    this.store.dispatch({ type: ProfileActions.LOAD_ALL_PROFILES, payload: {
      'isHuman' : '1' ,
      'name': {
        'scrollId': this.people_follow_id
       }
      }});
  }
  onScrol(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 100;
      this.loadProfiles();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.profilesubscription.unsubscribe();
  }

}
