import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { FormGroup } from '@angular/forms';
import { TokenService } from '../../../helpers/token.service';

import { ProfileActions } from '../../../actions/profile.action';
import { environment } from '../../../../environments/environment.prod';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-about-cover',
  templateUrl: './about-cover.component.html',
  providers: [ ModalService ],
  styleUrls: ['./about-cover.component.scss']
})

export class AboutCoverComponent implements OnInit {
  tagState$: Observable<ProfileModal>;
  stateProfile = initialTag;
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
    this.baseUrl = environment.API_IMAGE;

    this.tagState$ = this._store.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.stateProfile = state;
    });
  }

  ngOnInit() {
    this.tagState$
    .first(profile => this.stateProfile.profile_details.coverImage)
    .subscribe( data => {
      this.loadCoverImage();
    });
  }

  /**
   * Upload Cover image
   */
  uploadCoverImage() {
    const userHandle = this.stateProfile.profile_navigation_details.handle || '';
    if (this.croppedImage && userHandle !== '') {
      const imageData = {
        handle: userHandle,
        image: this.croppedImage.split((/,(.+)/)[1])
      };
      this.disableSave = true;
      this._store.dispatch({ type: ProfileActions.PROFILE_COVER_UPDATE, payload: imageData });
      this.changingImage = false;
      this._store.select('profileTags')
        .first(state => state['cover_img_upload_success'] === true)
        .subscribe(() => {
          this.isClosed(null);
        });
    }
  }

  loadCoverImage() {
    let profileImageURL;
    if (typeof this.stateProfile.profile_navigation_details.profileImage !== 'undefined') {
      profileImageURL = this.baseUrl + this.stateProfile.profile_navigation_details.profileImage;
    } else {
      profileImageURL = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
    }
    this.croppedImage = profileImageURL;
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
