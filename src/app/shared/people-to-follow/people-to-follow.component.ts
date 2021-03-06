import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ProfileActions } from 'app/actions/profile.action';
import { ProfileModal } from 'app/models/profile.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-people-to-follow',
  templateUrl: './people-to-follow.component.html',
  styleUrls: ['./people-to-follow.component.scss']
})
export class PeopleToFollowComponent implements OnInit, OnDestroy {

  @Input() page: string;

  baseUrl = environment.API_IMAGE;
  profileState$: any;
  profSub: Subscription;
  profiles = [];

  scrolling = 0;
  scrollingLoad = 100;
  people_follow_id = '';

  constructor(
    private store: Store<ProfileModal>
  ) { }

  ngOnInit() {
    this.loadProfiles(null);
    this.profileState$ = this.store.select('profileTags');
    this.profSub = this.profileState$.subscribe((profile) => {
      if (typeof profile !== 'undefined') {
        if (profile['user_profiles_all']) {
          this.profiles = profile.user_profiles_all;
        }
        if (profile.user_profiles_all_loaded) {
          this.people_follow_id = profile.people_follow_scroll_id
        }
      }
    });
  }

  loadProfiles(value) {
    this.store.dispatch({
      type: ProfileActions.LOAD_ALL_PROFILES, payload: {
        isHuman: '1',
        name: {
          scrollId: value === null ? null : this.people_follow_id
        }
      }
    });
  }

  onScroll(e) {
    this.scrolling = e.currentScrollPosition;
    if (this.scrollingLoad <= this.scrolling) {
      this.scrollingLoad += 100;
      this.loadProfiles(this.people_follow_id);
    }
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
      .subscribe(datas => {
        if (this.page && this.page === 'home') {
          this.postLoad();
          // this.loadChannels();
        }
      });
  }

  /**
   * Unfollow an artist
   * @param user obj
   */
  unfollowUser(user: any) {
    this.store.dispatch({ type: ProfileActions.PROFILE_UNFOLLOW, payload: user.handle });
    user.extra.isFollowing = false;
  }

  /**
   * post user channel
   */
  postLoad() {
    const data = {
      limit: 10,
      scrollId: null
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

  ngOnDestroy() {
    this.profSub.unsubscribe();
  }

}
