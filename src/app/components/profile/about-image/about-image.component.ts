import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { DatePipe } from '@angular/common';
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

  constructor(
    private _http: Http,
    private _modalService: ModalService,
    public tokenService: TokenService,
    private _fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _utils: ProfileHelper,
    private _store: Store<ProfileModal>
  ) {
    this.tagState$ = this._store.select('profileTags');
    this.tagState$.subscribe((state) => {
      console.log(state);
      this.stateProfile = state;
    });
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
    //
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
    this.router.navigate(['.'], {
      relativeTo: this.route.parent
    });
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
