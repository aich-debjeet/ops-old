import { environment } from '../../../../environments/environment.prod';
import { Component, OnInit, ViewChild} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { UserMedia } from '../../../models/user-media.model';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { TokenService } from '../../../helpers/token.service';

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
  providers: [ModalService, DatePipe],
  styleUrls: ['./profile-slider.component.scss']
})
export class ProfileSliderComponent implements OnInit {
  changingImage: boolean;
  data: any;
  cropperSettings: CropperSettings;
  tagState$: Observable<ProfileModal>;
  private tagStateSubscription: Subscription;
  userProfile = initialTag ;
  public profileForm: FormGroup;
  baseUrl: string;
  coverImage: string;
  @ViewChild('profileImage') fileInput;

  constructor(
    private http: Http,
    public modalService: ModalService,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    public tokenService: TokenService,
    private profileStore: Store<ProfileModal>
  ) {

    this.baseUrl = environment.API_IMAGE;

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
    this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE_DETAILS });
    this.buildEditForm();

  }

  changingImageClick() {
    this.changingImage = true;
    this.modalService.open('ChangeProfile');
  }

  /**
   * Present Profile Cover Image
   */
  profileImageStyle(user: any) {
    console.log(user);
    const img = user.profileUser.coverImageList;
    let coverImageURL;
    if (img == null || img === '') {
      coverImageURL = 'https://dl.dropboxusercontent.com/content_link/2X7ZfUULj6yEB3Lae345IgX23QuaapF23uf0ayijh5SlHrHVBKYrKZXQfPemdFCh/file';
    } else {
      coverImageURL = this.baseUrl + img;
    }
    const resp = {
      'background-image': 'url(' + coverImageURL + ')',
      'background-size': 'cover'
    }

    console.log(resp);
    return resp;
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
      this.profileStore.dispatch({ type: ProfileActions.LOAD_PROFILE_IMAGE, payload: data });
      this.profileStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_PROFILE });
      this.changingImage = false;
    }
  }

  isClosed(event) {
    this.changingImage = event;
  }

  ngOnInit() {
    //
  }

  /**
   * Profile Page Edit
   */
  profileEdit() {

    this.modalService.open('profileEditWindow');
    const date = this.datepipe.transform(this.userProfile.profileDetails['physical'].dateOfBirth, 'dd-MM-yyyy');

    this.profileForm.setValue({
      name: this.userProfile.profileDetails['name'],
      bio: this.userProfile.profileUser['bio'],
      username: this.userProfile.profileDetails['extra'].username,
      number: this.userProfile.profileDetails['contact'].mobile.mobile,
      email: this.userProfile.profileDetails['email'],
      website: this.userProfile.profileDetails['contact'].website,
      dob: date
    });
  }

  /**
   * Close a modal window
   * @param id modal ID
   */
  modalCloser(id: string, state: boolean ) {
    if (id != null && state === false) {
      this.modalService.close(id);
    }

    if (id != null && state === true) {
      this.modalService.open(id);
    }
  }

  /**
   * Reserve date
   * @param string
   */
  reverseDate(string) {
    if (string != null) {
      return string.split('-').reverse().join('-');
    }
  }

  /**
   * Profile Form Popup close
   */
  profileFormClose() {
    this.modalService.close('profileEditWindow');
  }

  /**
   * Add current user Work
   */
  deleteAddWork(id) {
    this.profileStore.dispatch({ type: ProfileActions.DELETE_USER_WORK, payload: id});
    // console.log(value);
  }

  /**
   * Edit Form Submit
   */
  profileFormSubmit(value) {

    const form =  {
      'extras': {
        'association': {
          'summary': value.bio
        },
        'contact': {
          'mobile': value.number,
          'website': value.website
        }
      },
      'address': {
        'city': 'City',
        'state': 'State'
      },
      'physical': {
        'dateOfBirth': this.reverseDate(value.dob) + 'T05:00:00',
          'height': 0.0,
          'weight': 0.0,
      },
      'name': {
        'firstName': value.name,
        'displayName': value.name
      }
      // 'email': 'Email Address'
    }

    this.profileStore.dispatch({ type: ProfileActions.LOAD_PROFILE_UPDATE, payload: form});
    this.modalService.close('profileEditWindow');
  }

  /**
   * Form initial value
   */
  buildEditForm(): void {
    this.profileForm = this.fb.group({
      'name' : ['' , [Validators.required]],
      'bio' : ['' , [Validators.required]],
      'username' : [{value: '', disabled: true} , [Validators.required]],
      'number' : ['' , [Validators.required]],
      'email' : ['' , [Validators.required]],
      'website' : '',
      'dob' : ['' , [Validators.required]],

    })
    const nameValue = this.userProfile.profileUser['name'];
  }
  /**
   * Upload Cover image
   */
  uploadCoverImage() {
    this.upload();
  }

  /**
   * File Handler
   */
  upload() {
    const fileBrowser = this.fileInput.nativeElement;
    this.profileStore.dispatch({ type: ProfileActions.PROFILE_COVER_UPDATE, payload: fileBrowser });
  }
  /**
   * Toggle Coer Image upload modal
   */
  showCoverImageUploader() {
    this.modalCloser('ChangeCover', true);
    console.log('Showing Coer Image Uploader');
  }
}
