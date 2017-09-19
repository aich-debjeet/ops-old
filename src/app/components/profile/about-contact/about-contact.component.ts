import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { UserMedia } from '../../../models/user-media.model';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-about-contact',
  templateUrl: './about-contact.component.html',
  styleUrls: ['./about-contact.component.scss']
})
export class AboutContactComponent implements OnInit {
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  stateProfile = initialTag;
  userProfile: any;
  ownProfile: boolean;

  constructor(
    private http: Http,
    private profileStore: Store<ProfileModal>
  ) {
    this.tagState$ = this.profileStore.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.stateProfile = state;
      if (this.stateProfile.current_user_profile && this.stateProfile.profile_other_loaded === true) {
        this.ownProfile = false;
        this.userProfile = this.stateProfile.profile_other;
      }else {
        this.ownProfile = true;
        this.userProfile = this.stateProfile.profileDetails;
      }
    });
  }

  ngOnInit() {
  }

}
