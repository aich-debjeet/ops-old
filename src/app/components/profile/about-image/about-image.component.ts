import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { TokenService } from '../../../helpers/token.service';

import { ProfileActions } from '../../../actions/profile.action';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-about-image',
  templateUrl: './about-image.component.html',
  providers: [ ModalService ],
  styleUrls: ['./about-image.component.scss']
})

export class AboutImageComponent implements OnInit {
  tagState$: Observable<ProfileModal>;
  stateProfile = initialTag;
  data: any;
  changingImage: boolean;
  baseUrl: string;

  imageChangedEvent = '';
  croppedImage = '';
  hidePreview = false;
  disableSave = true;

  constructor(
    public tokenService: TokenService,
    private _location: Location,
    private _store: Store<ProfileModal>
  ) {

    this.tagState$ = this._store.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.stateProfile = state;
    });

    this.baseUrl = environment.API_IMAGE;
    this.changingImage = false;
  }

  ngOnInit() {
    this.tagState$
      .first(profile => this.stateProfile.profile_navigation_details.profileImage)
      .subscribe(() => {
        this.loadImage();
      });
  }

  loadImage() {
    let profileImageURL;
    if (typeof this.stateProfile.profile_details.profileImage !== 'undefined') {
      profileImageURL = this.baseUrl + this.stateProfile.profile_details.profileImage;
    } else {
      profileImageURL = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
    }
    this.croppedImage = profileImageURL;
  }

  /**
   * Attach image url to Profile
   */
  saveImageClick() {
    const userHandle = this.stateProfile.profile_navigation_details.handle || '';
    if (this.croppedImage && userHandle !== '') {
      const imageData = {
        handle: userHandle,
        image: this.croppedImage.split((/,(.+)/)[1])
      };
      this.disableSave = true;
      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_IMAGE, payload: imageData });
      this.changingImage = false;
      this._store.select('profileTags')
        .first(state => state['image_upload_success'] === true)
        .subscribe(() => {
          this.isClosed(null);
          this._store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
          this._store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS});
        });
    }
  }

  // go back to the page
  isClosed(event: any) {
    this._location.back();
  }

  // event to check for file selection
  fileChangeEvent(event: any): void {
    this.disableSave = false;
    this.imageChangedEvent = event;
  }

  // event for image crop
  imageCropped(image: string) {
    this.croppedImage = image;
    this.hidePreview = true;
  }

  // image loaded
  imageLoaded() {}

}
