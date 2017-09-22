import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe, Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ProfileHelper } from '../../../helpers/profile.helper';
import { TokenService } from '../../../helpers/token.service';

import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
// action
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';

import { ActivatedRoute, Router } from '@angular/router';
// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-about-cover',
  templateUrl: './about-cover.component.html',
  providers: [ ModalService ],
  styleUrls: ['./about-cover.component.scss']
})

export class AboutCoverComponent implements OnInit {
  public bioForm: FormGroup;
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  stateProfile = initialTag;
  userProfile: any;
  ownProfile: boolean;
  data: any;
  changingImage: boolean;
  cropperSettings: CropperSettings;
  @ViewChild('coverImage') fileInput;

  constructor(
    private _http: Http,
    private _modalService: ModalService,
    public tokenService: TokenService,
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _utils: ProfileHelper,
    private _location: Location,
    private _store: Store<ProfileModal>
  ) {
    this.tagState$ = this._store.select('profileTags');
    this.tagState$.subscribe((state) => {
      console.log(state);
      this.stateProfile = state;
    });

    // Image Cropper Settings
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 1000;
    this.cropperSettings.height = 359;
    this.cropperSettings.croppedWidth = 1000;
    this.cropperSettings.croppedHeight = 359;
    this.cropperSettings.canvasWidth = 880;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.rounded = false;
    this.data = {};
  }

  ngOnInit() {
    //
  }

  isClosed(event: any) {
    this._location.back();
  }

   /**
   * Upload Cover image
   */
  uploadCoverImage() {
    const userHandle = this.stateProfile.profileUser.handle || '';
    if (this.data && this.data.image && userHandle !== '') {
      const imageData = {
        handle: userHandle,
        image: this.data.image.split((/,(.+)/)[1])
      };

      this._store.dispatch({ type: ProfileActions.PROFILE_COVER_UPDATE, payload: imageData });
      this.changingImage = false;
    }
  }
}
