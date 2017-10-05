import { Component, OnInit } from '@angular/core';
import { FooterComponent } from './../../shared/footer/footer.component';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ProfileModal, initialTag, ProfileCard } from '../../models/profile.model';

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
export class LogoutHomeComponent implements OnInit {

  tagState$: Observable<ProfileModal>;
  userDetails = initialTag;

  constructor(
    private profileStore: Store<ProfileModal>,
    private router: Router
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
  }

  ngOnInit() {
    const currentUrl = this.router.url;
    // console.log('currentUrl');
    // console.log(currentUrl);
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });

    this.tagState$.subscribe((state) => {
      this.userDetails = state;
      // console.log(this.userDetails);
      if (currentUrl === '/' && typeof this.userDetails.profileUser.username !== 'undefined') {
        // this.router.navigate(['/profile/user']);
        // console.log('redirecting');
      }
    });
  }

}
