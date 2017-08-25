import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { UserMedia } from '../../../models/user-media.model';

// action
import { ProfileActions } from '../../../actions/profile.action';
import { SharedActions } from '../../../actions/shared.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

@Component({
  selector: 'app-profile-slider',
  templateUrl: './profile-slider.component.html',
  styleUrls: ['./profile-slider.component.scss']
})
export class ProfileSliderComponent implements OnInit {
  changingImage: boolean;
  data: any;
  cropperSettings: CropperSettings;
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  userProfile = initialTag ;

  userProfileHandle = 'J_47578AB2_AB1F_4B56_BB23_A0BFB26EFCE2DEEPASHREE_AEIONE_GMAIL_COM';

  constructor(
    private http: Http,
    private profileStore: Store<ProfileModal>
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.width = 100;
    this.cropperSettings.height = 100;
    this.cropperSettings.croppedWidth = 100;
    this.cropperSettings.croppedHeight = 100;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.rounded = true;
    this.data = {};

    this.tagState$ = this.profileStore.select('profileTags');
    // this.test = 'salabeel';
    this.tagState$.subscribe((state) => {
      this.userProfile = state;
    });

    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_QUICK_ACCESS });

  }

  changingImageClick() {
    this.changingImage = true;
  }
  saveImageClick() {
    if (this.data && this.data.image) {
      const data = {
        profileHandle: this.userProfileHandle,
        image: this.data.image.split((/,(.+)/)[1])
      }
      // console.log(data);
      // return;
       this.profileStore.dispatch({ type: ProfileActions.LOAD_PROFILE_IMAGE, payload: data });
    }
    this.changingImage = false;
  }

  ngOnInit() {

  }
}
