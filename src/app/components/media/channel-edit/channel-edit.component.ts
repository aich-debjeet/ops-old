import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { ModalService } from '../../../shared/modal/modal.component.service';
import { GeneralUtilities } from '../../../helpers/general.utils';

// Action
import { MediaActions } from '../../../actions/media.action';
import { AuthActions } from '../../../actions/auth.action';
import { ProfileActions } from '../../../actions/profile.action';
import { initialMedia, Media } from '../../../models/media.model';

import { initialTag, Follow } from '../../../models/auth.model';
import { ProfileModal } from '../../../models/profile.model';

import { map as _map } from 'lodash';
import { ToastrService } from 'ngx-toastr';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as _ from 'lodash';

@Component({
  selector: 'app-channel-edit',
  templateUrl: './channel-edit.component.html',
  providers: [ ModalService ],
  styleUrls: ['./channel-edit.component.scss']
})

export class EditChannelComponent implements OnInit {
  channelForm: FormGroup;
  mediaState$: Observable<Media>;
  editState$: Observable<any>;
  loginTagState$: Observable<Follow>;
  tagState$: Observable<ProfileModal>;
  mediaStore = initialMedia;
  editValues: any;
  selectedIndustry: string;
  selectedPrivacy: string;
  channelId: string;
  userHandle: string;
  stepNumber = 2;
  hashTags: string[];

  profileChannel: any;
  forIndustries: any;
  channelSaved = false;
  channelSavedHere: boolean;

  private apiLink: string = environment.API_ENDPOINT;
  imageBaseLink: string = environment.API_IMAGE;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<Media>,
    private toastr: ToastrService,
    private generalHelper: GeneralUtilities
  ) {

    this.mediaState$ = store.select('mediaStore');
    this.editState$ = store.select('mediaStore').take(5);

    this.mediaState$.subscribe((state) => {
      if (typeof state !== 'undefined') {
        this.mediaStore = state;
        if (typeof this.mediaStore.channel_detail['isOwner'] !== 'undefined' && this.mediaStore.channel_detail['isOwner'] !== true) {
          this.doClose(0);
        }
        if (typeof this.mediaStore.channel_detail['industryList'] !== 'undefined') {
          setTimeout(() => {
            const industryArrLen = this.mediaStore.channel_detail['industryList'].length;
            this.selectedIndustry = this.mediaStore.channel_detail['industryList'][industryArrLen - 1];
          }, 1000);
          this.selectedPrivacy = this.mediaStore.channel_detail['accessSeetings'].access;
        }
      }
    });

    this.loginTagState$ = store.select('loginTags');
    this.loginTagState$.subscribe((state) => {
      this.forIndustries = state;
    });

    this.tagState$ = this.store.select('profileTags');
    this.tagState$.subscribe((state) => {
      this.profileChannel = state;
      this.channelSaved = this.profileChannel.channel_updated;

      // Success message
      if (this.channelSavedHere && this.channelSaved === true ) {
        this.switchToStep(3);
        this.channelSavedHere = false;
        this.store.dispatch({ type: MediaActions.GET_CHANNEL_DETAILS, payload: this.channelId });
      }
    });
  }

  /**
   * switch between steps step
   */
  switchToStep(stepNum: any) {
    this.stepNumber = stepNum;
  }

  /**
   * Close
   */
  closeChannelUpdate(input: any) {
    this.router.navigate(['.', { outlets: { media: null } }], {
      relativeTo: this.route.parent
    });
  }

  ngOnInit() {

    // loading industry list
    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES});

    // reading route
    this.route.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.channelId = params['id'];
        this.store.dispatch({ type: MediaActions.GET_CHANNEL_DETAILS, payload: this.channelId });
      }
    });

    // Watch for Changes
    this.editState$.subscribe(event => {

      this.editValues = event;
      const channel = event.channel_detail;
      this.userHandle = channel.ownerHandle;
      this.channelForm = this.fb.group({
        id: [channel.channelId, Validators.required ],
        title: [channel.channelName, Validators.required ],
        type: ['', Validators.required ],
        desc: [channel.description, Validators.required ],
        privacy: [this.selectedPrivacy, Validators.required ]
      });

    });
  }

  /**
   * Close
   */
  doClose(event) {
    this.router.navigate(['.', { outlets: { media: null } }], {
      relativeTo: this.route.parent
    });
  }

  /**
   * Upate Form
   * @param formValue
   */
  updateChannel(value: any) {
    this.prepareHashtags(value.desc);
    const userHandle = this.userHandle || '';
    const mediaTypeList = [];

    if ( this.channelForm.valid === true && userHandle !== '' ) {

      if (!this.hashTags) {
        this.hashTags = [];
      }

      const channelObj = {
        id: value.id,
        name: value.title,
        description: value.desc,
        industryList: [ value.type ],
        access: Number(value.privacy),
        accessSettings : { access : Number(value.privacy) },
        hashTags: this.hashTags
      }

      this.channelSavedHere = true;

      const reqParams = {
        channelData: channelObj,
        channelId: this.channelId
      }
      this.store.dispatch({ type: ProfileActions.CHANNEL_UPDATE, payload: reqParams });
    } else {
      this.toastr.warning('Please fill all required fields');
    }
  }

  /**
   * Check for hashtags in Desc
   */
  prepareHashtags(descValue: any) {
    // check if not empty
    if (descValue && descValue.length > 0) {
      // checking of hashtags
      this.hashTags = this.generalHelper.findHashtags(descValue);
      if (this.hashTags && this.hashTags.length > 0) {
        // filter for duplicate values
        this.hashTags = _.uniq(this.hashTags);
      }
    }

  }
}
