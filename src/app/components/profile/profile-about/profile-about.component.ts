import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';

// import { TabComponent } from '../../../shared/tab/tab.component';
// import { TabsComponent } from '../../../shared/tabs/tabs.component';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.scss']
})
export class ProfileAboutComponent implements OnInit {

  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  userProfile = initialTag ;
  router: any;
  constructor(
    private http: Http,
    private _router: Router,
    private profileStore: Store<ProfileModal>
  ) {
    this.router = _router;
    this.tagState$ = this.profileStore.select('profileTags');

    this.tagState$.subscribe((state) => {
      this.userProfile = state;
    });

    // this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });

  }

  ngOnInit() {
    //
  }

}
