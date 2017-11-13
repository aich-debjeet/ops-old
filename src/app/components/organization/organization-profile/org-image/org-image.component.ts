import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe, Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../../models/profile.model';
import { ModalService } from '../../../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { TokenService } from '../../../../helpers/token.service';

import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
// action
import { OrganizationActions } from '../../../../actions/organization.action';
import { ProfileActions } from '../../../../actions/profile.action';
import { SharedActions } from '../../../../actions/shared.action';

import { ActivatedRoute, Router, Params } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

// rx
import { Subscription } from 'rxjs/Subscription';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-org-image',
  templateUrl: './org-image.component.html',
  providers: [ ModalService ],
  styleUrls: ['./org-image.component.scss']
})
export class OrgImageComponent implements OnInit {

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
  orgHandle: string;
  stateOrg: any;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor(
    private _http: Http,
    private _modalService: ModalService,
    public tokenService: TokenService,
    private _fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _location: Location,
    private _store: Store<ProfileModal>
  ) {

    this.tagState$ = this._store.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.stateProfile = state;
      console.log(state);
    });

    this._store.select('organizationTags').subscribe((state) => {
      this.stateOrg = state;
    });

    // Get own user handle
    this._store.select('profileTags')
      .first(profile => profile['profileUser'].organization )
      .subscribe( data => {
        if (data['profileUser'].organization) {
          this.orgHandle = data['profileUser'].organization.organizationHandle;
        }
      });

    this.baseUrl = environment.API_IMAGE;
    this.changingImage = false;

    // Image Cropper Settings
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 300;
    this.cropperSettings.croppedHeight = 300;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.rounded = false;
    this.cropperSettings.noFileInput = true;
    this.data = {};
  }

  ngOnInit() {
    this.tagState$
      .first(profile => this.stateProfile.profileUser.profileImage)
      .subscribe( data => {
        this.loadImage();
      });
  }

  loadImage() {
    const self = this;
    // loading profile image
    const ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
    const img = new Image();
    img.onload = function(){
      self.drawImageProp(ctx, this, 0, 0, self.cropperSettings.canvasWidth, self.cropperSettings.canvasHeight, 0.1, 0.5);
    };

    let profileImageURL;
    if (typeof this.stateProfile.profileUser.organization.organizationImage !== 'undefined') {
      profileImageURL = this.baseUrl + this.stateProfile.profileUser.organization.organizationImage;
    } else {
      profileImageURL = 'https://s3-us-west-2.amazonaws.com/ops.defaults/user-avatar-male.png';
    }
    img.src = profileImageURL;
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
    const userHandle = this.orgHandle;
    if (this.data && this.data.image && userHandle !== '') {
      const imageData = {
        handle: userHandle,
        image: this.data.image.split((/,(.+)/)[1])
      };

      this._store.dispatch({ type: OrganizationActions.IMAGE_UPLOAD_SERVER, payload: imageData });
      this.changingImage = false;
    }

    // Get own user handle
    this._store.select('organizationTags')
      .first(org => org['image_upload_success'] === true)
      .subscribe( data => {
        console.log('upload sucess');
        const image = data['profileImage'].repoPath;
        this.updateProfileImage(image);
      });
  }

  /**
   * Profile Image Upload
   * @param image
   */
  updateProfileImage(image) {
    const data = {
      handle: this.orgHandle,
      body: {
        organizationImage: image
      }
    }
    this._store.dispatch({ type: OrganizationActions.ORG_PROFILE_UPDATE, payload: data });

    // profile update sucess
    this._store.select('organizationTags')
      .first(org => org['org_profile_update_success'] === true)
      .subscribe( orgUpdate => {
        console.log('profile upload sucess');
        this._store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
        this.uploadCompeleted();
      });
  }


  uploadCompeleted() {
    // Get own user handle
    this._store.select('profileTags')
      .first(profile => profile['current_user_profile_loading'] === true )
      .subscribe( data => {
        console.log('upload compeleted');
        this._location.back();
        this.toastr.success('Organization profile image updated');
      });
  }

  fileChangeListener($event) {
      let image: any = new Image();
      let file: File = $event.target.files[0];
      let myReader: FileReader = new FileReader();
      let that = this;
      myReader.onloadend = function (loadEvent: any) {
          image.src = loadEvent.target.result;
          that.cropper.setImage(image);

      };

      myReader.readAsDataURL(file);
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
      data.append('file', this.dataURItoBlob(imageData), fileName );
      return data;
    }
  }

}