import { Component, OnInit, ViewChild } from '@angular/core';
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
    private _store: Store<ProfileModal>
  ) {
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
    this.data = {};
  }

  ngOnInit() {
    //
  }

  isClosed(event: any) {
    this.router.navigate(['.'], {
      relativeTo: this.route.parent
    });
  }

   /**
   * Upload Cover image
   */
  uploadCoverImage() {
    console.log(this.data );
    const userHandle = this.stateProfile.profileUser.handle || '';
    console.log(userHandle );
    if (this.data && this.data.image && userHandle !== '') {
      const imageData = {
        handle: userHandle,
        image: this.data.image.split((/,(.+)/)[1])
      };

      console.log(imageData);
       this._store.dispatch({ type: ProfileActions.PROFILE_COVER_UPDATE, payload: imageData });

      this._store.select('profileTags').take(2).subscribe(data => {
        console.log(data);
        // console.log('image upload done');
        if (data['cover_img_upload_success'] === true ) {
          console.log('image upload done');
          this._store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });
        }
      })
      // this._store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });

      this.changingImage = false;
    }




    // if (userHandle !== '') {
    //   const fileBrowser = {
    //     image: this.fileInput.nativeElement,
    //     handle: userHandle
    //   }
    //   this._store.dispatch({ type: ProfileActions.PROFILE_COVER_UPDATE, payload: fileBrowser });
    // }
  }
}
