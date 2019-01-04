import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { TokenService } from '../../../helpers/token.service';

import { ProfileActions } from '../../../actions/profile.action';
import { environment } from '../../../../environments/environment.prod';

import { Observable } from 'rxjs/Observable';
import { GeneralUtilities } from '../../../helpers/general.utils';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-about-cover',
  templateUrl: './about-cover.component.html',
  providers: [ModalService]
})

export class AboutCoverComponent implements OnInit, OnDestroy {
  tagState$: Observable<ProfileModal>;
  stateProfile = initialTag;
  changingImage: boolean;
  baseUrl: string;
  profSub: Subscription;
  coverImage: string;

  constructor(
    public tokenService: TokenService,
    private _location: Location,
    private _store: Store<ProfileModal>,
    private gUtils: GeneralUtilities
  ) {
    this.baseUrl = environment.API_IMAGE;

    this.tagState$ = this._store.select('profileTags');
    this.profSub = this.tagState$.subscribe((state) => {
      this.stateProfile = state;
    });
  }

  ngOnInit() {
    this.tagState$
      .first(profile => this.stateProfile.profile_details.profileImage)
      .subscribe(data => {
        this.loadCoverImage();
      });
  }

  ngOnDestroy() {
    this.profSub.unsubscribe();
  }

  /**
   * Upload Cover image
   */
  uploadCoverImage(imgData) {
    const userHandle = this.stateProfile.profile_navigation_details.handle || '';
    if (imgData && userHandle !== '') {
      const imageData = {
        handle: userHandle,
        image: imgData.split((/,(.+)/)[1])
      };
      this._store.dispatch({ type: ProfileActions.PROFILE_COVER_UPDATE, payload: imageData });
      this.changingImage = false;
      this._store.select('profileTags')
        .first(state => state['cover_img_upload_success'] === true)
        .subscribe(() => {
          this.isClosed(null);
          this._store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
          this._store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });
        });
    }
  }

  loadCoverImage() {
    let coverImageURL;
    if (this.gUtils.checkNestedKey(this.stateProfile, ['profile_navigation_details', 'coverImage']) && this.stateProfile.profile_navigation_details.coverImage !== '') {
      coverImageURL = this.baseUrl + this.stateProfile.profile_navigation_details.coverImage;
    } else {
      coverImageURL = 'https://cdn.onepagespotlight.com/img/profile-cover.png';
    }
    this.coverImage = coverImageURL;
  }

  // go back to the page
  isClosed(event: any) {
    this._location.back();
  }
}
