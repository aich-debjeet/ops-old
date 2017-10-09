import { Component, OnInit } from '@angular/core';
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

import { ActivatedRoute, Router, Params } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-about-image',
  templateUrl: './about-image.component.html',
  providers: [ ModalService ],
  styleUrls: ['./about-image.component.scss']
})

export class AboutImageComponent implements OnInit {
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
    // this.route.params.subscribe((params: Params) => {
    //   console.log('route: ', params);
    // });

    this.baseUrl = environment.API_IMAGE;
    this.tagState$ = this._store.select('profileTags');
    this.changingImage = false;

    // Image Cropper Settings
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 300;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.rounded = true;
    this.data = {};
  }

  ngOnInit() {
    // if (typeof this.router.url !== 'undefined') {
    //   console.log('url', this.router.url);
    // }
    this.tagState$.subscribe((state) => {
      // console.log(state);
      this.stateProfile = state;
      if (typeof this.stateProfile.profileUser.profileImage !== 'undefined' && this.router.url === '/profile/about/image') {
        console.log('profile image loaded');
        this.loadImage();
      }
    });
  }

  loadImage() {
    const self = this;
    // loading profile image
    const ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
    const img = new Image();
    img.onload = function(){
      // const imgHeight = img.height;
      // const imgWidth = img.width;
      // ctx.drawImage(img, 0, 0, self.cropperSettings.canvasHeight, self.cropperSettings.canvasWidth);
      self.drawImageProp(ctx, this, 0, 0, self.cropperSettings.canvasWidth, self.cropperSettings.canvasHeight, 0.1, 0.5);
    };
    const imageSrc = this.baseUrl + this.stateProfile.profileUser.profileImage;
    // console.log('imageSrc', imageSrc);
    img.src = imageSrc;
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


  /**
   * Attach image url to Profile
   */
  saveImageClick() {
    const userHandle = this.stateProfile.profileUser.handle || '';
    if (this.data && this.data.image && userHandle !== '') {
      const imageData = {
        handle: userHandle,
        image: this.data.image.split((/,(.+)/)[1])
      };

      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_IMAGE, payload: imageData });
      this.changingImage = false;
    }
  }

  isClosed(event: any) {
    this._location.back();
  }

  /**
   * Convert URI to Blob
   * @param dataURI
   */
  dataURItoBlob(dataURI: any) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = decodeURI(dataURI.split(',')[1]);
    }

    // Seperate out the MIME component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // Write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i ++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type: mimeString});
  }

  /**
   * Upload Image
   * @param ImageObj
   */
  buildImageForm(formValue: any) {
    // let fileData:FormData = new FormData();
    let data = new FormData();
    // Check if image is present
    if (formValue.image && formValue.image[0]) {
      const imageData = formValue.image[0];
      const imageType = (imageData.substring('data:image/'.length, imageData.indexOf(';base64')));
      // Create random file name
      const randm = Math.random().toString(36).slice(2);
      const fileName = 'prof_' + randm + '.' + imageType;

      console.log('x');

      data.append('file', this.dataURItoBlob(imageData), fileName );
      return data;
    }
  }

}
