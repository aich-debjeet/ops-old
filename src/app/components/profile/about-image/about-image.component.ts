import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';

import { ProfileActions } from '../../../actions/profile.action';
import { environment } from '../../../../environments/environment';
import { Observable, Subscription } from 'rxjs/Rx';
import { GeneralUtilities } from '../../../helpers/general.utils';

@Component({
  selector: 'app-about-image',
  templateUrl: './about-image.component.html',
  providers: [ModalService]
})

export class AboutImageComponent implements OnInit, OnDestroy {
  tagState$: Observable<ProfileModal>;
  stateProfile = initialTag;
  baseUrl = environment.API_IMAGE;

  profSub: Subscription;
  profileImage: string;

  constructor(
    private _location: Location,
    private _store: Store<ProfileModal>,
    private gUtils: GeneralUtilities
  ) {
    this.tagState$ = this._store.select('profileTags');
    this.profSub = this.tagState$.subscribe((state) => {
      this.stateProfile = state;
      if (this.gUtils.checkNestedKey(this.stateProfile, ['profile_navigation_details', 'profileImage']) && this.stateProfile.profile_navigation_details.profileImage !== '') {
        this.profileImage = this.baseUrl + this.stateProfile.profile_details.profileImage;
      } else {
        this.profileImage = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
      }
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.profSub.unsubscribe();
  }

  /**
   * Attach image url to Profile
   */
  saveImageClick(imgData) {
    const userHandle = this.stateProfile.profile_navigation_details.handle || '';
    if (imgData && userHandle !== '') {
      const imageData = {
        handle: userHandle,
        image: imgData.split((/,(.+)/)[1])
      };
      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_IMAGE, payload: imageData });
      this._store.select('profileTags')
        .first(state => state['profile_img_upload_loaded'] === true)
        .subscribe(() => {
          this.isClosed(null);
        });
    }
  }

  // go back to the page
  isClosed(event?: any) {
    this._location.back();
  }

}
