import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.scss']
})
export class ProfileAboutComponent implements OnInit, OnDestroy {

  tagState$: Observable<ProfileModal>;
  private profSub: ISubscription;
  userProfile = initialTag ;

  constructor(
    private profileStore: Store<ProfileModal>
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    this.profSub = this.tagState$.subscribe((state) => {
      this.userProfile = state;
    });
  }

  ngOnInit() {
    //
  }

  ngOnDestroy() {
    this.profSub.unsubscribe();
  }

}
