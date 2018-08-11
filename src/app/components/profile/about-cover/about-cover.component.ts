import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { FormGroup } from '@angular/forms';
import { TokenService } from '../../../helpers/token.service';

import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';

// action
import { ProfileActions } from '../../../actions/profile.action';

import { environment } from '../../../../environments/environment.prod';

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
  baseUrl: string;
  coverImageChosen = false;

  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;
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

    // Image Cropper Settings
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 1000;
    this.cropperSettings.height = 359;
    this.cropperSettings.croppedWidth = 1000;
    this.cropperSettings.croppedHeight = 359;
    this.cropperSettings.canvasWidth = 880;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.rounded = false;
    this.cropperSettings.fileType = 'image/png';
    this.cropperSettings.noFileInput = true;
    this.data = {};
  }

  ngOnInit() {
    this.tagState$
    .first(profile => this.stateProfile.profile_details.coverImage)
    .subscribe( data => {
      this.loadCoverImage();
      this.stateProfile.cover_img_upload_success = false;
    });
  }

  isClosed(event: any) {
    this._location.back();
  }

  fileChangeListener($event) {
      const image: any = new Image();
      const file: File = $event.target.files[0];
      const myReader: FileReader = new FileReader();
      const that = this;
      myReader.onloadend = function (loadEvent: any) {
        image.src = loadEvent.target.result;
        that.cropper.setImage(image);
        that.coverImageChosen = true;
      };

      myReader.readAsDataURL(file);
  }

   /**
   * Upload Cover image
   */
  uploadCoverImage() {
    const userHandle = this.stateProfile.profile_navigation_details.handle || '';
    if (this.data && this.data.image && userHandle !== '') {
      const imageData = {
        handle: userHandle,
        image: this.data.image.split((/,(.+)/)[1])
      };

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
    const self = this;
    // loading profile image
    const ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
    const img = new Image();
    img.onload = function(){
      const imgHeight = 880;
      const imgWidth = 300;
      self.drawImageProp(ctx, this, 0, 0, self.cropperSettings.canvasWidth, self.cropperSettings.canvasHeight, 0.1, 0.5);
    };

    let coverImageURL;
    if (typeof this.stateProfile.profile_details.coverImage !== 'undefined') {
      coverImageURL = this.baseUrl + this.stateProfile.profile_details.coverImage;
    } else {
      coverImageURL = 'https://www.dropbox.com/s/kskr4b3c0afc59i/default_coverImage__opt.jpg?raw=1';
    }
    img.src = coverImageURL;
  }

  /**
   * Fitting the profile image to the canvas
   */
  drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
    if (arguments.length === 2) {
        x = y = 0;
        w = ctx.canvas.width;
        h = ctx.canvas.height;
    }
    /// default offset is center
    offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
    offsetY = typeof offsetY === 'number' ? offsetY : 0.5;
    /// keep bounds [0.0, 1.0]
    if (offsetX < 0) { offsetX = 0 };
    if (offsetY < 0) { offsetY = 0 };
    if (offsetX > 1) { offsetX = 1 };
    if (offsetY > 1) { offsetY = 1 };
    const iw = img.width;
    const ih = img.height;
    const r = Math.min(w / iw, h / ih);
    let nw = iw * r;   /// new prop. width
    let nh = ih * r;   /// new prop. height
    let cx = 1, cy = 1, cw = 1, ch = 1;
    let ar = 1;
    /// decide which gap to fill
    if (nw < w) { ar = w / nw };
    if (nh < h) { ar = h / nh };
    nw *= ar;
    nh *= ar;
    /// calc source rectangle
    cw = iw / (nw / w);
    ch = ih / (nh / h);
    cx = (iw - cw) * offsetX;
    cy = (ih - ch) * offsetY;
    /// make sure source rectangle is valid
    if (cx < 0) { cx = 0 };
    if (cy < 0) { cy = 0 };
    if (cw > iw) { cw = iw };
    if (ch > ih) { ch = ih };
    /// fill image in dest. rectangle
    ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
  }
}
