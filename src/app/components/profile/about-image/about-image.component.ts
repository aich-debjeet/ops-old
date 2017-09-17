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
    this.changingImage = false;

    // Image Cropper Settings
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
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
    if (this.data && this.data.image) {
      const data = {
        profileHandle: this.tokenService.getHandle(),
        image: this.data.image.split((/,(.+)/)[1])
      }
      console.log(this.data.image.split((/,(.+)/)[1]));

      this._store.dispatch({ type: ProfileActions.LOAD_PROFILE_IMAGE, payload: data });
      this._store.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });

      this.changingImage = false;
    }
  }

  isClosed(event: any) {
    this.router.navigate(['.'], {
      relativeTo: this.route.parent
    });
  }

}
