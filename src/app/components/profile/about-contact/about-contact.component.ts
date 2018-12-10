import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { ProfileModal, initialTag } from '../../../models/profile.model';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-about-contact',
  templateUrl: './about-contact.component.html',
  styleUrls: ['./about-contact.component.scss']
})
export class AboutContactComponent implements OnInit, OnDestroy {
  tagState$: Observable<ProfileModal>;
  profSub: Subscription;
  stateProfile = initialTag;
  imageBaseUrl = environment.API_IMAGE;
  userProfile: any;
  ownProfile: boolean;

  constructor(
    private profileStore: Store<ProfileModal>
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    // this.profSub = this.tagState$.subscribe((state) => {
    //   this.stateProfile = state;
    //   if (state.profile_user_info) {
    //     if (this.stateProfile.profile_user_info.isCurrentUser === false && this.stateProfile.profile_other_loaded === true) {
    //       this.ownProfile = false;
    //       this.userProfile = this.stateProfile.profile_other;
    //     } else {
    //       this.ownProfile = true;
    //       this.userProfile = this.stateProfile.profile_details;
    //     }
    //   }
    // });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.profSub.unsubscribe();
  }

}
