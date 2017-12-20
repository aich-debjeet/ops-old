import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';

import { ModalService } from '../../../shared/modal/modal.component.service';
import { ApiService } from '../../../helpers/api.service';
import { GeneralUtilities } from '../../../helpers/general.utils';
import { initialMedia, Media } from '../../../models/media.model';

// Action
import { AuthActions } from '../../../actions/auth.action';

// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

// import { FileUploadService } from '../media/fakeService';
import { ProfileModal, initialTag, UserCard } from '../../../models/profile.model';
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
  profileChannel = initialTag;
  channelType: number;
  handle: string;
  channelSavedHere: boolean;
  channelSaved = false;
  private apiLink: string = environment.API_ENDPOINT;
  industries: any[];
  selectedIndustry = '';
  hashTags: string[];
  activeUser: UserCard;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private tokenService: TokenService,
    private localStorageService: LocalStorageService,
    private generalHelper: GeneralUtilities,
    private store: Store<Media> ) {
      this.createChannelForm();
      this.typeSelected = false;
      this.stepNumber = 1;
      this.channelSaved = false;
      this.channelSavedHere = false;

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

        const activeUser = this.profileChannel.profile_cards.active;
        this.activeUser = activeUser;

        if (this.channelSavedHere && this.channelSaved === true ) {
          this.switchToStep(3);
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
    // Empty initiate form
    this.channelForm = this.fb.group({
      title: ['', Validators.required ],
      type: ['', Validators.required ],
      desc: ['', Validators.required ],
      privacy: [0, Validators.required ]
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
        flag = ['audio'];
        break;
      case 3:
        flag = ['video'];
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
    this.prepareHashtags(value.desc);
    // const userHandle = this.profileChannel.profile_navigation_details.handle || '';
    const mediaTypeList = this.channelTypeConfig(this.channelType);

    // set profile handle to user handle
    const profileHandle = this.activeUser.handle;

    if ( this.channelForm.valid === true && profileHandle !== '' ) {

      if (!this.hashTags) {
        this.hashTags = [];
      }

      const channelObj = {
        name: value.title,
        owner: profileHandle,
        mediaTypes: mediaTypeList,
        industryList: [ value.type ],
        superType: 'channel',
        access: Number(value.privacy),
        description: value.desc,
        accessSettings : { access : Number(value.privacy) },
        hashTags: this.hashTags
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

  ngOnInit() {
    // Loading industry list
    this.store.dispatch({ type: AuthActions.LOAD_INDUSTRIES });
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

