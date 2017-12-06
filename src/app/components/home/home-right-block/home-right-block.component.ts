import { Component, OnInit } from '@angular/core';

import { ProfileActions } from '../../../actions/profile.action';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { OpportunityModel } from '../../../models/opportunity.model';
import { Store } from '@ngrx/store';

import { ProfileModal, initialTag } from '../../../models/profile.model';
import { filter as _filter } from 'lodash';
import { OpportunityActions } from '../../../actions/opportunity.action';

@Component({
  selector: 'home-right-block',
  templateUrl: './home-right-block.component.html',
  styleUrls: ['./home-right-block.component.scss']
})

export class HomeRightBlockComponent implements OnInit {
  opportunityState$: Observable<OpportunityModel>;
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  myProfile$: Observable<any>;
  userState: any;
  profiles: any;
  skillCodes = [];
  loadedRecomOpps = false;
  recordsPerPage = 2;
  opportunities: any[];


  constructor(
    private store: Store<ProfileModal>
  ) {
    this.myProfile$ = store.select('profileTags');
    this.opportunityState$ = this.store.select('opportunityTags');
  }

  ngOnInit() {
    this.store.dispatch({ type: ProfileActions.LOAD_ALL_PROFILES, payload: '' });

    // observe the opportunity state
    this.opportunityState$.subscribe((state) => {
      console.log('opportunityState', state);
     // check for the result of recommended opportunities
     if (state && state.get_opportunities_data && state.get_opportunities_data.SUCCESS) {
       this.opportunities = state.get_opportunities_data.SUCCESS;
       // console.log('this.opportunities', this.opportunities);
     }
   });

    this.myProfile$.subscribe(event => {
      this.profiles = event.user_profiles_all;
      this.userState = event;
      console.log('user state' , this.userState)
      console.log('this.profiles ', this.profiles)
            // check for user skills
            if (this.userState && this.userState['profile_navigation_details'] && this.userState['profile_navigation_details']['skills'] && this.userState['profile_navigation_details']['skills'].length > 0) {
              // fetching skills in a local var
              const skillsLoaded = this.userState['profile_navigation_details']['skills'];
              // console.log(skillsLoaded)
              // preparing skills as an array of string
              skillsLoaded.forEach((skill, index) => {
                // console.log('skill.code', skill.code);
                if (skill && skill.code) {
                  this.skillCodes.push(skill.code);
                }
                if ((skillsLoaded.length - 1) === index) {
                  if (!this.loadedRecomOpps) {
                    this.loadRecomOpps();
                  }
                }
              });
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
      industry: this.skillCodes,
      offset: 0, // initial request
      limit: this.recordsPerPage
    }
    // console.log('dispatch recommended opportunities');
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
    console.log(user)
    this.store.dispatch({ type: ProfileActions.PROFILE_FOLLOW, payload: user.handle });
    user.extra.isFollowing = true;
  }

  /**
   * Unfollow an artist
   * @param user obj
   */
  unfollowUser(user: any) {
    console.log(user)
    this.store.dispatch({ type: ProfileActions.PROFILE_UNFOLLOW, payload: user.handle });
    user.extra.isFollowing = false;
  }

  disableFollowForSelf(username: string) {
    if (this.userState && (this.userState['profile_navigation_details']['username']) === username) {
      return true;
    }
    return false;
  }

}
