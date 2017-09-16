import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { TabComponents  } from '../../shared/tabs/tabset';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { Http, Headers, Response } from '@angular/http';

// Action
import { MediaActions } from '../../actions/media.action';
import { ProfileActions } from '../../actions/profile.action';
import { initialMedia, Media } from '../../models/media.model';
import { ProfileModal, initialTag as profileInit } from '../../models/profile.model';
import { Router, ActivatedRoute } from '@angular/router';
// rx
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { FileUploadService } from './fakeService';

import * as MediumEditor from 'medium-editor';
// Blog

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  providers: [ TabComponents, FileUploadService],
  styleUrls: ['./media.component.scss']
})

export class MediaComponent implements OnInit, AfterViewInit {
  statusForm: FormGroup;
  mediaForm: FormGroup;

  private mediaStateSubscription: Subscription;
  mediaState$: Observable<Media>;
  profileState$: Observable<ProfileModal>;
  mediaStore = initialMedia;
  profileStore = profileInit;
  uploadedFiles = [];
  uploadError;
  currentStatus: number;
  uploadFieldName = 'photos';
  files: any[];
  showChannelList: boolean;
  token: string;
  handle: string;
  textVar: string;
  placeholderVar: string;
  page_message: string;
  userChannels: any;
  tempChannel: string;
  channelLoaded: boolean;

  constructor(
    private fb: FormBuilder,
    private mediaService: FileUploadService,
    private router: Router,
    private route: ActivatedRoute,
    private profStore: Store<any>,
    private store: Store<Media> ) {
      // Vars
      this.textVar = 'title';
      this.placeholderVar = 'Write something';
      // Forms
      this.createStatusForm();
      // this.createMediaForm();

      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.handle = 'Z_95E0C34B_4D10_4F1D_B77B_C6178AC85CF8MUNEEF_MUNEEF_IN'; // localStorage.getItem('currentUserID');
      this.tempChannel = 'g-8b97a287-6de0-4a8e-acf8-2b1cb8624cfe';
      this.token = currentUser.access_token; // your token

      const tempUser = 'Z_95E0C34B_4D10_4F1D_B77B_C6178AC85CF8MUNEEF_MUNEEF_IN';

      // Reducer Store
      this.mediaState$ = this.store.select('mediaStore');
      this.mediaState$.subscribe((state) => {
        this.mediaStore = state;
      });

      this.channelLoaded = false;

      // Profile
      this.profileState$ = profStore.select('profileTags');
      this.profileState$.subscribe((state) => {
        this.profileStore = state;
        if (this.channelLoaded === false && this.profileStore.user_channel.length < 1 && this.profileStore.user_channels_loaded === false) {
          this.channelLoaded = true;
          this.loadChannels(this.handle);
        }
        // If its loaded assign to the variables
        if (this.profileStore.user_channel.length > 0 ) {
          this.userChannels = this.profileStore.user_channel;
        }
      });

      this.reset(); // set initial state
    }

  ngAfterViewInit() {
    // console.log('media modal');
  }

  loadChannels(handle: string) {
    this.profStore.dispatch({ type: ProfileActions.LOAD_CURRENT_USER_CHANNEL, payload: handle });
  }

  /**
   * Show/Hide Channel Dropdown List
   */
  toggleChannelList() {
    this.showChannelList = !this.showChannelList;
  }
  /**
   * Init Media Upload state
   */

  reset() {
    // this.currentStatus = this.STATUS_INITIAL;
    this.uploadedFiles = [];
    this.uploadError = null;
  }

  /**
   * Media Uploader Form
   */
  submitStatusForm(value: any) {

    if ( this.statusForm.valid === true ) {
      const postStatus = {
        owner: this.handle,
        feed_type: 'status',
        title: '',
        description: value.status,
        access: 0,
        active: true
      };

      this.postStatus( postStatus );
    }
  }

  /**
   * Upload Files
   * @param req
   */
  postMedia() {
    //
  }

  /**
   * Post Status
   * @param req
   */
  postStatus(req: any) {
    console.log(req);
    this.store.dispatch({ type: MediaActions.STATUS_SAVE, payload: req });
  }

  ngOnInit() {
    //
  }

  /**
   * Status Form
   */
  createStatusForm() {
    this.statusForm = this.fb.group({
      status : ['', Validators.required ],
      privacy: [ 0 ]
    })
  }

  /**
   * Media Form
   */
  createMediaForm() {
    this.mediaForm = this.fb.group({
      files : ['', Validators.required ]
    })
  }

  /**
   * Close
   */
  doClose(bool: boolean = false) {
    this.router.navigate(['.', { outlets: { media: null } }], {
      relativeTo: this.route.parent
    });
  }
}

