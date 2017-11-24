import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class LogoutHomeComponent implements OnInit, OnDestroy {

  tagState$: Observable<ProfileModal>;
  userDetails = initialTag;
  private subscription: Subscription;

  constructor(
    private profileStore: Store<ProfileModal>,
    private router: Router
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
  }

  ngOnInit() {
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });

    this.subscription = this.profileStore.select('profileTags')
      .first(profile => profile['profileUser'].username)
      .subscribe( datas => {
        console.log(datas);
        this.router.navigate(['/home']);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
