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

import { TAB_COMPONENTS  } from '../../../shared/tabs/tabset';

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
  constructor(
    private http: Http,
    private _router: Router,
    public route: ActivatedRoute,
    private profileStore: Store<ProfileModal>,
  ) {
    this.router = _router;
    this.userId = '';

    // Own Profile
    this.tagState$ = this.profileStore.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.userQuickAccess = state;
    });
  }

  ngOnInit(): void {
    this.checkProfile();
  }

  checkEmpty(obj: Object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
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
