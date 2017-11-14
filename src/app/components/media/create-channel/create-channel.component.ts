import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { Http, Headers, Response } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalService } from '../../../shared/modal/modal.component.service';
import { ApiService } from '../../../helpers/api.service';
import { GeneralUtilities } from '../../../helpers/general.utils';

// Action
import { MediaActions } from '../../../actions/media.action';
import { initialMedia, Media } from '../../../models/media.model';
import { AuthActions } from '../../../actions/auth.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

// import { FileUploadService } from '../media/fakeService';
import { ProfileModal, initialTag } from '../../../models/profile.model';
import { ProfileActions } from '../../../actions/profile.action';
import { environment } from './../../../../environments/environment';

import { map as _map } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import * as _ from 'lodash';

// Blog
import { TokenService } from '../../../helpers/token.service';
import { LocalStorageService } from './../../../services/local-storage.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  providers: [ModalService],
  styleUrls: ['./create-channel.component.scss']
})

export class CreateChannelComponent implements OnInit {
  typeSelected: boolean;
  stepNumber: number;
  channelForm: FormGroup;
  tagState$: Observable<ProfileModal>;
  loginTagState$: Observable<any>;
  private tagStateSubscription: Subscription;
  profileChannel = initialTag ;
  channelType: number;
  handle: string;
  channelSavedHere: boolean;
  channelSaved = false;
  people: any;
  tags: any;
  private apiLink: string = environment.API_ENDPOINT;
  industries: any[];
  selectedIndustry = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private http: Http,
    private tokenService: TokenService,
    private localStorageService: LocalStorageService,
    private apiService: ApiService,
    private generalHelper: GeneralUtilities,
    private store: Store<Media> ) {
      this.createChannelForm();
      this.typeSelected = false;
      this.stepNumber = 1;
      this.channelSaved = false;
      this.channelSavedHere = false;
      this.people = [];

      this.handle = '';
      if (this.handle !== '') {
        this.handle = this.tokenService.getHandle();
      }

      this.loginTagState$ = store.select('loginTags');
      this.loginTagState$.subscribe((state) => {
        this.industries = state.industries;
      });

      this.tagState$ = this.store.select('profileTags');
      this.tagState$.subscribe((state) => {
        this.profileChannel = state;
        this.channelSaved = this.profileChannel.channel_saved;

        // Success message
        if (this.channelSavedHere && this.channelSaved === true ) {
          this.toastr.success('Channel Created');
          this.createChannelForm();
          this.channelSavedHere = false;
        }
      });
    }


  showCreatechannelform(channelType: number) {
    this.channelType = channelType;
    this.typeSelected = true;
  }

  selectChannelType(channelType: number) {
    this.channelType = channelType;
    this.switchToStep(2);
  }

  /**
   * switch between steps step
   */
  switchToStep(stepNum: any) {
    this.stepNumber = stepNum;
  }

  /**
   * Status Form
   */
  createChannelForm() {
    // Clear All Tags
    this.people = [];
    this.tags = [];

    // Empty initiate form
    this.channelForm = this.fb.group({
      title: ['', Validators.required ],
      type: ['', Validators.required ],
      desc: ['', Validators.required ],
      privacy: [0, Validators.required ],
      openess: [1]
    })
  }

  /**
   * Limit Channel Media Type based on Selection
   * @param type
   */
  channelTypeConfig(type: number) {
    let flag;
    switch (type) {
      case 1:
        flag = ['image'];
        break;
      case 2:
        flag = ['video'];
        break;
      case 3:
        flag = ['audio'];
        break;
      case 4:
        flag = ['text'];
        break;
      default:
        flag = ['image', 'video', 'audio', 'text'];
        break;
    }
    return flag;
  }

  /**
   * Form Builder
   */
  createChannel(value: any) {
    const userHandle = this.profileChannel.profileUser.handle || '';
    const mediaTypeList = this.channelTypeConfig(this.channelType);

    // Get only handles from user list
    const peopleListAll = this.people;
    const peopleList = _map(peopleListAll, 'handle');

    const peopleListList = [];

    for (const i of peopleList) {
      peopleListList.push({ handle: i });
    }

    let otherFields = {};
    if (peopleListList.length > 0 ) {
      otherFields = { contributerList: peopleListList }
    }

    // set profile handle to user handle
    let profileHandle = userHandle;

    // check if creator is user or organization
    if (localStorage.getItem('accountStatus') !== null) {
      const localStore = JSON.parse(this.localStorageService.theAccountStatus);
      if (localStore.profileType === 'org') {
        profileHandle = localStore.handle;
      }
    }

    if ( this.channelForm.valid === true && profileHandle !== '' ) {

      const channelObj = {
        name: value.title,
        access: Number(value.privacy),
        description: value.desc,
        superType: 'channel',
        accessSettings : { access : Number(value.privacy) },
        owner: profileHandle,
        industryList: [ value.type ],
        mediaTypes: mediaTypeList,
        otherFields
      }

      this.channelSavedHere = true;
      this.store.dispatch({ type: ProfileActions.CHANNEL_SAVE, payload: channelObj });
    } else {
      this.toastr.warning('Please fill all required fields');
    }
  }

  /**
   * Close
   */
  closeChannelCreation(input: any) {
    this.router.navigate(['.', { outlets: { media: null } }], {
      relativeTo: this.route.parent
    });
  }

  /**
   * Load List of Skills (High Level)
   */
  industriesList() {
    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES});
  }

  ngOnInit() {
      // loading industry list
      this.industriesList();
  }

  /**
   * Check for hashtags in Desc
   */
  descListener(descValue: any) {
    console.log('descValue', descValue);

    // checking for last char if it's a space
    const lastChar = descValue[descValue.length - 1];

    // check if hit enter
    const match = /\r|\n/.exec(descValue);

    if (lastChar === ' ' || match) {
      // checking of hashtags
      let hashTags = this.generalHelper.findHashtags(descValue);
      if (hashTags && hashTags.length > 0) {

        // filter for duplicate values
        hashTags = _.uniq(hashTags);
        console.log('U hashtags', hashTags);
        console.log('U tags', this.tags);

        const that = this;
        // prepare value to add
        hashTags.forEach((hashTag, i) => {
          that.tags.push({
            display: hashTag,
            value: hashTag
          });
          if (i === hashTags.length - 1) {
            // make the array uniq
            this.tags = _.uniqBy(this.tags, 'value');
          }
        });
      }
      // console.log('tags', this.tags);
    } else {
      // console.log('last char is not space');
    }
  }

}

