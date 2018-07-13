import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';

// rx
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.scss']
})
export class ProfileAboutComponent implements OnInit, OnDestroy {

  tagState$: Observable<ProfileModal>;
  private subscription: ISubscription;
  userProfile = initialTag ;
  router: any;
  constructor(
    private _router: Router,
    private profileStore: Store<ProfileModal>
  ) {
    this.router = _router;
    this.tagState$ = this.profileStore.select('profileTags');

    this.subscription = this.tagState$.subscribe((state) => {
      this.userProfile = state;
    });

    // this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });

  }

  ngOnInit() {
    //
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
