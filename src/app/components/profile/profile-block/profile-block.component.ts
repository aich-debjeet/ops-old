import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { TabComponents  } from '../../../shared/tabs/tabset';
import { ProfileHelper } from '../../../helpers/profile.helper';

@Component({
  selector: 'app-profile-block',
  templateUrl: './profile-block.component.html',
  styleUrls: ['./profile-block.component.scss']
})

export class ProfileBlockComponent implements OnInit {
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  userQuickAccess = initialTag;
  router: any;
  activeUser: string;
  isCurrentUser: boolean;
  userName: string;
  sub: any;
  routeData: any;
  userId: string;
  channels: any;
  profileObject: any;
  constructor(
    private http: Http,
    private _router: Router,
    public route: ActivatedRoute,
    private utils: ProfileHelper,
    private profileStore: Store<ProfileModal>,
  ) {
    this.router = _router;
    this.userId = '';

    // Own Profile
    this.tagState$ = this.profileStore.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.userQuickAccess = state;
      if (state.profile_user_info) {
        if (state.profile_user_info.isCurrentUser) {
          this.profileObject = this.loadProfile( state, 'own' );
        } else {
          if (state.profile_user_info.isClaimForGuest && state.profile_user_info.isClaimForGuest === true) {
            // console.log('state.profile_other', state.profile_other);
            if (state.profile_other && state.profile_other.length !== 0) {
              const profile = state.profile_other;
              this.profileObject = {
                name: profile.name.firstName + ' ' + profile.name.lastName,
                image: { profile: '', cover: '' },
                userHandle: profile.username,
                userBio: '',
                userSkill: '',
                userDetails: profile,
                followingCount: 0,
                follwerCount: 0,
                extra: { isImported: true },
                isFollowing: false
              };
              console.log('claim');
            }
          } else {
            console.log('other');
            this.profileObject = this.loadProfile( state, 'other' );
          }
        }
      }
    });
  }

  ngOnInit(): void {
    this.checkProfile();
  }

  checkEmpty(obj: Object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

   /**
   * User type based user load
   */
  loadProfile(profile: any, type: string) {
      return this.utils.profileValueMapping(profile, type );
  }

  /**
   * Load a Profile
   */
  checkProfile() {
    this.sub = this.router.routerState.parent(this.route)
      .params.subscribe(params => {
        if (this.checkEmpty(params)) {
          this.isCurrentUser = true;
        } else {
          this.userName = params['id'];
          this.isCurrentUser = false;
        }
      });
  }
}
